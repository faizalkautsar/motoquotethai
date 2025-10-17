# Motor Insurance Landing Page - Design Guidelines

## Design Approach

**Reference-Based Strategy**: Drawing inspiration from modern fintech/insurtech leaders (Lemonade, Revolut, Stripe) that successfully combine vibrant colors with professional trust. The design balances playful gradient energy with insurance industry credibility through structured layouts and clear information hierarchy.

**Core Principle**: Colorful confidence - using bold gradients and vibrant accents to differentiate from traditional insurance while maintaining professional polish through consistent spacing, clear typography, and purposeful animations.

---

## Color Palette

### Gradients (Primary Visual Identity)
- **Hero Gradient**: 250 85% 60% → 280 70% 65% (blue to purple)
- **Section Accents**: 330 80% 65% → 25 90% 60% (pink to orange)
- **Card Highlights**: 200 70% 55% → 260 65% 60% (cyan to purple)
- **CTA Gradients**: 250 90% 58% → 280 85% 62% (vibrant blue-purple)

### Solid Colors
- **Primary Blue**: 250 70% 58%
- **Purple Accent**: 280 65% 60%
- **Pink Accent**: 330 75% 62%
- **Orange Accent**: 25 85% 58%
- **Success Green**: 140 60% 50%
- **Warning**: 45 90% 55%

### Neutrals (Dark Mode Optimized)
- **Background**: 240 8% 12%
- **Surface**: 240 6% 18%
- **Surface Elevated**: 240 5% 22%
- **Text Primary**: 0 0% 98%
- **Text Secondary**: 240 5% 70%
- **Borders**: 240 10% 28%

---

## Typography

**Primary Font**: Inter (Google Fonts) - body text, UI elements
**Accent Font**: Plus Jakarta Sans (Google Fonts) - headings, CTAs

### Scale & Weights
- **Hero Headline**: text-5xl/text-6xl lg:text-7xl, font-bold (700)
- **Section Headers**: text-3xl lg:text-4xl, font-bold (700)
- **Subheadings**: text-xl lg:text-2xl, font-semibold (600)
- **Body Text**: text-base lg:text-lg, font-normal (400)
- **Small/Meta**: text-sm, font-medium (500)
- **Buttons**: text-base, font-semibold (600)

---

## Layout System

**Spacing Primitives**: Tailwind units 2, 4, 6, 8, 12, 16, 20, 24
- **Component Padding**: p-6 md:p-8
- **Section Spacing**: py-16 md:py-24 lg:py-32
- **Card Gaps**: gap-4 md:gap-6
- **Grid Gaps**: gap-6 lg:gap-8

**Containers**:
- Full sections: w-full with max-w-7xl mx-auto px-6
- Content blocks: max-w-6xl
- Text content: max-w-3xl
- Quote wizard: max-w-4xl

**Responsive Grid Strategy**:
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Benefits: grid-cols-1 lg:grid-cols-2
- Testimonials: grid-cols-1 md:grid-cols-2
- Coverage options: grid-cols-2 lg:grid-cols-4

---

## Component Library

### Navigation
- Fixed header with blur backdrop (backdrop-blur-xl bg-background/80)
- Logo left, language toggle (TH/EN switch with flag icons) center-right, CTA right
- Mobile: hamburger menu with full-screen overlay
- Gradient underline on active nav items (h-1 gradient)

### Hero Section (80vh)
- Large background image: Modern car on scenic Thai highway, subtle overlay (bg-gradient-to-r from-background/95 to-background/60)
- Split layout: Left - headline + subheadline + dual CTAs, Right - floating quote card preview
- Gradient text on headline using bg-clip-text
- Trust indicators below CTAs: "4.8★ Rating • 50K+ Protected • Licensed by OIC"

### Quote Wizard (Multi-step Form)
- **Container**: Elevated surface (bg-surface-elevated) with gradient border (border-2 border-transparent bg-gradient-to-br)
- **Progress Bar**: Step indicators with gradient fill, current step glows with shadow-lg shadow-primary/50
- **Step 1 - Vehicle**: Car type icons grid (sedan, SUV, motorcycle, pickup) - large clickable cards with hover gradient borders
- **Step 2 - Coverage**: Toggle cards for coverage levels (Third Party, Type 2+, Type 1) with feature bullets
- **Step 3 - Details**: Form inputs with floating labels, gradient focus rings (focus:ring-2 ring-primary/50)
- **Step 4 - Quote Results**: Price cards with gradient backgrounds, feature comparison table, "Get Covered" CTA with gradient button
- **Visual Feedback**: Each selection animates with scale + gradient glow effect

