'use client'

import { ChristmasCard } from '@/utils/storage'

interface SantaChatProps {
  userCard: ChristmasCard | null
  onBack: () => void
}

export default function SantaChat({ userCard, onBack }: SantaChatProps) {
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

  // Extract only the first name
  const firstName = userCard.name.split(' ')[0]

  const greeting = userCard.gender === 'female'
    ? `Ho Ho Ho! 🎅✨\n\nHello, dear ${firstName}! What a beautiful card you've created! I can see the sparkle in your eyes through this magical message.\n\nMay your Christmas be filled with love, joy, and magical moments! 💝🎄`
    : userCard.gender === 'male'
      ? `Ho Ho Ho! 🎅\n\nGreetings, ${firstName}! That's an awesome card you made there, young friend!\n\nMay this Christmas bring you amazing adventures and wonderful memories! 🎁⚡`
      : `Ho Ho Ho! 🎅✨\n\nWelcome, wonderful ${firstName}! Your card filled my heart with joy!\n\nMay your holidays be truly magical and filled with happiness! 🎄💫`

  return (
    <div className="relative min-h-screen p-4 md:p-8 flex items-center justify-center overflow-hidden">
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
              filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="relative max-w-4xl w-full bg-slate-900 bg-opacity-0 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Christmas tree for this container */}
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

        {/* Snowflakes for this container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
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

        {/* Stars for this container */}
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
                filter: 'drop-shadow(0 0 4px rgba(255,215,0,0.8))',
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="bg-transparent p-6 text-white">
            <button
              onClick={onBack}
              className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-all"
            >
              ← Back
            </button>
            <h2 className="text-3xl font-christmas text-christmas-gold glow-text">
              🎅 Santa's Message 🎄
            </h2>
            <p className="text-sm text-gray-200">A special message just for you!</p>
          </div>

          {/* Santa's Greeting */}
          <div className="p-8">
            <div className="bg-white bg-opacity-95 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">🎅</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-christmas-red mb-2">Santa Claus</h3>
                  <div className="bg-gradient-to-br from-green-50 to-red-50 rounded-xl p-6 border-2 border-christmas-gold">
                    <pre className="whitespace-pre-wrap font-sans text-base text-gray-800 leading-relaxed">
                      {greeting}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-4">
                  🎄 Share your Christmas joy with loved ones! 🎁
                </p>
                <button
                  onClick={onBack}
                  className="px-8 py-3 bg-christmas-gold hover:bg-yellow-600 text-white rounded-lg font-christmas text-xl transition-all shadow-lg"
                >
                  Back to Home 🏠
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
