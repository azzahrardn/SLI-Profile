import { motion } from "motion/react";
import { useLanguage } from "./LanguageContext";

const problemKeys = [
  { titleKey: "problem.p1Title", descKey: "problem.p1Desc" },
  { titleKey: "problem.p2Title", descKey: "problem.p2Desc" },
  { titleKey: "problem.p3Title", descKey: "problem.p3Desc" },
  { titleKey: "problem.p4Title", descKey: "problem.p4Desc" },
  { titleKey: "problem.p5Title", descKey: "problem.p5Desc" },
  { titleKey: "problem.p6Title", descKey: "problem.p6Desc" },
];

export function ProblemSection() {
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
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("problem.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("problem.heading")}
          </h2>
          <div className="w-16 h-0.5 bg-[#0891b2] mx-auto mb-6" />
          <p className="text-[#64748b] text-base sm:text-lg leading-relaxed">
            {t("problem.subheading")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {problemKeys.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group bg-white rounded-2xl p-7 sm:p-8 border border-[#e2e8f0] hover:border-[#0891b2]/30 hover:shadow-lg hover:shadow-[#0891b2]/5 transition-all duration-300"
            >
              {/* Number badge */}
              <p className="text-[#cbd5e1] group-hover:text-[#0891b2]/40 font-semibold text-xs tracking-[0.25em] mb-5 transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </p>

              {/* Accent line */}
              <div className="w-8 h-0.5 bg-[#e2e8f0] group-hover:bg-[#0891b2] mb-5 transition-colors duration-300" />

              <h3 className="text-[#0c4a6e] font-semibold text-base sm:text-lg leading-snug mb-3">
                {t(item.titleKey)}
              </h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
