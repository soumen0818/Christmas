'use client'

import { useState, useEffect } from 'react'
import LoadingPage from '@/components/LoadingPage'
import SantaVanScene from '@/components/SantaVanScene'
import CardGenerator from '@/components/CardGenerator'
import CustomCardGenerator from '@/components/CustomCardGenerator'
import SantaChat from '@/components/SantaChat'
import GalleryView from '@/components/GalleryView'

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'generator' | 'custom' | 'santa' | 'gallery'>('home')
  const [userCard, setUserCard] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  // Playlist - add your music files here
  const playlist = [
    '/Dean_Martin.mp3',
    // Add more music files here as you upload them to public folder
    // Example: '/Jingle_Bells.mp3', '/Silent_Night.mp3'
  ]

  // Set loading state only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    if (audio && !isLoading) {
      // Try to play the audio
      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio started playing successfully
            setIsMusicPlaying(true)
          })
          .catch(() => {
            // Auto-play was prevented, set to false so user can click to play
            setIsMusicPlaying(false)
          })
      }
    }
  }, [isLoading])

  const toggleMusic = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    if (audio) {
      if (isMusicPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  // Show loading page only after component mounts (client-side only)
  if (!isMounted || isLoading) {
    return isLoading ? <LoadingPage onLoadComplete={() => setIsLoading(false)} /> : null
  }

  const previousTrack = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    const newIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1
    setCurrentTrackIndex(newIndex)
    if (audio) {
      audio.src = playlist[newIndex]
      if (isMusicPlaying) audio.play()
    }
  }

  const nextTrack = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    const newIndex = currentTrackIndex === playlist.length - 1 ? 0 : currentTrackIndex + 1
    setCurrentTrackIndex(newIndex)
    if (audio) {
      audio.src = playlist[newIndex]
      if (isMusicPlaying) audio.play()
    }
  }

  return (
    <main className="relative w-full min-h-screen overflow-hidden christmas-bg">
      {/* Background Music */}
      <audio id="bg-music" loop autoPlay>
        <source src={playlist[currentTrackIndex]} type="audio/mpeg" />
      </audio>

      {/* Three.js Background - Santa's Van Scene */}
      <div className="fixed inset-0 z-0">
        <SantaVanScene />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {currentView === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
            <div className="text-center mb-8 sm:mb-10 md:mb-12 float">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-christmas text-christmas-gold glow-text mb-3 md:mb-4 px-2">
                🎅 Merry Christmas 🎄
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-dancing mb-2 px-2">
                Create Your Magical Christmas Card
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-4">
                Design a personalized card, receive a special gift from Santa, and spread joy this holiday season!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-6xl w-full px-4">
              <button
                onClick={() => setCurrentView('generator')}
                className="bg-blue-900/30 hover:bg-blue-800/40 backdrop-blur-sm text-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl card-glow transition-all duration-300 hover:scale-105 font-christmas text-lg sm:text-xl md:text-2xl border border-blue-400/50"
              >
                <div className="text-4xl sm:text-5xl mb-3 md:mb-4">🎁</div>
                Create Card
                <p className="text-xs sm:text-sm font-sans mt-2 opacity-90">Design your magical card</p>
              </button>

              <button
                onClick={() => setCurrentView('custom')}
                className="bg-purple-900/30 hover:bg-purple-800/40 backdrop-blur-sm text-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl card-glow transition-all duration-300 hover:scale-105 font-christmas text-lg sm:text-xl md:text-2xl border border-purple-400/50"
              >
                <div className="text-4xl sm:text-5xl mb-3 md:mb-4">💌</div>
                Custom Card
                <p className="text-xs sm:text-sm font-sans mt-2 opacity-90">Write your own message</p>
              </button>

              <button
                onClick={() => setCurrentView('santa')}
                className="bg-slate-800/30 hover:bg-slate-700/40 backdrop-blur-sm text-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl card-glow transition-all duration-300 hover:scale-105 font-christmas text-lg sm:text-xl md:text-2xl border border-slate-400/50"
              >
                <div className="text-4xl sm:text-5xl mb-3 md:mb-4">🎅</div>
                Meet Santa
                <p className="text-xs sm:text-sm font-sans mt-2 opacity-90">Claim your virtual gift</p>
              </button>

              <button
                onClick={() => setCurrentView('gallery')}
                className="bg-cyan-900/30 hover:bg-cyan-800/40 backdrop-blur-sm text-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl card-glow transition-all duration-300 hover:scale-105 font-christmas text-lg sm:text-xl md:text-2xl border border-cyan-400/50"
              >
                <div className="text-4xl sm:text-5xl mb-3 md:mb-4">🖼️</div>
                My Cards
                <p className="text-xs sm:text-sm font-sans mt-2 opacity-90">View your collection</p>
              </button>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12 text-center px-4">
              <p className="text-white text-xs sm:text-sm opacity-75">
                ✨ All your cards are saved locally on your device ✨
              </p>
            </div>
          </div>
        )}

        {currentView === 'generator' && (
          <CardGenerator
            onBack={() => setCurrentView('home')}
            onCardCreated={(card) => {
              setUserCard(card)
              setCurrentView('santa')
            }}
          />
        )}

        {currentView === 'custom' && (
          <CustomCardGenerator onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'santa' && (
          <SantaChat
            userCard={userCard}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'gallery' && (
          <GalleryView
            onBack={() => setCurrentView('home')}
            onClaimGift={(card) => {
              setUserCard(card)
              setCurrentView('santa')
            }}
          />
        )}
      </div>

      {/* Music Controls - Bottom Center */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border border-christmas-gold/30 shadow-2xl">
        {/* Previous Track - Tree Icon */}
        <button
          onClick={previousTrack}
          className="text-lg sm:text-xl md:text-2xl hover:scale-110 transition-transform"
          aria-label="Previous track"
          title="Previous track"
          style={{ transform: 'rotate(0deg)' }}
        >
          <span className="inline-block" style={{ transform: 'rotate(270deg)' }}>🌲</span>
        </button>

        {/* Play/Pause - Santa Icon */}
        <button
          onClick={toggleMusic}
          className="bg-christmas-red hover:bg-red-700 text-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Toggle music"
        >
          {isMusicPlaying ? (
            <div className="text-xl sm:text-2xl">🎅</div>
          ) : (
            <div className="text-xl sm:text-2xl opacity-50">🎅</div>
          )}
        </button>

        {/* Next Track - Tree Icon */}
        <button
          onClick={nextTrack}
          className="text-lg sm:text-xl md:text-2xl hover:scale-110 transition-transform"
          aria-label="Next track"
          title="Next track"
          style={{ transform: 'rotate(0deg)' }}
        >
          <span className="inline-block" style={{ transform: 'rotate(90deg)' }}>🎄</span>
        </button>
      </div>
    </main>
  )
}
