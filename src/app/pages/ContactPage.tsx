import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CTASection />
      <Footer />
    </div>
  );
}
