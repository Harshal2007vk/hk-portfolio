import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef()
  const ringRef = useRef()
  let mx = 0, my = 0, rx = 0, ry = 0, raf

  useEffect(() => {
    const move = (e) => { mx = e.clientX; my = e.clientY }
    const anim = () => {
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px'
        dotRef.current.style.top = my + 'px'
      }
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top = ry + 'px'
      }
      raf = requestAnimationFrame(anim)
    }
    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(anim)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef} className="fixed z-[10000] pointer-events-none -translate-x-1/2 -translate-y-1/2
        w-2 h-2 bg-cyan rounded-full" style={{ boxShadow: '0 0 12px #00f5ff, 0 0 24px #00f5ff' }} />
      <div ref={ringRef} className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2
        w-9 h-9 border border-cyan/50 rounded-full transition-[width,height] duration-200" />
    </>
  )
}
