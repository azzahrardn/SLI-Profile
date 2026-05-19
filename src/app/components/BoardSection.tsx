import { motion } from "motion/react";
import { useLanguage } from "./LanguageContext";
import yudhiPhoto from "../../assets/Yudhi_IMG.png";
import dendiPhoto from "../../assets/Dendi_IMG.png";
import dimasPhoto from "../../assets/Dimas_IMG.png";
import rioPhoto from "../../assets/Rio_IMG.png";

interface BoardMember {
  name: string;
  title: string;
  bio: string;
  photo: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Yudhi Asmara Yasmine",
    title: "Chief Executive Officer",
    bio: "Leads the company's overall strategic direction, bringing extensive experience in enterprise leadership and digital transformation to drive technological innovation within the industry.",
    photo: yudhiPhoto,
  },
  {
    name: "Dendi Gumilang",
    title: "Chief Marketing Officer",
    bio: "Spearheads SLI's marketing strategies, brand positioning, and market expansion initiatives, leveraging a strong background in technology product commercialization and enterprise software.",
    photo: dendiPhoto,
  },
  {
    name: "Dimas Pamungkas",
    title: "Vice President Business Development and Sales",
    bio: "Drives SLI's commercial growth and strategic partnerships. Drawing on his maritime industry background and experience at Terafulk, he effectively aligns digital solutions with the specific needs of fleet owners.",
    photo: dimasPhoto,
  },
  {
    name: "Rio Wibisono",
    title: "Vice President Operations",
    bio: "Responsible for operational management and client service delivery. With a solid foundation in the maritime sector from his tenure at Terafulk, he ensures every SLI software deployment runs smoothly from onboarding to ongoing support.",
    photo: rioPhoto,
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function BoardCard({ member, index }: { member: BoardMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white border border-[#e2e8f0] rounded-2xl p-4 overflow-hidden hover:border-[#0891b2]/30 hover:shadow-xl hover:shadow-[#0891b2]/10 transition-all duration-300"
    >
      {/* Name + Title */}
      <div className="mb-4 relative z-10">
        <h3 className="font-semibold text-[#0c4a6e] text-[1.05rem] leading-snug">
          {member.name}
        </h3>
        <p className="text-sm text-[#64748b] mt-1">{member.title}</p>
      </div>

      {/* Photo area - DIPERBESAR TINGGINYA (h-[360px]) */}
      <div
        className="bg-[#f0f9ff] overflow-hidden h-[360px] relative"
        style={{ borderRadius: "0.75rem 0.75rem 0.75rem 3rem" }}
      >
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#0891b2]/40 font-bold text-5xl">
              {getInitials(member.name)}
            </span>
          </div>
        )}

        {/* Dummy div for framer-motion warning fix */}
        <motion.div
          className="hidden"
          initial={{ opacity: 0, y: 16 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />

        {/* Bio overlay via CSS group-hover */}
        <div
          className="absolute inset-0 bg-[#0c4a6e]/95 flex flex-col justify-end p-6 
            opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 
            transition-all duration-300 ease-out"
          style={{ borderRadius: "0.75rem 0.75rem 0.75rem 3rem" }}
        >
          <div className="w-6 h-0.5 bg-[#38bdf8] mb-4" />
          <p className="text-[#7dd3fc] text-[0.65rem] tracking-[0.15em] uppercase mb-3 font-semibold">
            {member.title}
          </p>
          {/* Tambahan overflow-y-auto berjaga-jaga jika teksnya sangat panjang */}
          <div className="overflow-y-auto scrollbar-hide pr-1">
            <p className="text-white/85 text-sm leading-relaxed">
              {member.bio}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BoardSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#f8fafc]">
      {/* Kontainer diperlebar menjadi max-w-7xl */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3 font-semibold">
            {t("board.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
            {t("board.heading")}
          </h2>
          <div className="w-20 h-1 bg-[#0891b2] mx-auto mb-6 rounded-full" />
          <p className="text-[#64748b] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {t("board.subheading")}
          </p>
        </motion.div>

        {/* 2×2 grid dengan gap diperbesar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {boardMembers.map((member, idx) => (
            <BoardCard key={idx} member={member} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
