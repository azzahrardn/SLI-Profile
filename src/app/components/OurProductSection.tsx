import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Monitor,
  Activity,
  Database,
  Search,
  Bell,
  Ship,
  Compass,
  Map,
  Book,
  Navigation,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

const fleetMasterFeatures = [
  {
    icon: Ship,
    titleKey: "products.fleetMaster.feature1Title",
    descKey: "products.fleetMaster.feature1Desc",
    image: "/src/assets/img_fleet_supervision.png",
  },
  {
    icon: Compass,
    titleKey: "products.fleetMaster.feature2Title",
    descKey: "products.fleetMaster.feature2Desc",
    image: "/src/assets/img_vpo.png",
  },
  {
    icon: Map,
    titleKey: "products.fleetMaster.feature3Title",
    descKey: "products.fleetMaster.feature3Desc",
    image: "/src/assets/img_vyg_supervision.png",
  },
  {
    icon: Book,
    titleKey: "products.fleetMaster.feature4Title",
    descKey: "products.fleetMaster.feature4Desc",
    image: "https://placehold.co/600x400/0891b2/white?text=e-Logbook",
  },
  {
    icon: Navigation,
    titleKey: "products.fleetMaster.feature6Title",
    descKey: "products.fleetMaster.feature6Desc",
    image: "https://placehold.co/600x400/0891b2/white?text=Navigation",
  },
];

const nauticamAIFeatures = [
  {
    icon: Camera,
    titleKey: "products.nauticamAI.feature1Title",
    descKey: "products.nauticamAI.feature1Desc",
    image: "https://placehold.co/600x400/0c4a6e/white?text=Camera+AI",
  },
  {
    icon: Monitor,
    titleKey: "products.nauticamAI.feature2Title",
    descKey: "products.nauticamAI.feature2Desc",
    image: "https://placehold.co/600x400/0c4a6e/white?text=Monitor",
  },
  {
    icon: Activity,
    titleKey: "products.nauticamAI.feature3Title",
    descKey: "products.nauticamAI.feature3Desc",
    image: "https://placehold.co/600x400/0c4a6e/white?text=Activity",
  },
  {
    icon: Database,
    titleKey: "products.nauticamAI.feature4Title",
    descKey: "products.nauticamAI.feature4Desc",
    image: "https://placehold.co/600x400/0c4a6e/white?text=Database",
  },
  {
    icon: Search,
    titleKey: "products.nauticamAI.feature5Title",
    descKey: "products.nauticamAI.feature5Desc",
    image: "https://placehold.co/600x400/0c4a6e/white?text=Search+AI",
  },
  {
    icon: Bell,
    titleKey: "products.nauticamAI.feature6Title",
    descKey: "products.nauticamAI.feature6Desc",
    image: "https://placehold.co/600x400/0c4a6e/white?text=Alert+System",
  },
];

type Feature = {
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
  image: string;
};

function ProductFeatureScroll({ features }: { features: Feature[] }) {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIdx(idx);
            }
          });
        },
        {
          root: containerRef.current,
          rootMargin: "-40% 0px -40% 0px", // hanya trigger saat item di tengah container
          threshold: 0,
        },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [features]);

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
      {/* Kiri — scrollable list */}
      <div
        ref={containerRef}
        className="flex flex-col gap-4 md:max-h-[560px] md:overflow-y-auto md:pr-1 scroll-smooth overflow-x-hidden
  [&::-webkit-scrollbar]:hidden
  [-ms-overflow-style:none]
  [scrollbar-width:none]"
      >
        {features.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            onClick={() => {
              setActiveIdx(idx);
              itemRefs.current[idx]?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
              });
            }}
            className={`group cursor-pointer rounded-xl p-5 border-2 transition-all duration-300 ${
              activeIdx === idx
                ? "border-[#0891b2] bg-white shadow-lg"
                : "border-[#e0f2fe] bg-white/60 hover:border-[#0891b2]/40 hover:bg-white"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                  activeIdx === idx
                    ? "bg-gradient-to-br from-[#0891b2] to-[#0c4a6e] scale-110"
                    : "bg-[#e0f2fe] group-hover:bg-gradient-to-br group-hover:from-[#0891b2] group-hover:to-[#0c4a6e]"
                }`}
              >
                <item.icon
                  className={`w-6 h-6 transition-colors duration-300 ${
                    activeIdx === idx
                      ? "text-white"
                      : "text-[#0891b2] group-hover:text-white"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`font-semibold text-base sm:text-lg mb-1 transition-colors duration-300 ${
                    activeIdx === idx ? "text-[#0891b2]" : "text-[#0c4a6e]"
                  }`}
                >
                  {t(item.titleKey)}
                </h4>
                <p className="text-[#64748b] leading-relaxed text-sm">
                  {t(item.descKey)}
                </p>
              </div>
            </div>

            {/* Gambar mobile — muncul di bawah teks saat aktif */}
            <AnimatePresence>
              {activeIdx === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden mt-4 overflow-hidden rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={t(item.titleKey)}
                    className="w-full rounded-lg object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Kanan — gambar sticky (desktop only) */}
      <div className="hidden md:block md:sticky md:top-28 md:scale-125 md:origin-top-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#e0f2fe]"
          >
            <img
              src={features[activeIdx].image}
              alt={t(features[activeIdx].titleKey)}
              className="w-full object-contain aspect-video"
            />
            <div className="bg-white px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0891b2] to-[#0c4a6e] flex items-center justify-center flex-shrink-0">
                {(() => {
                  const Icon = features[activeIdx].icon;
                  return <Icon className="w-5 h-5 text-white" />;
                })()}
              </div>
              <p className="text-[#0c4a6e] font-semibold text-sm">
                {t(features[activeIdx].titleKey)}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function OurProductSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"fleetMaster" | "nauticamAI">(
    "fleetMaster",
  );

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
            {(["fleetMaster", "nauticamAI"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "text-white"
                    : "text-[#64748b] hover:text-[#0891b2] hover:bg-[#f0f9ff]"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#0891b2] to-[#0c4a6e] rounded-lg shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {t(
                    tab === "fleetMaster"
                      ? "products.tabFleetMaster"
                      : "products.tabNauticamAI",
                  )}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "fleetMaster" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === "fleetMaster" ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductFeatureScroll
              features={
                activeTab === "fleetMaster"
                  ? fleetMasterFeatures
                  : nauticamAIFeatures
              }
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
