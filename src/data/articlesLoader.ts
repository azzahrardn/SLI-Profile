import type { Article } from "./types";

const modules = import.meta.glob<{ default: Article }>(
  "../../database/articles/*.json",
  { eager: true },
);

type ArticleModule = { default: Article };

export function getArticles(): Article[] {
  const articles = (Object.values(modules) as ArticleModule[]).map(
    (m) => m.default,
  );
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getArticleById(id: string): Article | undefined {
  return getArticles().find((a) => a.id === id);
}
