import { motion } from "motion/react";
import { Globe, Wifi, DollarSign, Lightbulb } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { BubbleBackground } from "./effects/BubbleBackground";

const capKeys = [
  { icon: Globe, titleKey: "team.cap1Title", descKey: "team.cap1Desc" },
  { icon: Wifi, titleKey: "team.cap2Title", descKey: "team.cap2Desc" },
  { icon: DollarSign, titleKey: "team.cap3Title", descKey: "team.cap3Desc" },
  { icon: Lightbulb, titleKey: "team.cap4Title", descKey: "team.cap4Desc" },
];

export function TeamSection() {
  const { t } = useLanguage();
  return (
    <BubbleBackground variant="light-blue" density="medium">
      <section id="tim" className="py-14 sm:py-20 md:py-28 bg-[#f0f9ff] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("team.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl mb-2">
            {t("team.heading")}
          </h2>
          <div className="w-20 h-1 bg-[#0891b2] mx-auto mt-4" />
          <p className="text-[#64748b] mt-4 sm:mt-6 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            {t("team.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-8">
          {capKeys.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-8 shadow-md hover:shadow-lg transition-shadow border border-[#e0f2fe]"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex-shrink-0 w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#0c4a6e] flex items-center justify-center">
                  <cap.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-[#0c4a6e] text-base sm:text-lg mb-1 sm:mb-2">{t(cap.titleKey)}</h3>
                  <p className="text-[#64748b] leading-relaxed text-sm sm:text-base">{t(cap.descKey)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </BubbleBackground>
  );
}
