import { motion } from "motion/react";
import { useLanguage } from "./LanguageContext";

const adaFeatures = [
  { numKey: "01", titleKey: "tech.ada.f1Title", descKey: "tech.ada.f1Desc" },
  { numKey: "02", titleKey: "tech.ada.f2Title", descKey: "tech.ada.f2Desc" },
  { numKey: "03", titleKey: "tech.ada.f3Title", descKey: "tech.ada.f3Desc" },
];

const reportTypes = [
  "tech.ada.r1",
  "tech.ada.r2",
  "tech.ada.r3",
  "tech.ada.r4",
  "tech.ada.r5",
  "tech.ada.r6",
];

export function TechADASection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14 sm:mb-20"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("tech.ada.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("tech.ada.heading")}
          </h2>
          <div className="w-16 h-0.5 bg-[#0891b2] mx-auto mb-6" />
          <p className="text-[#64748b] text-base sm:text-lg leading-relaxed">
            {t("tech.ada.subheading")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left — 3 feature cards stacked */}
          <div className="flex flex-col gap-5">
            {adaFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group flex gap-5 bg-white rounded-2xl p-7 border border-[#e2e8f0] hover:border-[#0891b2]/30 hover:shadow-md hover:shadow-[#0891b2]/5 transition-all duration-300"
              >
                <div className="flex-shrink-0 pt-0.5">
                  <span className="text-[#cbd5e1] group-hover:text-[#0891b2]/50 font-semibold text-xs tracking-[0.25em] transition-colors duration-300">
                    {f.numKey}
                  </span>
                </div>
                <div>
                  <div className="w-6 h-0.5 bg-[#e2e8f0] group-hover:bg-[#0891b2] mb-4 transition-colors duration-300" />
                  <h3 className="text-[#0c4a6e] font-semibold text-base sm:text-lg mb-2">
                    {t(f.titleKey)}
                  </h3>
                  <p className="text-[#64748b] text-sm leading-relaxed">
                    {t(f.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — mobile app data types panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0c4a6e] rounded-2xl p-8 sm:p-10 flex flex-col justify-between"
          >
            <div className="mb-8">
              <div className="w-8 h-0.5 bg-[#38bdf8] mb-6" />
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-3">
                {t("tech.ada.appTitle")}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {t("tech.ada.appDesc")}
              </p>
            </div>

            {/* Report type grid */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
                {t("tech.ada.reportLabel")}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {reportTypes.map((key, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center"
                  >
                    <p className="text-white text-sm font-medium">{t(key)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
