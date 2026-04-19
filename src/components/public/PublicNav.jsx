import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const links = ['About', 'Projects', 'Media', 'Community', 'Contact']

export default function PublicNav({ socials }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${scrolled ? 'bg-dark/70 backdrop-blur-xl border-b border-cyan/10' : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 2.6 }}
    >
      <Link to="/" className="font-orbitron font-bold text-lg tracking-widest"
        style={{ background: 'linear-gradient(90deg, #00f5ff, #bf00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        HK∴DEV
      </Link>

      <ul className="hidden md:flex gap-8">
        {links.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`}
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/40 hover:text-cyan transition-colors duration-200 relative group">
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan group-hover:w-full transition-all duration-300" />
            </a>
          </li>
        ))}
      </ul>

      <Link to="/admin/login"
        className="font-mono text-[9px] tracking-widest uppercase text-white/20 hover:text-cyan/50 transition-colors duration-200">
        [ADMIN]
      </Link>
    </motion.nav>
  )
}
