import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import ProblemSection from "@/components/problem/ProblemSection";
import HowItWorks from "@/components/solution/HowItWorks";
import BenchmarkSection from "@/components/benchmarks/BenchmarkSection";
import UseCaseSection from "@/components/use-cases/UseCaseSection";
import PlaygroundSection from "@/components/demo/PlaygroundSection";
import TeamSection from "@/components/team/TeamSection";
import CTASection from "@/components/cta/CTASection";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <HowItWorks />
      <BenchmarkSection />
      <UseCaseSection />
      <PlaygroundSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </main>
  );
}
