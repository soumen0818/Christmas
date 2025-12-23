'use client'

import { useState } from 'react'
import { ChristmasCard, cardStorage } from '@/utils/storage'
import CustomCardPreview from './CustomCardPreview'

interface CustomCardGeneratorProps {
    onBack: () => void
}

export default function CustomCardGenerator({ onBack }: CustomCardGeneratorProps) {
    const [name, setName] = useState('')
    const [customMessage, setCustomMessage] = useState('')
    const [specialNote, setSpecialNote] = useState('')
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
            alert('Please enter a name!')
            return
        }

        if (!customMessage.trim()) {
            alert('Please enter your custom message!')
            return
        }

        // Extract only the first name
        const firstName = name.trim().split(' ')[0]

        const card: ChristmasCard = {
            id: Date.now().toString(),
            name: firstName,
            gender: 'other',
            image: imagePreview || '/placeholder-avatar.png',
            message: customMessage.trim(),
            createdAt: Date.now(),
            isCustom: true,
            specialNote: specialNote.trim() || undefined,
        }

        cardStorage.saveCard(card)
        setCurrentCard(card)
        setShowPreview(true)
    }

    if (showPreview && currentCard) {
        return (
            <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
                <div className="max-w-4xl w-full">
                    <CustomCardPreview card={currentCard} />

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 md:mt-8 justify-center">
                        <button
                            onClick={onBack}
                            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-christmas text-base sm:text-lg transition-all"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => {
                                setShowPreview(false)
                                setName('')
                                setCustomMessage('')
                                setSpecialNote('')
                                setImagePreview('')
                            }}
                            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-christmas-gold hover:bg-yellow-600 text-white rounded-lg font-christmas text-base sm:text-lg transition-all"
                        >
                            Create Another
                        </button>
                    </div>
                </div>
            </div>
        )
    }

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
                            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))',
                        }}
                    >
                        ✨
                    </div>
                ))}
            </div>

            <div className="relative max-w-2xl w-full bg-slate-900 bg-opacity-0 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl border border-slate-700 z-10 overflow-hidden">
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

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-christmas text-christmas-gold text-center mb-6 md:mb-8 glow-text">
                        Create Custom Card 💌
                    </h2>

                    <div className="space-y-4 md:space-y-6">
                        {/* Name Input */}
                        <div>
                            <label className="block text-base sm:text-lg font-semibold mb-2 text-white">
                                Recipient Name *
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter recipient's name..."
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-christmas-gold focus:border-christmas-red outline-none text-base sm:text-lg transition-all"
                                maxLength={30}
                            />
                        </div>

                        {/* Custom Message Input */}
                        <div>
                            <label className="block text-base sm:text-lg font-semibold mb-2 text-white">
                                Your Custom Message *
                            </label>
                            <textarea
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                placeholder="Write your heartfelt Christmas message..."
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-christmas-gold focus:border-christmas-red outline-none text-base sm:text-lg transition-all resize-none"
                                rows={6}
                                maxLength={500}
                            />
                            <p className="text-xs sm:text-sm text-gray-300 mt-1">
                                {customMessage.length}/500 characters
                            </p>
                        </div>

                        {/* Special Note Input */}
                        <div>
                            <label className="block text-base sm:text-lg font-semibold mb-2 text-white">
                                Special Note (Optional)
                            </label>
                            <textarea
                                value={specialNote}
                                onChange={(e) => setSpecialNote(e.target.value)}
                                placeholder="Add a special note, quote, or wish..."
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-christmas-gold focus:border-christmas-red outline-none text-base sm:text-lg transition-all resize-none"
                                rows={3}
                                maxLength={200}
                            />
                            <p className="text-xs sm:text-sm text-gray-300 mt-1">
                                {specialNote.length}/200 characters
                            </p>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-base sm:text-lg font-semibold mb-2 text-white">
                                Photo (Optional)
                            </label>
                            <div className="flex items-center gap-3 sm:gap-4">
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-3 sm:border-4 border-christmas-gold"
                                    />
                                )}
                                <label className="flex-1 cursor-pointer">
                                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-christmas-green text-white rounded-lg text-center hover:bg-green-700 transition-all text-sm sm:text-base">
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
                            <p className="text-xs sm:text-sm text-gray-300 mt-2">
                                Add a festive photo to personalize your card!
                            </p>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={generateCard}
                            disabled={!name.trim() || !customMessage.trim()}
                            className={`w-full py-3 sm:py-4 rounded-xl font-christmas text-lg sm:text-xl md:text-2xl transition-all ${name.trim() && customMessage.trim()
                                    ? 'bg-gradient-to-r from-christmas-red to-red-700 text-white hover:from-red-700 hover:to-christmas-red pulse-glow'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            ✨ Generate Custom Card! ✨
                        </button>
                    </div>

                    <p className="text-center text-xs sm:text-sm text-gray-300 mt-4 sm:mt-6">
                        * Create a personalized Christmas card with your own message!
                    </p>
                </div>
            </div>
        </div>
    )
}
