import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { api, type Article, type ArticleInput } from '../api'
import {
  LogOut, Plus, Pencil, Trash2, X, Image, Save, Search,
} from 'lucide-react'

const EMPTY_FORM: ArticleInput = {
  title: '', date: '', category: 'news',
  thumbnail: '', images: [], excerpt: '', content: '', source: '', tags: [],
}

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function ArticleForm({
  article,
  onSave,
  onClose,
}: {
  article?: Article
  onSave: (data: ArticleInput, id?: string) => void
  onClose: () => void
}) {
  const [form, setForm] = useState<ArticleInput>(
    article ?? EMPTY_FORM,
  )
  const [tagsInput, setTagsInput] = useState(article?.tags.join(', ') ?? '')
  const [imagesInput, setImagesInput] = useState(article?.images.join('\n') ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.date || !form.category) {
      setError('Title, date, dan category wajib diisi.')
      return
    }
    setError('')
    setSaving(true)
    try {
      const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
      const images = imagesInput.split('\n').map((u) => u.trim()).filter(Boolean)
      onSave({ ...form, tags, images }, article?.id)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="h-1.5 bg-gradient-to-r from-[#0891b2] to-[#0c4a6e]" />
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0f2fe]">
          <h2 className="text-[#0c4a6e] font-bold text-lg">
            {article ? 'Edit Article' : 'Tambah Article Baru'}
          </h2>
          <button onClick={onClose} className="text-[#64748b] hover:text-[#0c4a6e] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-[#0c4a6e] mb-1">Judul *</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-sm text-[#0c4a6e]"
                placeholder="Judul article"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0c4a6e] mb-1">Tanggal *</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-sm text-[#0c4a6e]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0c4a6e] mb-1">Kategori *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ArticleInput['category'] })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-sm text-[#0c4a6e]"
              >
                <option value="news">News</option>
                <option value="event">Event</option>
                <option value="education">Education</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-[#0c4a6e] mb-1">Thumbnail URL</label>
              <input
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-sm text-[#0c4a6e]"
                placeholder="https://..."
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-[#0c4a6e] mb-1">
                Excerpt <span className="font-normal text-[#64748b]">(ringkasan)</span>
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-sm text-[#0c4a6e] resize-none"
                placeholder="Ringkasan singkat article..."
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-[#0c4a6e] mb-1">Tags</label>
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-sm text-[#0c4a6e]"
                placeholder="#tag1, #tag2, #tag3"
              />
              <p className="text-xs text-[#64748b] mt-1">Pisahkan dengan koma</p>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-[#0c4a6e] mb-1">Images URL (satu per baris)</label>
              <textarea
                value={imagesInput}
                onChange={(e) => setImagesInput(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-sm text-[#0c4a6e] resize-none"
                placeholder="https://...\nhttps://..."
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-[#0c4a6e] mb-1">Sumber</label>
              <input
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-sm text-[#0c4a6e]"
                placeholder="Nama sumber article"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-semibold text-[#0c4a6e] mb-1">Konten (HTML)</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={6}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-sm text-[#0c4a6e] resize-y font-mono"
                placeholder="<p>Konten article...</p>"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#e0f2fe]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border-2 border-[#e0f2fe] text-[#64748b] font-semibold text-sm hover:border-[#0891b2] hover:text-[#0891b2] transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0891b2] to-[#0c4a6e] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Article | undefined>()
  const [showForm, setShowForm] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const data = await api.articles.list()
      setArticles(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    api.auth.me().catch(() => navigate('/sli/v1/login'))
    load()
  }, [navigate, load])

  const handleLogout = async () => {
    await api.auth.logout()
    navigate('/sli/v1/login')
  }

  const handleSave = async (data: ArticleInput, id?: string) => {
    try {
      if (id) {
        const updated = await api.articles.update(id, data)
        setArticles((prev) => prev.map((a) => (a.id === id ? updated : a)))
      } else {
        const created = await api.articles.create(data)
        setArticles((prev) => [created, ...prev])
      }
      setShowForm(false)
      setEditing(undefined)
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Gagal menyimpan')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus article ini?')) return
    setDeletingId(id)
    try {
      await api.articles.delete(id)
      setArticles((prev) => prev.filter((a) => a.id !== id))
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Gagal hapus')
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()),
  )

  const CATEGORY_COLOR: Record<string, string> = {
    news: 'bg-[#f0fdf4] text-[#166534]',
    event: 'bg-[#e0f2fe] text-[#0c4a6e]',
    education: 'bg-[#fefce8] text-[#854d0e]',
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top bar */}
      <div className="bg-white border-b border-[#e0f2fe] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#64748b]">SLI Admin</p>
            <h1 className="text-[#0c4a6e] text-xl font-bold">Dashboard Articles</h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-xl border-2 border-[#e0f2fe] text-[#64748b] hover:text-[#0891b2] hover:border-[#0891b2] text-sm font-semibold transition-all"
            >
              Lihat Website
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-sm text-[#64748b]">
              Total: <span className="font-semibold text-[#0c4a6e]">{articles.length}</span> article
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari article..."
                className="pl-9 pr-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-sm text-[#0c4a6e] w-full sm:w-64"
              />
            </div>
            <button
              onClick={() => { setEditing(undefined); setShowForm(true) }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0891b2] to-[#0c4a6e] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Tambah
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-[#64748b]">Memuat...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#64748b]">
            {search ? 'Article tidak ditemukan.' : 'Belum ada article. Tambahkan yang pertama!'}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#e0f2fe] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f0f9ff] border-b border-[#e0f2fe]">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wide">Judul</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wide">Kategori</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wide">Tanggal</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-[#64748b] uppercase tracking-wide">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((article) => (
                    <tr
                      key={article.id}
                      className="border-b border-[#f0f9ff] last:border-0 hover:bg-[#f8fdff] transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {article.thumbnail && (
                            <img
                              src={article.thumbnail}
                              alt=""
                              className="w-12 h-8 rounded-lg object-cover flex-shrink-0 border border-[#e0f2fe]"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#0c4a6e] truncate max-w-xs">
                              {article.title}
                            </p>
                            <p className="text-xs text-[#64748b] truncate max-w-xs">
                              {article.excerpt.slice(0, 60)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLOR[article.category] ?? 'bg-gray-100 text-gray-600'}`}>
                          {article.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#64748b] whitespace-nowrap">{article.date}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setEditing(article); setShowForm(true) }}
                            className="p-2 rounded-xl text-[#0891b2] hover:bg-[#e0f2fe] transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            disabled={deletingId === article.id}
                            className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <a
                            href={`/artikel/${article.id}`}
                            target="_blank"
                            className="p-2 rounded-xl text-[#64748b] hover:bg-[#f0f9ff] transition-colors"
                            title="Lihat"
                          >
                            <Image className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <ArticleForm
          article={editing}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditing(undefined) }}
        />
      )}
    </div>
  )
}
