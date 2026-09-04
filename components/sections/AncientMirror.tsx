import dynamic from "next/dynamic";
import { ancientMirrorContent } from "@/lib/content";
import SectionReveal from "@/components/ui/SectionReveal";
import Divider from "@/components/ui/Divider";

const UniverseBubbles = dynamic(
  () => import("@/components/visuals/UniverseBubbles"),
  { ssr: false }
);

export default function AncientMirror() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <h2 className="mb-8 font-serif text-3xl font-light text-gold md:text-4xl">
            {ancientMirrorContent.heading}
          </h2>
        </SectionReveal>
        <div className="space-y-6">
          {ancientMirrorContent.paragraphs.map((paragraph, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-starlightMuted md:text-xl">
                {paragraph}
              </p>
            </SectionReveal>
          ))}
        </div>
        <SectionReveal delay={0.3}>
          <div className="relative mx-auto mt-12 aspect-[4/3] w-full max-w-lg overflow-hidden rounded-lg border border-indigo/30 bg-voidDeep/60">
            {/* Insert respectful abstract/silhouette illustration of Vishnu reclining on Shesha here — commission or source separately, do not use a photorealistic or copyrighted deity image */}
            <div
              className="flex h-full items-center justify-center"
              role="img"
              aria-label="Abstract placeholder for Vishnu reclining on Shesha illustration"
            >
              <svg
                viewBox="0 0 200 120"
                className="h-3/4 w-3/4 text-indigo-light/30"
                aria-hidden="true"
              >
                <ellipse cx="100" cy="70" rx="70" ry="20" fill="currentColor" opacity="0.3" />
                <ellipse cx="100" cy="55" rx="30" ry="15" fill="currentColor" opacity="0.5" />
                <path
                  d="M30 70 Q60 50 100 55 Q140 50 170 70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.4"
                />
                <circle cx="100" cy="48" r="8" fill="currentColor" opacity="0.6" />
              </svg>
            </div>
            <UniverseBubbles />
          </div>
        </SectionReveal>
        <Divider />
      </div>
    </section>
  );
}
