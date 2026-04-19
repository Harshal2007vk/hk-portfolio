import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const defaultAbout = {
  bio: `I'm a first-year B.Tech CSE (IoT) student at PRMIT&R, Badnera with a relentless passion for AI, IoT, and emerging tech. I consider myself a solo builder — someone who learns by shipping real products into the world.`,
  bio2: `As a "Master of AI Tools", I've explored 20+ AI and ML tools while building multiple real-world projects. I thrive at hackathons, workshops, and independent experiments.`,
  bio3: `My long-term vision: become a full-stack developer, AI/ML engineer, and quantum technology innovator, while scaling student-driven tech ecosystems.`,
  skills: ['Python', 'Machine Learning', 'Data Science', 'Pandas/NumPy', 'Matplotlib', 'Scikit-learn', 'Git & GitHub', 'Prompt Engineering', 'IoT Systems', 'Quantum Dev'],
}

export default function AboutSection({ data }) {
  const about = data || defaultAbout
  const containerRef = useRef()

  return (
    <section id="about" className="relative min-h-screen flex items-center py-24 px-4">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* Visual */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Orbital rings */}
            <div className="absolute inset-0 border border-cyan/20 rounded-full animate-spin-slow" />
            <div className="absolute -inset-6 border border-purple/10 rounded-full animate-spin-reverse" />
            <div className="absolute -inset-12 border border-cyan/5 rounded-full animate-spin-slow" style={{ animationDuration: '25s' }} />

            {/* Orbital dot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan rounded-full"
              style={{ boxShadow: '0 0 10px #00f5ff' }} />

            {/* Center card */}
            <div className="absolute inset-4 glass flex items-center justify-center rounded-sm">
              <span className="font-orbitron font-black text-6xl"
                style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                HK
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div>
          <motion.div className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            About Me
          </motion.div>

          <motion.h2
            className="font-orbitron font-bold text-4xl md:text-5xl mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            Building the{' '}
            <span style={{ background: 'linear-gradient(90deg, #00f5ff, #bf00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Future
            </span>{' '}Today
          </motion.h2>

          {[about.bio, about.bio2, about.bio3].filter(Boolean).map((p, i) => (
            <motion.p
              key={i}
              className="text-white/50 text-sm leading-relaxed mb-4"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            >
              {p}
            </motion.p>
          ))}

          {/* Skills */}
          <motion.div className="flex flex-wrap gap-2 mt-5"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            {(about.skills || defaultAbout.skills).map((s) => (
              <span key={s}
                className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 border border-cyan/25 text-cyan/80 bg-cyan/5 hover:bg-cyan/12 hover:border-cyan/50 transition-all duration-200 cursor-default">
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
