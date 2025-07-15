'use client'

import { useGLTF } from '@react-three/drei'
import React from 'react'

export const Model = () => {
  const { scene } = useGLTF('/models/cube.glb') // cập nhật đúng path

  return <primitive object={scene} scale={0.75} />
}
