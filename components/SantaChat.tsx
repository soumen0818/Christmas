'use client'

import { useState, useEffect } from 'react'
import { ChristmasCard, giftStorage, SantaGift } from '@/utils/storage'

interface SantaChatProps {
  userCard: ChristmasCard | null
  onBack: () => void
}

// Santa's magical gift templates
const getSantaGift = (wish: string, name: string, gender: 'male' | 'female' | 'other'): string => {
  const firstName = name.split(' ')[0]
  const pronoun = gender === 'male' ? 'him' : gender === 'female' ? 'her' : 'them'
  const possessive = gender === 'male' ? 'his' : gender === 'female' ? 'her' : 'their'

  const giftTemplates = [
    `🎅 Ho Ho Ho, ${firstName}!

"${wish}"? I LOVE IT! 🎉 Just showed this to Rudolph and his nose started blinking like crazy! 

The elves are already working on something special for you. One of them (Kevin) is so excited he wrapped himself in ribbon by accident! 😂

Keep being awesome! See you Christmas Eve! 🎄✨

- Santa 🎅`,

    `🎅 Hey ${firstName}!

Your wish for "${wish}" made me smile so big, my beard did a little dance! ✨

You're definitely on my Nice List - checked it twice! 📝 Mrs. Claus says hi and wants you to know you're one of her favorites too! 🍪

The reindeer are practicing extra hard for our visit to your house! 🦌

Stay magical! 🎄
- Santa 🎅`,

    `🎅 Ho Ho Ho, ${firstName}!

"${wish}"! The elves literally started dancing when they heard this wish! 💃🎵

I spilled hot cocoa on my list because I was so excited, but don't worry - you're still at the top! ☕😊

Rudolph can't wait to meet you (well, fly over your roof at least)! 🦌✨

Merry Christmas! 🎁
- Santa 🎅`,

    `🎅 Hello ${firstName}!

Just read "${wish}" and WOW! That's an AMAZING wish! 🌟

The North Pole is buzzing with excitement right now! The elves are singing, the reindeer are dancing, and I'm eating WAY too many cookies! 🍪😅

You've been absolutely wonderful this year! Keep spreading that Christmas cheer! 🎄

Ho Ho Ho! ✨
- Santa 🎅`,

    `🎅 Hi ${firstName}!

"${wish}"?! Perfect! I love it! 🎉

Quick update from the North Pole: The elves are super excited, Rudolph's nose is extra shiny today, and Mrs. Claus just baked your favorite cookies! 🍪

You're on my VIP Nice List! (Yes, I have a VIP section!) 🌟

Can't wait for Christmas Eve! 🎄✨
- Santa 🎅`,

    `🎅 Hey there, ${firstName}!

Your wish for "${wish}" is LEGENDARY! The whole North Pole workshop is cheering! 🎊

Fun fact: I tried to do a backflip when I read this and... let's just say Santa should stick to chimney sliding! 😂

You're amazing! Keep being you! 🌟

See you soon! 🎄
- Santa 🎅`
  ]

  const randomTemplate = giftTemplates[Math.floor(Math.random() * giftTemplates.length)]
  return randomTemplate
}

