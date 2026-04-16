import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, Globe, Quote } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { BubbleBackground } from "./effects/BubbleBackground";

export function CTASection() {
  const { t } = useLanguage();
  return (
    <BubbleBackground variant="white" density="low">
      <section
        id="kontak"
        className="relative py-14 sm:py-20 md:py-28 overflow-hidden bg-white"
      >
      {/* Minimalist animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-[#0891b2]/[0.04]"
          style={{ top: "-10%", right: "-8%" }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#38bdf8]/[0.04]"
          style={{ bottom: "-12%", left: "-5%" }}
          animate={{ x: [0, 25, 0], y: [0, -20, 0], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full bg-[#0c4a6e]/[0.03]"
          style={{ top: "40%", left: "50%", marginLeft: "-175px" }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #0c4a6e 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("cta.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl mb-2">
            {t("cta.heading")}
          </h2>
          <div className="w-20 h-1 bg-[#0891b2] mx-auto mt-4" />
        </motion.div>

        {/* Quote + CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center mb-10 sm:mb-12 space-y-5"
        >
          <p className="text-[#334155] leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
            {t("cta.p1")}
          </p>
          <p className="text-[#334155]/80 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
            {t("cta.p2Before")}
            <strong className="text-[#0c4a6e]">{t("cta.p2Highlight")}</strong>
            {t("cta.p2After")}
          </p>
          <div className="inline-flex items-start gap-3 bg-[#f0f9ff] border border-[#bae6fd]/40 rounded-xl p-4 sm:p-5 max-w-lg mx-auto text-left">
            <Quote className="w-5 h-5 text-[#0891b2] flex-shrink-0 mt-0.5" />
            <p className="text-[#0c4a6e] italic text-sm sm:text-base leading-relaxed">
              {t("cta.quote")}
            </p>
          </div>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12"
        >
          <a
            href="mailto:info@ptsli.com"
            className="group flex items-center gap-3 sm:flex-col sm:items-center sm:text-center bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 sm:p-6 hover:border-[#0891b2]/30 hover:shadow-md hover:shadow-[#0891b2]/5 transition-all"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0891b2]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0891b2]/15 transition-all">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#0891b2]" />
            </div>
            <div className="sm:mt-3">
              <p className="text-[#64748b] text-xs mb-0.5 sm:mb-1">{t("cta.emailLabel")}</p>
              <p className="text-[#0c4a6e] text-sm sm:text-base">info@ptsli.com</p>
            </div>
          </a>

          <a
            href="tel:+628161199008"
            className="group flex items-center gap-3 sm:flex-col sm:items-center sm:text-center bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 sm:p-6 hover:border-[#0891b2]/30 hover:shadow-md hover:shadow-[#0891b2]/5 transition-all"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0891b2]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0891b2]/15 transition-all">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#0891b2]" />
            </div>
            <div className="sm:mt-3">
              <p className="text-[#64748b] text-xs mb-0.5 sm:mb-1">{t("cta.phoneLabel")}</p>
              <p className="text-[#0c4a6e] text-sm sm:text-base">+62-816-1199-008</p>
            </div>
          </a>

          <a
            href="https://ptsli.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 sm:flex-col sm:items-center sm:text-center bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 sm:p-6 hover:border-[#0891b2]/30 hover:shadow-md hover:shadow-[#0891b2]/5 transition-all"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0891b2]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0891b2]/15 transition-all">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#0891b2]" />
            </div>
            <div className="sm:mt-3">
              <p className="text-[#64748b] text-xs mb-0.5 sm:mb-1">{t("cta.websiteLabel")}</p>
              <p className="text-[#0c4a6e] text-sm sm:text-base">ptsli.com</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
    </BubbleBackground>
  );
}
