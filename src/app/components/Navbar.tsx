import { useState, useEffect, useCallback } from "react";
import logo from "../../assets/logo.png";
import logoPutih from "../../assets/logo_putih.png";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./LanguageContext";

const navKeys = [
  { key: "nav.about", href: "#tentang" },
  { key: "nav.visionMission", href: "#visi-misi" },
  { key: "nav.affiliation", href: "#afiliasi" },
  { key: "nav.team", href: "#tim" },
  { key: "nav.technology", href: "#teknologi" },
  { key: "nav.products", href: "#products" },
  { key: "nav.whySLI", href: "#mengapa-sli" },
  { key: "nav.contact", href: "#kontak" },
];

export function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navKeys.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleClick = useCallback((href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            <div className="flex items-center gap-2">
              <img
                src={scrolled || mobileOpen ? logo : logoPutih}
                alt="SLI Logo"
                className="h-8 sm:h-10 md:h-14 w-auto"
              />
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-4">
              {navKeys.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <button
                    key={link.href}
                    onClick={() => handleClick(link.href)}
                    className={`text-sm px-3 py-2 rounded-full transition-all ${
                      scrolled
                        ? isActive
                          ? "text-[#0891b2] bg-[#e0f2fe]"
                          : "text-[#0c4a6e] hover:text-[#0891b2] hover:bg-[#f0f9ff]"
                        : isActive
                          ? "text-white bg-white/20"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {t(link.key)}
                  </button>
                );
              })}

              {/* Language Toggle */}
              <div className="ml-2 flex items-center gap-1.5">
                <span
                  className={`text-xs transition-colors ${
                    scrolled
                      ? lang === "en"
                        ? "text-[#0c4a6e]"
                        : "text-[#94a3b8]"
                      : lang === "en"
                        ? "text-white"
                        : "text-white/50"
                  }`}
                >
                  EN
                </span>
                <button
                  onClick={toggleLang}
                  className={`relative w-10 h-[22px] rounded-full transition-colors ${
                    scrolled
                      ? lang === "id"
                        ? "bg-[#0891b2]"
                        : "bg-[#cbd5e1]"
                      : lang === "id"
                        ? "bg-[#38bdf8]"
                        : "bg-white/30"
                  }`}
                  aria-label="Toggle language"
                >
                  <motion.div
                    className="absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm"
                    animate={{ left: lang === "en" ? 3 : 21 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
                <span
                  className={`text-xs transition-colors ${
                    scrolled
                      ? lang === "id"
                        ? "text-[#0c4a6e]"
                        : "text-[#94a3b8]"
                      : lang === "id"
                        ? "text-white"
                        : "text-white/50"
                  }`}
                >
                  ID
                </span>
              </div>
            </div>

            {/* Mobile: lang toggle + menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Compact mobile language toggle */}
              <button
                onClick={toggleLang}
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${
                  scrolled || mobileOpen
                    ? "bg-[#f0f9ff] text-[#0c4a6e]"
                    : "bg-white/15 text-white"
                }`}
              >
                <span className={lang === "en" ? "opacity-100" : "opacity-50"}>
                  EN
                </span>
                <span className="opacity-30">/</span>
                <span className={lang === "id" ? "opacity-100" : "opacity-50"}>
                  ID
                </span>
              </button>

              <button
                className="p-2 -mr-2 rounded-lg active:bg-black/5 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <X
                    className={`w-6 h-6 ${
                      scrolled || mobileOpen ? "text-[#0c4a6e]" : "text-white"
                    }`}
                  />
                ) : (
                  <Menu
                    className={`w-6 h-6 ${
                      scrolled ? "text-[#0c4a6e]" : "text-white"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-14 sm:top-16 left-0 right-0 z-50 lg:hidden bg-white shadow-2xl border-t border-[#e0f2fe] max-h-[calc(100vh-3.5rem)] overflow-y-auto"
            >
              <div className="px-4 py-3 flex flex-col">
                {navKeys.map((link, idx) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => handleClick(link.href)}
                      className={`text-left py-3.5 px-4 rounded-xl text-base transition-all active:scale-[0.98] ${
                        isActive
                          ? "text-[#0891b2] bg-[#f0f9ff]"
                          : "text-[#0c4a6e] hover:bg-[#f0f9ff]"
                      }`}
                    >
                      {t(link.key)}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
