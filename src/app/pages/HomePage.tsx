import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { WhySLISection } from "../components/WhySLISection";
import { OurProductSection } from "../components/OurProductSection";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhySLISection />
      <OurProductSection />
      <CTASection />
      <Footer />
    </div>
  );
}