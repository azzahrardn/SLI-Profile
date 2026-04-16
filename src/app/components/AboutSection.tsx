import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Quote } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { BubbleBackground } from "./effects/BubbleBackground";

export function AboutSection() {
  const { t } = useLanguage();
  return (
    <BubbleBackground variant="white" density="medium">
      <section id="tentang" className="py-14 sm:py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("about.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl mb-2">
            {t("about.heading")}
          </h2>
          <div className="w-20 h-1 bg-[#0891b2] mx-auto mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1596434220574-9af8bf9a0891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWluZXIlMjBzaGlwJTIwc2FpbGluZyUyMHNlYXxlbnwxfHx8fDE3NzMwNDI4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Maritime operations"
                className="w-full h-56 sm:h-72 md:h-80 object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 sm:space-y-6"
          >
            <p className="text-[#334155] leading-relaxed text-sm sm:text-base">
              {t("about.p1Before")}
              <span className="text-[#0c4a6e]">
                {t("about.p1Highlight")}
              </span>
              {t("about.p1After")}
            </p>
            <p className="text-[#334155] leading-relaxed text-sm sm:text-base">
              {t("about.p2Before")}
              <strong>people</strong> dan{" "}
              <strong>technology</strong>
              {t("about.p2After")}
            </p>
            <div className="bg-[#f0f9ff] border-l-4 border-[#0891b2] p-4 sm:p-6 rounded-r-xl">
              <Quote className="w-5 h-5 text-[#0891b2] mb-2" />
              <p className="text-[#0c4a6e] italic leading-relaxed text-sm sm:text-base">
                {t("about.quote")}
              </p>
            </div>
          </motion.div>
        </div>
        </div>
      </section>
    </BubbleBackground>
  );
}
