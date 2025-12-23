'use client'

import { useEffect, useState } from 'react'
import SantaVanScene from './SantaVanScene'

interface LoadingPageProps {
    onLoadComplete: () => void
}

export default function LoadingPage({ onLoadComplete }: LoadingPageProps) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Faster loading progress - completes in ~1 second
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => onLoadComplete(), 500)
                    return 100
                }
                return prev + 5
            })
        }, 100)

        return () => clearInterval(interval)
    }, [onLoadComplete])

    return (
        <div className="fixed inset-0 z-50 w-full h-screen overflow-hidden">
            {/* Three.js Background - Santa's Van Scene */}
            <div className="absolute inset-0 z-0">
                <SantaVanScene />
            </div>

            {/* Loading Overlay */}
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
                <div className="text-center px-4">
                    {/* Santa Loading GIF */}
                    <div className="mb-4 sm:mb-6 flex justify-center">
                        <img
                            src="/santa_loading.gif"
                            alt="Santa Loading..."
                            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain"
                            loading="eager"
                            onError={(e) => {
                                console.error('Failed to load santa_loading.gif')
                                e.currentTarget.style.display = 'none'
                            }}
                        />
                    </div>

                    {/* Welcome Text */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-christmas text-christmas-gold mb-4 sm:mb-6">
                        🎄 Merry Christmas 🎄
                    </h1>

                    {/* Loading Text */}
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-dancing animate-pulse mb-4 sm:mb-6">
                        Loading Christmas wonder...
                    </p>

                    {/* Progress Bar */}
                    <div className="max-w-xs sm:max-w-md mx-auto px-4">
                        <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3 md:h-4 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-green h-full rounded-full transition-all duration-200 ease-out"
                                style={{ width: `${progress}%` }}
                            >
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm md:text-base mt-2 sm:mt-3 font-dancing text-white font-bold">
                            {progress}%
                        </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                        <span className="animate-bounce" style={{ animationDelay: '0s' }}>⭐</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎁</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎅</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🎁</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>⭐</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
