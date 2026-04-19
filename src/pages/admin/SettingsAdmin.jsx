import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getVisibility, updateVisibility, logActivity } from '@/services/firebase'

const sections = [
  { key: 'about', label: 'About Section', desc: 'Bio, skills, and personal background' },
  { key: 'projects', label: 'Projects Section', desc: 'Featured project cards with tech stack' },
  { key: 'media', label: 'Media Gallery', desc: 'Image and video gallery from Storage' },
  { key: 'community', label: 'Community Section', desc: 'Dev Hunters community info and hackathon record' },
  { key: 'contact', label: 'Contact Section', desc: 'Social links and contact information' },
]

export default function SettingsAdmin() {
  const [visibility, setVisibility] = useState({
    about: true, projects: true, media: true, community: true, contact: true,
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getVisibility().then(setVisibility)
  }, [])

  const toggle = (key) => {
    setVisibility(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const save = async () => {
    setSaving(true)
    try {
      await updateVisibility(visibility)
      await logActivity('Updated section visibility')
      toast.success('Visibility settings saved.')
    } catch (e) {
      toast.error('Failed: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="font-mono text-[10px] tracking-[0.35em] text-cyan/60 uppercase mb-1">Admin Panel</div>
        <h1 className="font-orbitron font-bold text-3xl">Settings</h1>
        <p className="font-mono text-xs text-white/30 mt-2 tracking-wider">Toggle which sections appear on the public portfolio.</p>
      </div>

      <div className="glass corner-br relative p-8 max-w-xl mb-6">
        <div className="font-mono text-[10px] tracking-widest text-white/30 uppercase mb-5">Section Visibility</div>
        <div className="flex flex-col gap-4">
          {sections.map((s) => (
            <div key={s.key} className={`flex items-center justify-between px-4 py-3 border transition-all duration-200 ${visibility[s.key] ? 'border-cyan/20 bg-cyan/[0.02]' : 'border-white/[0.05]'}`}>
              <div>
                <div className={`font-mono text-xs font-bold tracking-wider transition-colors ${visibility[s.key] ? 'text-white' : 'text-white/30'}`}>{s.label}</div>
                <div className="font-mono text-[10px] text-white/25 mt-0.5">{s.desc}</div>
              </div>
              <button
                onClick={() => toggle(s.key)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${visibility[s.key] ? 'bg-cyan' : 'bg-white/10'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow ${visibility[s.key] ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>

        <button onClick={save} disabled={saving} className="btn-primary mt-6 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Danger zone */}
      <div className="glass border border-red-500/20 p-6 max-w-xl">
        <div className="font-mono text-[10px] tracking-widest text-red-400/60 uppercase mb-4">Danger Zone</div>
        <p className="font-mono text-xs text-white/30 mb-4">
          To reset all data or manage Firebase directly, visit your Firebase Console.
        </p>
        <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer"
          className="btn-outline text-[10px]">
          Open Firebase Console →
        </a>
      </div>
    </div>
  )
}
