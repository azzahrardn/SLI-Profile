import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, ChevronDown, Tag, ArrowLeft } from "lucide-react";
import { Navbar } from "../components/Navbar";
import type { Article, ArticleCategory } from "../../data/types";
import { getArticles } from "../../data/articlesLoader";
import { formatArticleDate } from "../utils/dateFormatter";

type FilterType = "all" | ArticleCategory | "latest";

const FILTERS: { key: FilterType; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "event", label: "Event" },
  { key: "news", label: "News" },
  { key: "education", label: "Edukasi" },
  { key: "latest", label: "Terbaru" },
];

const CATEGORY_STYLES: Record<ArticleCategory, { badge: string; dot: string }> = {
  event: { badge: "bg-[#e0f2fe] text-[#0c4a6e]", dot: "bg-[#0891b2]" },
  news: { badge: "bg-[#f0fdf4] text-[#166534]", dot: "bg-[#22c55e]" },
  education: { badge: "bg-[#fefce8] text-[#854d0e]", dot: "bg-[#eab308]" },
};

const CATEGORY_LABEL: Record<ArticleCategory, string> = {
  event: "Event",
  news: "News",
  education: "Edukasi",
};

const INITIAL_VISIBLE = 9;

function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const style = CATEGORY_STYLES[article.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        to={`/artikel/${article.id}`}
        className="group cursor-pointer bg-white rounded-xl border-2 border-[#e0f2fe] hover:border-[#0891b2] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
      >
        <div className="relative overflow-hidden aspect-video">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${style.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {CATEGORY_LABEL[article.category]}
            </span>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5 gap-3">
          <h3 className="text-[#0c4a6e] font-semibold text-base leading-snug line-clamp-2 group-hover:text-[#0891b2] transition-colors duration-200">
            {article.title}
          </h3>
          <p className="text-[#64748b] text-sm leading-relaxed line-clamp-2 flex-1">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-[#e0f2fe]">
            <div className="flex items-center gap-1.5 text-xs text-[#64748b]">
              <CalendarDays className="w-3.5 h-3.5 text-[#0891b2]" />
              <span>{formatArticleDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#0891b2] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>Baca selengkapnya</span>
              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setArticles(getArticles());
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "latest") {
      return [...articles].sort((a, b) => {
        const months: Record<string, number> = {
          Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
          Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11,
        };
        const parse = (d: string) => {
          const [day, month, year] = d.split(" ");
          return new Date(Number(year), months[month] ?? 0, Number(day));
        };
        return parse(b.date).getTime() - parse(a.date).getTime();
      });
    }
    if (activeFilter === "all") return articles;
    return articles.filter((a) => a.category === activeFilter);
  }, [activeFilter, articles]);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = !showAll && filtered.length > INITIAL_VISIBLE;

  const handleFilter = (key: FilterType) => {
    setActiveFilter(key);
    setShowAll(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Page Header */}
      <div className="bg-gradient-to-br from-[#0891b2] to-[#0c4a6e] pt-28 pb-16 px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <p className="text-white/70 tracking-[0.2em] uppercase text-xs sm:text-sm mb-3">
            SLI Newsroom
          </p>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            Artikel & Berita
          </h1>
          <p className="text-white/70 max-w-2xl text-sm sm:text-base">
            Ikuti perkembangan terbaru seputar teknologi maritim, kegiatan perusahaan, dan wawasan industri pelayaran.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center flex-wrap gap-2 mb-10 sm:mb-12"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${
                activeFilter === f.key
                  ? "bg-gradient-to-r from-[#0891b2] to-[#0c4a6e] text-white border-transparent shadow-md"
                  : "bg-white text-[#64748b] border-[#e0f2fe] hover:border-[#0891b2] hover:text-[#0891b2]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((article, idx) => (
                <ArticleCard key={article.id} article={article} index={idx} />
              ))}
            </AnimatePresence>
          </div>

          {/* Blur overlay */}
          {hasMore && (
            <div
              className="absolute bottom-0 left-0 right-0 h-64 flex flex-col items-center justify-end pb-6"
              style={{
                background: "linear-gradient(to bottom, transparent 0%, white 55%)",
              }}
            >
              <button
                onClick={() => setShowAll(true)}
                className="flex items-center gap-2 px-7 py-3 rounded-full bg-white border-2 border-[#0891b2] text-[#0891b2] font-semibold text-sm shadow-md hover:bg-[#f0f9ff] transition-all duration-200"
              >
                <Tag className="w-4 h-4" />
                Muat lebih banyak
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#64748b] text-base">
              Belum ada artikel untuk kategori ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
