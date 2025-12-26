# Church Website - Église

## Overview
A modern, minimalist church website with fluid, elastic animations throughout. The site features a deep navy blue color scheme with gold/bronze accents, creating an immersive spiritual experience.

## Architecture

### Frontend (React + Vite)
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion for elastic, spring-based animations
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack Query for server state

### Backend (Express)
- **Framework**: Express.js with TypeScript
- **Storage**: In-memory storage (MemStorage)
- **API**: RESTful endpoints

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Navigation with elastic hover effects
│   │   │   └── Footer.tsx      # Secondary navigation, contact info
│   │   ├── ui/
│   │   │   ├── AnimatedSection.tsx  # Reusable scroll animations
│   │   │   └── [shadcn components]
│   │   └── verse/
│   │       └── VerseCard.tsx   # Random verse display with download
│   ├── pages/
│   │   ├── Home.tsx           # Hero + verse generator + mission sections
│   │   ├── About.tsx          # History timeline, leadership, mission
│   │   ├── Donate.tsx         # Donation form with 3 options
│   │   ├── Join.tsx           # Contact form + volunteer signup
│   │   └── not-found.tsx
│   └── hooks/
│       └── use-in-view.ts     # Intersection observer for scroll animations
server/
├── routes.ts                  # API endpoints
├── storage.ts                 # In-memory data storage
└── index.ts                   # Express server setup
shared/
└── schema.ts                  # TypeScript types and Zod schemas
```

## Key Features

### Pages
1. **Home (Accueil)**: Full-screen hero with "Tirer mon verset" button, mission cards, service schedule
2. **About (Qui sommes-nous)**: Church history timeline, leadership grid, faith declaration carousel
3. **Donate (Faire un don)**: Three donation types (Tithe, Offering, Project), amount selector, payment form
4. **Join (Nous rejoindre)**: Contact form with volunteer area selection, location info

### Animations
- Elastic spring transitions (Framer Motion)
- Scroll-triggered fade/slide animations
- Gold glow effects on buttons
- Parallax depth effects on hero

## API Endpoints
- `GET /api/verse/random` - Returns a random Bible verse
- `POST /api/contact` - Submits contact form
- `GET /api/contact` - Retrieves all contact submissions

## Design System

### Colors
- **Primary**: Deep navy (#011C40, #021F59)
- **Accent**: Gold (#D9AA52) and Bronze (#A6702E)
- **Text**: Off-white (#F2F2F2)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Montserrat (sans-serif)

## Development
- Start: `npm run dev`
- Frontend runs on port 5000
- Backend API prefixed with `/api`

## Recent Changes
- Initial MVP implementation with all core pages
- Responsive design with mobile navigation
- Verse generator with PNG download feature
- Contact form with volunteer signup
