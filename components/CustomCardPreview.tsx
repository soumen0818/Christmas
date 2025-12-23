'use client'

import { useRef } from 'react'
import { ChristmasCard } from '@/utils/storage'
import html2canvas from 'html2canvas'

interface CustomCardPreviewProps {
    card: ChristmasCard
    showActions?: boolean
}

export default function CustomCardPreview({ card, showActions = true }: CustomCardPreviewProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    const downloadCard = async () => {
        if (!cardRef.current) return

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                backgroundColor: null,
            })

            const link = document.createElement('a')
            link.download = `christmas-card-${card.name}-${Date.now()}.png`
            link.href = canvas.toDataURL('image/png')
            link.click()
        } catch (error) {
            console.error('Error downloading card:', error)
            alert('Failed to download card. Please try again.')
        }
    }

    const shareCard = async () => {
        if (!cardRef.current) return

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 2,
                backgroundColor: null,
            })

            canvas.toBlob(async (blob) => {
                if (!blob) return

                const file = new File([blob], `christmas-card-${card.name}.png`, { type: 'image/png' })

                if (navigator.share && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: 'My Christmas Card',
                        text: `Check out my magical Christmas card! 🎄✨`,
                        files: [file],
                    })
                } else {
                    // Fallback: copy to clipboard or download
                    downloadCard()
                }
            })
        } catch (error) {
            console.error('Error sharing card:', error)
        }
    }

    return (
        <div className="space-y-6">
            {/* Card Display */}
            <div
                ref={cardRef}
                className="relative w-full max-w-2xl mx-auto rounded-3xl shadow-2xl overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #1e40af 0%, #7c2d12 50%, #991b1b 100%)',
                    padding: '24px',
                    boxShadow: '0 30px 90px rgba(0,0,0,0.6), inset 0 0 60px rgba(255,215,0,0.2)',
                }}
            >
                {/* Decorative frame border */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        border: '12px solid #8B4513',
                        borderRadius: '24px',
                        boxShadow: 'inset 0 0 30px rgba(101,67,33,0.5), 0 0 20px rgba(0,0,0,0.3)',
                    }}
                ></div>

                {/* Inner decorative border */}
                <div className="absolute inset-0 pointer-events-none m-3"
                    style={{
                        border: '2px solid rgba(255,215,0,0.3)',
                        borderRadius: '20px',
                    }}
                ></div>

                {/* Corner decorations - Top Left Pine Branch */}
                <div className="absolute top-0 left-0 pointer-events-none z-10"
                    style={{
                        fontSize: '80px',
                        transform: 'rotate(-10deg)',
                        filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.5))',
                    }}
                >
                    🌲
                </div>
                <div className="absolute top-8 left-12 pointer-events-none z-10"
                    style={{ fontSize: '28px' }}
                >
                    🔴
                </div>
                <div className="absolute top-16 left-8 pointer-events-none z-10"
                    style={{ fontSize: '24px' }}
                >
                    🔴
                </div>
                <div className="absolute top-12 left-2 pointer-events-none z-10"
                    style={{ fontSize: '20px' }}
                >
                    🟡
                </div>

                {/* Top border garland with lights */}
                <div className="absolute top-3 left-20 right-20 h-12 flex justify-around items-center pointer-events-none z-10">
                    <span style={{ fontSize: '22px', filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))' }}>💡</span>
                    <span style={{ fontSize: '18px' }}>🎄</span>
                    <span style={{ fontSize: '22px', filter: 'drop-shadow(0 0 4px rgba(220,38,38,0.8))' }}>🔴</span>
                    <span style={{ fontSize: '18px' }}>🎄</span>
                    <span style={{ fontSize: '22px', filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))' }}>💡</span>
                    <span style={{ fontSize: '18px' }}>🎄</span>
                    <span style={{ fontSize: '22px', filter: 'drop-shadow(0 0 4px rgba(220,38,38,0.8))' }}>🔴</span>
                </div>

                {/* Corner decorations - Top Right Bow */}
                <div className="absolute top-4 right-8 pointer-events-none z-10"
                    style={{
                        fontSize: '70px',
                        filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.5))',
                    }}
                >
                    🎀
                </div>
                <div className="absolute top-2 right-6 pointer-events-none z-10"
                    style={{ fontSize: '32px' }}
                >
                    🟡
                </div>
                <div className="absolute top-16 right-12 pointer-events-none z-10"
                    style={{ fontSize: '24px' }}
                >
                    🔔
                </div>

                {/* Right side decorations */}
                <div className="absolute top-1/4 right-2 pointer-events-none z-10"
                    style={{ fontSize: '28px', transform: 'rotate(15deg)' }}
                >
                    🍬
                </div>
                <div className="absolute top-1/2 right-4 pointer-events-none z-10"
                    style={{ fontSize: '32px' }}
                >
                    🎁
                </div>
                <div className="absolute top-2/3 right-2 pointer-events-none z-10"
                    style={{ fontSize: '26px' }}
                >
                    🧦
                </div>

                {/* Left side decorations */}
                <div className="absolute top-1/3 left-2 pointer-events-none z-10"
                    style={{ fontSize: '30px', transform: 'rotate(-20deg)' }}
                >
                    🎁
                </div>
                <div className="absolute top-1/2 left-4 pointer-events-none z-10"
                    style={{ fontSize: '28px' }}
                >
                    🔔
                </div>
                <div className="absolute top-2/3 left-2 pointer-events-none z-10"
                    style={{ fontSize: '26px', transform: 'rotate(10deg)' }}
                >
                    🍬
                </div>

                {/* Corner decorations - Bottom Left Santa */}
                <div className="absolute bottom-2 left-4 pointer-events-none z-10"
                    style={{
                        fontSize: '90px',
                        filter: 'drop-shadow(4px 4px 10px rgba(0,0,0,0.6))',
                    }}
                >
                    🎅
                </div>
                <div className="absolute bottom-12 left-20 pointer-events-none z-10"
                    style={{ fontSize: '28px' }}
                >
                    🎁
                </div>

                {/* Bottom border decorations */}
                <div className="absolute bottom-3 left-32 right-32 h-12 flex justify-around items-center pointer-events-none z-10">
                    <span style={{ fontSize: '20px' }}>🔔</span>
                    <span style={{ fontSize: '24px' }}>⭐</span>
                    <span style={{ fontSize: '20px' }}>🔔</span>
                    <span style={{ fontSize: '24px' }}>⭐</span>
                    <span style={{ fontSize: '20px' }}>🔔</span>
                </div>

                {/* Corner decorations - Bottom Right Tree */}
                <div className="absolute bottom-0 right-6 pointer-events-none z-10"
                    style={{
                        fontSize: '95px',
                        filter: 'drop-shadow(4px 4px 10px rgba(0,0,0,0.6))',
                    }}
                >
                    🎄
                </div>
                <div className="absolute bottom-16 right-20 pointer-events-none z-10"
                    style={{ fontSize: '30px' }}
                >
                    🌟
                </div>
                <div className="absolute bottom-8 right-14 pointer-events-none z-10"
                    style={{ fontSize: '22px' }}
                >
                    ❤️
                </div>

                {/* Scattered snowflakes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-white"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 12 + 8}px`,
                                animation: `snowfall ${Math.random() * 15 + 12}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                                opacity: Math.random() * 0.5 + 0.3,
                            }}
                        >
                            ❄️
                        </div>
                    ))}
                </div>

                {/* Scattered gold stars */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 14 + 10}px`,
                                animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 3}s`,
                                filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.9))',
                            }}
                        >
                            ⭐
                        </div>
                    ))}
                </div>

                {/* Small ornaments scattered */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 12 + 10}px`,
                                opacity: 0.5,
                                animation: `float ${Math.random() * 6 + 6}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 4}s`,
                            }}
                        >
                            {['🔴', '🟡', '🎁', '🔔', '⭐', '🍬'][Math.floor(Math.random() * 6)]}
                        </div>
                    ))}
                </div>

                {/* Holly and berries decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 16 + 14}px`,
                                opacity: 0.6,
                                transform: `rotate(${Math.random() * 360}deg)`,
                            }}
                        >
                            🌿
                        </div>
                    ))}
                </div>

                {/* White/Cream content area */}
                <div className="relative rounded-2xl min-h-[650px] p-6 sm:p-8 md:p-12"
                    style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #fff9e6 30%, #ffe4cc 60%, #ffffff 100%)',
                        boxShadow: 'inset 0 0 40px rgba(139,69,19,0.15), 0 8px 32px rgba(0,0,0,0.3)',
                    }}
                >
                    {/* Decorative header swirl */}
                    <div className="text-center mb-6 sm:mb-8 mt-2 sm:mt-4">
                        <div className="text-4xl mb-2">✨</div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl py-2 px-4"
                            style={{
                                fontFamily: '"Mountains of Christmas", cursive',
                                color: '#16A34A',
                                letterSpacing: '3px',
                                fontWeight: 700,
                                textShadow: '2px 2px 0px #DC2626, 4px 4px 0px #F59E0B, 1px 1px 10px rgba(0,0,0,0.3)',
                            }}
                        >
                            MERRY CHRISTMAS
                        </h1>
                        <div className="flex justify-center items-center gap-2 mt-3">
                            <div className="w-16 sm:w-24 h-0.5 rounded-full bg-gradient-to-r from-transparent via-red-500 to-red-500"></div>
                            <span className="text-2xl">🎄</span>
                            <div className="w-16 sm:w-24 h-0.5 rounded-full bg-gradient-to-l from-transparent via-green-600 to-green-600"></div>
                        </div>
                    </div>

                    {/* User Image with decorative frame */}
                    {card.image && (
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="relative inline-block">
                                {/* Decorative corners around image */}
                                <div className="absolute -top-3 -left-3 text-3xl">🌟</div>
                                <div className="absolute -top-3 -right-3 text-3xl">🌟</div>
                                <div className="absolute -bottom-3 -left-3 text-3xl">❤️</div>
                                <div className="absolute -bottom-3 -right-3 text-3xl">❤️</div>

                                <div className="relative rounded-xl overflow-hidden"
                                    style={{
                                        background: 'linear-gradient(145deg, #B45309, #D97706, #B45309)',
                                        padding: '10px',
                                        boxShadow: '0 10px 30px rgba(139,69,19,0.5), 0 0 20px rgba(217,119,6,0.3)',
                                    }}
                                >
                                    <img
                                        src={card.image}
                                        alt={card.name}
                                        className="w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-52 lg:h-60 object-cover rounded-lg"
                                        style={{
                                            border: '4px solid rgba(255,255,255,0.8)',
                                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
                                        }}
                                    />
                                </div>

                                {/* Name label with heart decorations */}
                                <div className="mt-4 sm:mt-5 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <span className="text-lg">💝</span>
                                        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold"
                                            style={{
                                                fontFamily: '"Mountains of Christmas", cursive',
                                                color: '#8B4513',
                                                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                                                letterSpacing: '2px',
                                            }}
                                        >
                                            {card.name}
                                        </p>
                                        <span className="text-lg">💝</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Custom Message with decorative border */}
                    <div className="relative rounded-xl p-5 sm:p-6 md:p-8 mb-5 sm:mb-6"
                        style={{
                            background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.7) 0%, rgba(255, 237, 213, 0.7) 100%)',
                            border: '3px double rgba(180, 83, 9, 0.5)',
                            boxShadow: '0 4px 20px rgba(139,69,19,0.2), inset 0 0 20px rgba(255,255,255,0.5)',
                        }}
                    >
                        {/* Decorative top corner */}
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-2xl">💌</div>

                        <pre className="text-sm sm:text-base md:text-lg lg:text-xl whitespace-pre-wrap leading-relaxed text-center pt-4"
                            style={{
                                fontFamily: '"Satisfy", cursive',
                                fontWeight: '400',
                                color: '#654321',
                                textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.1)',
                            }}
                        >
                            {card.message}
                        </pre>

                        {/* Decorative bottom corners */}
                        <div className="absolute -bottom-2 left-4 text-xl">🎁</div>
                        <div className="absolute -bottom-2 right-4 text-xl">🎁</div>
                    </div>

                    {/* Special Note with enhanced styling */}
                    {card.specialNote && (
                        <div className="relative rounded-xl p-5 sm:p-6 md:p-7 mb-4 sm:mb-6"
                            style={{
                                background: 'linear-gradient(135deg, rgba(220, 252, 231, 0.8) 0%, rgba(187, 247, 208, 0.8) 100%)',
                                border: '3px dashed rgba(220,38,38,0.6)',
                                boxShadow: '0 4px 20px rgba(22,163,74,0.3), inset 0 0 15px rgba(255,255,255,0.6)',
                            }}
                        >
                            <div className="text-center mb-3 sm:mb-4">
                                <div className="inline-flex items-center gap-2">
                                    <span className="text-xl">✨</span>
                                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-3 sm:px-4 py-1.5 rounded-full inline-block"
                                        style={{
                                            background: 'linear-gradient(135deg, #DC2626, #F59E0B, #16A34A)',
                                            color: '#fff',
                                            boxShadow: '0 3px 10px rgba(220,38,38,0.5)',
                                        }}
                                    >
                                        ⭐ SPECIAL NOTE ⭐
                                    </span>
                                    <span className="text-xl">✨</span>
                                </div>
                            </div>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-center italic leading-relaxed px-2 sm:px-4"
                                style={{
                                    fontFamily: '"Caveat", cursive',
                                    color: '#065f46',
                                    textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
                                    fontWeight: 600,
                                }}
                            >
                                {card.specialNote}
                            </p>
                        </div>
                    )}

                    {/* Footer decorative elements with hearts */}
                    <div className="text-center mt-6 sm:mt-8 mb-4">
                        <div className="inline-flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl mb-2">
                            <span>🎁</span>
                            <span>🎄</span>
                            <span>⭐</span>
                            <span>💝</span>
                            <span>🎄</span>
                            <span>🎁</span>
                        </div>
                        <div className="text-sm sm:text-base italic mt-2"
                            style={{
                                fontFamily: '"Caveat", cursive',
                                color: '#8B4513',
                            }}
                        >
                            With Love & Joy ✨
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            {showActions && (
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
                    <button
                        onClick={downloadCard}
                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-christmas-green to-green-700 hover:from-green-700 hover:to-christmas-green text-white rounded-lg font-christmas text-base sm:text-lg transition-all shadow-lg hover:shadow-xl"
                    >
                        📥 Download Card
                    </button>
                    <button
                        onClick={shareCard}
                        className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-christmas-gold to-yellow-600 hover:from-yellow-600 hover:to-christmas-gold text-white rounded-lg font-christmas text-base sm:text-lg transition-all shadow-lg hover:shadow-xl"
                    >
                        📤 Share Card
                    </button>
                </div>
            )}
        </div>
    )
}
