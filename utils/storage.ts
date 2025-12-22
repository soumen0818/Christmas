export interface ChristmasCard {
  id: string
  name: string
  gender: 'male' | 'female' | 'other'
  image: string
  message: string
  createdAt: number
}

export interface SantaGift {
  cardId: string
  wish: string
  gift: string
  giftedAt: number
}

const CARDS_KEY = 'christmas_cards'
const GIFTS_KEY = 'santa_gifts'

export const cardStorage = {
  saveCard: (card: ChristmasCard): void => {
    if (typeof window === 'undefined') return

    const cards = cardStorage.getAllCards()
    cards.push(card)
    localStorage.setItem(CARDS_KEY, JSON.stringify(cards))
  },

  getAllCards: (): ChristmasCard[] => {
    if (typeof window === 'undefined') return []

    const stored = localStorage.getItem(CARDS_KEY)
    return stored ? JSON.parse(stored) : []
  },

  getCard: (id: string): ChristmasCard | null => {
    const cards = cardStorage.getAllCards()
    return cards.find(card => card.id === id) || null
  },

  deleteCard: (id: string): void => {
    if (typeof window === 'undefined') return

    const cards = cardStorage.getAllCards().filter(card => card.id !== id)
    localStorage.setItem(CARDS_KEY, JSON.stringify(cards))
  },
}

export const giftStorage = {
  saveGift: (gift: SantaGift): void => {
    if (typeof window === 'undefined') return

    const gifts = giftStorage.getAllGifts()
    gifts.push(gift)
    localStorage.setItem(GIFTS_KEY, JSON.stringify(gifts))
  },

  getAllGifts: (): SantaGift[] => {
    if (typeof window === 'undefined') return []

    const stored = localStorage.getItem(GIFTS_KEY)
    return stored ? JSON.parse(stored) : []
  },

  getGiftByCardId: (cardId: string): SantaGift | null => {
    const gifts = giftStorage.getAllGifts()
    return gifts.find(gift => gift.cardId === cardId) || null
  },

  getGiftsByCardId: (cardId: string): SantaGift[] => {
    const gifts = giftStorage.getAllGifts()
    return gifts.filter(gift => gift.cardId === cardId)
  },
}

