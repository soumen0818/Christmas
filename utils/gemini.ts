const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY

interface GeminiResponse {
    candidates: Array<{
        content: {
            parts: Array<{
                text: string
            }>
        }
    }>
}

export async function generateChristmasMessage(
    name: string,
    gender: 'male' | 'female' | 'other'
): Promise<string> {
    console.log('🎄 [Gemini API] Checking API key...')
    if (!GEMINI_API_KEY) {
        console.error('❌ [Gemini API] API key not found! Using fallback messages.')
        console.log('💡 [Gemini API] Make sure NEXT_PUBLIC_GEMINI_API_KEY is set in .env.local')
        return getFallbackMessage(name, gender)
    }
    console.log('✅ [Gemini API] API key found!')

    try {
        console.log(`🎅 [Gemini API] Generating Christmas message for ${name} (${gender})...`)
        const genderContext = gender === 'male'
            ? 'for a boy/man'
            : gender === 'female'
                ? 'for a girl/woman'
                : 'for a person'

        const prompt = `Write a warm, heartfelt Christmas card message ${genderContext} named ${name}. 
    Make it personal, magical, and filled with Christmas spirit. 
    Include emojis and make it special and unique.
    Keep it around 100-150 words.
    End with a Christmas blessing or signature like "The Christmas Spirit", "Santa's Workshop", etc.`

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.9,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 500,
                    }
                }),
            }
        )

        if (!response.ok) {
            const errorText = await response.text()
            console.error(`❌ [Gemini API] Request failed with status ${response.status}`)
            console.error(`❌ [Gemini API] Error details:`, errorText)
            throw new Error(`Gemini API error: ${response.status}`)
        }

        const data: GeminiResponse = await response.json()
        const message = data.candidates[0]?.content?.parts[0]?.text

        if (!message) {
            console.error('❌ [Gemini API] No message generated in response')
            throw new Error('No message generated')
        }

        console.log('✅ [Gemini API] Christmas message generated successfully!')
        console.log('📝 [Gemini API] Message length:', message.trim().length, 'characters')
        return message.trim()
    } catch (error) {
        console.error('❌ [Gemini API] Error generating message:', error)
        console.log('🔄 [Gemini API] Falling back to pre-written messages')
        return getFallbackMessage(name, gender)
    }
}

export async function generateSantaGift(
    wish: string,
    name: string,
    gender: 'male' | 'female' | 'other'
): Promise<string> {
    console.log('🎁 [Gemini API] Checking API key for Santa gift...')
    if (!GEMINI_API_KEY) {
        console.error('❌ [Gemini API] API key not found! Using fallback gifts.')
        console.log('💡 [Gemini API] Make sure NEXT_PUBLIC_GEMINI_API_KEY is set in .env.local')
        return getFallbackGift(wish, name, gender)
    }
    console.log('✅ [Gemini API] API key found!')

    try {
        console.log(`🎅 [Gemini API] Generating Santa gift response for ${name}'s wish: "${wish}"...`)
        const genderContext = gender === 'male'
            ? 'boy/man'
            : gender === 'female'
                ? 'girl/woman'
                : 'person'

        const prompt = `You are Santa Claus responding to a Christmas wish. 
    A ${genderContext} named ${name} wished for: "${wish}"
    
    Write a warm, magical response from Santa granting their wish.
    Include relevant emojis and make it feel personal and special.
    Keep it concise (50-80 words) but heartfelt.
    Start with "Ho Ho Ho" or a Santa greeting.`

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.9,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 300,
                    }
                }),
            }
        )

        if (!response.ok) {
            const errorText = await response.text()
            console.error(`❌ [Gemini API] Request failed with status ${response.status}`)
            console.error(`❌ [Gemini API] Error details:`, errorText)
            throw new Error(`Gemini API error: ${response.status}`)
        }

        const data: GeminiResponse = await response.json()
        const gift = data.candidates[0]?.content?.parts[0]?.text

        if (!gift) {
            console.error('❌ [Gemini API] No gift message generated in response')
            throw new Error('No gift message generated')
        }

        console.log('✅ [Gemini API] Santa gift generated successfully!')
        console.log('📝 [Gemini API] Gift message length:', gift.trim().length, 'characters')
        return gift.trim()
    } catch (error) {
        console.error('❌ [Gemini API] Error generating gift:', error)
        console.log('🔄 [Gemini API] Falling back to pre-written gifts')
        return getFallbackGift(wish, name, gender)
    }
}

// Fallback messages when API is unavailable
function getFallbackMessage(name: string, gender: 'male' | 'female' | 'other'): string {
    const messages = {
        female: [
            `✨ Dearest ${name}, ✨\n\nYou are a precious gem that sparkles brighter than any star in the winter sky. May this Christmas wrap you in the warmest embrace of love, fill your heart with the sweetest joy, and paint your days with magical moments. You deserve all the beauty and wonder this season brings! 💖🌟\n\nWith love and twinkling blessings,\nThe Christmas Spirit 🎄✨`,
            `🎀 Sweet ${name}, 🎀\n\nLike a delicate snowflake kissed by moonlight, you bring grace and beauty wherever you go. May your Christmas be adorned with precious moments, wrapped in love's tender glow, and filled with dreams as lovely as you are. You are cherished beyond measure! 💝❄️\n\nWarmest wishes and sweet dreams,\nYour Christmas Angel 🌹`,
        ],
        male: [
            `🎅 Dear ${name}, 🎄\n\nYou're an amazing person with a heart of gold! This Christmas, may you be blessed with adventures that thrill your spirit, moments that warm your heart, and success in all you pursue. Keep being the incredible person you are! 🌟⚡\n\nBest wishes and high fives,\nYour Christmas Buddy 🎁`,
            `⭐ Hey ${name}! ⭐\n\nMay this Christmas fill your life with great memories, surround you with wonderful people, and bring you joy in every moment. You deserve all the happiness in the world! Here's to an amazing holiday and an even better year ahead! 🎉🚀\n\nCheers to you,\nSanta's Cool Crew 🎅`,
        ],
        other: [
            `🎄 Wonderful ${name}, 🎄\n\nYou are a beautiful soul who brings light to this world. May your Christmas be filled with love that warms your heart, joy that lifts your spirit, and peace that calms your mind. You are cherished and appreciated! 🌟💖\n\nWith warmth and wonder,\nThe Christmas Spirit ✨`,
            `✨ Dear ${name}, ✨\n\nMay this magical season bless you with everything your heart desires. You deserve happiness, love, and all the beautiful moments life can offer. Wishing you a Christmas as special and unique as you are! 💫🎁\n\nWith heartfelt wishes,\nSanta's Special Delivery 🎅`,
        ],
    }

    const genderMessages = messages[gender] || messages.other
    return genderMessages[Math.floor(Math.random() * genderMessages.length)]
}

function getFallbackGift(wish: string, name: string, gender: 'male' | 'female' | 'other'): string {
    if (gender === 'female') {
        return `🎀 Darling ${name}, Santa has wrapped ${wish} in the most beautiful package! It comes with extra magic, sparkles, and all the love in the North Pole! You deserve the best! 💝✨🌟`
    } else if (gender === 'male') {
        return `🎁 ${name}, my friend! Santa has your ${wish} ready to go! It's packed with awesome energy and good vibes! Enjoy it to the fullest! 🎉⚡`
    }

    return `🎅 Ho Ho Ho, ${name}! Santa grants you ${wish} with all the magic of Christmas! May it bring you endless joy and wonderful memories! 🎄✨💫`
}
