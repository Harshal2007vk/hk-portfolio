import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Background3D from '@/components/3d/Background3D'
import Cursor from '@/components/ui/Cursor'
import LoadingScreen from '@/components/ui/LoadingScreen'
import PublicNav from '@/components/public/PublicNav'
import { subscribeSocials } from '@/services/firebase'

export default function PublicLayout() {
  const [loading, setLoading] = useState(true)
  const [socials, setSocials] = useState({})

  useEffect(() => {
    const unsub = subscribeSocials(setSocials)
    return unsub
  }, [])

  return (
    <>
      <Cursor />
      <div className="scanline" />
      <Background3D />

      {/* Grid overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,245,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }} />

      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <PublicNav socials={socials} />
          <main className="relative z-10">
            <Outlet context={{ socials }} />
          </main>
        </>
      )}
    </>
  )
}