### Feature Cards
- Grid layout with glass-morphism effect (bg-surface/50 backdrop-blur-md)
- Gradient icon containers (64x64, rounded-2xl with gradient backgrounds)
- Icons: Heroicons - shield-check (protection), clock (24/7), currency-dollar (savings), device-phone-mobile (app)
- Hover: lift effect (hover:scale-105 hover:shadow-2xl)
- Each card has gradient top border (border-t-4)

### Coverage Comparison Table
- Sticky header with gradient background
- Alternating row backgrounds for readability
- Check/X icons with color coding (green/red gradients)
- Responsive: converts to accordion cards on mobile
- Highlight recommended plan with gradient glow outline

### Testimonials
- Card carousel with Thai customer photos
- 5-star ratings with gradient star icons
- Thai name + English translation
- Quote in Thai with subtle English subtitle
- Gradient quote marks decoration

### Footer
- Multi-column layout: Company info, Quick Links, Coverage Types, Contact
- Newsletter signup with gradient input border on focus
- Social media icons with gradient hover states
- OIC license badge and security certifications
- Language toggle reminder
- Gradient divider line above bottom legal text

---

## Images

### Required Images:
1. **Hero Background** (1920x1080): Modern car on scenic Thai highway at golden hour, professional photography, slightly desaturated to not compete with UI
2. **Trust Section** (600x400): Diverse Thai families with cars, lifestyle imagery showing protection/security
3. **Customer Testimonials** (120x120 each, 6 images): Authentic Thai customer headshots, diverse ages and backgrounds
4. **App Mockup** (800x1200): Phone mockup showing mobile claims interface with gradient UI
5. **Partner Logos** (200x80 each): Insurance underwriter logos, garages, roadside assistance partners

**Placement**: Hero full-width background, trust section split layout (image right, content left), testimonials inline with quotes, app showcase full-width section with floating mockup

---

## Visual Feedback & Interactions

### Button States (Gradient Buttons)
- Default: gradient background with shadow-lg
- Hover: brightness increase (hover:brightness-110) with scale-105
- Active: slight scale-down (active:scale-95)
- Loading: animated gradient shift with spinner

### Outline Buttons on Images
- Blurred white background (bg-white/10 backdrop-blur-md)
- White border (border-2 border-white/40)
- No custom hover states (inherits default button behavior)

### Form Inputs
- Default: border-2 border-borders bg-surface
- Focus: gradient ring (ring-2 ring-purple-500/50) with border color shift
- Error: red gradient ring with shake animation
- Success: green gradient ring with checkmark icon

### Card Interactions
- Hover: gradient border animation (border rotates through color spectrum)
- Selection: solid gradient border with inner glow
- Active state: scale transform with shadow expansion

### Language Toggle
- Pill switch design with gradient background on active side
- Smooth slide animation (transition-transform duration-300)
- Flag icons for TH/EN with subtle gradient overlay on active

---

## Accessibility & Bilingual Support

- All gradient text maintains 4.5:1 contrast minimum on backgrounds
- RTL support ready (Thai reads LTR but design accommodates future languages)
- Language-specific font weights (Thai text uses font-medium as baseline)
- Consistent spacing regardless of text length (both languages fit designs)
- Form labels support Thai diacritics with proper line-height
- Color is never the only indicator (icons + text always paired)

---

## Key Sections Structure

1. **Hero** (80vh): Image background, headline, trust badges, floating quote preview
2. **How It Works** (3-step process): Numbered cards with gradient icons
3. **Coverage Types** (comparison grid): 3 plans with feature matrices
4. **Why Choose Us** (4 features): Icon cards with gradient backgrounds
5. **Quote Wizard** (inline): Full wizard embedded or modal trigger
6. **Customer Stories** (testimonials): 3-column grid with Thai customers
7. **Mobile App Showcase**: Phone mockup with feature highlights
8. **FAQ**: Accordion with gradient expand icons
9. **Final CTA**: Full-width gradient background with dual-language messaging
10. **Footer**: Comprehensive navigation with newsletter signup

Each section uses gradients purposefully - not everywhere, but strategically for emphasis and brand consistency.