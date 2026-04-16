import { motion } from "motion/react";
import { Monitor, Box, Link2 } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { BubbleBackground } from "./effects/BubbleBackground";

const techKeys = [
  { icon: Monitor, titleKey: "tech.item1Title", descKey: "tech.item1Desc" },
  { icon: Box, titleKey: "tech.item2Title", descKey: "tech.item2Desc" },
  { icon: Link2, titleKey: "tech.item3Title", descKey: "tech.item3Desc" },
];

export function TechnologySection() {
  const { t } = useLanguage();
  return (
    <BubbleBackground variant="white" density="medium">
      <section id="teknologi" className="py-14 sm:py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("tech.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl mb-2 px-2">
            {t("tech.heading")}
          </h2>
          <div className="w-20 h-1 bg-[#0891b2] mx-auto mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
          {techKeys.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative bg-gradient-to-b from-[#f0f9ff] to-white rounded-2xl p-6 sm:p-8 border border-[#e0f2fe] hover:border-[#0891b2]/40 transition-all hover:shadow-lg group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#0c4a6e] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-[#0c4a6e] text-base sm:text-lg mb-2 sm:mb-3">{t(item.titleKey)}</h3>
              <p className="text-[#64748b] leading-relaxed text-sm sm:text-base">{t(item.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </BubbleBackground>
  );
}
