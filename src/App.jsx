import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth.jsx'

// Public
import PublicLayout from './pages/public/PublicLayout'
import HomePage from './pages/public/HomePage'

// Admin
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ProjectsAdmin from './pages/admin/ProjectsAdmin'
import AboutAdmin from './pages/admin/AboutAdmin'
import MediaAdmin from './pages/admin/MediaAdmin'
import SocialsAdmin from './pages/admin/SocialsAdmin'
import SettingsAdmin from './pages/admin/SettingsAdmin'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="font-orbitron text-cyan animate-pulse text-xl tracking-widest">LOADING...</div>
    </div>
  )
  if (!user) return <Navigate to="/admin/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      {/* Admin Auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Protected */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="about" element={<AboutAdmin />} />
        <Route path="media" element={<MediaAdmin />} />
        <Route path="socials" element={<SocialsAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
