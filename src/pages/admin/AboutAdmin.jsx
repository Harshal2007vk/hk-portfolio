import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getAbout, updateAbout, logActivity } from '@/services/firebase'

const DEFAULT = {
  bio: "I'm a first-year B.Tech CSE (IoT) student at PRMIT&R, Badnera with a relentless passion for AI, IoT, and emerging tech. I consider myself a solo builder — someone who learns by shipping real products.",
  bio2: "As a \"Master of AI Tools\", I've explored 20+ AI and ML tools while building multiple real-world projects. I thrive at hackathons, workshops, and independent experiments.",
  bio3: "My long-term vision: become a full-stack developer, AI/ML engineer, and quantum technology innovator, while scaling student-driven tech ecosystems.",
  skills: "Python, Machine Learning, Data Science, Pandas/NumPy, Matplotlib, Scikit-learn, Git & GitHub, Prompt Engineering, IoT Systems, Quantum Dev",
}

export default function AboutAdmin() {
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, reset } = useForm({ defaultValues: DEFAULT })

  useEffect(() => {
    getAbout().then((data) => {
      if (data) {
        reset({
          bio: data.bio || DEFAULT.bio,
          bio2: data.bio2 || DEFAULT.bio2,
          bio3: data.bio3 || DEFAULT.bio3,
          skills: (data.skills || []).join(', ') || DEFAULT.skills,
        })
      }
    })
  }, [])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      await updateAbout({
        ...data,
        skills: data.skills.split(',').map(s => s.trim()).filter(Boolean),
      })
      await logActivity('Updated about section')
      toast.success('About section updated.')
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
        <h1 className="font-orbitron font-bold text-3xl">About Section</h1>
      </div>

      <div className="glass corner-br relative p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <label className="label-cyber">Bio Paragraph 1 *</label>
            <textarea {...register('bio', { required: true })} rows={4} className="input-cyber resize-none"
              placeholder="Main bio paragraph..." />
          </div>
          <div>
            <label className="label-cyber">Bio Paragraph 2</label>
            <textarea {...register('bio2')} rows={3} className="input-cyber resize-none"
              placeholder="Second paragraph..." />
          </div>
          <div>
            <label className="label-cyber">Bio Paragraph 3</label>
            <textarea {...register('bio3')} rows={3} className="input-cyber resize-none"
              placeholder="Third paragraph..." />
          </div>
          <div>
            <label className="label-cyber">Skills (comma-separated)</label>
            <textarea {...register('skills')} rows={3} className="input-cyber resize-none"
              placeholder="Python, Machine Learning, ..." />
            <div className="font-mono text-[9px] text-white/20 mt-1.5">Each skill becomes a tag on the About page.</div>
          </div>

          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
            {saving ? 'Saving...' : 'Save About Section'}
          </button>
        </form>
      </div>
    </div>
  )
}
