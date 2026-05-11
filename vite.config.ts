import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import http from 'http'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// ── Vite Dev Middleware: REST API untuk admin CRUD ──
function adminApiPlugin() {
  const ROOT = path.resolve(__dirname)
  const DB = path.join(ROOT, 'database')

  function readBody(req: http.IncomingMessage): Promise<string> {
    return new Promise((resolve) => {
      let body = ''
      req.on('data', (chunk: Buffer) => { body += chunk.toString() })
      req.on('end', () => resolve(body))
    })
  }

  function slugify(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  function send(res: http.ServerResponse, data: unknown, status = 200) {
    res.writeHead(status, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(data))
  }

  return {
    name: 'admin-api',
    configureServer(server: { middlewares: { use: (fn: (req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => void) => void } }) {
      server.middlewares.use(async (req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => {
        const pathname = new URL(req.url ?? '/', 'http://localhost').pathname

        if (!pathname.startsWith('/api/')) return next()

        const SESSION_KEY = 'sli_admin_session'
        const SESSION_VAL = 'authenticated'
        const hasSession = req.headers.cookie?.includes(`${SESSION_KEY}=${SESSION_VAL}`) ?? false

        const json = (data: unknown, status = 200) => send(res, data, status)
        const err = (msg: string, status = 400) => send(res, { error: msg }, status)
        const method = req.method ?? 'GET'

        // ── Auth ──
        if (method === 'POST' && pathname === '/api/auth/login') {
          try {
            const body = await readBody(req)
            if (!body.trim()) return err('Body kosong', 400)
            let parsed: { username?: string; password?: string }
            try { parsed = JSON.parse(body) } catch { return err('JSON invalid', 400) }
            const { username, password } = parsed
            const user = JSON.parse(fs.readFileSync(path.join(DB, 'user', 'admin.json'), 'utf-8'))
            if (user.username === username && user.password === password) {
              res.setHeader('Set-Cookie', `${SESSION_KEY}=${SESSION_VAL}; Path=/; HttpOnly`)
              return json({ ok: true, user: { id: user.id, username: user.username, role: user.role } })
            }
            return err('Username atau password salah', 401)
          } catch (e) {
            return err('Login gagal: ' + String(e), 500)
          }
        }

        if (method === 'POST' && pathname === '/api/auth/logout') {
          res.setHeader('Set-Cookie', `${SESSION_KEY}=; Path=/; HttpOnly; Max-Age=0`)
          return json({ ok: true })
        }

        if (method === 'GET' && pathname === '/api/auth/me') {
          if (!hasSession) return err('Unauthorized', 401)
          const user = JSON.parse(fs.readFileSync(path.join(DB, 'user', 'admin.json'), 'utf-8'))
          return json({ id: user.id, username: user.username, role: user.role })
        }

        // ── Articles CRUD (requires auth) ──
        if (!hasSession) return err('Unauthorized', 401)

        // GET /api/articles
        if (method === 'GET' && pathname === '/api/articles') {
          const files = fs.readdirSync(path.join(DB, 'articles'))
          const articles = files
            .filter((f) => f.endsWith('.json'))
            .map((f) => JSON.parse(fs.readFileSync(path.join(DB, 'articles', f), 'utf-8')))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          return json(articles)
        }

        // POST /api/articles
        if (method === 'POST' && pathname === '/api/articles') {
          try {
            const body = await readBody(req)
            const data = JSON.parse(body)
            if (!data.title || !data.category || !data.date) return err('title, category, date wajib diisi')
            const id = slugify(data.title) + '-' + Date.now()
            const article = {
              id,
              title: data.title,
              date: data.date,
              category: data.category,
              thumbnail: data.thumbnail || 'https://placehold.co/600x400/0891b2/white?text=Article',
              images: data.images || [],
              excerpt: data.excerpt || '',
              content: data.content || '',
              source: data.source || 'Admin',
              tags: data.tags || [],
            }
            fs.writeFileSync(path.join(DB, 'articles', `${id}.json`), JSON.stringify(article, null, 2))
            return json(article, 201)
          } catch (e) {
            return err('Gagal membuat article: ' + String(e), 500)
          }
        }

        // PUT /api/articles/:id
        if (method === 'PUT' && pathname.startsWith('/api/articles/')) {
          const id = pathname.split('/')[3]
          try {
            const body = await readBody(req)
            const data = JSON.parse(body)
            const filePath = path.join(DB, 'articles', `${id}.json`)
            if (!fs.existsSync(filePath)) return err('Article tidak ditemukan', 404)
            const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
            const updated = { ...existing, ...data, id }
            fs.writeFileSync(filePath, JSON.stringify(updated, null, 2))
            return json(updated)
          } catch (e) {
            return err('Gagal update article: ' + String(e), 500)
          }
        }

        // DELETE /api/articles/:id
        if (method === 'DELETE' && pathname.startsWith('/api/articles/')) {
          const id = pathname.split('/')[3]
          const filePath = path.join(DB, 'articles', `${id}.json`)
          if (!fs.existsSync(filePath)) return err('Article tidak ditemukan', 404)
          fs.unlinkSync(filePath)
          return json({ ok: true })
        }

        return err('Not found', 404)
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    adminApiPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

