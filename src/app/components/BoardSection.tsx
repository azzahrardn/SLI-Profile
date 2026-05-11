import { motion } from "motion/react";
import { useLanguage } from "./LanguageContext";

interface BoardMember {
  name: string;
  title: string;
  bio: string;
  photo: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Nama Direktur 1",
    title: "President Director",
    bio: "Short bio placeholder.",
    photo: "",
  },
  {
    name: "Nama Direktur 2",
    title: "Director of Technology",
    bio: "Short bio placeholder.",
    photo: "",
  },
  {
    name: "Nama Direktur 3",
    title: "Director of Operations",
    bio: "Short bio placeholder.",
    photo: "",
  },
  {
    name: "Nama Direktur 4",
    title: "Director of Business Development",
    bio: "Short bio placeholder.",
    photo: "",
  },
  {
    name: "Nama Direktur 5",
    title: "Director of Finance",
    bio: "Short bio placeholder.",
    photo: "",
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
      className="bg-white border border-[#e2e8f0] rounded-2xl p-4 overflow-hidden hover:shadow-md hover:shadow-[#0891b2]/5 hover:border-[#0891b2]/30 transition-all duration-300"
    >
      {/* Name + Title */}
      <div className="mb-3">
        <h3 className="font-semibold text-[#0c4a6e] text-base leading-snug">
          {member.name}
        </h3>
        <p className="text-sm text-[#64748b] mt-0.5">{member.title}</p>
      </div>

      {/* Photo area */}
      <div
        className="bg-[#f0f9ff] overflow-hidden h-56"
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
            <span className="text-[#0891b2]/40 font-bold text-3xl">
              {getInitials(member.name)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function BoardSection() {
  const { t } = useLanguage();

  const topRow = boardMembers.slice(0, 3);
  const bottomRow = boardMembers.slice(3);

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header — consistent with ProblemSection & SolutionSection */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <p className="text-[#0891b2] tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            {t("board.label")}
          </p>
          <h2 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {t("board.heading")}
          </h2>
          <div className="w-16 h-0.5 bg-[#0891b2] mx-auto mb-6" />
          <p className="text-[#64748b] max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t("board.subheading")}
          </p>
        </motion.div>

        {/* Row 1 — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {topRow.map((member, idx) => (
            <BoardCard key={idx} member={member} index={idx} />
          ))}
        </div>

        {/* Row 2 — 2 cards, centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:w-2/3 lg:mx-auto">
          {bottomRow.map((member, idx) => (
            <BoardCard key={idx + 3} member={member} index={idx + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
