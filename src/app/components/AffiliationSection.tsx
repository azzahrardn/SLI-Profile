import { motion } from "motion/react";
import { PenTool, HardHat, ShieldCheck } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { BubbleBackground } from "./effects/BubbleBackground";

const serviceKeys = [
  { icon: PenTool, titleKey: "aff.svc1Title", descKey: "aff.svc1Desc" },
  { icon: HardHat, titleKey: "aff.svc2Title", descKey: "aff.svc2Desc" },
  { icon: ShieldCheck, titleKey: "aff.svc3Title", descKey: "aff.svc3Desc" },
];

export function AffiliationSection() {
  const { t } = useLanguage();
  return (
    <BubbleBackground variant="white" density="medium">
      <section id="afiliasi" className="py-14 sm:py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("aff.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl mb-2 px-2">
            {t("aff.heading")}
          </h2>
          <div className="w-20 h-1 bg-[#0891b2] mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#f0f9ff] rounded-2xl p-5 sm:p-8 md:p-10 mb-8 sm:mb-12 border border-[#e0f2fe]"
        >
          <p className="text-[#334155] leading-relaxed text-center max-w-3xl mx-auto text-sm sm:text-base">
            {t("aff.introBefore")}
            <strong className="text-[#0c4a6e]">
              PT Terafulk Megantara Design
            </strong>
            {t("aff.introAfter")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
          {serviceKeys.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all border border-[#e0f2fe] hover:border-[#0891b2]/30"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#0c4a6e] flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                <svc.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-[#0c4a6e] text-lg sm:text-xl mb-2 sm:mb-3">{t(svc.titleKey)}</h3>
              <p className="text-[#64748b] leading-relaxed text-sm sm:text-base">{t(svc.descKey)}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#64748b] text-center mt-8 sm:mt-12 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base"
        >
          {t("aff.footer1")}
          <span className="text-[#0c4a6e]">
            {t("aff.footerHighlight")}
          </span>
          {t("aff.footer2")}
        </motion.p>
      </div>
    </section>
    </BubbleBackground>
  );
}
