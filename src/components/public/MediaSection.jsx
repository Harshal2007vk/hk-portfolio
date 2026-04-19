import { motion } from 'framer-motion'
import { useState } from 'react'

export default function MediaSection({ media }) {
  const [selected, setSelected] = useState(null)
  const items = (media || []).filter(m => m.visible !== false)

  if (items.length === 0) return null

  return (
    <section id="media" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div className="section-label" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Gallery
        </motion.div>
        <motion.h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-12"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Media Gallery
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              className="relative aspect-square glass overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(item)}
              whileHover={{ scale: 1.02 }}
            >
              {item.type === 'video' ? (
                <video src={item.url} className="w-full h-full object-cover" muted />
              ) : (
                <img src={item.url} alt={item.name || ''} className="w-full h-full object-cover" loading="lazy" />
              )}
              <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="font-mono text-[10px] tracking-widest text-cyan">[VIEW]</span>
              </div>
              {item.type === 'video' && (
                <div className="absolute bottom-2 right-2 font-mono text-[9px] text-white/60 bg-dark/80 px-1.5 py-0.5">▶ VIDEO</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-[200] bg-dark/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelected(null)}>
          <div className="max-w-4xl max-h-[90vh] relative" onClick={e => e.stopPropagation()}>
            {selected.type === 'video'
              ? <video src={selected.url} controls autoPlay className="max-h-[80vh] max-w-full" />
              : <img src={selected.url} alt="" className="max-h-[80vh] max-w-full object-contain" />
            }
            {selected.name && <div className="font-mono text-[10px] text-white/40 tracking-widest text-center mt-3">{selected.name}</div>}
            <button onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 font-mono text-[11px] tracking-widest text-white/40 hover:text-cyan">
              [CLOSE ×]
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
