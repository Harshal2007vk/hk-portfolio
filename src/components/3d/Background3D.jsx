import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Stars() {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01
      ref.current.rotation.x += delta * 0.003
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial color="#88ddff" size={0.05} sizeAttenuation transparent opacity={0.7} />
    </Points>
  )
}

function WireframeSphere() {
  const ref = useRef()
  const ref2 = useRef()
  const { mouse } = useThree()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.003
      ref.current.rotation.y += 0.002
      ref.current.rotation.x += (mouse.y * 0.3 - ref.current.rotation.x) * 0.02
      ref.current.rotation.y += (mouse.x * 0.3 - ref.current.rotation.y) * 0.02
    }
    if (ref2.current) {
      ref2.current.rotation.x -= 0.002
      ref2.current.rotation.y += 0.003
    }
  })

  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.4, 4]} />
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.18, 32, 32]} />
        <meshBasicMaterial color="#020812" transparent opacity={0.92} />
      </mesh>
      <mesh ref={ref2}>
        <icosahedronGeometry args={[1.58, 2]} />
        <meshBasicMaterial color="#bf00ff" wireframe transparent opacity={0.07} />
      </mesh>
    </group>
  )
}

function FloatingShapes() {
  const shapes = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => {
      const angle = (i / 10) * Math.PI * 2
      const r = 2.5 + Math.random() * 1.5
      return {
        pos: [Math.cos(angle) * r, (Math.random() - 0.5) * 2, Math.sin(angle) * r],
        color: i % 2 === 0 ? '#00f5ff' : '#bf00ff',
        speed: 0.006 + Math.random() * 0.012,
        phase: Math.random() * Math.PI * 2,
      }
    }), [])

  return (
    <>
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} index={i} />
      ))}
    </>
  )
}

function FloatingShape({ pos, color, speed, phase, index }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x += speed
      ref.current.rotation.y += speed * 1.3
      ref.current.position.y = pos[1] + Math.sin(clock.elapsedTime * 0.8 + phase) * 0.15
    }
  })
  const Geo = index % 3 === 0 ? 'octahedronGeometry' : index % 3 === 1 ? 'tetrahedronGeometry' : 'icosahedronGeometry'
  return (
    <mesh ref={ref} position={pos}>
      <octahedronGeometry args={[0.14]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.45} />
    </mesh>
  )
}

function RingParticles() {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(600 * 3)
    for (let i = 0; i < 600; i++) {
      const angle = (i / 600) * Math.PI * 2
      const r = 2.8 + (Math.random() - 0.5) * 0.5
      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.25
      pos[i * 3 + 2] = Math.sin(angle) * r
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.04
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial color="#00f5ff" size={0.04} sizeAttenuation transparent opacity={0.6} />
    </Points>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Stars />
        <WireframeSphere />
        <FloatingShapes />
        <RingParticles />
      </Canvas>
    </div>
  )
}
