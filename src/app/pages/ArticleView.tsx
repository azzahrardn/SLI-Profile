import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  CalendarDays,
  User,
  Tag,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import type { Article, ArticleCategory } from "../../data/types";
import { getArticles } from "../../data/articlesLoader";
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

export function ArticleView() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const articles = getArticles();
    const found = articles.find((a) => a.id === id);
    setArticle(found ?? null);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#64748b] text-lg mb-4">Artikel tidak ditemukan.</p>
          <Link
            to="/artikel"
            className="inline-flex items-center gap-2 text-[#0891b2] font-semibold hover:text-[#0c4a6e] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Artikel
          </Link>
        </div>
      </div>
    );
  }

  const style = CATEGORY_STYLES[article.category];
  const [mainImage, ...galleryImages] = article.images;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Header bar */}
      <div className="bg-gradient-to-r from-[#0891b2] to-[#0c4a6e] pt-24 pb-1 px-5 sm:px-6 lg:px-8" />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <Link
          to="/artikel"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0891b2] hover:text-[#0c4a6e] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Artikel
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${style.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {CATEGORY_LABEL[article.category]}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[#0c4a6e] text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-5">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-5 flex-wrap mb-8 pb-8 border-b border-[#e0f2fe]">
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
          <div className="mb-10">
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

          {/* Content */}
          <div
            className="prose prose-slate max-w-none mb-10
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
          <div className="flex items-center gap-2 flex-wrap pb-10">
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

          {/* Related nav */}
          <div className="bg-[#f0f9ff] rounded-xl p-6 border border-[#e0f2fe]">
            <Link
              to="/artikel"
              className="flex items-center gap-3 text-[#0891b2] font-semibold hover:text-[#0c4a6e] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Lihat semua artikel
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
