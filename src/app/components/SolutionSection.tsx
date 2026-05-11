import { motion } from "motion/react";
import { useLanguage } from "./LanguageContext";

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

export function SolutionSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left — feature list */}
          <div className="flex flex-col gap-4">
            {solutionKeys.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group flex gap-5 bg-[#f8fafc] rounded-2xl p-6 sm:p-7 border border-[#e2e8f0] hover:border-[#0891b2]/30 hover:shadow-md hover:shadow-[#0891b2]/5 transition-all duration-300"
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

          {/* Right — stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0c4a6e] rounded-2xl p-8 sm:p-10 flex flex-col justify-between"
          >
            {/* Heading */}
            <div className="mb-10">
              <div className="w-8 h-0.5 bg-[#38bdf8] mb-6" />
              <h3 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-3">
                {t("solution.statsHeading")}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {t("solution.statsSubheading")}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {statsKeys.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6"
                >
                  <div className="text-white text-3xl sm:text-4xl font-bold tracking-tight leading-none mb-2">
                    {stat.value}
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {t(stat.labelKey)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
