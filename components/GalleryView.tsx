'use client'

import { useState, useEffect } from 'react'
import { cardStorage, giftStorage, ChristmasCard } from '@/utils/storage'
import CardPreview from './CardPreview'
import CustomCardPreview from './CustomCardPreview'

interface GalleryViewProps {
  onBack: () => void
  onClaimGift?: (card: ChristmasCard) => void
}

export default function GalleryView({ onBack, onClaimGift }: GalleryViewProps) {
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

  const handleClaimGift = (card: ChristmasCard) => {
    if (onClaimGift) {
      onClaimGift(card)
    }
  }

  const hasClaimedGift = (cardId: string) => {
    return giftStorage.getGiftByCardId(cardId) !== null
  }

  if (selectedCard) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedCard(null)}
            className="mb-4 md:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-lg transition-all shadow-lg text-sm sm:text-base"
          >
            ← Back to Gallery
          </button>

          {selectedCard.isCustom ? (
            <CustomCardPreview card={selectedCard} />
          ) : (
            <CardPreview card={selectedCard} />
          )}

          <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-3">
            {/* Claim Gift Button - Only for non-custom cards that haven't claimed */}
            {!selectedCard.isCustom && !hasClaimedGift(selectedCard.id) && (
              <button
                onClick={() => handleClaimGift(selectedCard)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-christmas-gold hover:bg-yellow-600 text-white rounded-lg transition-all text-sm sm:text-base font-christmas shadow-lg"
              >
                🎁 Claim Gift from Santa
              </button>
            )}

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(selectedCard.id)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all text-sm sm:text-base"
            >
              🗑️ Delete Card
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden">

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
          className="mb-4 md:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-slate-800 bg-opacity-90 hover:bg-opacity-100 rounded-lg transition-all shadow-lg text-white border border-slate-600 text-sm sm:text-base"
        >
          ← Back to Home
        </button>

        <div className="relative bg-slate-900 bg-opacity-0 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-slate-700 overflow-hidden">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-christmas text-christmas-gold text-center mb-6 md:mb-8 glow-text">
              🎄 Your Christmas Collection 🎁
            </h2>

            {cards.length === 0 ? (
              <div className="text-center py-12 md:py-16">
                <div className="text-5xl md:text-6xl mb-4">📭</div>
                <p className="text-lg sm:text-xl text-gray-200 mb-2">No cards yet!</p>
                <p className="text-sm sm:text-base text-gray-400">Create your first magical Christmas card to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {cards.map((card) => {
                  return (
                    <div
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className="relative bg-slate-900 bg-opacity-95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer hover:scale-105 border-2 border-christmas-gold overflow-hidden"
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

                      <div className="flex justify-center mb-3 md:mb-4 relative z-10">
                        <div className="relative">
                          <img
                            src={card.image || '/santa_image.png'}
                            alt={card.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-3 sm:border-4 border-christmas-gold"
                          />
                          {!card.isCustom && hasClaimedGift(card.id) && (
                            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full border-2 border-white shadow-lg">
                              🎁
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-christmas text-christmas-gold text-center mb-2 relative z-10">
                        {card.name}
                      </h3>

                      {!card.isCustom && hasClaimedGift(card.id) && (
                        <div className="text-center mb-2 relative z-10">
                          <span className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                            ✅ Gift Received
                          </span>
                        </div>
                      )}

                      <div className="text-center text-gray-300 text-xs sm:text-sm mb-2 md:mb-3 relative z-10">
                        {card.gender === 'female' ? '👧' : card.gender === 'male' ? '👦' : '🌟'}
                        <span className="ml-2">
                          {new Date(card.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="bg-slate-700 bg-opacity-60 rounded-lg p-2.5 md:p-3 text-xs sm:text-sm text-gray-200 line-clamp-3 relative z-10">
                        {card.message}
                      </div>

                      <div className="mt-3 md:mt-4 text-center text-christmas-gold text-xs sm:text-sm font-semibold relative z-10">
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
