import dynamic from "next/dynamic";
import { theoryExplainedContent } from "@/lib/content";
import SectionReveal from "@/components/ui/SectionReveal";
import Divider from "@/components/ui/Divider";

const BranchingTree = dynamic(
  () => import("@/components/visuals/BranchingTree"),
  { ssr: false, loading: () => <div className="mx-auto h-96 max-w-md animate-pulse rounded-lg bg-voidDeep/50" /> }
);

export default function TheoryExplained() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <h2 className="mb-8 font-serif text-3xl font-light text-gold md:text-4xl">
            {theoryExplainedContent.heading}
          </h2>
        </SectionReveal>
        <div className="space-y-6">
          {theoryExplainedContent.paragraphs.map((paragraph, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-starlightMuted md:text-xl">
                {paragraph}
              </p>
            </SectionReveal>
          ))}
        </div>
        <SectionReveal delay={0.3}>
          <p className="mt-8 rounded-lg border border-gold/20 bg-voidDeep/50 p-4 text-sm italic text-starlightMuted">
            {theoryExplainedContent.caveat}
          </p>
        </SectionReveal>
        <SectionReveal delay={0.4}>
          <div className="mt-12">
            <BranchingTree />
            <p className="mt-4 text-center text-sm text-starlightMuted">
              {theoryExplainedContent.branchInstruction}
            </p>
          </div>
        </SectionReveal>
        <Divider />
      </div>
    </section>
  );
}
