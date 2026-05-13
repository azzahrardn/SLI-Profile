import { Navbar } from "../components/Navbar";
import { TechDigitalTwinSection } from "../components/DigitalTwinSection";
import { TechADASection } from "../components/AdaSection";
import { TechConnectivitySection } from "../components/ConnectivitySection";
import { TechDataIntelligenceSection } from "../components/DataIntelligenceSection";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <TechDigitalTwinSection />
      <TechADASection />
      <TechConnectivitySection />
      <TechDataIntelligenceSection />
      <CTASection />
      <Footer />
    </div>
  );
}
