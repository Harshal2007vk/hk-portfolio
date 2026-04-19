import { motion } from 'framer-motion'

const defaultSocials = {
  email: 'harshalkapale11@gmail.com',
  github: 'https://github.com/Harshal2007vk',
  youtube: 'https://youtube.com/@dev_hunters',
  instagram: 'https://www.instagram.com/dev_huntersx',
  phone: '+91 93730 45023',
  linkedin: '',
  discord: '',
  twitter: '',
}

const socialDefs = [
  { key: 'phone', label: 'Phone', icon: '📱', prefix: 'tel:' },
  { key: 'email', label: 'Email', icon: '✉️', prefix: 'mailto:' },
  { key: 'github', label: 'GitHub', icon: '⌨️' },
  { key: 'youtube', label: 'YouTube', icon: '▶️' },
  { key: 'instagram', label: 'Instagram', icon: '📸' },
  { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
  { key: 'discord', label: 'Discord', icon: '🎮' },
  { key: 'twitter', label: 'Twitter / X', icon: '𝕏' },
]

export default function ContactSection({ socials }) {
  const data = { ...defaultSocials, ...socials }

  const activeLinks = socialDefs.filter(s => data[s.key])

  return (
    <section id="contact" className="relative py-24 px-4 min-h-screen flex flex-col items-center justify-center text-center">
      <motion.div className="section-label justify-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        Get In Touch
      </motion.div>

      <motion.h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-5"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Let's Build<br />Something Great
      </motion.h2>

      <motion.p className="text-white/40 text-sm max-w-xl leading-relaxed mb-12"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        Open to internships, collaborations, hackathon teams, and community partnerships.
        Drop a message — let's ship something remarkable together.
      </motion.p>

      <motion.div className="flex flex-wrap gap-4 justify-center mb-12"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
        {activeLinks.map((s, i) => {
          const href = s.prefix ? s.prefix + data[s.key] : data[s.key]
          return (
            <motion.a key={s.key} href={href} target={s.prefix ? undefined : '_blank'} rel="noreferrer"
              className="glass corner-br relative p-5 flex flex-col items-center gap-2 min-w-[140px] 
                hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <span className="text-2xl">{s.icon}</span>
              <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase">{s.label}</span>
              <span className="font-mono text-[10px] text-cyan truncate max-w-[130px]">
                {data[s.key].replace('https://', '').replace('mailto:', '').replace('tel:', '')}
              </span>
            </motion.a>
          )
        })}
      </motion.div>

      {data.email && (
        <motion.div className="font-mono text-[11px] text-white/25 tracking-widest"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          or email directly:{' '}
          <a href={`mailto:${data.email}`} className="text-cyan hover:text-white transition-colors">{data.email}</a>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div className="mt-20 font-mono text-[9px] tracking-[0.2em] text-white/15 text-center"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        © {new Date().getFullYear()} HARSHAL VASANTA KAPALE · PRMIT&R, BADNERA-AMRAVATI · LEARN · BUILD · DEPLOY
      </motion.div>
    </section>
  )
}
