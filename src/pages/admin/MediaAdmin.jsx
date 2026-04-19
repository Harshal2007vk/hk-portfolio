import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { subscribeMedia, addMedia, deleteMedia, uploadFile, logActivity } from '@/services/firebase'

export default function MediaAdmin() {
  const [media, setMedia] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [deleting, setDeleting] = useState(null)
  const fileRef = useRef()

  useEffect(() => {
    const unsub = subscribeMedia(setMedia)
    return unsub
  }, [])

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    setProgress(0)

    for (const file of files) {
      try {
        const isVideo = file.type.startsWith('video/')
        const path = `media/${Date.now()}_${file.name}`
        const { url } = await uploadFile(file, path, setProgress)
        await addMedia({
          name: file.name,
          url,
          path,
          type: isVideo ? 'video' : 'image',
          size: file.size,
          visible: true,
        })
        await logActivity('Uploaded media', file.name)
      } catch (err) {
        toast.error(`Failed to upload ${file.name}`)
      }
    }

    toast.success(`${files.length} file(s) uploaded.`)
    setUploading(false)
    setProgress(0)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleDelete = async (item) => {
    if (!confirm(`Delete "${item.name}"?`)) return
    setDeleting(item.id)
    try {
      await deleteMedia(item.id, item.path)
      await logActivity('Deleted media', item.name)
      toast.success('Deleted.')
    } catch {
      toast.error('Delete failed.')
    } finally {
      setDeleting(null)
    }
  }

  const toggleVisible = async (item) => {
    const { updateDoc, doc } = await import('firebase/firestore')
    const { db } = await import('@/services/firebase')
    // Use the already-imported updateMedia pattern
    const { updateProject } = await import('@/services/firebase')
    // Inline update for media visibility
    const firebase = await import('firebase/firestore')
    const { default: firebaseService } = await import('@/services/firebase')
    toast('Toggle visibility via Firestore console for now.')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="font-mono text-[10px] tracking-[0.35em] text-cyan/60 uppercase mb-1">Admin Panel</div>
          <h1 className="font-orbitron font-bold text-3xl">Media Gallery</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-white/30">{media.length} files</span>
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            className="btn-primary disabled:opacity-50">
            {uploading ? `Uploading ${progress}%` : '↑ Upload Files'}
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input ref={fileRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleUpload} />

      {/* Upload progress */}
      {uploading && (
        <div className="mb-6 glass p-4">
          <div className="font-mono text-[10px] text-cyan/60 tracking-widest mb-2">Uploading... {progress}%</div>
          <div className="w-full h-1 bg-white/10 rounded overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan to-purple transition-all duration-200 rounded"
              style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => fileRef.current?.click()}
        className="glass border-dashed border border-cyan/20 p-10 text-center mb-8 cursor-pointer 
          hover:border-cyan/40 hover:bg-cyan/[0.02] transition-all duration-200">
        <div className="font-orbitron text-2xl text-white/20 mb-2">+</div>
        <div className="font-mono text-[11px] tracking-widest text-white/30 uppercase">Click to upload images or videos</div>
        <div className="font-mono text-[9px] text-white/15 mt-1">Supports JPG, PNG, GIF, MP4, WebM</div>
      </div>

      {/* Media grid */}
      {media.length === 0 ? (
        <div className="text-center font-mono text-xs text-white/20 py-12">No media uploaded yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {media.map((item) => (
            <div key={item.id} className="glass relative group aspect-square overflow-hidden">
              {item.type === 'video' ? (
                <video src={item.url} className="w-full h-full object-cover" muted />
              ) : (
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-2">
                <div className="font-mono text-[9px] text-white/60 text-center truncate w-full px-1">{item.name}</div>
                <div className="font-mono text-[8px] text-white/30">{item.type?.toUpperCase()}</div>
                <button onClick={() => handleDelete(item)} disabled={deleting === item.id}
                  className="font-mono text-[9px] text-red-400/80 hover:text-red-400 border border-red-500/30 px-3 py-1 transition-all disabled:opacity-40">
                  {deleting === item.id ? '...' : 'Delete'}
                </button>
              </div>

              {item.type === 'video' && (
                <div className="absolute top-1 right-1 bg-dark/80 font-mono text-[8px] text-white/50 px-1">▶</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
