import { Navbar } from "../components/Navbar";
import { ProblemSection } from "../components/ProblemSection";
import { SolutionSection } from "../components/SolutionSection";
import { WhySLISection } from "../components/WhySLISection";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ProblemSection />
      <SolutionSection />
      <WhySLISection />
      <CTASection />
      <Footer />
    </div>
  );
}
