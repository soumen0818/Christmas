# 🎄 Christmas Gift Card Generator ✨

A magical Next.js application that lets users create personalized Christmas cards, receive fun virtual gifts from Santa, and spread holiday cheer!

## 🌐 Live Demo

**[🎅 Visit Live Site](https://christmas-merry.vercel.app/)**

![Christmas Magic](https://img.shields.io/badge/Christmas-Magic-red?style=for-the-badge&logo=christmas)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-3D-blue?style=for-the-badge&logo=three.js)

## ✨ Features

### 🎁 Card Creation
- **Personalized Messages**: Sweet, customized messages based on gender (extra sweet for girls!)
- **Photo Upload**: Add your photo to make the card extra special
- **Custom Card Mode**: Write your own heartfelt message to loved ones
- **Default Santa Image**: Automatic festive image if no photo uploaded
- **Beautiful Design**: Festive Christmas-themed cards with animations

### 🎅 Santa's Workshop
- **Claim Your Gift**: Tell Santa what you wish for Christmas
- **Funny Messages**: Receive one of 6 hilarious personalized messages from Santa
  - Kevin the clumsy elf wrapping himself in ribbon
  - Santa's dancing beard and failed backflip attempts
  - Rudolph's blinking nose and reindeer reactions
  - Mrs. Claus cameos and cookie obsession
  - VIP Nice List and North Pole chaos
- **Random Surprises**: Each gift message is randomly selected for variety
- **Celebration Animation**: 50 confetti emojis when you receive your gift! 🎉
- **Personalization**: Messages use your name, wish, and gender-appropriate pronouns

### 🎄 Gallery & Storage
- **Local Storage**: All data saved locally - no database needed!
- **Card Gallery**: View all your created cards in one place
- **Gift Status Indicators**: 
  - "✅ Gift Received" badge for cards with claimed gifts
  - 🎁 icon overlay on card thumbnails
- **Gift History**: Track all gifts received from Santa

### 📤 Share & Download
- **Download as Image**: Save your card as a high-quality PNG
- **Share Functionality**: Share your card on social media or with friends
- **Mobile Friendly**: Works perfectly on all devices

### 🌟 Magical 3D Experience
- **Three.js Background**: Animated 3D Christmas scene with Santa's van
- **Falling Snow**: Beautiful particle effects
- **3D Christmas Tree**: Interactive decorations
- **Floating Gifts**: Animated gift boxes
- **Dynamic Lighting**: Color-changing festive lights
- **Festive Music Player**: Christmas music with tree icons (🌲/🎄) and Santa (🎅) controls

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory**
```bash
cd c:\Users\dasso\OneDrive\Desktop\christmas
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Project Structure

```
christmas/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page with state-based navigation
├── components/
│   ├── CardGenerator.tsx     # Card creation form
│   ├── CardPreview.tsx       # Card display with download/share
│   ├── CustomCardGenerator.tsx # Custom message card creation
│   ├── CustomCardPreview.tsx # Custom card display
│   ├── ChristmasScene.tsx    # Three.js 3D background
│   ├── GalleryView.tsx       # View all cards with gift status
│   ├── SantaChat.tsx         # Santa gift claiming with funny messages
│   ├── SantaVanScene.tsx     # 3D Santa van scene
│   ├── LoadingPage.tsx       # Loading screen with Santa
│   └── TicTacToeSanta.tsx    # Tic-tac-toe game (in development)
├── utils/
│   ├── storage.ts            # Local storage & message generation
│   └── gemini.ts             # Utility file
├── public/
│   ├── santa_image.png       # Default card image
│   ├── santa_loading.gif     # Loading animation
│   ├── christmas_tree.jpg    # Background image
│   └── Dean_Martin.mp3       # Christmas music
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎯 How to Use

### Creating a Magical Card
1. Click **"Create Card"** from the home page
2. Enter your name
3. Select your gender (affects message style - extra sweet for girls!)
4. (Optional) Upload a photo or use the default Santa image
5. Click **"Generate My Card!"**
6. Preview your beautiful Christmas card

### Creating a Custom Card
1. Click **"Create Custom Card"** from the home page
2. Enter your name
3. Write your own personalized message
4. (Optional) Add a special note
5. (Optional) Upload a photo
6. Preview and save your custom creation

### Meeting Santa & Claiming Your Gift
1. After creating a magical card, click **"Meet Santa!"**
2. Enter what you wish for Christmas
3. Click **"Claim My Gift!"**
4. Santa prepares your gift (1.5 seconds)
5. Receive a hilarious personalized message with celebration animation!
6. Note: Custom cards cannot claim gifts from Santa

### Viewing Your Collection
1. Click **"My Cards"** from the home page
2. Browse all your created cards
3. See "✅ Gift Received" badge and 🎁 icon on cards with claimed gifts
4. Click any card to view full details
5. Download cards as PNG images or delete them

## 🎨 Customization

### Card Message Templates
Edit the message templates in [utils/storage.ts](utils/storage.ts):
- Female messages: More sweet and affectionate
- Male messages: Energetic and adventurous
- Other messages: Balanced and inclusive

### Santa's Gift Messages
The 6 funny gift templates are in [components/SantaChat.tsx](components/SantaChat.tsx):
- Template 1: Kevin the clumsy elf wrapping himself
- Template 2: Santa's dancing beard
- Template 3: Rudolph's blinking nose
- Template 4: Mrs. Claus scolding Santa
- Template 5: Cookie-obsessed Santa
- Template 6: VIP Nice List celebration

Each template is personalized with:
- User's first name
- Their specific wish
- Gender-appropriate pronouns (he/she/they)

### Styling
Modify colors and themes in [tailwind.config.js](tailwind.config.js):
```javascript
christmas: {
  red: '#C41E3A',
  green: '#0F7F3F',
  gold: '#FFD700',
  silver: '#C0C0C0',
}
```

## 🌟 Cool Features & Ideas

### Implemented Extras
✅ **3D Christmas Scene** - Santa's van, falling snow, floating gifts
✅ **Personalized Messages** - Gender-specific sweet messages
✅ **Funny Santa Gifts** - 6 hilarious hardcoded templates with randomization
✅ **Local Storage** - No database needed
✅ **Download/Share** - High-quality PNG export
✅ **Responsive Design** - Works on all devices
✅ **Animations** - Sparkles, glows, confetti celebration
✅ **Gift Tracking** - "✅ Gift Received" badges and 🎁 icons
✅ **Custom Cards** - Write your own messages
✅ **Default Images** - Santa image if no photo uploaded
✅ **Music Player** - Christmas music with festive controls (🌲🎅🎄)

### Future Enhancement Ideas
- 🎮 Complete Tic-Tac-Toe game with Santa
- 🎨 Multiple card templates/themes
- 🌍 Multi-language support
- 📧 Email card functionality
- 🏆 Achievement system
- 👨‍👩‍👧‍👦 Family accounts
- 🎭 AR effects with camera
- 🎪 More mini Christmas games

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🎁 Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **React 18** - UI library
- **Three.js** - 3D graphics engine
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers and components
- **Tailwind CSS** - Utility-first styling
- **html2canvas** - Card image generation
- **Local Storage API** - Browser-based data persistence

## 🔒 Privacy & Data

- ✅ All data stored locally in your browser
- ✅ No server-side storage or databases
- ✅ No personal data collection
- ✅ No API keys or external services required
- ✅ Cards and messages stay on your device
- ⚠️ Clearing browser data will delete all cards and gifts

## 🎉 Tips for Best Experience

1. **Use good lighting** for your photo uploads
2. **Be creative** with your wishes to Santa for funnier messages
3. **Try different genders** to see varied message styles
4. **Download cards** before clearing browser data
5. **Share the joy** with friends and family!
6. **Claim gifts** from Santa to see the celebration animation
7. **Use custom cards** for heartfelt personal messages

## 📝 License

This project is open source and available for personal use.

## 🎅 Credits

Created with ❤️ and Christmas magic!

Special thanks to:
- Santa Claus for inspiration 🎅
- Elves in the North Pole 🧝
- Everyone who believes in Christmas magic ✨

---

**Merry Christmas! 🎄 Happy Holidays! 🎁 Spread the Joy! ✨**
