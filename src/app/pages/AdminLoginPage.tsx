import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { api } from '../api'
import logoPutih from '../../assets/logo_putih.png'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.auth.me().then((user) => {
      if (user) navigate('/sli/v1/dashboard')
    }).catch(() => {})
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.auth.login(username, password)
      navigate('/sli/v1/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0891b2] to-[#0c4a6e] flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logoPutih} alt="SLI Logo" className="h-14 w-auto" />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-[#0891b2] to-[#0c4a6e]" />
          <div className="p-8">
            <h1 className="text-[#0c4a6e] text-2xl font-bold mb-1 text-center">
              Admin Portal
            </h1>
            <p className="text-[#64748b] text-sm text-center mb-8">
              Masuk untuk mengelola konten
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#0c4a6e] mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-[#0c4a6e] transition-colors text-sm"
                  placeholder="Masukkan username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0c4a6e] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#e0f2fe] focus:border-[#0891b2] focus:outline-none text-[#0c4a6e] transition-colors text-sm"
                  placeholder="Masukkan password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0891b2] to-[#0c4a6e] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-60"
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>
          </div>
        </div>

        <p className="text-white/50 text-xs text-center mt-6">
          PT Solusi Layar International — Admin Panel
        </p>
      </div>
    </div>
  )
}
