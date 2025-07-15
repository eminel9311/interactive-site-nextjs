'use client'

import React, { JSX, useEffect, useMemo, useRef } from 'react'
import { useGraph } from '@react-three/fiber'
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

type GroupProps = JSX.IntrinsicElements['group']

interface DeveloperProps extends GroupProps {
  animationName?: 'idle' | 'salute' | 'clapping' | 'victory'
}

export default function Developer({ animationName = 'idle', ...props }: DeveloperProps) {
  const group = useRef<THREE.Group>(null)

  const { scene } = useGLTF('/models/animations/developer.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)

  const { animations: idleAnimation } = useFBX('/models/animations/idle.fbx')
  const { animations: saluteAnimation } = useFBX('/models/animations/salute.fbx')
  const { animations: clappingAnimation } = useFBX('/models/animations/clapping.fbx')
  const { animations: victoryAnimation } = useFBX('/models/animations/victory.fbx')

  idleAnimation[0].name = 'idle'
  saluteAnimation[0].name = 'salute'
  clappingAnimation[0].name = 'clapping'
  victoryAnimation[0].name = 'victory'

  const { actions } = useAnimations(
    [idleAnimation[0], saluteAnimation[0], clappingAnimation[0], victoryAnimation[0]],
    group
  )

  useEffect(() => {
    const action = actions[animationName]
    if (action) {
      action.reset().fadeIn(0.5).play()
      return () => void action.fadeOut(0.5)
    }
  }, [animationName, actions])


  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips} />

      <skinnedMesh
        geometry={(nodes.Wolf3D_Hair as THREE.SkinnedMesh).geometry}
        material={materials.Wolf3D_Hair}
        skeleton={(nodes.Wolf3D_Hair as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Glasses as THREE.SkinnedMesh).geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={(nodes.Wolf3D_Glasses as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Body as THREE.SkinnedMesh).geometry}
        material={materials.Wolf3D_Body}
        skeleton={(nodes.Wolf3D_Body as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Outfit_Bottom as THREE.SkinnedMesh).geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={(nodes.Wolf3D_Outfit_Bottom as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Outfit_Footwear as THREE.SkinnedMesh).geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={(nodes.Wolf3D_Outfit_Footwear as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Outfit_Top as THREE.SkinnedMesh).geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={(nodes.Wolf3D_Outfit_Top as THREE.SkinnedMesh).skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={(nodes.EyeLeft as THREE.SkinnedMesh).geometry}
        material={materials.Wolf3D_Eye}
        skeleton={(nodes.EyeLeft as THREE.SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.EyeLeft as THREE.SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.EyeLeft as THREE.SkinnedMesh).morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={(nodes.EyeRight as THREE.SkinnedMesh).geometry}
        material={materials.Wolf3D_Eye}
        skeleton={(nodes.EyeRight as THREE.SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.EyeRight as THREE.SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.EyeRight as THREE.SkinnedMesh).morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={(nodes.Wolf3D_Head as THREE.SkinnedMesh).geometry}
        material={materials.Wolf3D_Skin}
        skeleton={(nodes.Wolf3D_Head as THREE.SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.Wolf3D_Head as THREE.SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.Wolf3D_Head as THREE.SkinnedMesh).morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={(nodes.Wolf3D_Teeth as THREE.SkinnedMesh).geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={(nodes.Wolf3D_Teeth as THREE.SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.Wolf3D_Teeth as THREE.SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.Wolf3D_Teeth as THREE.SkinnedMesh).morphTargetInfluences}
      />
    </group>
  )
}

useGLTF.preload('/models/animations/developer.glb')
