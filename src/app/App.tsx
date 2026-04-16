import { LanguageProvider } from "./components/LanguageContext";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { VisionMissionSection } from "./components/VisionMissionSection";
import { AffiliationSection } from "./components/AffiliationSection";
import { TeamSection } from "./components/TeamSection";
import { TechnologySection } from "./components/TechnologySection";
import { OurProductSection } from "./components/OurProductSection";
import { WhySLISection } from "./components/WhySLISection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <VisionMissionSection />
        <AffiliationSection />
        <TeamSection />
        <TechnologySection />
        <OurProductSection />
        <WhySLISection />
        <CTASection />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
