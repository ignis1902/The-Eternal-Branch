import { theQuestionContent } from "@/lib/content";
import SectionReveal from "@/components/ui/SectionReveal";
import Divider from "@/components/ui/Divider";

export default function TheQuestion() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <h2 className="mb-8 font-serif text-3xl font-light text-gold md:text-4xl">
            {theQuestionContent.heading}
          </h2>
        </SectionReveal>
        <div className="space-y-6">
          {theQuestionContent.paragraphs.map((paragraph, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-starlightMuted md:text-xl">
                {paragraph}
              </p>
            </SectionReveal>
          ))}
        </div>
        <Divider />
      </div>
    </section>
  );
}
