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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-opacity">
          <div className="text-center animate-pulse">
            <h1 className="text-6xl md:text-8xl font-christmas text-christmas-gold glow-text mb-4">
              🎄 Christmas Magic 🎄
            </h1>
            <p className="text-2xl text-white font-dancing">Loading wonder...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {currentView === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <div className="text-center mb-12 float">
              <h1 className="text-6xl md:text-8xl font-christmas text-christmas-gold glow-text mb-4">
                🎅 Christmas Magic 🎄
              </h1>
              <p className="text-xl md:text-2xl text-white font-dancing mb-2">
                Create Your Magical Christmas Card
              </p>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                Design a personalized card, receive a special gift from Santa, and spread joy this holiday season!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
              <button
                onClick={() => setCurrentView('generator')}
                className="bg-gradient-to-br from-blue-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white p-8 rounded-2xl card-glow transition-all duration-300 hover:scale-105 font-christmas text-2xl border border-blue-700"
              >
                <div className="text-5xl mb-4">🎁</div>
                Create Card
                <p className="text-sm font-sans mt-2 opacity-90">Design your magical card</p>
              </button>

              <button
                onClick={() => setCurrentView('santa')}
                className="bg-gradient-to-br from-slate-800 to-slate-950 hover:from-slate-700 hover:to-slate-800 text-white p-8 rounded-2xl card-glow transition-all duration-300 hover:scale-105 font-christmas text-2xl border border-slate-600"
              >
                <div className="text-5xl mb-4">🎅</div>
                Meet Santa
                <p className="text-sm font-sans mt-2 opacity-90">Claim your virtual gift</p>
              </button>

              <button
                onClick={() => setCurrentView('gallery')}
                className="bg-gradient-to-br from-cyan-900 to-cyan-950 hover:from-cyan-800 hover:to-cyan-900 text-white p-8 rounded-2xl card-glow transition-all duration-300 hover:scale-105 font-christmas text-2xl border border-cyan-700"
              >
                <div className="text-5xl mb-4">🖼️</div>
                My Cards
                <p className="text-sm font-sans mt-2 opacity-90">View your collection</p>
              </button>
            </div>

            <div className="mt-12 text-center">
              <p className="text-white text-sm opacity-75">
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