export default function SantaChat({ userCard, onBack }: SantaChatProps) {
  const [giftClaimed, setGiftClaimed] = useState(false)
  const [santaGift, setSantaGift] = useState<SantaGift | null>(null)
  const [userWish, setUserWish] = useState('')
  const [isClaimingGift, setIsClaimingGift] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (userCard && !userCard.isCustom) {
      const existingGift = giftStorage.getGiftByCardId(userCard.id)
      if (existingGift) {
        setGiftClaimed(true)
        setSantaGift(existingGift)
      }
    }
  }, [userCard])

  const handleClaimGift = async () => {
    if (!userCard || userCard.isCustom || !userWish.trim()) return

    setIsClaimingGift(true)

    setTimeout(() => {
      const giftMessage = getSantaGift(userWish, userCard.name, userCard.gender)

      const newGift: SantaGift = {
        cardId: userCard.id,
        wish: userWish,
        gift: giftMessage,
        giftedAt: Date.now()
      }

      giftStorage.saveGift(newGift)
      setSantaGift(newGift)
      setGiftClaimed(true)

      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 5000)

      setIsClaimingGift(false)
    }, 1500)
  }

  if (!userCard) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl text-white mb-4">Please create a card first! 🎄</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-christmas-gold hover:bg-yellow-600 text-white rounded-lg font-christmas text-lg transition-all"
          >
            Go Back 🏠
          </button>
        </div>
      </div>
    )
  }

  // Custom cards cannot claim gifts
  if (userCard.isCustom) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-christmas-gold/30">
          <p className="text-2xl text-white mb-4">🎨 Custom cards are special!</p>
          <p className="text-lg text-gray-200 mb-6">Santa gifts are only available for magical cards.</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-christmas-gold hover:bg-yellow-600 text-white rounded-lg font-christmas text-lg transition-all"
          >
            Go Back 🏠
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen p-4 md:p-8 flex items-center justify-center overflow-hidden">
      {/* Celebration Effect */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animation: `celebration ${Math.random() * 3 + 2}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              {['🎁', '🎉', '⭐', '✨', '🎊', '💝'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      )}

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

      {/* Main Container */}
      <div className="relative max-w-4xl w-full bg-slate-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-transparent p-6 text-white border-b border-slate-700/50">
          <button
            onClick={onBack}
            className="mb-4 px-4 py-2 bg-gray-600/50 hover:bg-gray-700/50 backdrop-blur-sm rounded-lg transition-all"
          >
            ← Back
          </button>
          <h2 className="text-3xl font-christmas text-christmas-gold glow-text">
            🎅 Santa's Workshop 🎄
          </h2>
          <p className="text-sm text-gray-200">A magical place just for you!</p>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {!giftClaimed ? (
            /* Gift Claiming Section */
            <div className="bg-white/95 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎅🎁</div>
                <h3 className="text-2xl font-christmas text-christmas-red mb-2">
                  Claim Your Gift from Santa!
                </h3>
                <p className="text-gray-600 mb-6">
                  Tell Santa what you wish for this Christmas...
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <textarea
                  value={userWish}
                  onChange={(e) => setUserWish(e.target.value)}
                  placeholder="I wish for..."
                  className="w-full px-4 py-3 border-2 border-christmas-gold rounded-lg focus:outline-none focus:ring-2 focus:ring-christmas-red resize-none"
                  rows={3}
                  disabled={isClaimingGift}
                />

                <button
                  onClick={handleClaimGift}
                  disabled={!userWish.trim() || isClaimingGift}
                  className="w-full mt-4 px-6 py-3 bg-christmas-red hover:bg-red-700 text-white rounded-lg font-christmas text-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isClaimingGift ? '🎁 Santa is preparing your gift...' : '🎁 Claim My Gift!'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white/95 rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">🎅</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-christmas-red mb-2">Santa Claus</h3>
                    <div className="bg-gradient-to-br from-green-50 to-red-50 rounded-xl p-6 border-2 border-christmas-gold">
                      <div className="text-sm text-gray-600 mb-3 italic">💭 Your wish: "{santaGift?.wish}"</div>
                      <pre className="whitespace-pre-wrap font-sans text-base text-gray-800 leading-relaxed">
                        {santaGift?.gift}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-red-100 rounded-2xl p-6 shadow-xl border-2 border-christmas-gold">
                <div className="text-center">
                  <div className="text-5xl mb-3">🎄✨</div>
                  <h3 className="text-xl font-bold text-christmas-red mb-2">Your Gift Has Been Claimed!</h3>
                  <p className="text-gray-700 mb-4">
                    Santa has received your wish and prepared a special message just for you! 🎁
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    "The magic of Christmas lives in your heart forever" - Santa 🎅
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes celebration {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
