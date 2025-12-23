'use client'

import { useState, useEffect } from 'react'
import SantaVanScene from '@/components/SantaVanScene'
import CardGenerator from '@/components/CardGenerator'
import SantaChat from '@/components/SantaChat'
import GalleryView from '@/components/GalleryView'

export default function Home() {
  const [currentView, setCurrentView] = useState<'home' | 'generator' | 'santa' | 'gallery'>('home')
  const [userCard, setUserCard] = useState<any>(null)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative w-full min-h-screen overflow-hidden christmas-bg">
      {/* Three.js Background - Santa's Van Scene */}
      <div className="fixed inset-0 z-0">
        <SantaVanScene />
      </div>

      {/* Welcome Overlay */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity px-4">
          <div className="text-center animate-pulse">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-christmas text-christmas-gold glow-text mb-4">
              🎄 Marry Christmas 🎄
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white font-dancing">Loading wonder...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {currentView === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
            <div className="text-center mb-8 sm:mb-10 md:mb-12 float">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-christmas text-christmas-gold glow-text mb-3 md:mb-4 px-2">
                🎅 Marry Christmas 🎄
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-dancing mb-2 px-2">
                Create Your Magical Christmas Card
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-4">
                Design a personalized card, receive a special gift from Santa, and spread joy this holiday season!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-5xl w-full px-4">
              <button
                onClick={() => setCurrentView('generator')}
                className="bg-gradient-to-br from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl card-glow transition-all duration-300 hover:scale-105 font-christmas text-lg sm:text-xl md:text-2xl border border-blue-700"
              >
                <div className="text-4xl sm:text-5xl mb-3 md:mb-4">🎁</div>
                Create Card
                <p className="text-xs sm:text-sm font-sans mt-2 opacity-90">Design your magical card</p>
              </button>

              <button
                onClick={() => setCurrentView('santa')}
                className="bg-gradient-to-br from-slate-800 to-slate-950 hover:from-slate-700 hover:to-slate-800 text-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl card-glow transition-all duration-300 hover:scale-105 font-christmas text-lg sm:text-xl md:text-2xl border border-slate-600"
              >
                <div className="text-4xl sm:text-5xl mb-3 md:mb-4">🎅</div>
                Meet Santa
                <p className="text-xs sm:text-sm font-sans mt-2 opacity-90">Claim your virtual gift</p>
              </button>

              <button
                onClick={() => setCurrentView('gallery')}
                className="bg-gradient-to-br from-cyan-900 to-cyan-950 hover:from-cyan-800 hover:to-cyan-900 text-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl card-glow transition-all duration-300 hover:scale-105 font-christmas text-lg sm:text-xl md:text-2xl border border-cyan-700"
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

        {currentView === 'santa' && (
          <SantaChat
            userCard={userCard}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'gallery' && (
          <GalleryView onBack={() => setCurrentView('home')} />
        )}
      </div>
    </main>
  )
}
