import { Navbar } from "../components/Navbar";
import { OurProductSection } from "../components/OurProductSection";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <OurProductSection />
      <CTASection />
      <Footer />
    </div>
  );
}