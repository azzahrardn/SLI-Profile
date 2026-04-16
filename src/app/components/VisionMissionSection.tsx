import { motion } from "motion/react";
import { Eye, Target, Zap, Database, BarChart3, Users } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { BubbleBackground } from "./effects/BubbleBackground";

const missionKeys = [
  { icon: Users, key: "vm.mission1" },
  { icon: Database, key: "vm.mission2" },
  { icon: BarChart3, key: "vm.mission3" },
  { icon: Zap, key: "vm.mission4" },
];

export function VisionMissionSection() {
  const { t } = useLanguage();
  return (
    <BubbleBackground variant="light-blue" density="medium">
      <section id="visi-misi" className="py-14 sm:py-20 md:py-28 bg-[#f0f9ff] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("vm.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl mb-2">
            {t("vm.heading")}
          </h2>
          <div className="w-20 h-1 bg-[#0891b2] mx-auto mt-4" />
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16"
        >
          <div className="bg-gradient-to-r from-[#0c4a6e] to-[#0369a1] rounded-2xl p-6 sm:p-8 md:p-12 text-center shadow-xl">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 mb-4 sm:mb-6">
              <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-[#7dd3fc]" />
            </div>
            <h3 className="text-white text-xl sm:text-2xl mb-3 sm:mb-4">{t("vm.visionTitle")}</h3>
            <p className="text-[#bae6fd] max-w-3xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg">
              {t("vm.visionText")}
            </p>
          </div>
        </motion.div>

        {/* Mission */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-[#0891b2]" />
            <h3 className="text-[#0c4a6e] text-xl sm:text-2xl">{t("vm.missionTitle")}</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {missionKeys.map((mission, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-shadow border border-[#e0f2fe]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#e0f2fe] flex items-center justify-center">
                    <mission.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0891b2]" />
                  </div>
                  <p className="text-[#334155] leading-relaxed text-sm sm:text-base">
                    {t(mission.key)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </BubbleBackground>
  );
}
