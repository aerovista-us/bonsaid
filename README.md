# BONSAID — Album Showcase

A sophisticated, mobile-optimized music showcase webpage featuring advanced Web Audio API integration with bass boost controls and real-time visualization.

## 🎵 About

BONSAID is a professional music showcase project by **AeroVista Production** featuring three original tracks with custom cover art and an immersive listening experience.

### Tracks
- **Get Bonzied (Cut-Down)** - 2.4MB
- **GET BONSAID – Ext. Growth** - 5.4MB  
- **GROWTH (Preview)** - 1.1MB

## ✨ Features

### 🎧 Advanced Audio Player
- **Web Audio API Integration** - Professional-grade audio processing
- **Bass Boost Controls** - 0-18dB adjustable bass enhancement
- **Gain Control** - -12 to +12dB gain adjustment
- **Volume Control** - Precise volume management
- **Real-time Visualizer** - 64-bar frequency spectrum display

### 📱 Mobile Optimization
- **Responsive Design** - Seamless desktop and mobile experience
- **Sticky Mobile Player** - Fixed bottom player for mobile devices
- **Touch-Optimized Controls** - Large touch targets and simplified interface
- **Synchronized Controls** - Desktop and mobile players stay in sync

### 🎨 Visual Design
- **Custom Cover Art** - Unique bonsai-themed artwork for each track
- **Serene Workshop Background** - Warm, professional atmosphere
- **Dark Theme** - Modern, sophisticated color scheme
- **Smooth Animations** - Polished user interactions

## 🚀 Getting Started

### Prerequisites
- Modern web browser with Web Audio API support
- Local web server (for audio file access)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aerovista-us/bonsaid.git
   cd bonsaid
   ```

2. Serve the files using a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
bonsaid/
├── Mobile-bonsaid_album_showcase_bass_boost_player.html  # Main showcase page
├── README.md                                             # This file
├── Audio Files/
│   ├── Get Bonzied (Cut-Down Version).mp3
│   ├── GET BONSAID – Ext. Growth.mp3
│   └── GET BONSAID – GROWTH (pr).mp3
└── Cover Art/
    ├── Trim mad.png          # Cut-Down track cover
    ├── trim.png              # Extended Growth track cover
    └── rootbust.png          # Growth Preview track cover
```

## 🎛️ Technical Details

### Web Audio Graph
```
Audio Source → Pre-Gain → Low Shelf Filter → Master Gain → Analyser → Output
```

### Browser Compatibility
- ✅ Chrome 66+
- ✅ Firefox 60+
- ✅ Safari 14+
- ✅ Edge 79+

### Performance
- **Optimized Audio Processing** - Efficient Web Audio API implementation
- **Mobile-First Design** - Responsive layout with touch optimization
- **Minimal Dependencies** - Pure HTML, CSS, and JavaScript

## 🎨 Customization

### Adding New Tracks
1. Add your audio file to the project directory
2. Update the track section in the HTML:
   ```html
   <div class="track">
     <div>
       <strong>Your Track Name</strong>
       <small>File Size • Ready to play</small>
     </div>
     <div class="row">
       <button data-load="Your Track Name" data-src="your-file.mp3">▶ Play Track</button>
     </div>
   </div>
   ```

### Changing Cover Art
Update the `background-image` CSS property in the cover divs:
```css
background-image: url('your-cover-art.png')
```

## 🎵 Audio Specifications

- **Format**: MP3
- **Sample Rate**: 44.1kHz
- **Bitrate**: Variable
- **Channels**: Stereo

## 📱 Mobile Features

- **Sticky Player Bar** - Always accessible on mobile
- **Touch Controls** - Optimized for finger navigation
- **Responsive Layout** - Adapts to all screen sizes
- **Performance Optimized** - Smooth animations on mobile devices

## 🔧 Browser Requirements

- **Web Audio API** - Required for audio processing
- **Canvas Support** - For visualizer
- **ES6+ JavaScript** - Modern JavaScript features
- **CSS Grid** - For responsive layout

## 📄 License

© 2025 AeroVista · BONSAID — All rights reserved.

## 🤝 Contributing

This is a showcase project for AeroVista Production. For inquiries about the music or collaboration opportunities, please contact the production team.

## 🎯 Credits

- **Production**: AeroVista Production
- **Audio Engineering**: EchoVerse Audio
- **Web Development**: Custom showcase implementation
- **Artwork**: Original bonsai-themed cover art

---

*Experience the art of bonsai through music* 🌳🎵
