'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Stars, Sparkles, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Santa walking with gift sack on his back
function WalkingSanta() {
    const santaRef = useRef<THREE.Group>(null)
    const giftSackRef = useRef<THREE.Group>(null)
    const leftLegRef = useRef<THREE.Mesh>(null)
    const rightLegRef = useRef<THREE.Mesh>(null)
    const leftArmRef = useRef<THREE.Mesh>(null)
    const rightArmRef = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        if (santaRef.current) {
            const time = clock.getElapsedTime() * 0.5 // Faster movement
            const progress = (time % 25) / 25

            // Walking path - horizontal movement at bottom of screen
            const x = -25 + progress * 50
            const walkCycle = Math.sin(time * 8) // Faster walking animation cycle
            const y = -6 + Math.abs(walkCycle) * 0.15 // Running at the bottom
            const z = 2 // Closer to camera, at bottom

            santaRef.current.position.set(x, y, z)
            santaRef.current.rotation.y = 0.2

            // Animate legs walking faster
            if (leftLegRef.current && rightLegRef.current) {
                leftLegRef.current.rotation.x = Math.sin(time * 8) * 0.5
                rightLegRef.current.rotation.x = Math.sin(time * 8 + Math.PI) * 0.5
            }

            // Animate arms swinging faster
            if (leftArmRef.current && rightArmRef.current) {
                leftArmRef.current.rotation.x = Math.sin(time * 8 + Math.PI) * 0.3
                rightArmRef.current.rotation.x = Math.sin(time * 8) * 0.3
            }

            // Bounce gift sack faster
            if (giftSackRef.current) {
                giftSackRef.current.rotation.z = Math.sin(time * 8) * 0.1
                giftSackRef.current.position.y = Math.sin(time * 8) * 0.05
            }
        }
    })

    return (
        <group ref={santaRef} scale={1.2}>
            {/* Santa's Body */}
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.6, 0.7, 1.2, 16]} />
                <meshStandardMaterial color="#C41E3A" />
            </mesh>

            {/* White fur trim on coat */}
            <mesh position={[0, -0.05, 0]}>
                <cylinderGeometry args={[0.72, 0.72, 0.15, 16]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, 1.05, 0]}>
                <cylinderGeometry args={[0.62, 0.62, 0.15, 16]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>

            {/* Head */}
            <mesh position={[0, 1.6, 0]}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshStandardMaterial color="#FFDBAC" />
            </mesh>

            {/* Nose */}
            <mesh position={[0, 1.6, 0.4]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color="#FF6B6B" />
            </mesh>

            {/* Eyes */}
            <mesh position={[0.15, 1.7, 0.35]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[-0.15, 1.7, 0.35]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#000000" />
            </mesh>

            {/* Beard */}
            <mesh position={[0, 1.4, 0.3]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>

            {/* Santa Hat */}
            <mesh position={[0, 2.1, 0]} rotation={[0.2, 0, 0]}>
                <coneGeometry args={[0.35, 0.7, 16]} />
                <meshStandardMaterial color="#C41E3A" />
            </mesh>
            <mesh position={[0, 1.75, 0]}>
                <cylinderGeometry args={[0.42, 0.42, 0.12, 16]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0.1, 2.6, 0.2]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>

            {/* Belt */}
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.71, 0.71, 0.2, 16]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0, 0.5, 0.6]}>
                <boxGeometry args={[0.25, 0.25, 0.15]} />
                <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Arms */}
            <mesh ref={leftArmRef} position={[0.7, 0.8, 0]} rotation={[0, 0, -0.3]}>
                <cylinderGeometry args={[0.15, 0.12, 0.8, 12]} />
                <meshStandardMaterial color="#C41E3A" />
            </mesh>
            <mesh ref={rightArmRef} position={[-0.7, 0.8, 0]} rotation={[0, 0, 0.3]}>
                <cylinderGeometry args={[0.15, 0.12, 0.8, 12]} />
                <meshStandardMaterial color="#C41E3A" />
            </mesh>

            {/* Hands with mittens */}
            <mesh position={[0.7, 0.3, 0]}>
                <sphereGeometry args={[0.15, 12, 12]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[-0.7, 0.3, 0]}>
                <sphereGeometry args={[0.15, 12, 12]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>

            {/* Legs */}
            <mesh ref={leftLegRef} position={[0.25, -0.2, 0]}>
                <cylinderGeometry args={[0.18, 0.15, 0.8, 12]} />
                <meshStandardMaterial color="#C41E3A" />
            </mesh>
            <mesh ref={rightLegRef} position={[-0.25, -0.2, 0]}>
                <cylinderGeometry args={[0.18, 0.15, 0.8, 12]} />
                <meshStandardMaterial color="#C41E3A" />
            </mesh>

            {/* Boots */}
            <mesh position={[0.25, -0.7, 0.1]}>
                <boxGeometry args={[0.25, 0.2, 0.35]} />
                <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[-0.25, -0.7, 0.1]}>
                <boxGeometry args={[0.25, 0.2, 0.35]} />
                <meshStandardMaterial color="#000000" />
            </mesh>

            {/* Gift Sack on back */}
            <group ref={giftSackRef} position={[-0.5, 0.8, -0.4]}>
                {/* Main sack */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.7, 16, 16]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.9} />
                </mesh>
                {/* Rope tie */}
                <mesh position={[0, 0.6, 0]}>
                    <torusGeometry args={[0.3, 0.08, 8, 16]} />
                    <meshStandardMaterial color="#DAA520" />
                </mesh>
                {/* Gifts peeking out */}
                <mesh position={[0.2, 0.5, 0.2]}>
                    <boxGeometry args={[0.3, 0.3, 0.3]} />
                    <meshStandardMaterial color="#FFD700" metalness={0.5} roughness={0.5} />
                </mesh>
                <mesh position={[-0.2, 0.4, 0.1]}>
                    <boxGeometry args={[0.25, 0.25, 0.25]} />
                    <meshStandardMaterial color="#0F7F3F" metalness={0.5} roughness={0.5} />
                </mesh>
                <mesh position={[0.1, 0.6, -0.1]}>
                    <boxGeometry args={[0.2, 0.2, 0.2]} />
                    <meshStandardMaterial color="#C41E3A" metalness={0.5} roughness={0.5} />
                </mesh>
            </group>

            {/* Magic glow around Santa */}
            <pointLight position={[0, 1, 0]} intensity={0.8} color="#FFD700" distance={3} />
        </group>
    )
}

