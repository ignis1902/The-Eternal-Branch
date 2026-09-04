import { footerContent } from "@/lib/content";
import SectionReveal from "@/components/ui/SectionReveal";

export default function Footer() {
  return (
    <footer className="relative border-t border-starlightMuted/10 px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <SectionReveal>
          <p className="font-serif text-xl text-gold">{footerContent.title}</p>
          <p className="mt-3 text-sm text-starlightMuted">{footerContent.tagline}</p>
          <p className="mt-6 text-xs text-starlightMuted/60">{footerContent.note}</p>
        </SectionReveal>
      </div>
    </footer>
  );
}
