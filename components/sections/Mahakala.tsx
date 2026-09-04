import dynamic from "next/dynamic";
import { mahakalaContent } from "@/lib/content";
import SectionReveal from "@/components/ui/SectionReveal";
import Divider from "@/components/ui/Divider";

const TandavaParticles = dynamic(
  () => import("@/components/visuals/TandavaParticles"),
  { ssr: false, loading: () => <div className="h-64 animate-pulse rounded-lg bg-voidDeep/50" /> }
);

export default function Mahakala() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <h2 className="mb-8 font-serif text-3xl font-light text-gold md:text-4xl">
            {mahakalaContent.heading}
          </h2>
        </SectionReveal>
        <div className="space-y-6">
          {mahakalaContent.paragraphs.map((paragraph, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-starlightMuted md:text-xl">
                {paragraph}
              </p>
            </SectionReveal>
          ))}
        </div>
        <SectionReveal delay={0.3}>
          <div className="relative mx-auto mt-12 aspect-[4/3] w-full max-w-lg overflow-hidden rounded-lg border border-saffron/20 bg-voidDeep/60">
            {/* Abstract Shiva tandava silhouette placeholder — source or commission separately */}
            <TandavaParticles />
          </div>
        </SectionReveal>
        <Divider />
      </div>
    </section>
  );
}
