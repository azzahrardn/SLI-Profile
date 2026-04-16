import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { BubbleAnimation } from "./effects/BubbleAnimation";

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1626347597260-743e31eb5530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHNoaXAlMjBvY2VhbiUyMGFlcmlhbCUyMHZpZXd8ZW58MXx8fHwxNzczMDQyODA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Maritime background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c4a6e]/80 via-[#0369a1]/70 to-[#0c4a6e]/90" />
      </div>

      {/* Bubble Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <BubbleAnimation variant="hero" density="high" enabled={true} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl mx-auto pt-14 sm:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#7dd3fc] tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 text-xs sm:text-sm">
            {t("hero.subtitle")}
          </p>
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight">
            {t("hero.title1")}{" "}
            <span className="text-[#38bdf8]">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="text-[#bae6fd] text-base sm:text-lg md:text-xl mb-3 sm:mb-4">
            {t("hero.tagline")}
          </p>
          <p className="text-[#7dd3fc]/80 text-xs sm:text-sm mb-8 sm:mb-10">
            {t("hero.tagline2")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={() =>
              document
                .querySelector("#tentang")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center gap-2 bg-[#0891b2] hover:bg-[#0e7490] active:bg-[#155e75] text-white px-6 sm:px-8 py-3 rounded-full transition-colors text-sm sm:text-base"
          >
            {t("hero.cta")}
            <ChevronDown className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-white/50" />
      </motion.div>
    </section>
  );
}
