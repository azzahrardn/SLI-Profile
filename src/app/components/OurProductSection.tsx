import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera, Monitor, Activity, Database, Search, Bell,
  Ship, Compass, Map, Book, Cloud, Navigation
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

const fleetMasterFeatures = [
  { icon: Ship, titleKey: "products.fleetMaster.feature1Title", descKey: "products.fleetMaster.feature1Desc" },
  { icon: Compass, titleKey: "products.fleetMaster.feature2Title", descKey: "products.fleetMaster.feature2Desc" },
  { icon: Map, titleKey: "products.fleetMaster.feature3Title", descKey: "products.fleetMaster.feature3Desc" },
  { icon: Book, titleKey: "products.fleetMaster.feature4Title", descKey: "products.fleetMaster.feature4Desc" },
  { icon: Cloud, titleKey: "products.fleetMaster.feature5Title", descKey: "products.fleetMaster.feature5Desc" },
  { icon: Navigation, titleKey: "products.fleetMaster.feature6Title", descKey: "products.fleetMaster.feature6Desc" },
];

const nauticamAIFeatures = [
  { icon: Camera, titleKey: "products.nauticamAI.feature1Title", descKey: "products.nauticamAI.feature1Desc" },
  { icon: Monitor, titleKey: "products.nauticamAI.feature2Title", descKey: "products.nauticamAI.feature2Desc" },
  { icon: Activity, titleKey: "products.nauticamAI.feature3Title", descKey: "products.nauticamAI.feature3Desc" },
  { icon: Database, titleKey: "products.nauticamAI.feature4Title", descKey: "products.nauticamAI.feature4Desc" },
  { icon: Search, titleKey: "products.nauticamAI.feature5Title", descKey: "products.nauticamAI.feature5Desc" },
  { icon: Bell, titleKey: "products.nauticamAI.feature6Title", descKey: "products.nauticamAI.feature6Desc" },
];

export function OurProductSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"fleetMaster" | "nauticamAI">("fleetMaster");

  return (
    <section id="products" className="py-14 sm:py-20 md:py-28 bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("products.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl mb-3 px-2">
            {t("products.heading")}
          </h2>
          <p className="text-[#64748b] max-w-3xl mx-auto text-sm sm:text-base">
            {t("products.subheading")}
          </p>
          <div className="w-20 h-1 bg-[#0891b2] mx-auto mt-4" />
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-10 sm:mb-12"
        >
          <div className="inline-flex bg-white rounded-xl p-1.5 shadow-md border border-[#e0f2fe]">
            <button
              onClick={() => setActiveTab("fleetMaster")}
              className={`relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeTab === "fleetMaster"
                  ? "text-white"
                  : "text-[#64748b] hover:text-[#0891b2] hover:bg-[#f0f9ff]"
              }`}
            >
              {activeTab === "fleetMaster" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-[#0891b2] to-[#0c4a6e] rounded-lg shadow-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{t("products.tabFleetMaster")}</span>
            </button>
            <button
              onClick={() => setActiveTab("nauticamAI")}
              className={`relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeTab === "nauticamAI"
                  ? "text-white"
                  : "text-[#64748b] hover:text-[#0891b2] hover:bg-[#f0f9ff]"
              }`}
            >
              {activeTab === "nauticamAI" && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-gradient-to-r from-[#0891b2] to-[#0c4a6e] rounded-lg shadow-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{t("products.tabNauticamAI")}</span>
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "fleetMaster" ? (
            <motion.div
              key="fleetMaster"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {fleetMasterFeatures.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`group relative bg-white rounded-xl p-5 sm:p-6 border-2 border-[#e0f2fe] hover:border-[#0891b2] transition-all hover:shadow-lg ${
                      idx % 2 === 0 ? "md:mr-4" : "md:ml-4"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#0c4a6e] flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#0c4a6e] font-semibold text-base sm:text-lg mb-2">
                          {t(item.titleKey)}
                        </h4>
                        <p className="text-[#64748b] leading-relaxed text-sm">
                          {t(item.descKey)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="nauticamAI"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {nauticamAIFeatures.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`group relative bg-white rounded-xl p-5 sm:p-6 border-2 border-[#e0f2fe] hover:border-[#0891b2] transition-all hover:shadow-lg ${
                      idx % 2 === 0 ? "md:mr-4" : "md:ml-4"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#0891b2] to-[#0c4a6e] flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#0c4a6e] font-semibold text-base sm:text-lg mb-2">
                          {t(item.titleKey)}
                        </h4>
                        <p className="text-[#64748b] leading-relaxed text-sm">
                          {t(item.descKey)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
