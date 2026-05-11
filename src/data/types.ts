export type ArticleCategory = "event" | "news" | "education";

export type Article = {
  id: string;
  title: string;
  date: string;
  category: ArticleCategory;
  thumbnail: string;
  images: string[];
  excerpt: string;
  content: string;
  source: string;
  tags: string[];
};
