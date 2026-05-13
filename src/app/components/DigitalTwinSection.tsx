import { motion } from "motion/react";
import { useLanguage } from "./LanguageContext";

const dataInputs = [
  { labelKey: "tech.dt.input1", color: "bg-[#0c4a6e]" },
  { labelKey: "tech.dt.input2", color: "bg-[#0891b2]" },
  { labelKey: "tech.dt.input3", color: "bg-[#0369a1]" },
  { labelKey: "tech.dt.input4", color: "bg-[#075985]" },
  { labelKey: "tech.dt.input5", color: "bg-[#0c4a6e]" },
];

const foundations = [
  { numKey: "01", titleKey: "tech.dt.f1Title", descKey: "tech.dt.f1Desc" },
  { numKey: "02", titleKey: "tech.dt.f2Title", descKey: "tech.dt.f2Desc" },
  { numKey: "03", titleKey: "tech.dt.f3Title", descKey: "tech.dt.f3Desc" },
];

export function TechDigitalTwinSection() {
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
          className="max-w-3xl mx-auto text-center mb-14 sm:mb-20"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("tech.dt.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("tech.dt.heading")}
          </h2>
          <div className="w-16 h-0.5 bg-[#0891b2] mx-auto mb-6" />
          <p className="text-[#64748b] text-base sm:text-lg leading-relaxed">
            {t("tech.dt.subheading")}
          </p>
        </motion.div>

        {/* Main visual — flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-8 sm:p-12 mb-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left — data inputs */}
            <div className="w-full lg:w-1/3">
              <p className="text-[#64748b] text-xs tracking-[0.2em] uppercase mb-4 font-semibold">
                {t("tech.dt.inputsLabel")}
              </p>
              <div className="flex flex-col gap-2">
                {dataInputs.map((inp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className={`${inp.color} text-white text-sm font-medium px-4 py-2.5 rounded-lg`}
                  >
                    {t(inp.labelKey)}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Center arrow + core box */}
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 w-full lg:w-auto">
              {/* Arrow */}
              <div className="flex lg:flex-col items-center gap-1">
                <div className="w-12 lg:w-0.5 h-0.5 lg:h-12 bg-[#0891b2]" />
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0891b2] lg:border-t-0 lg:border-l-[8px] lg:border-l-[#0891b2] lg:border-t-[6px] lg:border-b-[6px] lg:border-b-transparent" />
              </div>

              {/* Digital Twin core */}
              <div className="bg-[#0c4a6e] rounded-2xl px-8 py-8 text-center min-w-[200px]">
                <div className="w-10 h-0.5 bg-[#38bdf8] mx-auto mb-4" />
                <p className="text-[#7dd3fc] text-xs tracking-widest uppercase mb-2">
                  {t("tech.dt.coreLabel")}
                </p>
                <h3 className="text-white font-bold text-lg leading-tight">
                  {t("tech.dt.coreTitle")}
                </h3>
              </div>

              {/* Arrow out */}
              <div className="flex lg:flex-col items-center gap-1">
                <div className="w-12 lg:w-0.5 h-0.5 lg:h-12 bg-[#0891b2]" />
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0891b2] lg:border-t-0 lg:border-l-[8px] lg:border-l-[#0891b2] lg:border-t-[6px] lg:border-b-[6px] lg:border-b-transparent" />
              </div>
            </div>

            {/* Right — outputs */}
            <div className="w-full lg:w-1/3">
              <p className="text-[#64748b] text-xs tracking-[0.2em] uppercase mb-4 font-semibold">
                {t("tech.dt.outputsLabel")}
              </p>
              <div className="flex flex-col gap-3">
                {(
                  ["tech.dt.out1", "tech.dt.out2", "tech.dt.out3"] as const
                ).map((key, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-3 bg-white rounded-xl border border-[#e2e8f0] px-4 py-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] mt-1.5 flex-shrink-0" />
                    <p className="text-[#0c4a6e] text-sm font-medium">
                      {t(key)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Foundation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {foundations.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-7 border border-[#e2e8f0] hover:border-[#0891b2]/30 hover:shadow-md hover:shadow-[#0891b2]/5 transition-all duration-300"
            >
              <p className="text-[#cbd5e1] group-hover:text-[#0891b2]/40 font-semibold text-xs tracking-[0.25em] mb-4 transition-colors duration-300">
                {f.numKey}
              </p>
              <div className="w-6 h-0.5 bg-[#e2e8f0] group-hover:bg-[#0891b2] mb-4 transition-colors duration-300" />
              <h3 className="text-[#0c4a6e] font-semibold text-base mb-2">
                {t(f.titleKey)}
              </h3>
              <p className="text-[#64748b] text-sm leading-relaxed">
                {t(f.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
