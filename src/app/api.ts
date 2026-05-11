const BASE = '/api'

export type User = { id: string; username: string; role: string }

export type ArticleInput = {
  title: string
  date: string
  category: 'news' | 'event' | 'education'
  thumbnail: string
  images: string[]
  excerpt: string
  content: string
  source: string
  tags: string[]
}

export type Article = ArticleInput & { id: string }

async function req(
  method: string,
  path: string,
  body?: unknown,
): Promise<unknown> {
  const opts: RequestInit = { method, credentials: 'same-origin' }
  if (body !== undefined) {
    opts.headers = { 'Content-Type': 'application/json' }
    opts.body = JSON.stringify(body)
  }
  const r = await fetch(`${BASE}${path}`, opts)
  const data = await r.json()
  if (!r.ok) throw new Error((data as { error: string }).error || 'Request failed')
  return data
}

export const api = {
  auth: {
    login: (username: string, password: string) =>
      req('POST', '/auth/login', { username, password }) as Promise<{ ok: boolean; user: User }>,
    logout: () => req('POST', '/auth/logout') as Promise<{ ok: boolean }>,
    me: () => req('GET', '/auth/me') as Promise<User>,
  },
  articles: {
    list: () => req('GET', '/articles') as Promise<Article[]>,
    create: (data: ArticleInput) => req('POST', '/articles', data) as Promise<Article>,
    update: (id: string, data: Partial<ArticleInput>) =>
      req('PUT', `/articles/${id}`, data) as Promise<Article>,
    delete: (id: string) => req('DELETE', `/articles/${id}`) as Promise<{ ok: boolean }>,
  },
}
