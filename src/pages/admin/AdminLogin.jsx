import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loginAdmin } from '@/services/firebase'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await loginAdmin(email, password)
      toast.success('Access granted.')
      navigate('/admin')
    } catch (err) {
      toast.error('Access denied. Invalid credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background grid */}
      <div className="fixed inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Glow blobs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="relative z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="font-orbitron font-black text-3xl tracking-widest mb-2"
            style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            HK∴DEV
          </div>
          <div className="font-mono text-[10px] tracking-[0.35em] text-white/25 uppercase">Admin Access Terminal</div>
        </div>

        <div className="glass corner-br relative p-8">
          <div className="font-mono text-[9px] tracking-[0.25em] text-cyan/50 uppercase mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
            Authentication Required
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="label-cyber">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="admin@example.com"
                className="input-cyber"
              />
            </div>
            <div>
              <label className="label-cyber">Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                required placeholder="••••••••••"
                className="input-cyber"
              />
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary mt-2 text-center disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Authenticating...' : 'Enter System →'}
            </button>
          </form>

          <div className="mt-6 font-mono text-[9px] text-white/15 text-center tracking-wider">
            Unauthorized access is monitored and logged.
          </div>
        </div>

        <div className="text-center mt-5">
          <a href="/" className="font-mono text-[10px] text-white/20 hover:text-cyan/50 transition-colors tracking-widest">
            ← Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  )
}
