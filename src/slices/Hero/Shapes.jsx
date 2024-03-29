'use client'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Float, Environment } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Shapes() {
  return (
    <div className="aspect-1 row-span-1 row-start-1 -mt-9 overflow-hidden md:col-span-1 md:col-start-2 md:mt-3">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0.5, 1],
      r: 0.45,
      geometry: new THREE.OctahedronGeometry(3.5),
    },
    {
      position: [-1.5, -1.1, 2],
      r: 0.55,
      geometry: new THREE.IcosahedronGeometry(1.1),
    },
    {
      position: [3.3, 2, -6],
      r: 0.4,
      geometry: new THREE.TetrahedronGeometry(1.8),
    },
  ]
  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0xf0b23e, roughness: 0 }),
    new THREE.MeshStandardMaterial({
      color: 0xe6f5ff,
      roughness: 0.1,
      metalness: 0.9,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x4d483b,
      roughness: 0.4,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x1c71a6,
      roughness: 1,
      metalness: 1,
    }),
  ]

  const soundEffects = [
    new Audio('/sounds/low1.ogg'),
    new Audio('/sounds/low2.ogg'),
    new Audio('/sounds/low3.ogg'),
  ]

  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map(p => p * 2)}
      geometry={geometry}
      materials={materials}
      soundEffects={soundEffects}
      r={r}
    />
  ))
}

function Geometry({ r, position, geometry, materials, soundEffects }) {
  const meshRef = useRef()
  const [visible, setVisible] = useState(false)
  const startingMaterial = getRandomMaterial()
  function getRandomMaterial() {
    return gsap.utils.random(materials)
  }
  function handleClick(e) {
    gsap.utils.random(soundEffects).play()

    const mesh = e.object
    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: 'elastic.out(1,0.3)',
      yoyo: true,
    })
    mesh.material = getRandomMaterial()
  }
  const handlePointerOver = () => {
    document.body.style.cursor = 'pointer'
  }
  const handlePointerOut = () => {
    document.body.style.cursor = 'default'
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true)
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
        delay: 1.2,
      })
    })
    return () => ctx.revert()
  }, [])
  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  )
}
