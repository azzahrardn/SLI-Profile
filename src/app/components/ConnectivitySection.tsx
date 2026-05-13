import { motion } from "motion/react";
import { useLanguage } from "./LanguageContext";

const connectivityItems = [
  {
    labelKey: "tech.conn.c1Label",
    titleKey: "tech.conn.c1Title",
    descKey: "tech.conn.c1Desc",
    badgeKey: "tech.conn.c1Badge",
    dark: true,
  },
  {
    labelKey: "tech.conn.c2Label",
    titleKey: "tech.conn.c2Title",
    descKey: "tech.conn.c2Desc",
    badgeKey: "tech.conn.c2Badge",
    dark: false,
  },
  {
    labelKey: "tech.conn.c3Label",
    titleKey: "tech.conn.c3Title",
    descKey: "tech.conn.c3Desc",
    badgeKey: "tech.conn.c3Badge",
    dark: false,
  },
  {
    labelKey: "tech.conn.c4Label",
    titleKey: "tech.conn.c4Title",
    descKey: "tech.conn.c4Desc",
    badgeKey: "tech.conn.c4Badge",
    dark: false,
  },
];

export function TechConnectivitySection() {
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
            {t("tech.conn.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("tech.conn.heading")}
          </h2>
          <div className="w-16 h-0.5 bg-[#0891b2] mx-auto mb-6" />
          <p className="text-[#64748b] text-base sm:text-lg leading-relaxed">
            {t("tech.conn.subheading")}
          </p>
        </motion.div>

        {/* Grid — 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {connectivityItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`group rounded-2xl p-8 sm:p-10 border transition-all duration-300 ${
                item.dark
                  ? "bg-[#0c4a6e] border-transparent"
                  : "bg-[#f8fafc] border-[#e2e8f0] hover:border-[#0891b2]/30 hover:shadow-md hover:shadow-[#0891b2]/5"
              }`}
            >
              {/* Label + badge row */}
              <div className="flex items-center justify-between mb-6">
                <p
                  className={`text-xs tracking-[0.25em] uppercase font-semibold ${
                    item.dark ? "text-[#7dd3fc]" : "text-[#0891b2]"
                  }`}
                >
                  {t(item.labelKey)}
                </p>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.dark
                      ? "bg-white/10 text-white/70"
                      : "bg-[#e0f2fe] text-[#0891b2]"
                  }`}
                >
                  {t(item.badgeKey)}
                </span>
              </div>

              {/* Accent line */}
              <div
                className={`w-8 h-0.5 mb-5 ${
                  item.dark
                    ? "bg-[#38bdf8]"
                    : "bg-[#e2e8f0] group-hover:bg-[#0891b2] transition-colors duration-300"
                }`}
              />

              <h3
                className={`font-bold text-lg sm:text-xl mb-3 leading-snug ${
                  item.dark ? "text-white" : "text-[#0c4a6e]"
                }`}
              >
                {t(item.titleKey)}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  item.dark ? "text-white/60" : "text-[#64748b]"
                }`}
              >
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note — included in subscription */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 flex items-center gap-3 bg-[#f0f9ff] border border-[#bae6fd]/50 rounded-2xl px-6 py-4"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] flex-shrink-0" />
          <p className="text-[#0c4a6e] text-sm">
            <span className="font-semibold">{t("tech.conn.note1")}</span>{" "}
            {t("tech.conn.note2")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
