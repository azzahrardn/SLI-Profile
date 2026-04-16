import { motion } from "motion/react";
import { Heart, Award, Zap, TrendingUp, BarChart, FileCheck } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { BubbleBackground } from "./effects/BubbleBackground";

const reasonKeys = [
  { icon: Heart, num: "01", titleKey: "why.r1Title", descKey: "why.r1Desc" },
  { icon: Award, num: "02", titleKey: "why.r2Title", descKey: "why.r2Desc" },
  { icon: Zap, num: "03", titleKey: "why.r3Title", descKey: "why.r3Desc" },
  { icon: TrendingUp, num: "04", titleKey: "why.r4Title", descKey: "why.r4Desc" },
  { icon: BarChart, num: "05", titleKey: "why.r5Title", descKey: "why.r5Desc" },
  { icon: FileCheck, num: "06", titleKey: "why.r6Title", descKey: "why.r6Desc" },
];

export function WhySLISection() {
  const { t } = useLanguage();
  return (
    <BubbleBackground variant="dark" density="medium">
      <section id="mengapa-sli" className="py-14 sm:py-20 md:py-28 bg-gradient-to-b from-[#0c4a6e] to-[#0369a1] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-[#7dd3fc] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("why.label")}
          </p>
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl mb-2">
            {t("why.heading")}
          </h2>
          <div className="w-20 h-1 bg-[#38bdf8] mx-auto mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reasonKeys.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-7 border border-white/10 hover:border-[#38bdf8]/40 transition-all hover:bg-white/15"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#38bdf8]/20 flex items-center justify-center">
                  <r.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#38bdf8]" />
                </div>
                <span className="text-[#7dd3fc] text-sm">{r.num}</span>
              </div>
              <h3 className="text-white text-base sm:text-lg mb-2 sm:mb-3">{t(r.titleKey)}</h3>
              <p className="text-[#bae6fd]/80 leading-relaxed text-sm sm:text-base">{t(r.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </BubbleBackground>
  );
}
