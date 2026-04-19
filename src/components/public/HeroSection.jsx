import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
})

const stats = [
  { num: '8.99', label: 'SGPA' },
  { num: '20+', label: 'AI Tools' },
  { num: '15+', label: 'Projects' },
  { num: '130+', label: 'Community' },
]

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center pt-20 px-4">
      <motion.div {...fadeUp(2.2)} className="font-mono text-[11px] tracking-[0.4em] text-cyan uppercase mb-5">
        // PRMIT&R, Badnera-Amravati · B.Tech CSE (IoT)
      </motion.div>

      <motion.h1 {...fadeUp(2.4)} className="font-orbitron font-black leading-none mb-4"
        style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)' }}>
        <span style={{ background: 'linear-gradient(135deg, #fff 30%, #00f5ff 70%, #bf00ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Harshal<br />Kapale
        </span>
      </motion.h1>

      <motion.p {...fadeUp(2.6)} className="text-white/50 font-light text-lg md:text-xl max-w-xl mb-8 tracking-wide">
        <strong className="text-white font-medium">AI Developer</strong> · IoT Engineer ·{' '}
        <strong className="text-white font-medium">Community Builder</strong>
      </motion.p>

      <motion.div {...fadeUp(2.8)} className="flex gap-4 flex-wrap justify-center mb-16">
        <a href="#projects" className="btn-primary">View Projects</a>
        <a href="#contact" className="btn-outline">Get In Touch</a>
      </motion.div>

      <motion.div {...fadeUp(3.0)} className="flex gap-10 flex-wrap justify-center">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-orbitron text-3xl font-bold text-cyan" style={{ textShadow: '0 0 20px rgba(0,245,255,0.5)' }}>
              {s.num}
            </div>
            <div className="font-mono text-[10px] tracking-widest text-white/40 uppercase mt-1">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(3.2)}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-cyan to-transparent"
          animate={{ scaleY: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