export const messageGenerator = {
  generate: (name: string, gender: 'male' | 'female' | 'other'): string => {
    const messages = {
      female: [
        `✨ Dearest ${name}, ✨\n\nYou are a precious gem that sparkles brighter than any star in the winter sky. May this Christmas wrap you in the warmest embrace of love, fill your heart with the sweetest joy, and paint your days with magical moments. You deserve all the beauty and wonder this season brings! 💖🌟\n\nWith love and twinkling blessings,\nThe Christmas Spirit 🎄✨`,
        `🎀 Sweet ${name}, 🎀\n\nLike a delicate snowflake kissed by moonlight, you bring grace and beauty wherever you go. May your Christmas be adorned with precious moments, wrapped in love's tender glow, and filled with dreams as lovely as you are. You are cherished beyond measure! 💝❄️\n\nWarmest wishes and sweet dreams,\nYour Christmas Angel 🌹`,
        `💕 Precious ${name}, 💕\n\nYour kindness illuminates the world like candlelight on a winter's eve. This Christmas, may you be showered with affection, surrounded by those who adore you, and blessed with memories that make your heart dance with joy! You are truly special! 🌟💖\n\nWith heartfelt love,\nSanta's Sweetest Wishes 🎅✨`,
        `🌟 Darling ${name}, 🌟\n\nYou are a beautiful soul deserving of life's most magical moments. May this Christmas season sprinkle your path with stardust, fill your heart with wonder, and bring you all the love and happiness you've given to others. Shine bright, beautiful one! 💫💝\n\nForever yours,\nThe Magic of Christmas 🎄`,
        `🌹 Lovely ${name}, 🌹\n\nYour smile lights up the world like the first snow of winter. This Christmas, may you be wrapped in silk ribbons of joy, crowned with happiness, and blessed with love that makes your spirit soar! You're a true princess of the season! 👑💖\n\nWith endless admiration,\nThe Fairy of Christmas ✨`,
        `💝 Beautiful ${name}, 💝\n\nYou are poetry in motion, a symphony of kindness and grace. May this magical season shower you with blessings as beautiful as you are, fill your world with enchantment, and surround you with those who treasure you! 🦋✨\n\nWith tender love,\nAngels of the North Pole 🎅💕`,
        `🦢 Graceful ${name}, 🦢\n\nLike a winter rose blooming in snow, you bring warmth and elegance to every heart you touch. May your Christmas be filled with tender moments, sweet surprises, and love that makes you feel like royalty! You deserve to be celebrated! 👸💖\n\nWith devoted wishes,\nThe Spirit of Wonder 🌟`,
      ],
      male: [
        `🎅 Dear ${name}, 🎄\n\nYou're an amazing person with a heart of gold! This Christmas, may you be blessed with adventures that thrill your spirit, moments that warm your heart, and success in all you pursue. Keep being the incredible person you are! 🌟⚡\n\nBest wishes and high fives,\nYour Christmas Buddy 🎁`,
        `⭐ Hey ${name}! ⭐\n\nMay this Christmas fill your life with great memories, surround you with wonderful people, and bring you joy in every moment. You deserve all the happiness in the world! Here's to an amazing holiday and an even better year ahead! 🎉🚀\n\nCheers to you,\nSanta's Cool Crew 🎅`,
        `🎁 ${name}, my friend! 🎁\n\nWishing you a Christmas that's as awesome as you are! May your days be merry, your heart be light, and your celebrations be filled with laughter and good times. You're one of a kind, and you deserve the best! 🌟🎊\n\nHigh spirits and great vibes,\nThe North Pole Gang ⛄`,
        `🎄 Awesome ${name}! 🎄\n\nMay this holiday season bring you peace, prosperity, and plenty of reasons to smile! You've earned all the good things coming your way. Keep shining and being the great person you are! 🌟💪\n\nWith respect and good cheer,\nChristmas Wishes HQ 🎅✨`,
        `🏆 Champion ${name}! 🏆\n\nYou're a star player in the game of life! This Christmas, may victory follow you, success be your companion, and happiness fill every moment. Keep crushing it and being the legend you are! 🎯⚡\n\nWith respect and admiration,\nSanta's Elite Squad 🎅`,
        `🌈 ${name}, the legend! 🚀\n\nMay your Christmas be packed with epic moments, legendary adventures, and memories worth bragging about! You've got what it takes to conquer anything. Enjoy your well-deserved celebration, champ! 🏅🌟\n\nWith maximum respect,\nThe Brotherhood of Christmas 🎄`,
        `⚡ Hey ${name}! ⚡\n\nYou bring energy and positivity wherever you go! May this Christmas charge you up with happiness, power you through with success, and electrify your life with amazing experiences! You're destined for greatness! 🔥💪\n\nWith epic vibes,\nThe Warriors of Wonder ❄️`,
      ],
      other: [
        `🎄 Wonderful ${name}, 🎄\n\nYou are a beautiful soul who brings light to this world. May your Christmas be filled with love that warms your heart, joy that lifts your spirit, and peace that calms your mind. You are cherished and appreciated! 🌟💖\n\nWith warmth and wonder,\nThe Christmas Spirit ✨`,
        `✨ Dear ${name}, ✨\n\nMay this magical season bless you with everything your heart desires. You deserve happiness, love, and all the beautiful moments life can offer. Wishing you a Christmas as special and unique as you are! 💫🎁\n\nWith heartfelt wishes,\nSanta's Special Delivery 🎅`,
        `🌟 Beautiful ${name}, 🌟\n\nYour presence makes the world brighter! This Christmas, may you be surrounded by love, filled with joy, and blessed with wonderful memories. You are extraordinary, and this season celebrates YOU! 💝✨\n\nWith love and magic,\nThe North Pole ❄️`,
        `💫 Amazing ${name}, 💫\n\nMay your Christmas sparkle with moments of love, laughter, and pure happiness. You bring so much goodness to the world, and now it's time for the world to give back to you! Enjoy every magical moment! 🎄💖\n\nBlessings and joy,\nChristmas Magic ✨🎅`,
        `🌈 Radiant ${name}, 🌈\n\nYou paint the world with colors of kindness and compassion. This Christmas, may you receive the same beautiful energy you give to others. Wishing you peace, love, and countless reasons to smile! 🎨💝\n\nWith boundless appreciation,\nThe Guardians of Joy 🎅`,
        `🎁 Special ${name}, 🎁\n\nYour uniqueness makes this world more interesting and beautiful. May Christmas shower you with blessings tailored just for you, moments that make your heart sing, and love in its purest form! 🌟💖\n\nWith deep respect,\nThe Council of Christmas ✨`,
      ],
    }

    const genderMessages = messages[gender] || messages.other
    return genderMessages[Math.floor(Math.random() * genderMessages.length)]
  },
}

