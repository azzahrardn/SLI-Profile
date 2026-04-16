import { useState } from "react";
import logo from "../../assets/logo.png";
import { Phone, Mail, Globe, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const linkKeys = [
  { key: "nav.about", id: "tentang" },
  { key: "nav.visionMission", id: "visi-misi" },
  { key: "nav.affiliation", id: "afiliasi" },
  { key: "nav.team", id: "tim" },
  { key: "nav.technology", id: "teknologi" },
  { key: "nav.products", id: "products" },
  { key: "nav.whySLI", id: "mengapa-sli" },
];

function FooterAccordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[#38bdf8] font-semibold text-sm">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#38bdf8]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#38bdf8]" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gradient-to-br from-[#0c4a6e] via-[#075985] to-[#0c4a6e] text-white">
      {/* Mobile Layout */}
      <div className="sm:hidden">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#0891b2]/20 to-[#0c4a6e]/40 backdrop-blur-sm px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={logo}
              alt="SLI Logo"
              className="h-9 w-auto brightness-200"
            />
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">PT Solusi Layar International</p>
            </div>
          </div>
          <p className="text-[#bae6fc] text-xs leading-relaxed">
            {t("footer.tagline")}
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="px-5 py-2">
          <FooterAccordion title={t("footer.quickLinks")} defaultOpen={true}>
            <ul className="space-y-3 text-sm">
              {linkKeys.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      document
                        .querySelector(`#${link.id}`)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 text-[#bae6fc] hover:text-white transition-colors py-1"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                    {t(link.key)}
                  </button>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          <FooterAccordion title={t("footer.location")}>
            <div className="space-y-3 text-sm">
              {/* Surabaya */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4.5 h-4.5 text-[#38bdf8]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white mb-1 text-xs">{t("footer.locationSurabaya")}</p>
                  <p className="text-[#bae6fc] text-xs leading-snug">{t("footer.addressSurabaya1")}</p>
                  <p className="text-[#bae6fc] text-xs leading-snug mt-0.5">{t("footer.addressSurabaya2")}</p>
                </div>
              </div>

              {/* Jakarta */}
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                <div className="w-9 h-9 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4.5 h-4.5 text-[#38bdf8]" />
                </div>
                <div>
                  <p className="font-medium text-white text-xs">{t("footer.locationJakarta")}</p>
                </div>
              </div>

              {/* Singapore */}
              <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                <div className="w-9 h-9 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4.5 h-4.5 text-[#38bdf8]" />
                </div>
                <div>
                  <p className="font-medium text-white text-xs">{t("footer.locationSingapore")}</p>
                </div>
              </div>
            </div>
          </FooterAccordion>

          <FooterAccordion title={t("footer.contact")}>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:info@ptsli.com"
                className="flex items-center gap-3 text-[#bae6fc] hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <div className="w-9 h-9 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4.5 h-4.5 text-[#38bdf8]" />
                </div>
                <div>
                  <p className="text-xs text-[#7dd3fc]/60">Email</p>
                  <p className="font-medium text-xs">info@ptsli.com</p>
                </div>
              </a>

              <a
                href="tel:+628161199008"
                className="flex items-center gap-3 text-[#bae6fc] hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <div className="w-9 h-9 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4.5 h-4.5 text-[#38bdf8]" />
                </div>
                <div>
                  <p className="text-xs text-[#7dd3fc]/60">Phone</p>
                  <p className="font-medium text-xs">+62-816-1199-008</p>
                </div>
              </a>

              <a
                href="https://ptsli.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#bae6fc] hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                <div className="w-9 h-9 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4.5 h-4.5 text-[#38bdf8]" />
                </div>
                <div>
                  <p className="text-xs text-[#7dd3fc]/60">Website</p>
                  <p className="font-medium text-xs">ptsli.com</p>
                </div>
              </a>
            </div>
          </FooterAccordion>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-2 px-5 py-4 text-center">
          <p className="text-xs text-[#7dd3fc]/60">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden sm:block py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-start">
            {/* Logo & Name */}
            <div className="sm:col-span-2 lg:col-span-1">
              <img
                src={logo}
                alt="SLI Logo"
                className="h-9 sm:h-10 w-auto mb-2.5 brightness-200"
              />
              <p className="text-[#bae6fc] text-xs leading-relaxed">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[#38bdf8] mb-2 text-xs font-semibold uppercase tracking-wide">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-1 text-xs text-[#bae6fc]">
                {linkKeys.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => {
                        document
                          .querySelector(`#${link.id}`)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="hover:text-white transition-colors py-0.5 text-left"
                    >
                      {t(link.key)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-[#38bdf8] mb-2 text-xs font-semibold uppercase tracking-wide">
                {t("footer.location")}
              </h4>
              <div className="space-y-1.5 text-xs text-[#bae6fc]">
                {/* Surabaya */}
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3 h-3 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">{t("footer.locationSurabaya")}</p>
                    <p className="leading-snug mt-0.5 opacity-90">{t("footer.addressSurabaya1")}</p>
                    <p className="leading-snug opacity-90">{t("footer.addressSurabaya2")}</p>
                  </div>
                </div>

                {/* Jakarta */}
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#38bdf8] flex-shrink-0" />
                  <p className="hover:text-white transition-colors">{t("footer.locationJakarta")}</p>
                </div>

                {/* Singapore */}
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#38bdf8] flex-shrink-0" />
                  <p className="hover:text-white transition-colors">{t("footer.locationSingapore")}</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#38bdf8] mb-2 text-xs font-semibold uppercase tracking-wide">
                {t("footer.contact")}
              </h4>
              <div className="space-y-1.5 text-xs text-[#bae6fc]">
                <a
                  href="mailto:info@ptsli.com"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail className="w-3 h-3 text-[#38bdf8] flex-shrink-0" />
                  <span>info@ptsli.com</span>
                </a>
                <a
                  href="tel:+628161199008"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Phone className="w-3 h-3 text-[#38bdf8] flex-shrink-0" />
                  <span>+62-816-1199-008</span>
                </a>
                <a
                  href="https://ptsli.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Globe className="w-3 h-3 text-[#38bdf8] flex-shrink-0" />
                  <span>ptsli.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-5 sm:mt-6 pt-3 sm:pt-4 text-center text-xs text-[#7dd3fc]/60">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
}
