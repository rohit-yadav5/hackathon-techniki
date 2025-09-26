# ZenMaster - Learn Japanese with AI 🎌

A modern, interactive Japanese language learning platform built with React, TypeScript, and AI-powered features.

## ✨ Features

### 🎯 **Core Learning**
- **Interactive Lessons**: N5 to N1 JLPT levels with structured content
- **Audio Pronunciation**: Native speaker audio for all lessons
- **Section-based Learning**: Bite-sized content for better retention
- **Progress Tracking**: Visual progress indicators and completion tracking

### 🤖 **AI-Powered Features**
- **AI Pronunciation Practice**: Get feedback on your Japanese pronunciation
- **Smart Flashcards**: Spaced repetition system for optimal learning
- **Personalized Learning Path**: Adaptive content based on your progress

### 🏆 **Gamification**
- **XP System**: Earn points for completing lessons and activities
- **Achievement Badges**: Unlock badges for milestones and streaks
- **Daily Streaks**: Track your consistent learning habits
- **Leaderboard**: Compete with other learners

### 👥 **Community Features**
- **Study Groups**: Connect with fellow learners
- **Discussion Forums**: Ask questions and share tips
- **Progress Sharing**: Celebrate achievements together

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikhilpahujaa/ZenMaster.git
   cd ZenMaster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Build for Production
```bash
npm run build
```

## 🏗️ **Project Structure**

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── navbar.tsx      # Navigation bar
│   └── ai-pronunciation.tsx # AI pronunciation component
├── pages/              # Application pages
│   ├── dashboard.tsx   # User dashboard
│   ├── lesson/[id].tsx # Lesson detail page
│   ├── levels.tsx      # JLPT levels overview
│   ├── ai-pronunciation.tsx # AI practice page
│   ├── profile.tsx     # User profile
│   └── settings.tsx    # User settings
├── hooks/              # Custom React hooks
├── lib/                # Utilities and mock data
└── assets/             # Static assets
```

## 🛠️ **Tech Stack**

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Hooks + Context API
- **Audio**: Web Speech API + HTML5 Audio

## 📱 **Features in Detail**

### **Lesson System**
- **4 Main Sections**: Introduction, Vowels, Consonants, Practice
- **Audio Integration**: Section-specific audio files with fallback TTS
- **Progress Tracking**: Visual progress bars and completion status
- **Navigation**: Easy section switching with progress indicators

### **AI Pronunciation Practice**
- **Word Selection**: Practice with N5, N4, N3 level vocabulary
- **Recording**: Built-in audio recording for pronunciation
- **AI Analysis**: Mock AI feedback system (ready for real AI integration)
- **Native Audio**: Listen to correct pronunciation

### **User Management**
- **Authentication**: Mock auth system (ready for real backend)
- **Profile Management**: User stats, XP, badges, and progress
- **Settings**: Account preferences and management
- **Dashboard**: Personalized learning overview

## 🎨 **Design System**

- **Color Palette**: Modern, accessible color scheme
- **Typography**: Clean, readable fonts
- **Components**: Consistent UI patterns with Shadcn/ui
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and micro-interactions

## 🔧 **Configuration**

### **Environment Variables**
Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_url_here
VITE_AI_SERVICE_KEY=your_ai_service_key
```

### **Customization**
- **Colors**: Modify `tailwind.config.js` for theme customization
- **Components**: Edit Shadcn/ui components in `src/components/ui/`
- **Data**: Update mock data in `src/lib/mock-data.ts`

## 📊 **Current Status**

### ✅ **Completed Features**
- [x] Complete lesson system with 4 sections
- [x] Audio player with TTS fallback
- [x] AI pronunciation practice interface
- [x] User dashboard and progress tracking
- [x] Profile and settings pages
- [x] Responsive design and animations
- [x] Mock authentication system
- [x] Navigation and routing

### 🚧 **In Development**
- [ ] Real AI pronunciation analysis
- [ ] Backend integration
- [ ] User progress persistence
- [ ] Advanced quiz system

### 🔮 **Future Plans**
- [ ] Real-time AI feedback
- [ ] Social learning features
- [ ] Mobile app
- [ ] Offline learning support
- [ ] Advanced analytics

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Shadcn/ui** for beautiful component library
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Team** for the amazing framework

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/nikhilpahujaa/ZenMaster/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nikhilpahujaa/ZenMaster/discussions)

---

**Made with ❤️ for Japanese language learners worldwide**

*Start your Japanese learning journey today with ZenMaster! 🇯🇵*
