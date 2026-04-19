import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  subscribeProjects, addProject, updateProject, deleteProject, logActivity,
} from '@/services/firebase'

const EMPTY_FORM = {
  title: '', category: '', description: '', tech: '', github: '', live: '', order: 99, visible: true,
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null) // null = new, object = existing
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({ defaultValues: EMPTY_FORM })

  useEffect(() => {
    const unsub = subscribeProjects(setProjects)
    return unsub
  }, [])

  const openNew = () => {
    setEditing(null)
    reset(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (p) => {
    setEditing(p)
    reset({
      title: p.title || '',
      category: p.category || '',
      description: p.description || '',
      tech: (p.tech || []).join(', '),
      github: p.github || '',
      live: p.live || '',
      order: p.order ?? 99,
      visible: p.visible !== false,
    })
    setShowForm(true)
  }

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const payload = {
        ...data,
        tech: data.tech.split(',').map(t => t.trim()).filter(Boolean),
        order: Number(data.order),
        visible: Boolean(data.visible),
      }
      if (editing) {
        await updateProject(editing.id, payload)
        await logActivity('Updated project', payload.title)
        toast.success('Project updated.')
      } else {
        await addProject(payload)
        await logActivity('Added project', payload.title)
        toast.success('Project added.')
      }
      setShowForm(false)
    } catch (e) {
      toast.error('Save failed: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (p) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return
    setDeleting(p.id)
    try {
      await deleteProject(p.id)
      await logActivity('Deleted project', p.title)
      toast.success('Project deleted.')
    } catch (e) {
      toast.error('Delete failed.')
    } finally {
      setDeleting(null)
    }
  }

  const toggleVisible = async (p) => {
    await updateProject(p.id, { visible: !p.visible })
    toast.success(`Project ${!p.visible ? 'shown' : 'hidden'}.`)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="font-mono text-[10px] tracking-[0.35em] text-cyan/60 uppercase mb-1">Admin Panel</div>
          <h1 className="font-orbitron font-bold text-3xl">Projects</h1>
        </div>
        <button onClick={openNew} className="btn-primary">+ Add Project</button>
      </div>

      {/* Project list */}
      <div className="flex flex-col gap-3 mb-8">
        {projects.length === 0 && (
          <div className="glass p-8 text-center font-mono text-xs text-white/30">No projects yet. Add one above.</div>
        )}
        {projects.map((p) => (
          <div key={p.id} className={`glass corner-br relative p-5 flex items-center gap-5 transition-opacity ${p.visible === false ? 'opacity-40' : ''}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-orbitron font-bold text-sm text-white truncate">{p.title}</span>
                {p.category && <span className="font-mono text-[9px] tracking-widest text-cyan/50 uppercase">[{p.category}]</span>}
              </div>
              <div className="font-mono text-[10px] text-white/30 truncate mb-2">{p.description}</div>
              <div className="flex flex-wrap gap-1">
                {(p.tech || []).map(t => (
                  <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-300">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => toggleVisible(p)}
                className={`font-mono text-[9px] tracking-widest px-3 py-1.5 border transition-all ${p.visible !== false ? 'border-cyan/30 text-cyan/60 hover:bg-cyan/10' : 'border-white/10 text-white/25 hover:bg-white/5'}`}>
                {p.visible !== false ? 'VISIBLE' : 'HIDDEN'}
              </button>
              <button onClick={() => openEdit(p)}
                className="font-mono text-[10px] tracking-wider px-3 py-1.5 border border-white/10 text-white/50 hover:text-cyan hover:border-cyan/30 transition-all">
                Edit
              </button>
              <button onClick={() => handleDelete(p)} disabled={deleting === p.id}
                className="font-mono text-[10px] tracking-wider px-3 py-1.5 border border-red-500/20 text-red-400/50 hover:text-red-400 hover:border-red-500/40 transition-all disabled:opacity-40">
                {deleting === p.id ? '...' : 'Del'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-dark/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="glass corner-br relative p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-orbitron font-bold text-xl">{editing ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setShowForm(false)} className="font-mono text-white/30 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-cyber">Title *</label>
                  <input {...register('title', { required: true })} className="input-cyber" placeholder="IPL Win Predictor" />
                  {errors.title && <span className="font-mono text-[9px] text-red-400 mt-1">Required</span>}
                </div>
                <div>
                  <label className="label-cyber">Category</label>
                  <input {...register('category')} className="input-cyber" placeholder="ML / AI / Web" />
                </div>
              </div>

              <div>
                <label className="label-cyber">Description *</label>
                <textarea {...register('description', { required: true })} rows={3} className="input-cyber resize-none" placeholder="Brief project description..." />
              </div>

              <div>
                <label className="label-cyber">Tech Stack (comma-separated)</label>
                <input {...register('tech')} className="input-cyber" placeholder="Python, Pandas, Scikit-learn" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-cyber">GitHub URL</label>
                  <input {...register('github')} className="input-cyber" placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className="label-cyber">Live URL</label>
                  <input {...register('live')} className="input-cyber" placeholder="https://..." />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-cyber">Display Order</label>
                  <input type="number" {...register('order')} className="input-cyber" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" {...register('visible')} className="w-4 h-4 accent-cyan" />
                    <span className="font-mono text-xs tracking-widest text-white/50">Visible on site</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-50">
                  {saving ? 'Saving...' : editing ? 'Update Project' : 'Add Project'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
