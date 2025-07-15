import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import Developer from './Developer'

export const Experience = () => {
  return (
    <Suspense fallback={null}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 2]} />
      {/* <Developer scale={1.2} position={[0, -1.5, 0]} animationName="idle" /> */}
    </Suspense>
  )
}
