# 🎄 Christmas Gift Card Generator ✨

A magical Next.js application that lets users create personalized Christmas cards, receive virtual gifts from Santa, and spread holiday cheer!

![Christmas Magic](https://img.shields.io/badge/Christmas-Magic-red?style=for-the-badge&logo=christmas)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-3D-blue?style=for-the-badge&logo=three.js)

## ✨ Features

### 🎁 Card Creation
- **Personalized Messages**: Sweet, customized messages based on gender (extra sweet for girls!)
- **Photo Upload**: Add your photo to make the card extra special
- **Beautiful Design**: Festive Christmas-themed cards with animations

### 🎅 Santa's Workshop
- **Interactive Chat**: Have a conversation with Santa Claus
- **Virtual Gifts**: Receive personalized virtual gifts based on your wishes
- **Smart AI**: Santa responds contextually to different types of wishes (toys, books, love, health, etc.)

### 🎄 Gallery & Storage
- **Local Storage**: All data saved locally - no database needed!
- **Card Gallery**: View all your created cards in one place
- **Gift History**: Track all gifts received from Santa

### 📤 Share & Download
- **Download as Image**: Save your card as a high-quality PNG
- **Share Functionality**: Share your card on social media or with friends
- **Mobile Friendly**: Works perfectly on all devices

### 🌟 Magical 3D Experience
- **Three.js Background**: Animated 3D Christmas scene
- **Falling Snow**: Beautiful particle effects
- **3D Christmas Tree**: Interactive decorations
- **Floating Gifts**: Animated gift boxes
- **Dynamic Lighting**: Color-changing festive lights

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
│   └── page.tsx              # Main page with routing
├── components/
│   ├── CardGenerator.tsx     # Card creation form
│   ├── CardPreview.tsx       # Card display with download/share
│   ├── ChristmasScene.tsx    # Three.js 3D background
│   ├── GalleryView.tsx       # View all cards
│   └── SantaChat.tsx         # Interactive Santa chat
├── utils/
│   └── storage.ts            # Local storage & message generation
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🎯 How to Use

### Creating a Card
1. Click **"Create Card"** from the home page
2. Enter your name
3. Select your gender (affects message style)
4. (Optional) Upload a photo
5. Click **"Generate My Card!"**

### Meeting Santa
1. After creating a card, click **"Meet Santa!"**
2. Tell Santa what you wish for
3. Receive a personalized virtual gift!

### Viewing Your Collection
1. Click **"My Cards"** from the home page
2. Browse all your created cards
3. Click any card to view details and Santa's gift
4. Download or delete cards as needed

## 🎨 Customization

### Message Templates
Edit the message templates in [utils/storage.ts](utils/storage.ts#L50):
- Female messages: More sweet and affectionate
- Male messages: Energetic and adventurous
- Other messages: Balanced and inclusive

### Gift Responses
Customize Santa's gift responses in [utils/storage.ts](utils/storage.ts#L90) based on:
- Toys & Games
- Books & Reading
- Love & Happiness
- Health & Wellness
- Success & Achievement
- Travel & Adventure
- And more!

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
✅ **3D Christmas Scene** - Rotating tree, falling snow, floating gifts
✅ **Personalized Messages** - Gender-specific sweet messages
✅ **Smart Santa** - Context-aware gift responses
✅ **Local Storage** - No database needed
✅ **Download/Share** - High-quality image export
✅ **Responsive Design** - Works on all devices
✅ **Animations** - Sparkles, glows, floating effects
✅ **Gift Tracking** - Remember all received gifts

### Future Enhancement Ideas
- 🎵 Add Christmas music player
- 🎨 Multiple card templates/themes
- 🌍 Multi-language support
- 📧 Email card functionality
- 🎮 Mini Christmas games
- 🏆 Achievement system
- 👨‍👩‍👧‍👦 Family accounts
- 🎭 AR effects with camera

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🎁 Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Three.js helpers
- **Tailwind CSS** - Styling
- **html2canvas** - Card image generation
- **Framer Motion** - Animations

## 🔒 Privacy

- All data is stored locally in your browser
- No server-side storage or databases
- No personal data collection
- Cards and messages stay on your device

## 🎉 Tips for Best Experience

1. **Use good lighting** for your photo
2. **Be creative** with your wishes to Santa
3. **Try different genders** to see varied messages
4. **Download cards** before clearing browser data
5. **Share the joy** with friends and family!

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
