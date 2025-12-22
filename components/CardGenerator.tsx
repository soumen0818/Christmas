'use client'

import { useState } from 'react'
import { ChristmasCard, cardStorage, messageGenerator } from '@/utils/storage'
import CardPreview from './CardPreview'

interface CardGeneratorProps {
  onBack: () => void
  onCardCreated: (card: ChristmasCard) => void
}

export default function CardGenerator({ onBack, onCardCreated }: CardGeneratorProps) {
  const [name, setName] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('other')
  const [imagePreview, setImagePreview] = useState<string>('')
  const [showPreview, setShowPreview] = useState(false)
  const [currentCard, setCurrentCard] = useState<ChristmasCard | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateCard = () => {
    if (!name.trim()) {
      alert('Please enter your name!')
      return
    }

    console.log('🎄 [Card Generator] Starting card generation for:', name.trim())
    console.log('📝 [Card Generator] Using pre-written messages (API disabled for cards)')

    const message = messageGenerator.generate(name.trim(), gender)
    console.log('✅ [Card Generator] Message generated, creating card...')

    const card: ChristmasCard = {
      id: Date.now().toString(),
      name: name.trim(),
      gender,
      image: imagePreview || '/placeholder-avatar.png',
      message,
      createdAt: Date.now(),
    }

    cardStorage.saveCard(card)
    console.log('✅ [Card Generator] Card saved successfully!')
    setCurrentCard(card)
    setShowPreview(true)
  }

  const handleContinueToSanta = () => {
    if (currentCard) {
      onCardCreated(currentCard)
    }
  }

  if (showPreview && currentCard) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <CardPreview card={currentCard} />

          <div className="flex gap-4 mt-8 justify-center">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-christmas text-lg transition-all"
            >
              Back to Home
            </button>
            <button
              onClick={() => setShowPreview(false)}
              className="px-6 py-3 bg-christmas-gold hover:bg-yellow-600 text-white rounded-lg font-christmas text-lg transition-all"
            >
              Create Another
            </button>
            <button
              onClick={handleContinueToSanta}
              className="px-8 py-3 bg-christmas-red hover:bg-red-700 text-white rounded-lg font-christmas text-xl pulse-glow transition-all"
            >
              🎅 Meet Santa!
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen p-8 flex items-center justify-center overflow-hidden">

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

      <div className="relative max-w-2xl w-full bg-slate-900 bg-opacity-0 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700 z-10 overflow-hidden">
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
          {[...Array(10)].map((_, i) => (
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
          {[...Array(8)].map((_, i) => (
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


        {/* Content with relative positioning */}
        <div className="relative z-10">
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all"
          >
            ← Back
          </button>

          <h2 className="text-4xl md:text-5xl font-christmas text-christmas-gold text-center mb-8 glow-text">
            Create Your Magic Card ✨
          </h2>

          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-white">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-4 py-3 rounded-lg border-2 border-christmas-gold focus:border-christmas-red outline-none text-lg transition-all"
                maxLength={30}
              />
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-white">
                I am a... *
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 rounded-lg border-2 transition-all ${gender === 'female'
                    ? 'bg-pink-100 border-pink-500 text-pink-700'
                    : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                    }`}
                >
                  <div className="text-3xl mb-1">👧</div>
                  <div className="font-semibold">Girl</div>
                </button>
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 rounded-lg border-2 transition-all ${gender === 'male'
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                    }`}
                >
                  <div className="text-3xl mb-1">👦</div>
                  <div className="font-semibold">Boy</div>
                </button>
                <button
                  onClick={() => setGender('other')}
                  className={`flex-1 py-3 rounded-lg border-2 transition-all ${gender === 'other'
                    ? 'bg-purple-100 border-purple-500 text-purple-700'
                    : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
                    }`}
                >
                  <div className="text-3xl mb-1">🌟</div>
                  <div className="font-semibold">Other</div>
                </button>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-lg font-semibold mb-2 text-white">
                Your Photo (Optional)
              </label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-christmas-gold"
                  />
                )}
                <label className="flex-1 cursor-pointer">
                  <div className="px-4 py-3 bg-christmas-green text-white rounded-lg text-center hover:bg-green-700 transition-all">
                    📸 {imagePreview ? 'Change Photo' : 'Upload Photo'}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                A photo makes your card extra special!
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateCard}
              disabled={!name.trim()}
              className={`w-full py-4 rounded-xl font-christmas text-2xl transition-all ${name.trim()
                ? 'bg-gradient-to-r from-christmas-red to-red-700 text-white hover:from-red-700 hover:to-christmas-red pulse-glow'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              ✨ Generate My Card! ✨
            </button>
          </div>

          <p className="text-center text-sm text-gray-300 mt-6">
            * Your magical Christmas message will be personalized just for you!
          </p>
        </div>
      </div>
    </div>
  )
}