// Snowy ground
function SnowyGround() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="#F0F8FF" roughness={0.8} metalness={0.2} />
        </mesh>
    )
}

// Christmas trees lining the path
function ChristmasTrees() {
    const trees = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: (i % 2 === 0 ? -8 : 8),
            z: -15 + i * 5,
            scale: 0.6 + Math.random() * 0.4,
        }))
    }, [])

    return (
        <group>
            {trees.map((tree) => (
                <group key={tree.id} position={[tree.x, -1.5, tree.z]} scale={tree.scale}>
                    {/* Tree trunk */}
                    <mesh position={[0, 0, 0]}>
                        <cylinderGeometry args={[0.2, 0.2, 0.8, 8]} />
                        <meshStandardMaterial color="#4A3728" />
                    </mesh>
                    {/* Tree foliage - 3 layers */}
                    <mesh position={[0, 0.8, 0]}>
                        <coneGeometry args={[1, 1.5, 8]} />
                        <meshStandardMaterial color="#0F7F3F" />
                    </mesh>
                    <mesh position={[0, 1.5, 0]}>
                        <coneGeometry args={[0.8, 1.2, 8]} />
                        <meshStandardMaterial color="#0F7F3F" />
                    </mesh>
                    <mesh position={[0, 2.2, 0]}>
                        <coneGeometry args={[0.6, 1, 8]} />
                        <meshStandardMaterial color="#0F7F3F" />
                    </mesh>
                    {/* Star on top */}
                    <mesh position={[0, 3, 0]}>
                        <sphereGeometry args={[0.15, 8, 8]} />
                        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={2} />
                    </mesh>
                </group>
            ))}
        </group>
    )
}

