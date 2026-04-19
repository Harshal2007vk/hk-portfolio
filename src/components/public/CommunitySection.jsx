import { motion } from 'framer-motion'

const hackathons = [
  { name: 'NASA Space Apps Challenge', result: 'Global Nominee · 1,20,000+ participants', color: 'cyan' },
  { name: 'AWS Swarajya Hackathon', result: '2nd Position · National Level · March 2026', color: 'purple' },
  { name: 'GDG Data Science Hackathon', result: 'Winner (2nd Prize)', color: 'cyan' },
  { name: 'AWS College Hackathon', result: 'Top 6 in College Round (400+ teams)', color: 'purple' },
  { name: 'Smart India Hackathon', result: 'Top 38 Teams · College Level', color: 'cyan' },
  { name: 'Dev Hunters Hackathon', result: 'Solo Developer Winner', color: 'purple' },
  { name: 'BITS Pilani Luminus', result: 'Project Submitted · Results Pending', color: 'cyan' },
]

const cStats = [
  { num: '130+', label: 'Members' },
  { num: '3', label: 'Groups' },
  { num: '2+', label: 'Colleges' },
  { num: '8+', label: 'Admins' },
]

export default function CommunitySection() {
  return (
    <section id="community" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Leadership
        </motion.div>
        <motion.h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Dev Hunters<br />Community
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Community main card */}
          <motion.div className="glass corner-br relative p-8"
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="font-orbitron font-bold text-2xl mb-4"
              style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Founder & Community Builder
            </h3>
            <p className="text-white/50 text-sm leading-relaxed mb-3">
              Dev Hunters is a student-led tech community I founded to build a strong developer ecosystem and encourage real collaboration among students across colleges.
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-3">
              The community spans PRMIT&R Badnera and MIT Academy of Engineering, Pune, with a growing network of developers, mentors, and co-leads actively building together.
            </p>
            <p className="font-mono text-[9px] tracking-[0.3em] text-white/20 mt-4">LEARN · BUILD · DEPLOY</p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {cStats.map((s) => (
                <div key={s.label} className="bg-cyan/[0.04] border border-cyan/10 p-3 text-center">
                  <div className="font-orbitron text-2xl font-bold text-cyan">{s.num}</div>
                  <div className="font-mono text-[10px] text-white/30 tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hackathon list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex flex-col gap-3">
            <div className="font-mono text-[9px] tracking-[0.3em] text-white/25 uppercase mb-1">Competition Record</div>
            {hackathons.map((h, i) => (
              <motion.div key={h.name}
                className="glass flex items-center gap-4 px-4 py-3 hover:translate-x-1.5 transition-transform duration-200 cursor-default"
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <div className={`w-2 h-2 flex-shrink-0 rounded-full ${h.color === 'cyan' ? 'bg-cyan' : 'bg-purple'}`}
                  style={{ boxShadow: `0 0 8px ${h.color === 'cyan' ? '#00f5ff' : '#bf00ff'}` }} />
                <div>
                  <div className="font-mono text-xs font-bold text-white">{h.name}</div>
                  <div className="font-mono text-[10px] text-white/40 mt-0.5">{h.result}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
