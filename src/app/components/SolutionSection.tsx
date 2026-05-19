import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./LanguageContext";
import nauticamIMG from "../../assets/nauticam.png";
import fleetmasterIMG from "../../assets/fleetmaster-3.png";

const solutionKeys = [
  { titleKey: "solution.s1Title", descKey: "solution.s1Desc" },
  { titleKey: "solution.s2Title", descKey: "solution.s2Desc" },
  { titleKey: "solution.s3Title", descKey: "solution.s3Desc" },
  { titleKey: "solution.s4Title", descKey: "solution.s4Desc" },
];

const statsKeys = [
  { value: "0%", labelKey: "solution.stat1" },
  { value: "0", labelKey: "solution.stat2" },
  { value: "24/7", labelKey: "solution.stat3" },
  { value: "100%", labelKey: "solution.stat4" },
];

// Array gambar untuk carousel
const carouselImages = [nauticamIMG, fleetmasterIMG];

export function SolutionSection() {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Efek ganti gambar otomatis setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length,
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("solution.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("solution.heading")}
          </h2>
          <div className="w-16 h-0.5 bg-[#0891b2] mx-auto mb-6" />
          <p className="text-[#64748b] text-base sm:text-lg leading-relaxed">
            {t("solution.subheading")}
          </p>
        </motion.div>

        {/* --- BARIS 1: 50:50 (FITUR & CAROUSEL) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-20">
          {/* KIRI: Feature list */}
          <div className="flex flex-col gap-4">
            {solutionKeys.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group flex gap-5 bg-white sm:bg-[#f8fafc] rounded-2xl p-6 sm:p-7 border border-[#e2e8f0] hover:border-[#0891b2]/30 hover:shadow-md hover:shadow-[#0891b2]/5 transition-all duration-300"
              >
                {/* Number */}
                <div className="flex-shrink-0 pt-0.5">
                  <span className="text-[#cbd5e1] group-hover:text-[#0891b2]/50 font-semibold text-xs tracking-[0.25em] transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-[#0c4a6e] font-semibold text-base sm:text-lg leading-snug mb-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-[#64748b] text-sm leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* KANAN: Image Carousel Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full"
          >
            {/* Efek glow di belakang gambar */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#0891b2] to-[#0ea5e9] rounded-2xl blur-lg opacity-15" />

            {/* Container Gambar: Gunakan aspect-video (rasio 16:9) agar ukuran presisi dan gambar bisa mengisi penuh */}
            <div className="relative w-full aspect-3/2 rounded-2xl overflow-hidden border border-[#e2e8f0] bg-white shadow-2xl shadow-[#0c4a6e]/10 flex flex-col">
              {/* Header Mockup */}
              <div className="bg-[#f1f5f9] px-4 py-3 border-b border-[#e2e8f0] flex items-center gap-2 z-10 shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              {/* Carousel Images */}
              <div className="relative w-full h-full bg-[#f8fafc] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={carouselImages[currentImageIndex]}
                    alt="SLI Platform Dashboard"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    // Gunakan w-full h-full object-cover agar gambar merata mengikuti container
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- BARIS 2: 1 KONTEN W-FULL (STATS) --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full pt-10 border-t border-[#e2e8f0]"
        >
          {/* Header Stats (opsional, disesuaikan dengan teks referensi) */}
          <div className="text-center mb-10">
            <h3 className="text-[#0c4a6e] text-2xl sm:text-3xl font-bold mb-4">
              {t("solution.statsHeading")}
            </h3>
            <p className="text-[#64748b] text-base max-w-3xl mx-auto">
              {t("solution.statsSubheading")}
            </p>
          </div>

          {/* Grid Cards (Persis seperti referensi gambar) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {statsKeys.map((stat, i) => (
              <div
                key={i}
                className="bg-white border border-[#e2e8f0] rounded-2xl py-8 px-4 flex flex-col items-center justify-center text-center hover:border-[#0891b2]/40 hover:shadow-xl hover:shadow-[#0891b2]/5 transition-all duration-300"
              >
                <div className="text-[#0c4a6e] text-4xl sm:text-5xl font-bold tracking-tight mb-3">
                  {stat.value}
                </div>
                <p className="text-[#475569] text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  {t(stat.labelKey)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