// Falling snowflakes
function Snowflakes() {
    const points = useRef<THREE.Points>(null)

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(3000 * 3)
        for (let i = 0; i < 3000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 60
            positions[i * 3 + 1] = Math.random() * 30 - 5
            positions[i * 3 + 2] = (Math.random() - 0.5) * 60
        }
        return positions
    }, [])

    useFrame(() => {
        if (points.current) {
            const positions = points.current.geometry.attributes.position.array as Float32Array

            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= 0.02 // Fall speed
                if (positions[i + 1] < -5) {
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
                color="#FFFFFF"
                size={0.12}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>
    )
}

// Moon
function Moon() {
    return (
        <mesh position={[15, 12, -20]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="#FFF5E1" emissive="#FFF5E1" emissiveIntensity={0.5} />
        </mesh>
    )
}

// Glowing Christmas Tree centerpiece
function GlowingChristmasTree() {
    const treeRef = useRef<THREE.Group>(null)

    useFrame(({ clock }) => {
        if (treeRef.current) {
            treeRef.current.rotation.y = clock.getElapsedTime() * 0.1
        }
    })

    return (
        <group ref={treeRef} position={[0, -2, -5]}>
            {/* Main tree structure with glowing cyan layers */}
            <mesh position={[0, 1, 0]}>
                <coneGeometry args={[3, 2, 32]} />
                <meshStandardMaterial
                    color="#00CED1"
                    emissive="#00CED1"
                    emissiveIntensity={1.5}
                    transparent
                    opacity={0.7}
                />
            </mesh>
            <mesh position={[0, 2.5, 0]}>
                <coneGeometry args={[2.5, 2, 32]} />
                <meshStandardMaterial
                    color="#40E0D0"
                    emissive="#40E0D0"
                    emissiveIntensity={1.5}
                    transparent
                    opacity={0.7}
                />
            </mesh>
            <mesh position={[0, 4, 0]}>
                <coneGeometry args={[2, 2, 32]} />
                <meshStandardMaterial
                    color="#00FFFF"
                    emissive="#00FFFF"
                    emissiveIntensity={1.5}
                    transparent
                    opacity={0.7}
                />
            </mesh>
            <mesh position={[0, 5.5, 0]}>
                <coneGeometry args={[1.5, 2, 32]} />
                <meshStandardMaterial
                    color="#7FFFD4"
                    emissive="#7FFFD4"
                    emissiveIntensity={1.5}
                    transparent
                    opacity={0.7}
                />
            </mesh>

            {/* Star on top */}
            <mesh position={[0, 7, 0]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial
                    color="#FFFFFF"
                    emissive="#FFFFFF"
                    emissiveIntensity={3}
                />
            </mesh>

            {/* Glowing cyan point lights */}
            <pointLight position={[0, 1, 0]} intensity={3} color="#00CED1" distance={15} />
            <pointLight position={[0, 3, 0]} intensity={3} color="#40E0D0" distance={15} />
            <pointLight position={[0, 5, 0]} intensity={3} color="#00FFFF" distance={15} />
            <pointLight position={[0, 7, 0]} intensity={5} color="#FFFFFF" distance={20} />
        </group>
    )
}

// Cyan glowing particles
function CyanParticles() {
    const points = useRef<THREE.Points>(null)

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(2000 * 3)
        for (let i = 0; i < 2000; i++) {
            const radius = 15
            const theta = Math.random() * Math.PI * 2
            const phi = Math.random() * Math.PI
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 5
            positions[i * 3 + 2] = radius * Math.cos(phi)
        }
        return positions
    }, [])

    useFrame(({ clock }) => {
        if (points.current) {
            points.current.rotation.y = clock.getElapsedTime() * 0.05
        }
    })

    return (
        <Points ref={points} positions={particlesPosition} stride={3}>
            <PointMaterial
                transparent
                color="#00CED1"
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
                emissive="#00CED1"
                emissiveIntensity={2}
            />
        </Points>
    )
}

// Snowfall effect
function Snowfall() {
    const points = useRef<THREE.Points>(null)

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(5000 * 3)
        for (let i = 0; i < 5000; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100
            positions[i * 3 + 1] = Math.random() * 50 - 10
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100
        }
        return positions
    }, [])

    useFrame(() => {
        if (points.current) {
            const positions = points.current.geometry.attributes.position.array as Float32Array

            for (let i = 0; i < positions.length; i += 3) {
                // Falling motion
                positions[i + 1] -= 0.03
                // Slight horizontal drift
                positions[i] += Math.sin(positions[i + 1] * 0.1) * 0.01

                // Reset when snowflake falls below ground
                if (positions[i + 1] < -10) {
                    positions[i + 1] = 40
                    positions[i] = (Math.random() - 0.5) * 100
                }
            }
            points.current.geometry.attributes.position.needsUpdate = true
        }
    })

    return (
        <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#FFFFFF"
                size={0.15}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.9}
            />
        </Points>
    )
}

export default function SantaVanScene() {
    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Background gradient */}
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, #000000, #001a1a, #000000)' }}
            />

            {/* Christmas tree images - blended with background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Center tree - main focal point */}
                <img
                    src="/christmas_tree.jpg"
                    alt=""
                    className="absolute left-1/2 bottom-0 -translate-x-1/2"
                    style={{
                        height: '60%',
                        width: 'auto',
                        opacity: 0.85,
                        mixBlendMode: 'screen',
                        filter: 'brightness(1.5) saturate(1.5) blur(0.5px)',
                    }}
                />
                {/* Left tree */}
                <img
                    src="/christmas_tree.jpg"
                    alt=""
                    className="absolute left-[10%] bottom-0"
                    style={{
                        height: '45%',
                        width: 'auto',
                        opacity: 0.65,
                        mixBlendMode: 'screen',
                        filter: 'brightness(1.4) saturate(1.4) blur(1px)',
                    }}
                />
                {/* Right tree */}
                <img
                    src="/christmas_tree.jpg"
                    alt=""
                    className="absolute right-[10%] bottom-0"
                    style={{
                        height: '45%',
                        width: 'auto',
                        opacity: 0.65,
                        mixBlendMode: 'screen',
                        filter: 'brightness(1.4) saturate(1.4) blur(1px)',
                    }}
                />
            </div>

            {/* 3D Canvas Layer */}
            <Canvas
                camera={{ position: [0, 2, 12], fov: 60 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'transparent'
                }}
            >
                {/* Ambient lighting */}
                <ambientLight intensity={0.3} />

                {/* Background stars */}
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.3} />

                {/* Santa running/walking */}
                <WalkingSanta />

                {/* Snowfall */}
                <Snowfall />

                {/* Cyan particles for magical atmosphere */}
                <CyanParticles />

                {/* Sparkles */}
                <Sparkles count={80} scale={25} size={3} speed={0.3} color="#FFD700" opacity={0.6} />
                <Sparkles count={60} scale={20} size={2} speed={0.4} color="#FFFFFF" opacity={0.7} />

                {/* Fog for depth */}
                <fog attach="fog" args={['#000000', 15, 40]} />
            </Canvas>
        </div>
    )
}
