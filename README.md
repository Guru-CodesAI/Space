# 🚀 Space — Cinematic Space Travel Landing Page

A full-screen, highly polished cinematic landing page for a futuristic space travel company built with **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

![Space Preview](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop)

---

## ✨ Features

- **Cinematic Parallax Hero** — Full-viewport video background with scroll-driven parallax, opacity fade, and scale effects
- **Liquid Glass Design System** — Custom glassmorphism CSS using backdrop blur, luminosity blending, and gradient borders
- **BlurText Animation** — Words animate in with `blur(12px)` → `blur(0px)` stagger reveals on scroll
- **Scroll-Triggered Reveals** — All sections fade up with blur removal powered by Framer Motion's `whileInView`
- **Bento Destination Grid** — Responsive image grid showcasing destinations (Mars, Europa, Titan, Lunar Gateway)
- **Animated FAQ Accordion** — Smooth `height: 0 → auto` transitions using `AnimatePresence`
- **Responsive Design** — Fully adaptive layout from mobile to ultra-wide screens
- **Premium Typography** — `Instrument Serif` (italic headings) + `Barlow` (body) from Google Fonts

## 🏗️ Sections

| # | Section | Description |
|---|---------|-------------|
| A | **Navbar** | Fixed glass nav with Orbit logo, navigation links, and CTA button |
| B | **Hero** | Parallax video, massive animated heading, dual CTA buttons |
| C | **Mission** | Centered vision statement with ambient blue glow orb |
| D | **Vessel Specs** | Split layout — large image card + 6-spec engineering grid |
| E | **Features Grid** | 3-column grid of 6 liquid-glass-strong feature cards |
| F | **Journey Timeline** | Alternating vertical timeline with 4 mission phases |
| G | **Destinations** | Bento grid with hover-scaling planet/moon cards |
| H | **FAQ** | Accordion with animated expand/collapse and chevron rotation |
| I | **Footer** | Multi-column footer with newsletter input, links, and partners |

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 19](https://react.dev) | UI framework |
| [Vite 8](https://vite.dev) | Build tool & dev server |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & scroll effects |
| [Lucide React](https://lucide.dev) | Icon library |

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Guru-CodesAI/Space.git
cd Space

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
Space/
├── public/               # Static assets
├── src/
│   ├── App.jsx           # Complete single-file application
│   ├── index.css         # Tailwind directives & base styles
│   └── main.jsx          # React entry point
├── index.html            # HTML template
├── tailwind.config.js    # Tailwind configuration (fonts)
├── postcss.config.js     # PostCSS configuration
├── vite.config.js        # Vite configuration
└── package.json
```

## 🎨 Design System

### Colors
- **Background**: `#02040A` (deep space void)
- **Text**: White with varying opacity (`/60`, `/70`, `/90`)
- **Accents**: Blue and indigo ambient glows

### Fonts
- **Headings**: `Instrument Serif` (italic)
- **Body**: `Barlow` (weights 300–600)

### Glass Effects
- `.liquid-glass` — Subtle glass with 8px backdrop blur
- `.liquid-glass-strong` — Strong glass with 50px backdrop blur

### Animation Easing
All animations use a custom cubic-bezier: `[0.16, 1, 0.3, 1]`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with 🛸 by <a href="https://github.com/Guru-CodesAI">Guru-CodesAI</a>
</p>
