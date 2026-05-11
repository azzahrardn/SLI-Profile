import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CalendarDays, User, Tag, ChevronRight, X } from "lucide-react";
import type { Article, ArticleCategory } from "../../data/types";
import { formatArticleDate } from "../utils/dateFormatter";

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

type Props = {
  article: Article | null;
  onClose: () => void;
};

export function ArticleDetail({ article, onClose }: Props) {
  // Lock body scroll when open
  useEffect(() => {
    if (article) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {article && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Slide-in panel */}
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-white shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-[#0891b2] to-[#0c4a6e] flex-shrink-0" />

            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0f2fe] flex-shrink-0">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm font-semibold text-[#0891b2] hover:text-[#0c4a6e] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Artikel
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#64748b] hover:bg-[#f0f9ff] hover:text-[#0c4a6e] transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-8">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-xs text-[#64748b] mb-6 flex-wrap">
                  <span>Beranda</span>
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  <span>Artikel</span>
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  <span className="text-[#0c4a6e] font-medium truncate max-w-[200px]">
                    {article.title.length > 40
                      ? article.title.slice(0, 40) + "…"
                      : article.title}
                  </span>
                </nav>

                {/* Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${CATEGORY_STYLES[article.category].badge}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${CATEGORY_STYLES[article.category].dot}`} />
                    {CATEGORY_LABEL[article.category]}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-[#0c4a6e] text-2xl sm:text-3xl font-semibold leading-snug mb-5">
                  {article.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-5 flex-wrap mb-8">
                  <div className="flex items-center gap-1.5 text-sm text-[#64748b]">
                    <CalendarDays className="w-4 h-4 text-[#0891b2]" />
                    <span>{formatArticleDate(article.date)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-[#64748b]">
                    <User className="w-4 h-4 text-[#0891b2]" />
                    <span>{article.source}</span>
                  </div>
                </div>

                {/* Image Gallery */}
                {(() => {
                  const [mainImage, ...galleryImages] = article.images;
                  return (
                    <div className="mb-8">
                      <div className="rounded-2xl overflow-hidden border-2 border-[#e0f2fe] mb-3 aspect-video">
                        <img
                          src={mainImage}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {galleryImages.length > 0 && (
                        <div
                          className={`grid gap-3 ${
                            galleryImages.length === 1
                              ? "grid-cols-1"
                              : galleryImages.length === 2
                                ? "grid-cols-2"
                                : "grid-cols-3"
                          }`}
                        >
                          {galleryImages.map((img, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl overflow-hidden border-2 border-[#e0f2fe] aspect-video"
                            >
                              <img
                                src={img}
                                alt={`${article.title} — gambar ${idx + 2}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Content */}
                <div
                  className="prose prose-slate max-w-none mb-8
                    prose-p:text-[#475569] prose-p:leading-relaxed prose-p:text-base
                    prose-h2:text-[#0c4a6e] prose-h3:text-[#0c4a6e]
                    prose-strong:text-[#0c4a6e]"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Divider */}
                <div className="w-full h-px bg-[#e0f2fe] mb-6" />

                {/* Source */}
                <div className="flex items-start gap-2 mb-5 text-sm text-[#64748b]">
                  <span className="font-semibold text-[#0c4a6e] flex-shrink-0">Sumber:</span>
                  <span>{article.source}</span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap pb-4">
                  <Tag className="w-4 h-4 text-[#0891b2] flex-shrink-0" />
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-[#f0f9ff] text-[#0891b2] border border-[#e0f2fe] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}