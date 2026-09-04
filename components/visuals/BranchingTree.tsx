"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MAX_DEPTH = 6;
const BRANCH_LENGTH = 70;
const BRANCH_ANGLE = Math.PI / 5;

type BranchType = "continues" | "ends";

interface TreeNode {
  id: string;
  x: number;
  y: number;
  depth: number;
  parentId: string | null;
  branchType: BranchType | null;
  angle: number;
}

interface TreeEdge {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  branchType: BranchType;
  animated: boolean;
}

let nodeIdCounter = 0;
function nextId() {
  return `node-${++nodeIdCounter}`;
}

export default function BranchingTree() {
  const reducedMotion = useReducedMotion();
  const [nodes, setNodes] = useState<TreeNode[]>([
    { id: "root", x: 200, y: 320, depth: 0, parentId: null, branchType: null, angle: -Math.PI / 2 },
  ]);
  const [edges, setEdges] = useState<TreeEdge[]>([]);
  const [shakingId, setShakingId] = useState<string | null>(null);

  const isEndpoint = (id: string) => !nodes.some((n) => n.parentId === id);

  const handleNodeClick = useCallback(
    (node: TreeNode) => {
      if (nodes.some((n) => n.parentId === node.id)) return;

      if (node.depth >= MAX_DEPTH) {
        setShakingId(node.id);
        setTimeout(() => setShakingId(null), 400);
        return;
      }

      const leftAngle = node.angle - BRANCH_ANGLE;
      const rightAngle = node.angle + BRANCH_ANGLE;

      const continuesNode: TreeNode = {
        id: nextId(),
        x: node.x + Math.cos(leftAngle) * BRANCH_LENGTH,
        y: node.y + Math.sin(leftAngle) * BRANCH_LENGTH,
        depth: node.depth + 1,
        parentId: node.id,
        branchType: "continues",
        angle: leftAngle,
      };

      const endsNode: TreeNode = {
        id: nextId(),
        x: node.x + Math.cos(rightAngle) * BRANCH_LENGTH,
        y: node.y + Math.sin(rightAngle) * BRANCH_LENGTH,
        depth: node.depth + 1,
        parentId: node.id,
        branchType: "ends",
        angle: rightAngle,
      };

      const newEdges: TreeEdge[] = [
        {
          id: `edge-${continuesNode.id}`,
          fromX: node.x,
          fromY: node.y,
          toX: continuesNode.x,
          toY: continuesNode.y,
          branchType: "continues",
          animated: !reducedMotion,
        },
        {
          id: `edge-${endsNode.id}`,
          fromX: node.x,
          fromY: node.y,
          toX: endsNode.x,
          toY: endsNode.y,
          branchType: "ends",
          animated: !reducedMotion,
        },
      ];

      setNodes((prev) => [...prev, continuesNode, endsNode]);
      setEdges((prev) => [...prev, ...newEdges]);
    },
    [nodes, reducedMotion]
  );

  const handleKeyDown = (e: React.KeyboardEvent, node: TreeNode) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNodeClick(node);
    }
  };

  return (
    <svg
      viewBox="0 0 400 400"
      className="mx-auto w-full max-w-md"
      role="img"
      aria-label="Interactive branching tree visualization"
    >
      {edges.map((edge) => {
        const length = Math.hypot(edge.toX - edge.fromX, edge.toY - edge.fromY);
        const isContinues = edge.branchType === "continues";

        if (reducedMotion || !edge.animated) {
          return (
            <line
              key={edge.id}
              x1={edge.fromX}
              y1={edge.fromY}
              x2={edge.toX}
              y2={edge.toY}
              stroke={isContinues ? "#d4af37" : "#6b7280"}
              strokeWidth={isContinues ? 2 : 1.5}
              strokeOpacity={isContinues ? 1 : 0.5}
            />
          );
        }

        return (
          <motion.line
            key={edge.id}
            x1={edge.fromX}
            y1={edge.fromY}
            x2={edge.toX}
            y2={edge.toY}
            stroke={isContinues ? "#d4af37" : "#6b7280"}
            strokeWidth={isContinues ? 2 : 1.5}
            strokeOpacity={isContinues ? 1 : 0.5}
            initial={{ strokeDasharray: length, strokeDashoffset: length, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: isContinues ? 1 : 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        );
      })}

      {nodes.map((node) => {
        const endpoint = isEndpoint(node.id);
        const isContinues = node.branchType === "continues";
        const isEnds = node.branchType === "ends";
        const shaking = shakingId === node.id;

        return (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={endpoint ? 8 : 5}
              fill={
                node.depth === 0
                  ? "#d4af37"
                  : isContinues
                    ? "#d4af37"
                    : isEnds
                      ? "#6b7280"
                      : "#b8b3d1"
              }
              opacity={isEnds ? 0.6 : 1}
              className={shaking ? "animate-shake" : ""}
            />
            {endpoint && (
              <circle
                cx={node.x}
                cy={node.y}
                r={16}
                fill="transparent"
                className="cursor-pointer focus:outline-none focus-visible:stroke-gold focus-visible:stroke-2"
                tabIndex={0}
                role="button"
                aria-label={`Branch from node at depth ${node.depth}`}
                onClick={() => handleNodeClick(node)}
                onKeyDown={(e) => handleKeyDown(e, node)}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
