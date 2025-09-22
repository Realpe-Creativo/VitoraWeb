# Virtual Store - React + TypeScript

A modern, responsive virtual store built with React, TypeScript, and Tailwind CSS.

## Features

- **Three main pages**: Home, Product Detail, and Checkout
- **Responsive design**: Mobile-first approach with Tailwind CSS
- **Hero slider**: Art direction based on viewport proportions
- **Product grid**: Hover effects and responsive layout
- **Image zoom**: Desktop-only feature for product detail pages
- **YouTube Shorts**: Video carousel integration
- **Branch selector**: Filter stores by city
- **Accessibility**: ARIA labels, keyboard navigation, and focus management
- **Performance**: Lazy loading for images and optimized components

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main page components
├── data/               # Mock data (products, branches, etc.)
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── styles/             # Additional styles (if needed)
```

## Customization

### Adding Products

Edit `src/data/products.ts` to add or modify products, branches, and hero slides.

### Styling

The project uses Tailwind CSS. You can customize the design by modifying the classes in components or extending the Tailwind configuration in `tailwind.config.js`.

### Features

- **Hero Slider**: Auto-play with pause on hover, responsive images
- **Product Cards**: Hover effects to show alternate images
- **Image Zoom**: Desktop-only zoom functionality on product detail pages
- **Responsive Grid**: 1/2/3 columns based on screen size
- **Accessibility**: Full keyboard navigation and screen reader support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement approach