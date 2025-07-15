'use client'

import { useEffect, useRef } from 'react'
import { useFBX, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface TalkingProps {
  actionName?: 'talking' | 'dancing',
  scale?: number | [number, number, number]
}

export default function Talking({ actionName = 'talking', scale }: TalkingProps) {
  const group = useRef<THREE.Group>(null)
  const model = useFBX('/models/animations/talking.fbx')
  const dancing = useFBX('/models/animations/dancing.fbx')
  const mixer = useRef<THREE.AnimationMixer | null>(null)
  const currentAction = useRef<THREE.AnimationAction | null>(null)

  useEffect(() => {
    if (model && !mixer.current) {
      mixer.current = new THREE.AnimationMixer(model)
    }
  }, [model])

  useEffect(() => {
    if (!mixer.current || !model || !dancing) return

    // Stop previous action
    if (currentAction.current) {
      currentAction.current.stop()
    }

    const clip =
      actionName === 'dancing' ? dancing.animations[0] : model.animations[0]

    if (!clip) return

    const action = mixer.current.clipAction(clip)
    action.reset().fadeIn(0.5).play()
    currentAction.current = action
  }, [actionName, model, dancing])

  useFrame((_, delta) => {
    mixer.current?.update(delta)
  })

  return (
    <>
      <primitive
        ref={group}
        object={model}
        scale={scale ?? 0.01}
        position={[0, -1.5, 0]}
      />
      <OrbitControls />
    </>
  )
}