export const santaGiftGenerator = {
  generate: (wish: string, name: string, gender: 'male' | 'female' | 'other'): string => {
    const wishes = wish.toLowerCase()

    // Categorize wishes
    if (wishes.includes('toy') || wishes.includes('game') || wishes.includes('play')) {
      return `🎮 Ho Ho Ho, ${name}! Santa has wrapped up the most magical ${wish} just for you! It comes with extra sparkles of joy and endless fun! Enjoy playing! 🎁✨`
    }

    if (wishes.includes('book') || wishes.includes('read') || wishes.includes('story')) {
      return `📚 Dear ${name}, Santa's elves have crafted a wonderful collection of ${wish}! May these stories transport you to magical worlds and fill your imagination with wonder! 📖✨`
    }

    if (wishes.includes('love') || wishes.includes('happiness') || wishes.includes('joy')) {
      return `💖 Sweet ${name}, Santa grants you an abundance of ${wish}! May your heart overflow with warmth, your days sparkle with smiles, and love surround you always! ✨💝`
    }

    if (wishes.includes('health') || wishes.includes('peace') || wishes.includes('wellness')) {
      return `🌟 ${name}, Santa blesses you with ${wish}! May you be wrapped in comfort, blessed with vitality, and surrounded by tranquility throughout the year! 🕊️💚`
    }

    if (wishes.includes('success') || wishes.includes('career') || wishes.includes('achievement')) {
      return `🏆 ${name}, Santa sees your hard work! You're receiving ${wish} with a sprinkle of determination and a dash of good fortune! May your dreams come true! 🌟💼`
    }

    if (wishes.includes('family') || wishes.includes('friend') || wishes.includes('together')) {
      return `👨‍👩‍👧‍👦 ${name}, Santa is gifting you precious moments with ${wish}! May your bonds grow stronger, your memories sweeter, and your togetherness magical! 💕🏠`
    }

    if (wishes.includes('travel') || wishes.includes('adventure') || wishes.includes('explore')) {
      return `✈️ ${name}, pack your bags! Santa is sending you on amazing ${wish}! May your journeys be safe, your experiences unforgettable, and your adventures extraordinary! 🗺️🌍`
    }

    if (wishes.includes('money') || wishes.includes('wealth') || wishes.includes('financial')) {
      return `💰 ${name}, Santa knows you've been good! Here's ${wish} with a bow on top! May prosperity find you and abundance follow you! 💎✨`
    }

    if (wishes.includes('pet') || wishes.includes('dog') || wishes.includes('cat') || wishes.includes('animal')) {
      return `🐾 ${name}, Santa has a special delivery - ${wish} with lots of cuddles and unconditional love! May your new friend bring endless joy! 🐶🐱💕`
    }

    if (wishes.includes('music') || wishes.includes('sing') || wishes.includes('instrument')) {
      return `🎵 ${name}, Santa brings you ${wish} with perfect harmony! May melodies fill your life and rhythms dance in your heart! 🎶✨`
    }

    // Gender-specific defaults
    if (gender === 'female') {
      return `🎀 Darling ${name}, Santa has wrapped ${wish} in the most beautiful package! It comes with extra magic, sparkles, and all the love in the North Pole! You deserve the best! 💝✨🌟`
    } else if (gender === 'male') {
      return `🎁 ${name}, my friend! Santa has your ${wish} ready to go! It's packed with awesome energy and good vibes! Enjoy it to the fullest! 🎉⚡`
    }

    // Default
    return `🎅 Ho Ho Ho, ${name}! Santa grants you ${wish} with all the magic of Christmas! May it bring you endless joy and wonderful memories! 🎄✨💫`
  },
}
