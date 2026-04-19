import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getSocials, updateSocials, logActivity } from '@/services/firebase'

const fields = [
  { key: 'email', label: 'Email', placeholder: 'harshalkapale11@gmail.com', icon: '✉️' },
  { key: 'phone', label: 'Phone', placeholder: '+91 93730 45023', icon: '📱' },
  { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/Harshal2007vk', icon: '⌨️' },
  { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...', icon: '💼' },
  { key: 'youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/@dev_hunters', icon: '▶️' },
  { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/dev_huntersx', icon: '📸' },
  { key: 'twitter', label: 'Twitter / X URL', placeholder: 'https://x.com/...', icon: '𝕏' },
  { key: 'discord', label: 'Discord Server URL', placeholder: 'https://discord.gg/...', icon: '🎮' },
]

export default function SocialsAdmin() {
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    getSocials().then((data) => { if (data) reset(data) })
  }, [])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      await updateSocials(data)
      await logActivity('Updated social links')
      toast.success('Social links updated.')
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
        <h1 className="font-orbitron font-bold text-3xl">Social Links</h1>
        <p className="font-mono text-xs text-white/30 mt-2 tracking-wider">Leave blank to hide a social link from the portfolio.</p>
      </div>

      <div className="glass corner-br relative p-8 max-w-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="label-cyber flex items-center gap-2">
                <span>{f.icon}</span> {f.label}
              </label>
              <input {...register(f.key)} className="input-cyber" placeholder={f.placeholder} />
            </div>
          ))}

          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50 mt-2">
            {saving ? 'Saving...' : 'Save Social Links'}
          </button>
        </form>
      </div>
    </div>
  )
}
