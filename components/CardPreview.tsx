'use client'

import { useRef, useEffect, useMemo } from 'react'
import { ChristmasCard } from '@/utils/storage'
import html2canvas from 'html2canvas'

interface CardPreviewProps {
  card: ChristmasCard
  showActions?: boolean
}

export default function CardPreview({ card, showActions = true }: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Precompute decorative particles once to avoid reflow churn during renders
  const snowFlakes = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: `snow-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 8 + 4}px`,
        duration: `${Math.random() * 10 + 10}s`,
        delay: `${Math.random() * 5}s`,
      })),
    []
  )

  const starBursts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: `star-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 60}%`,
        fontSize: `${Math.random() * 6 + 4}px`,
        duration: `${Math.random() * 3 + 2}s`,
        delay: `${Math.random() * 3}s`,
        filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.8))',
      })),
    []
  )

  // Change to "We Wish You" song when entering this page
  useEffect(() => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    if (audio) {
      audio.src = '/We%20Wish%20You.mp3'
      audio.load()
      // Always play this track when entering preview
      audio.play().catch(() => {

      })
    }
  }, [])

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
        className="relative w-full max-w-xl mx-auto rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #1a2d3a 0%, #2c3e50 30%, #1e3a4c 60%, #0f1f2a 100%)',
          boxShadow: '0 25px 70px rgba(0,0,0,0.8), inset 0 0 80px rgba(196,30,58,0.15)',
        }}
      >
        {/* Christmas tree images - background layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <img
            src="/christmas_tree.jpg"
            alt=""
            className="absolute left-1/2 bottom-0 -translate-x-1/2"
            style={{
              height: '55%',
              width: 'auto',
              opacity: 0.5,
              mixBlendMode: 'screen',
              filter: 'brightness(1.2) saturate(1.3) blur(1.5px)',
            }}
          />
          <img
            src="/christmas_tree.jpg"
            alt=""
            className="absolute left-[5%] bottom-0"
            style={{
              height: '40%',
              width: 'auto',
              opacity: 0.4,
              mixBlendMode: 'screen',
              filter: 'brightness(1.1) saturate(1.2) blur(2px)',
            }}
          />
          <img
            src="/christmas_tree.jpg"
            alt=""
            className="absolute right-[5%] bottom-0"
            style={{
              height: '40%',
              width: 'auto',
              opacity: 0.4,
              mixBlendMode: 'screen',
              filter: 'brightness(1.1) saturate(1.2) blur(2px)',
            }}
          />
        </div>

        {/* Falling snow effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {snowFlakes.map((flake) => (
            <div
              key={flake.id}
              className="absolute text-white opacity-60"
              style={{
                left: flake.left,
                top: flake.top,
                fontSize: flake.fontSize,
                animation: `snowfall ${flake.duration} linear infinite`,
                animationDelay: flake.delay,
              }}
            >
              ❄
            </div>
          ))}
        </div>

        {/* Twinkling stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {starBursts.map((star) => (
            <div
              key={star.id}
              className="absolute"
              style={{
                left: star.left,
                top: star.top,
                fontSize: star.fontSize,
                animation: `sparkle ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
                filter: star.filter,
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* Hanging golden stars at top */}
        <div className="absolute top-0 left-0 w-full h-24 pointer-events-none overflow-hidden z-10">
          <div className="absolute top-0 left-8" style={{ animation: 'swing 3s ease-in-out infinite' }}>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-yellow-600 to-transparent"></div>
            <div className="text-3xl" style={{ filter: 'drop-shadow(0 0 10px #FFD700)' }}>⭐</div>
          </div>
          <div className="absolute top-0 left-24" style={{ animation: 'swing 3.5s ease-in-out infinite', animationDelay: '0.5s' }}>
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-yellow-600 to-transparent"></div>
            <div className="text-2xl" style={{ filter: 'drop-shadow(0 0 8px #FFD700)' }}>⭐</div>
          </div>
          <div className="absolute top-0 right-8" style={{ animation: 'swing 3.2s ease-in-out infinite', animationDelay: '1s' }}>
            <div className="h-14 w-px bg-gradient-to-b from-transparent via-yellow-600 to-transparent"></div>
            <div className="text-3xl" style={{ filter: 'drop-shadow(0 0 10px #FFD700)' }}>⭐</div>
          </div>
          <div className="absolute top-0 right-28" style={{ animation: 'swing 3.8s ease-in-out infinite', animationDelay: '0.3s' }}>
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-yellow-600 to-transparent"></div>
            <div className="text-xl" style={{ filter: 'drop-shadow(0 0 6px #FFD700)' }}>⭐</div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2" style={{ animation: 'swing 3.3s ease-in-out infinite', animationDelay: '0.7s' }}>
            <div className="h-20 w-px bg-gradient-to-b from-transparent via-yellow-600 to-transparent"></div>
            <div className="text-4xl" style={{ filter: 'drop-shadow(0 0 12px #FFD700)' }}>⭐</div>
          </div>
        </div>

        {/* Inner content area */}
        <div className="relative pt-28 pb-8 px-6 md:px-10 z-10" style={{
          minHeight: '500px'
        }}>
          {/* Decorative Christmas trees in corners */}
          <div className="absolute bottom-4 left-4 text-6xl opacity-70" style={{ filter: 'drop-shadow(0 0 10px rgba(15,127,63,0.8))' }}>🎄</div>
          <div className="absolute bottom-4 right-4 text-6xl opacity-70" style={{ filter: 'drop-shadow(0 0 10px rgba(15,127,63,0.8))' }}>🎄</div>

          {/* Santa signature at bottom */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-5xl mb-1" style={{ filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.8))' }}>🎅</div>
            <p className="text-xs text-white opacity-60" style={{ fontFamily: '"Satisfy", cursive', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              From: Santa's Workshop, North Pole
            </p>
          </div>

          {/* Scattered stars decoration */}
          <div className="absolute top-32 left-8 text-2xl sparkle" style={{ filter: 'drop-shadow(0 0 8px #FFD700)' }}>⭐</div>
          <div className="absolute top-36 right-12 text-xl sparkle" style={{ filter: 'drop-shadow(0 0 8px #FFD700)', animationDelay: '0.5s' }}>✨</div>
          <div className="absolute top-44 left-16 text-xl sparkle" style={{ filter: 'drop-shadow(0 0 8px #FFD700)', animationDelay: '1s' }}>⭐</div>
          <div className="absolute top-40 right-6 text-2xl sparkle" style={{ filter: 'drop-shadow(0 0 8px #FFD700)', animationDelay: '1.5s' }}>✨</div>

          {/* Card Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-4 md:mb-6">
              <div className="inline-block">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-3" style={{
                  fontFamily: '"Mountains of Christmas", cursive',
                  color: '#FFFFFF',
                  textShadow: '0 0 20px rgba(255,215,0,0.8), 0 0 30px rgba(255,255,255,0.5), 2px 2px 4px rgba(0,0,0,0.5)',
                  letterSpacing: '2px',
                  fontWeight: 700
                }}>
                  MERRY CHRISTMAS
                </h1>
              </div>
              <div className="w-24 sm:w-32 h-px mx-auto my-3 md:my-4" style={{
                background: 'linear-gradient(90deg, transparent, #FFD700, transparent)'
              }}></div>
            </div>

            {/* User Image */}
            {card.image && (
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="relative inline-block">
                  {/* Image - rectangular format with larger size */}
                  <div className="relative" style={{
                    background: 'linear-gradient(145deg, rgba(255,215,0,0.2), rgba(255,255,255,0.1))',
                    padding: '8px',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 2px 8px rgba(255,255,255,0.1)'
                  }}>
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-32 h-40 sm:w-40 sm:h-48 md:w-44 md:h-52 object-cover"
                      style={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
                        border: '3px solid rgba(255,255,255,0.4)'
                      }}
                    />
                    {/* Decorative corners */}
                    <div className="absolute top-1 left-1 text-xl" style={{ filter: 'drop-shadow(0 0 4px #FFD700)' }}>✨</div>
                    <div className="absolute top-1 right-1 text-xl" style={{ filter: 'drop-shadow(0 0 4px #FFD700)' }}>✨</div>
                    <div className="absolute bottom-1 left-1 text-xl" style={{ filter: 'drop-shadow(0 0 4px #FFD700)' }}>⭐</div>
                    <div className="absolute bottom-1 right-1 text-xl" style={{ filter: 'drop-shadow(0 0 4px #FFD700)' }}>⭐</div>
                  </div>

                  {/* Name label below image */}
                  <div className="mt-2 text-center">
                    <p className="text-white text-base sm:text-lg font-bold" style={{
                      fontFamily: '"Mountains of Christmas", cursive',
                      textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 10px rgba(255,215,0,0.6)',
                      letterSpacing: '1px'
                    }}>
                      {card.name}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Message */}
            <div className="relative rounded-lg p-4 md:p-5 lg:p-6 mb-3 md:mb-4" style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <pre className="text-xs sm:text-sm md:text-base whitespace-pre-wrap leading-relaxed text-center" style={{
                fontFamily: card.gender === 'female' ? '"Satisfy", cursive' : '"Caveat", cursive',
                fontWeight: card.gender === 'female' ? '400' : '600',
                fontSize: card.gender === 'female' ? 'clamp(0.75rem, 2vw, 0.95rem)' : 'clamp(0.7rem, 2vw, 0.9rem)',
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)'
              }}>
                {card.message}
              </pre>
            </div>

            {/* Footer ornament */}
            <div className="text-center mt-4">
              <div className="inline-flex items-center gap-2 text-2xl opacity-80">
                <span style={{ filter: 'drop-shadow(0 0 5px #FFD700)' }}>✨</span>
                <span style={{ filter: 'drop-shadow(0 0 5px #FFFFFF)' }}>❄️</span>
                <span style={{ filter: 'drop-shadow(0 0 5px #FFD700)' }}>⭐</span>
                <span style={{ filter: 'drop-shadow(0 0 5px #FFFFFF)' }}>❄️</span>
                <span style={{ filter: 'drop-shadow(0 0 5px #FFD700)' }}>✨</span>
              </div>
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
