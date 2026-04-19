import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 400); return 100 }
        return p + Math.random() * 15
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9998] bg-dark flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="font-orbitron font-black text-4xl tracking-widest mb-8"
        style={{ background: 'linear-gradient(135deg, #fff 30%, #00f5ff 70%, #bf00ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        HK∴DEV
      </motion.div>

      <div className="w-56 h-0.5 bg-white/10 rounded overflow-hidden mb-3">
        <motion.div
          className="h-full rounded"
          style={{ background: 'linear-gradient(90deg, #00f5ff, #bf00ff)' }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
        Initializing Systems... {Math.round(Math.min(progress, 100))}%
      </div>

      <div className="absolute bottom-8 flex gap-2">
        {['AI', 'IoT', 'ML', '3D'].map((t, i) => (
          <motion.span
            key={t}
            className="font-mono text-[9px] tracking-widest text-cyan/30"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          >
            [{t}]
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
