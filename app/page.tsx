'use client'

import { useState, useEffect } from 'react'
import LoadingPage from '@/components/LoadingPage'
import SantaVanScene from '@/components/SantaVanScene'
import CardGenerator from '@/components/CardGenerator'
import CustomCardGenerator from '@/components/CustomCardGenerator'
import SantaChat from '@/components/SantaChat'
import GalleryView from '@/components/GalleryView'
import TicTacToeSanta from '@/components/TicTacToeSanta'

export default function Home() {
  // Playlist - add your music files here
  const playlist = [
    '/Christmas%20Spirit.mp3',
    '/Dark%20Christmas.mp3',
    '/We%20Wish%20You.mp3',
  ]
  const initialTrackIndex = Math.floor(Math.random() * playlist.length)

  const [currentView, setCurrentView] = useState<'home' | 'generator' | 'custom' | 'santa' | 'gallery' | 'tictactoe'>('home')
  const [userCard, setUserCard] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const songs = playlist
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex)
  const [currentTrack, setCurrentTrack] = useState(() => playlist[initialTrackIndex])
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)


  // Set loading state only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    if (!audio || isLoading || !hasInteracted) return

    audio.src = currentTrack
    audio.load()

    const playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMusicPlaying(true)
        })
        .catch(() => {
          setIsMusicPlaying(false)
        })
    }
  }, [currentTrack, hasInteracted, isLoading])

  useEffect(() => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    if (!audio) return

    const handleEnded = () => {
      const available = songs.length
      if (available === 0) return
      const next = songs.length === 1
        ? songs[0]
        : (() => {
            let pick = songs[Math.floor(Math.random() * songs.length)]
            while (pick === currentTrack && songs.length > 1) {
              pick = songs[Math.floor(Math.random() * songs.length)]
            }
            return pick
          })()
      setCurrentTrack(next)
      const idx = playlist.indexOf(next)
      if (idx >= 0) setCurrentTrackIndex(idx)
    }

    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [currentTrack, songs, playlist])

  const handleMusicButton = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    if (!audio) return

    // Mark interaction on first click
    if (!hasInteracted) {
      setHasInteracted(true)
      // Play random track on first interaction
      const nextIndex = Math.floor(Math.random() * playlist.length)
      const nextTrack = playlist[nextIndex]
      setCurrentTrackIndex(nextIndex)
      setCurrentTrack(nextTrack)
      return
    }

    // Toggle play/pause on subsequent clicks
    if (isMusicPlaying) {
      audio.pause()
      setIsMusicPlaying(false)
    } else {
      audio.play()
      setIsMusicPlaying(true)
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
    setCurrentTrack(playlist[newIndex])
    if (audio) {
      audio.src = playlist[newIndex]
      if (isMusicPlaying) audio.play()
    }
  }

  const nextTrack = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement
    const newIndex = currentTrackIndex === playlist.length - 1 ? 0 : currentTrackIndex + 1
    setCurrentTrackIndex(newIndex)
    setCurrentTrack(playlist[newIndex])
    if (audio) {
      audio.src = playlist[newIndex]
      if (isMusicPlaying) audio.play()
    }
  }

  return (
    <main className="relative w-full min-h-screen overflow-hidden christmas-bg">
      {/* Background Music */}
      <audio id="bg-music" />


      {/* Three.js Background - Santa's Van Scene */}
      <div className="fixed inset-0 z-0">
        <SantaVanScene />
      </div>

      {/* Music Player - Top Right */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full px-3 py-2">
          <button
            onClick={handleMusicButton}
            className="h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white flex items-center justify-center shadow-xl transition-all hover:scale-110"
            aria-label="Play or pause music"
          >
            {isMusicPlaying ? '🎅' : '🎅'}
          </button>
        </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 max-w-6xl w-full px-4">
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

              <button
                onClick={() => setCurrentView('tictactoe')}
                className="bg-amber-900/30 hover:bg-amber-800/40 backdrop-blur-sm text-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl card-glow transition-all duration-300 hover:scale-105 font-christmas text-lg sm:text-xl md:text-2xl border border-amber-400/50"
              >
                <div className="text-4xl sm:text-5xl mb-3 md:mb-4">❄️🎅</div>
                Santa Special Game
                <p className="text-xs sm:text-sm font-sans mt-2 opacity-90">Play with Santa </p>
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

        {currentView === 'tictactoe' && (
          <TicTacToeSanta onBack={() => setCurrentView('home')} />
        )}
      </div>

    </main>
  )
}
