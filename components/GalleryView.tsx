'use client'

import { useState, useEffect } from 'react'
import { cardStorage, ChristmasCard } from '@/utils/storage'
import CardPreview from './CardPreview'

interface GalleryViewProps {
  onBack: () => void
}

export default function GalleryView({ onBack }: GalleryViewProps) {
  const [cards, setCards] = useState<ChristmasCard[]>([])
  const [selectedCard, setSelectedCard] = useState<ChristmasCard | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setCards(cardStorage.getAllCards())
  }

  const handleCardClick = (card: ChristmasCard) => {
    setSelectedCard(card)
  }

  const handleDelete = (cardId: string) => {
    if (confirm('Are you sure you want to delete this card?')) {
      cardStorage.deleteCard(cardId)
      loadData()
      setSelectedCard(null)
    }
  }

  if (selectedCard) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedCard(null)}
            className="mb-6 px-6 py-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-lg transition-all shadow-lg"
          >
            ← Back to Gallery
          </button>

          <CardPreview card={selectedCard} />

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => handleDelete(selectedCard.id)}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
            >
              🗑️ Delete Card
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen p-8 overflow-hidden">

      {/* Falling snow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 6}px`,
              animation: `snowfall ${Math.random() * 12 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              fontSize: `${Math.random() * 8 + 6}px`,
              animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))',
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        <button
          onClick={onBack}
          className="mb-6 px-6 py-3 bg-slate-800 bg-opacity-90 hover:bg-opacity-100 rounded-lg transition-all shadow-lg text-white border border-slate-600"
        >
          ← Back to Home
        </button>

        <div className="relative bg-slate-900 bg-opacity-0 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-700 overflow-hidden">
          {/* Christmas tree for gallery container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
            <img
              src="/christmas_tree.jpg"
              alt=""
              className="absolute left-1/2 bottom-0 -translate-x-1/2"
              style={{
                height: '70%',
                width: 'auto',
                opacity: 0.7,
                mixBlendMode: 'screen',
                filter: 'brightness(1.3) saturate(1.4) blur(1px)',
              }}
            />
          </div>

          {/* Snowflakes for gallery container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute text-white opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 10 + 6}px`,
                  animation: `snowfall ${Math.random() * 12 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              >
                ❄
              </div>
            ))}
          </div>

          {/* Stars for gallery container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 70}%`,
                  fontSize: `${Math.random() * 8 + 6}px`,
                  animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                  filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
                }}
              >
                ✨
              </div>
            ))}
          </div>


          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-christmas text-christmas-gold text-center mb-8 glow-text">
              🎄 Your Christmas Collection 🎁
            </h2>

            {cards.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-xl text-gray-200 mb-2">No cards yet!</p>
                <p className="text-gray-400">Create your first magical Christmas card to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => {
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className="relative bg-slate-900 bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer hover:scale-105 border-2 border-christmas-gold overflow-hidden"
                    >
                      {/* Christmas tree for this card */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
                        <img
                          src="/christmas_tree.jpg"
                          alt=""
                          className="absolute left-1/2 bottom-0 -translate-x-1/2"
                          style={{
                            height: '80%',
                            width: 'auto',
                            opacity: 0.7,
                            mixBlendMode: 'screen',
                            filter: 'brightness(1.2) saturate(1.3) blur(1px)',
                          }}
                        />
                      </div>

                      {/* Snowflakes for this card */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(5)].map((_, idx) => (
                          <div
                            key={idx}
                            className="absolute text-white opacity-60"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              fontSize: `${Math.random() * 8 + 4}px`,
                              animation: `snowfall ${Math.random() * 10 + 8}s linear infinite`,
                              animationDelay: `${Math.random() * 4}s`,
                            }}
                          >
                            ❄
                          </div>
                        ))}
                      </div>

                      {/* Stars for this card */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(3)].map((_, idx) => (
                          <div
                            key={idx}
                            className="absolute"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 60}%`,
                              fontSize: `${Math.random() * 6 + 4}px`,
                              animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                              animationDelay: `${Math.random() * 3}s`,
                              filter: 'drop-shadow(0 0 3px rgba(255,215,0,0.8))',
                            }}
                          >
                            ✨
                          </div>
                        ))}
                      </div>

                      {card.image && (
                        <div className="flex justify-center mb-4 relative z-10">
                          <img
                            src={card.image}
                            alt={card.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-christmas-gold"
                          />
                        </div>
                      )}

                      <h3 className="text-2xl font-christmas text-christmas-gold text-center mb-2 relative z-10">
                        {card.name}
                      </h3>

                      <div className="text-center text-gray-300 text-sm mb-3 relative z-10">
                        {card.gender === 'female' ? '👧' : card.gender === 'male' ? '👦' : '🌟'}
                        <span className="ml-2">
                          {new Date(card.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="bg-slate-700 bg-opacity-60 rounded-lg p-3 text-sm text-gray-200 line-clamp-3 relative z-10">
                        {card.message}
                      </div>

                      <div className="mt-4 text-center text-christmas-gold text-sm font-semibold relative z-10">
                        Click to view full card ✨
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {cards.length > 0 && (
              <div className="mt-8 text-center">
                <p className="text-gray-200">
                  You have created <strong>{cards.length}</strong> magical card{cards.length !== 1 ? 's' : ''}! 🎄
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
