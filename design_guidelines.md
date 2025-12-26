# Design Guidelines: Church Website

## Design Approach
**Reference-Based + Custom Animations**: Minimalist spiritual website with fluid, elastic animations throughout. Modern, immersive experience that balances simplicity with dynamic movement.

## Core Design Elements

### Typography
- **Headings**: Modern, elegant sans-serif in uppercase for impact
- **Body**: Clean, readable sans-serif in #F2F2F2 (off-white)
- **Hierarchy**: Bold titles, regular body, subtle weights for emphasis

### Color Palette
**Primary Colors:**
- #011C40 (Deep navy blue - backgrounds, headers)
- #021F59 (Night blue - accents, sections)

**Secondary/Accent Colors:**
- #A6702E (Bronze - hover states, dividers)
- #D9AA52 (Gold - interactive elements, highlights)
- #F2F2F2 (Off-white - text, cards)

### Spacing System
Tailwind units: 2, 4, 6, 8, 12, 16, 24 for consistent rhythm

### Layout Structure

**Header Navigation:**
- 4 main menu items: Home, About Us, Donate, Join Us
- Centered or left-aligned logo
- Elastic hover effect: text scales slightly with gold underline sliding in
- Minimal, clean design

**Footer:**
- Contains secondary menus: Leadership, News, Gallery, Teaching, Events, Training, Mission & Impact
- Fade-in animation when scrolled to bottom

## Page-Specific Designs

### 1. Home Page
- **Hero**: Full-screen immersive background image (congregation, light, cross)
- **Headline**: "Bienvenue dans la maison de Dieu" centered
- **Interactive Feature**: "Draw My Verse" button with:
  - Elastic bounce on click
  - Random verse displayed in animated card (zoom + fade)
  - Download verse as PNG with decorative frame
- **Scroll Behavior**: Parallax sections - text glides, images move with depth

### 2. About Us
- **Introduction**: Text with lateral fade-in animation
- **History**: Interactive horizontal scroll timeline with smooth transitions
- **Faith Declaration**: Animated carousel of prayers/prophecies
  - Text appears with typewriter effect
  - Images transition with crossfade + subtle zoom
  - Prayers written in second person ("You are blessed, you are chosen...")

### 3. Leadership
- **Portrait Grid**: Cards with hover effects
  - Images transition from grayscale to color
  - Name and title slide up with elastic easing
- **Sections**: Apostle, Assistant Pastor, Servants College, G10 Leaders

### 4. Donate
- **3 Options**: Tithe, Offering, Support a Project
- **Buttons**: Gold pulse animation on hover
- **Payment Integration**: Secure payment methods (PayPal, card, mobile money)
- **Text**: Progressive scroll reveal animation

### 5. News (Footer)
- **Content**: Announcements, Information, Testimonials
- **Animation**: Card flip effect on scroll for each block

### 6. Gallery (Footer)
- **Photos**: Animated masonry grid, zoom on hover
- **Videos**: Integrated player with animated lightbox (smooth opening)

### 7. Teaching (Footer)
- **Audio**: Minimalist player with wave animation
- **Video**: YouTube/Vimeo integration with fade-in
- **Themes**: Animated tags with bounce on hover

### 8. Events/Programs (Footer)
- **Weekly Services**: Animated accordion list
- **Special Programs**: Cards with zoom hover effect
- **Annual Calendar**: Interactive calendar with elastic slide

### 9. Training (Footer)
- **Tyrannus School**: Scroll reveal sections
- **New Converts**: Gentle animation (text appearing like progressive light)

### 10. Mission & Impact (Footer)
- **Content**: Missions, social works, humanitarian projects
- **Animation**: Icons appear with bounce-in effect

### 11. Join Us
- **Form**: Animated fields with elastic expand on focus
- **Volunteer Section**: Motivational text with fade + zoom
- **Submit Button**: Gold glow effect on hover

## Animation Specifications

**Hover Interactions:**
- Elastic bounce and spring effects
- Gold glow on buttons
- Smooth scale transforms

**Scroll Animations:**
- Parallax depth effects
- Fade-in entry animations
- Card flips and slides
- Progressive reveals

**Transitions:**
- Fluid with "ease-out-elastic" easing
- Buttons and cards react like springs
- Crossfades with subtle zooms

**Animation Philosophy**: Every interaction (click, scroll, hover) triggers smooth, elastic movement. Minimalist structure with rich, spiritual motion.

## Images

**Hero Image**: Full-screen immersive photo of congregation with light streaming through (warmth, community, divine presence)

**About Us**: Multiple carousel images showing church activities, worship moments, community gatherings

**Leadership**: Professional portraits of church leaders (initially grayscale)

**Gallery**: Collection of event photos, worship services, community activities

**Buttons on Images**: Blurred glass-morphism backgrounds for readability

## Design Principles
- **Minimalist but Alive**: Clean structure with rich animations
- **Spiritual Modern**: Contemporary design reflecting faith and inspiration
- **Elastic Interactions**: Spring-like responsiveness throughout
- **Immersive Experience**: Parallax and depth create engagement