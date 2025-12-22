'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function AuroraBorealis() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vec3 pos = position;
      pos.y += sin(pos.x * 2.0 + time) * 0.3;
      pos.y += cos(pos.z * 1.5 + time * 0.7) * 0.2;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    
    void main() {
      vec3 color1 = vec3(0.0, 1.0, 0.5); // Green
      vec3 color2 = vec3(0.2, 0.5, 1.0); // Blue
      vec3 color3 = vec3(0.8, 0.2, 1.0); // Purple
      
      float wave = sin(vUv.x * 3.0 + time) * cos(vUv.y * 2.0 + time * 0.5);
      float intensity = smoothstep(-1.0, 1.0, wave);
      
      vec3 color = mix(color1, color2, intensity);
      color = mix(color, color3, sin(time * 0.3) * 0.5 + 0.5);
      
      float alpha = (0.3 + intensity * 0.4) * (1.0 - vUv.y * 0.5);
      gl_FragColor = vec4(color, alpha);
    }
  `

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 3, -15]} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={[40, 15, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
        }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function ShootingStars() {
  const starsRef = useRef<THREE.Group>(null)
  const starData = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      startX: (Math.random() - 0.5) * 40,
      startY: Math.random() * 10 + 5,
      startZ: -20 - Math.random() * 10,
      speed: 0.1 + Math.random() * 0.15,
      delay: Math.random() * 10,
    }))
  }, [])

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.children.forEach((star, i) => {
        const data = starData[i]
        const time = (clock.getElapsedTime() + data.delay) * data.speed
        const progress = (time % 5) / 5

        star.position.x = data.startX - progress * 25
        star.position.y = data.startY - progress * 8
        star.position.z = data.startZ + progress * 5

        const fadeIn = Math.min(progress * 10, 1)
        const fadeOut = Math.max(1 - (progress - 0.8) * 5, 0)
        const opacity = fadeIn * fadeOut

        if (star instanceof THREE.Mesh && star.material instanceof THREE.MeshBasicMaterial) {
          star.material.opacity = opacity
        }
      })
    }
  })

  return (
    <group ref={starsRef}>
      {starData.map((data, i) => (
        <mesh key={i} position={[data.startX, data.startY, data.startZ]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#FFD700" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  )
}

function Snowflakes() {
  const points = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.05
      const positions = points.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.01
        if (positions[i + 1] < -25) {
          positions[i + 1] = 25
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  )
}

function Lights() {
  const lightsRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (lightsRef.current) {
      lightsRef.current.children.forEach((light, i) => {
        const offset = i * 0.5
          ; (light as THREE.PointLight).intensity = 2 + Math.sin(clock.getElapsedTime() * 2 + offset) * 1
      })
    }
  })

  return (
    <group ref={lightsRef}>
      <pointLight position={[-3, 2, -3]} color="#FF0000" intensity={2} distance={10} />
      <pointLight position={[3, 2, -3]} color="#00FF00" intensity={2} distance={10} />
      <pointLight position={[0, 4, -5]} color="#FFD700" intensity={3} distance={15} />
    </group>
  )
}

function FloatingGifts() {
  const gifts = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (gifts.current) {
      gifts.current.rotation.y = clock.getElapsedTime() * 0.2
      gifts.current.children.forEach((gift, i) => {
        gift.position.y = Math.sin(clock.getElapsedTime() + i) * 0.5
      })
    }
  })

  return (
    <group ref={gifts} position={[-3, 0, -5]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#C41E3A" />
      </mesh>
      <mesh position={[1, 0.5, 0.5]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      <mesh position={[-0.8, -0.5, -0.5]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#0F7F3F" />
      </mesh>
    </group>
  )
}

function SantaSleigh() {
  const sleighRef = useRef<THREE.Group>(null)
  const trailRef = useRef<THREE.Points>(null)

  // Trail particles
  const trailParticles = useMemo(() => {
    const positions = new Float32Array(100 * 3)
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = 0
      positions[i * 3 + 1] = 0
      positions[i * 3 + 2] = 0
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    if (sleighRef.current) {
      const time = clock.getElapsedTime() * 0.3
      const progress = (time % 20) / 20

      // Flying path - arc across the sky
      const x = -25 + progress * 50
      const y = 3 + Math.sin(progress * Math.PI) * 2
      const z = -15 + Math.sin(progress * Math.PI * 2) * 5

      sleighRef.current.position.set(x, y, z)
      sleighRef.current.rotation.y = Math.PI * 0.2 + progress * 0.5
      sleighRef.current.rotation.z = Math.sin(progress * Math.PI) * 0.1

      // Update trail
      if (trailRef.current) {
        const positions = trailRef.current.geometry.attributes.position.array as Float32Array
        for (let i = positions.length - 3; i >= 3; i -= 3) {
          positions[i] = positions[i - 3]
          positions[i + 1] = positions[i - 2]
          positions[i + 2] = positions[i - 1]
        }
        positions[0] = x
        positions[1] = y
        positions[2] = z
        trailRef.current.geometry.attributes.position.needsUpdate = true
      }
    }
  })

  return (
    <>
      <group ref={sleighRef} scale={0.5}>
        {/* Sleigh body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 0.8, 1]} />
          <meshStandardMaterial color="#8B0000" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Sleigh runners */}
        <mesh position={[-0.7, -0.5, 0.6]} rotation={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.1, 0.1]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.7, -0.5, -0.6]} rotation={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.1, 0.1]} />
          <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Santa (simplified) */}
        <mesh position={[-0.3, 0.5, 0]}>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#FFDBAC" />
        </mesh>
        <mesh position={[-0.3, 1, 0]}>
          <coneGeometry args={[0.3, 0.5, 8]} />
          <meshStandardMaterial color="#C41E3A" />
        </mesh>
        {/* Reindeer (lead) */}
        <mesh position={[2, 0.3, 0]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Antlers */}
        <mesh position={[2.1, 0.6, 0.2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[2.1, 0.6, -0.2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Red nose */}
        <mesh position={[2.3, 0.3, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={2} />
        </mesh>
        {/* Gift sacks */}
        <mesh position={[0.5, 0.5, 0]}>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshStandardMaterial color="#0F7F3F" />
        </mesh>
      </group>

      {/* Magic trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={trailParticles.length / 3}
            array={trailParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#FFD700" transparent opacity={0.6} />
      </points>
    </>
  )
}

export default function ChristmasScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 75 }}
      style={{ background: 'linear-gradient(to bottom, #0a1628, #1a2332, #0d1b2a)' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[0, 5, -10]} intensity={1} color="#4169E1" />

      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

      {/* Aurora Borealis */}
      <AuroraBorealis />

      {/* Shooting Stars */}
      <ShootingStars />

      {/* Falling snow */}
      <Snowflakes />

      {/* Sparkles in foreground */}
      <Sparkles count={50} scale={15} size={2} speed={0.3} color="#FFD700" />

      {/* Santa's Sleigh flying like a dream */}
      <SantaSleigh />

      {/* Floating gifts */}
      <FloatingGifts />
    </Canvas>
  )
}
