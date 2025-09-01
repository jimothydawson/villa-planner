# Villa Configuration & ROI Calculator

A modern React application built with Vite that allows users to configure villa options and see real-time pricing, ROI calculations, and villa facade images.

## Features

- **Real-time Configuration**: Configure bedrooms, storeys, land size, build style, and finish variants
- **Dynamic Pricing**: Automatic build cost calculations based on configuration
- **ROI Analysis**: Complete financial analysis including rental rates, occupancy, and return on investment
- **Floor Space Calculations**: Automatic interior floor space calculations based on building footprint
- **Image Display**: Villa facade images with intelligent naming convention and fallbacks
- **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes
- **Black & White Theme**: Clean, architectural design with zero border radius

## Configuration Options

### Bedrooms
- 1 Bedroom (default)
- 2 Bedrooms

### Storeys
- 1 Storey (default)
- 1.5 Storey (Mezzanine)
- 2 Storey

### Land Size
- 100m² (default)
- 200m²

### Build Style
- Modern (default)
- Balinese
- Japanese
- Moroccan

### Finish Variant
- Default
- Variant 2 (v2)
- Variant 3 (v3)

## Floor Space Calculations

Based on a building footprint of 8.5m × 7.7m = 65.45m²:
- **1 Storey**: 65.45m² total floor space
- **1.5 Storey (Mezzanine)**: 98.18m² total floor space (65.45m² × 1.5)
- **2 Storey**: 130.9m² total floor space (65.45m² × 2)

## Pricing Model

### Build Costs
- **Modern Base**: $200k (1s), $250k (1.5s), $300k (2s)
- **Style Premium**: +$20k (1s), +$30k (1.5s), +$40k (2s) for Balinese/Japanese/Moroccan
- **Bedroom Adjustment**: -$20k for 1BR
- **Land Size Multiplier**: +40% for 200m² land

### Rental Performance
- **Base Rate**: $200/night for Modern 1BR/1s
- **Occupancy**: 80% for 1BR, 70% for 2BR
- **Style Premium**: 30% increase for exotic styles
- **Bedroom Premium**: 40% increase for 2BR
- **Storey Scaling**: Rate scales with number of storeys

### Financial Calculations
- **Annual Revenue**: Nightly rate × 365 × occupancy rate
- **Annual Expenses**: 40% of revenue
- **ROI**: (Annual profit / Build cost) × 100

## Image Naming Convention

Images are expected in the `public/images/` directory with the following naming pattern:

- `{style}-{storeys}s.png` - Default finish, 100m² land
- `{style}-{storeys}s-{landSize}m2.png` - 200m² land, default finish
- `{style}-{storeys}s-v2.png` - Variant finish, 100m² land
- `{style}-{storeys}s-{landSize}m2-v3.png` - 200m² land with variant

### Examples
- `modern-1s.png`
- `balinese-1.5s-v2.png`
- `moroccan-2s-200m2-v3.png`

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd villa-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Add villa images** (optional)
   - Place villa facade images in `public/images/`
   - Follow the naming convention above
   - Images will show graceful fallbacks if not found

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **PropTypes** - Runtime type checking

## Design Principles

- **Black & White Only** - Clean, professional color scheme
- **Zero Border Radius** - Architectural, clean aesthetic
- **Responsive Design** - Works on all device sizes
- **Real-time Updates** - All calculations update immediately
- **Component-based Architecture** - Modular, maintainable code structure

## Component Structure

- `App.jsx` - Main layout and state management
- `VisualPanel.jsx` - Image display and filename debugging
- `ConfigurationPanel.jsx` - Configuration options and radio groups
- `ConfigSummary.jsx` - Current selection summary with floor space
- `FinancialAnalysis.jsx` - ROI calculations and financial metrics

## Browser Support

This application supports all modern browsers that support ES modules and modern JavaScript features.