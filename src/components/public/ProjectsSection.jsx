import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

const defaultProjects = [
  {
    id: '1', order: 1, title: 'IPL Win Predictor', category: 'ML',
    description: 'A machine learning model that predicts IPL match outcomes in real-time. Deployed as a web app using Streamlit.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
    github: 'https://github.com/Harshal2007vk',
    visible: true,
  },
  {
    id: '2', order: 2, title: 'Netflix & Zomato Analytics', category: 'Data Science',
    description: 'Comprehensive EDA on Netflix content and Zomato restaurant datasets — uncovering viewer trends and customer behavior with rich visualizations.',
    tech: ['Pandas', 'Matplotlib', 'Seaborn', 'NumPy'],
    github: 'https://github.com/Harshal2007vk',
    visible: true,
  },
  {
    id: '3', order: 3, title: 'CareerForge AI', category: 'AI / Web',
    description: 'An AI-powered career guidance platform that helps students discover paths, generate personalized roadmaps and optimize their learning journey.',
    tech: ['HTML/CSS', 'JavaScript', 'AI Tools', 'Prompt Engineering'],
    github: 'https://github.com/Harshal2007vk',
    visible: true,
  },
]

function TiltCard({ project, index }) {
  const ref = useRef()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 })

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="glass glow-card corner-br relative p-6 cursor-default"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="font-mono text-[10px] tracking-[0.3em] text-cyan/30 mb-3">
        {String(index + 1).padStart(2, '0')} // {project.category?.toUpperCase()}
      </div>

      <h3 className="font-orbitron font-bold text-lg mb-3 text-white">{project.title}</h3>

      <p className="text-white/45 text-sm leading-relaxed mb-5">{project.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {(project.tech || []).map((t) => (
          <span key={t} className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1
            bg-blue-500/10 border border-blue-500/25 text-blue-300">
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer"
            className="font-mono text-[10px] tracking-wider text-white/40 hover:text-cyan transition-colors">
            [GitHub →]
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer"
            className="font-mono text-[10px] tracking-wider text-white/40 hover:text-cyan transition-colors">
            [Live →]
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function ProjectsSection({ projects }) {
  const data = (projects && projects.length > 0 ? projects : defaultProjects).filter(p => p.visible !== false)

  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Portfolio
        </motion.div>
        <motion.h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Featured<br />Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((p, i) => <TiltCard key={p.id} project={p} index={i} />)}
        </div>

        <motion.div className="text-center mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <a href="https://github.com/Harshal2007vk" target="_blank" rel="noreferrer" className="btn-outline">
            View All on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
