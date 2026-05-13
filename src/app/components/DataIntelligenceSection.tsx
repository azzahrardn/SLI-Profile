import { motion } from "motion/react";
import { useLanguage } from "./LanguageContext";

const intelligenceItems = [
  {
    numKey: "01",
    titleKey: "tech.intel.i1Title",
    descKey: "tech.intel.i1Desc",
  },
  {
    numKey: "02",
    titleKey: "tech.intel.i2Title",
    descKey: "tech.intel.i2Desc",
  },
  {
    numKey: "03",
    titleKey: "tech.intel.i3Title",
    descKey: "tech.intel.i3Desc",
  },
];

const optimizationGoals = [
  "tech.intel.goal1",
  "tech.intel.goal2",
  "tech.intel.goal3",
  "tech.intel.goal4",
  "tech.intel.goal5",
  "tech.intel.goal6",
];

export function TechDataIntelligenceSection() {
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
            {t("tech.intel.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("tech.intel.heading")}
          </h2>
          <div className="w-16 h-0.5 bg-[#0891b2] mx-auto mb-6" />
          <p className="text-[#64748b] text-base sm:text-lg leading-relaxed">
            {t("tech.intel.subheading")}
          </p>
        </motion.div>

        {/* Top — 3 data source cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          {intelligenceItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-7 border border-[#e2e8f0] hover:border-[#0891b2]/30 hover:shadow-md hover:shadow-[#0891b2]/5 transition-all duration-300"
            >
              <p className="text-[#cbd5e1] group-hover:text-[#0891b2]/40 font-semibold text-xs tracking-[0.25em] mb-4 transition-colors duration-300">
                {item.numKey}
              </p>
              <div className="w-6 h-0.5 bg-[#e2e8f0] group-hover:bg-[#0891b2] mb-4 transition-colors duration-300" />
              <h3 className="text-[#0c4a6e] font-semibold text-base sm:text-lg mb-2">
                {t(item.titleKey)}
              </h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom — AI Voyage Optimization wide card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#0c4a6e] rounded-2xl p-8 sm:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left — description */}
            <div>
              <div className="w-8 h-0.5 bg-[#38bdf8] mb-6" />
              <p className="text-[#7dd3fc] text-xs tracking-widest uppercase mb-3">
                {t("tech.intel.aiLabel")}
              </p>
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-4 leading-snug">
                {t("tech.intel.aiTitle")}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {t("tech.intel.aiDesc")}
              </p>
            </div>

            {/* Right — optimization goals grid */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
                {t("tech.intel.goalsLabel")}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {optimizationGoals.map((key, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.07 }}
                    className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] flex-shrink-0" />
                    <p className="text-white/80 text-sm">{t(key)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
