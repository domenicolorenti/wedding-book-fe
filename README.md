# 📸 Wedding Book - Frontend

A beautiful, modern photo-sharing web application for wedding events. Guests can upload photos, view a shared gallery, like their favorites, and create lasting memories together.

## ✨ Features

- **Photo Upload**: Capture moments using camera or gallery
- **Image Compression**: Automatic optimization for faster loading
- **Photo Gallery**: View all photos in a beautiful grid layout
- **Like System**: Show appreciation with likes
- **User Profiles**: See your own uploaded photos
- **Real-time Updates**: Refresh to see new photos
- **Responsive Design**: Works perfectly on mobile and desktop
- **Dark/Light Themes**: Automatic theme support
- **PWA Ready**: Can be installed as a mobile app

## 🚀 Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tooling
- **Chakra UI v3** - Beautiful component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Keen Slider** - Touch-enabled carousel
- **Browser Image Compression** - Client-side image optimization

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- A running backend server (see backend repo)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd wedding-book-fe
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and set your backend URL:
```
VITE_BE_URL=http://localhost:3000
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

## 📦 Building for Production

```bash
npm run build
# or
yarn build
```

The optimized build will be in the `dist/` folder.

## 🌐 Deployment

### GitHub Pages

```bash
npm run deploy
# or
yarn deploy
```

### Other Platforms

The `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3
- Firebase Hosting

## 🎨 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # Chakra UI components
│   │   ├── tabs/     # Tab navigation components
│   │   ├── Card.tsx  # Photo card component
│   │   └── ...
│   └── ErrorBoundary.tsx
├── contexts/         # React Context providers
│   ├── AuthContext.tsx
│   └── PhotoContext.tsx
├── hooks/           # Custom React hooks
│   ├── useAuth.ts
│   ├── usePhotos.ts
│   └── useLikes.ts
├── pages/           # Route pages
│   ├── Home.tsx
│   └── Login.tsx
├── services/        # API services
│   └── api.ts
├── utils/           # Utility functions
│   ├── imageCompression.ts
│   └── validation.ts
├── config/          # Configuration
│   └── theme.ts
├── types.ts         # TypeScript types
├── App.tsx          # Main app component
└── main.tsx         # App entry point
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BE_URL` | Backend API URL | - |

### Theme Customization

Edit `src/config/theme.ts` to customize colors, spacing, and other theme values.

## 🧪 Development

### Code Quality

```bash
# Run ESLint
npm run lint

# Type checking
npm run type-check
```

### Key Features Implementation

- **Authentication**: Custom hook-based auth with localStorage
- **State Management**: React Context + Custom Hooks
- **API Layer**: Centralized service with error handling
- **Performance**: Memoization, lazy loading, image optimization
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Error Handling**: Error boundaries, toast notifications

## 📱 Mobile Support

- Touch gestures for carousel
- Camera capture support
- Optimized for mobile screens
- 16px input font size (prevents iOS zoom)
- PWA manifest for "Add to Home Screen"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Chakra UI team for the amazing component library
- Vite team for the blazing-fast build tool
- All contributors and wedding guests who make this app special

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ for creating wedding memories
