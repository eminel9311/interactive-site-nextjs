'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Developer from './Developer'
import Talking from './TalkingTest'

export default function Experience() {
  const [action, setAction] = useState<'talking' | 'dancing'>('talking')

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#ffffff']} />
        <PerspectiveCamera makeDefault position={[0, 1.5, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} castShadow />

        <Suspense fallback={null}>
          {/* <Developer scale={2} position={[0, -1.5, 0]} animationName="idle" /> */}
          <Talking actionName={action} scale={0.015} />

        </Suspense>

        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>

      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
        <button onClick={() => setAction('talking')} style={{ marginRight: 8 }}>
          Play Talking
        </button>
        <button onClick={() => setAction('dancing')}>
          Play Dancing
        </button>
      </div>
    </div>
  )
}
