import Hero from "@/components/sections/Hero";
import TheQuestion from "@/components/sections/TheQuestion";
import TheoryExplained from "@/components/sections/TheoryExplained";
import AncientMirror from "@/components/sections/AncientMirror";
import BreathOfBrahma from "@/components/sections/BreathOfBrahma";
import Mahakala from "@/components/sections/Mahakala";
import Atman from "@/components/sections/Atman";
import Reflection from "@/components/sections/Reflection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TheQuestion />
      <TheoryExplained />
      <AncientMirror />
      <BreathOfBrahma />
      <Mahakala />
      <Atman />
      <Reflection />
      <Footer />
    </main>
  );
}
