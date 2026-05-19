import { Navbar } from "../components/Navbar";
import { AboutSection } from "../components/AboutSection";
import { VisionMissionSection } from "../components/VisionMissionSection";
import { BoardSection } from "../components/BoardSection";
import { AffiliationSection } from "../components/AffiliationSection";
import { Footer } from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-12 sm:pt-28">
      <Navbar />
      <AboutSection />
      <VisionMissionSection />
      {/* TeamSection intentionally excluded — use BoardSection instead */}
      <BoardSection />
      <AffiliationSection />
      <Footer />
    </div>
  );
}
