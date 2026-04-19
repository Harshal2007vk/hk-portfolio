import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { logoutAdmin } from '@/services/firebase'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: '▦', end: true },
  { to: '/admin/projects', label: 'Projects', icon: '◈' },
  { to: '/admin/about', label: 'About', icon: '◉' },
  { to: '/admin/media', label: 'Media', icon: '◫' },
  { to: '/admin/socials', label: 'Social Links', icon: '◎' },
  { to: '/admin/settings', label: 'Settings', icon: '◬' },
]

export default function AdminLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutAdmin()
    toast.success('Logged out.')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 glass-dark border-r border-white/[0.06] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.06]">
          <div className="font-orbitron font-black text-xl tracking-widest"
            style={{ background: 'linear-gradient(90deg, #00f5ff, #bf00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            HK∴ADMIN
          </div>
          <div className="font-mono text-[9px] text-white/20 tracking-widest mt-1">Control Panel</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to} to={item.to} end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="text-sm w-4 text-center opacity-70">{item.icon}</span>
              <span className="text-xs tracking-widest">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="font-mono text-[9px] text-white/25 tracking-wider mb-3 truncate">{user?.email}</div>
          <button onClick={handleLogout}
            className="w-full font-mono text-[10px] tracking-widest uppercase text-red-400/60 hover:text-red-400 
              border border-red-500/20 hover:border-red-500/40 py-2 transition-all duration-200">
            [ Logout ]
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-dark-2/80 backdrop-blur border-b border-white/[0.05] 
          flex items-center justify-between px-8 py-4">
          <div className="font-mono text-[10px] tracking-widest text-white/25 uppercase">
            Admin Dashboard · {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] text-green-400/60 tracking-widest">ONLINE</span>
          </div>
        </div>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
