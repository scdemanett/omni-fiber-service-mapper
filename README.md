# Omni Fiber Service Mapper

A Next.js application for tracking and visualizing Omni Fiber internet service availability across addresses. Features include batch serviceability checking, interactive mapping with timeline playback, and progress tracking for service rollout.

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## ⚡ Quick Start

```bash
# Clone and setup
git clone <your-repo-url>
cd omni-fiber-service-mapper
npm install

# Setup environment
cp .env.example .env

# Setup database
npx prisma generate
npx prisma migrate dev

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to get started!

## Screenshots

### Dashboard
![Dashboard view showing overview statistics and quick access to all features](screenshots/dashboard.jpg?v=1)

### GeoJSON Upload
![Upload interface for importing address data from GeoJSON files](screenshots/upload.jpg?v=1)

### Address Selections
![Selection management interface for creating and managing address campaigns](screenshots/selections.jpg?v=1)

### Batch Serviceability Checker
![Batch checker interface with progress tracking and pause/resume controls](screenshots/checker.jpg?v=1)

### Interactive Map with Timeline
![Interactive map with color-coded service availability markers and filtering options](screenshots/map.jpg?v=1)

## Features

### 🗺️ Interactive Map View with Timeline
- Color-coded markers for service status (Available, Preorder, No Service)
- Real-time updates during batch checking
- **Timeline mode** to visualize service expansion over time
  - Based on Omni Fiber API dates (when service was established)
  - Animated playback of service rollout progression
  - Scrub through historical snapshots
  - See exactly when addresses became serviceable
- Filter by service type
- Export to GeoJSON

### ✅ Batch Serviceability Checking
- Check thousands of addresses automatically
- Five check modes:
  - **Unchecked**: Only new addresses
  - **Preorder**: Re-check addresses marked as preorder
  - **No Service**: Re-check addresses with no service
  - **Errors**: Re-check addresses that had API errors
  - **All**: Re-validate all addresses
- Pause/resume capability
- Live progress tracking
- Smart error handling (errors don't pollute data)
- Rate-limited API calls (2 seconds between requests)

### 🎯 Address Selection & Management
- Upload GeoJSON files with address data
- Create filtered selections by city, region, or postcode
- Track multiple campaigns simultaneously
- Export results as GeoJSON

### 📈 Three-Tier Classification
- **Available Now** (Green): Service can be ordered immediately
- **Preorder/Planned** (Yellow): Future service availability
- **No Service** (Red): Outside service area or not planned

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: SQLite with Prisma ORM
- **UI**: React, Tailwind CSS, shadcn/ui
- **Maps**: Leaflet.js
- **API Integration**: Omni Fiber getCatalog API with custom decoder

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

Follow these steps to set up the project:

#### 1️⃣ Clone and Install
```bash
git clone <your-repo-url>
cd omni-fiber-service-mapper
npm install
```

#### 2️⃣ Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env if needed (default values work for local development)
```

**Environment Variables** (see `.env.example`):
- `DATABASE_URL` - SQLite database location (default: `file:./dev.db`)
- `NEXT_PUBLIC_BASE_URL` - Application URL (default: `http://localhost:3000`)
- `NODE_ENV` - Environment mode (development/production)

#### 3️⃣ Setup Database
```bash
# Generate Prisma client from schema
npx prisma generate

# Run migrations to create database schema
npx prisma migrate dev
```

This creates a SQLite database at `prisma/dev.db` with all required tables.

#### 4️⃣ Start Development Server
```bash
npm run dev
```

#### 5️⃣ Access Application
Navigate to [http://localhost:3000](http://localhost:3000)

### Troubleshooting Setup

**Issue: Prisma client errors**
```bash
npx prisma generate
```

**Issue: Database out of sync**
```bash
npx prisma migrate reset  # ⚠️ Deletes all data
```

**Issue: Port already in use**
```bash
# Edit .env and change PORT=3001
```

## Usage Workflow

### 1. Upload Address Data
- Go to **Upload** page
- Select a GeoJSON file with address features
- Properties should include: `number`, `street`, `city`, `region`, `postcode`
- **Recommended Source**: [OpenAddress.io](https://openaddress.io/) provides free, open address data in compatible formats
- Upload and wait for processing

### 2. Create Selection
- Go to **Selections** page
- Choose your uploaded source
- Filter by city or other properties
- Create named selection/campaign

### 3. Run Serviceability Checks
- Go to **Checker** page
- Select your campaign
- Choose check mode (Unchecked/Preorder/All)
- Start checking
- Monitor progress in real-time

### 4. View Results on Map
- Go to **Map** page
- Select your campaign
- Toggle filters to show/hide service types
- Enable **Timeline Mode** to see service rollout history
  - Scrub through time using the slider
  - Play animation of service expansion
  - Dates based on when Omni Fiber established service (API dates)
  - Track exactly when addresses became serviceable
- Export filtered results as GeoJSON

## API Integration

The application decodes Omni Fiber's API responses through multiple layers:
1. Brotli decompression
2. ROT13 cipher
3. Custom UUdecode
4. Optional gzip decompression
5. JSON parsing

Serviceability is determined by analyzing multiple fields:
- `cstatus`: `schedulable`, `presales`, `future-service`
- `status`: `SERVICEABLE`, `PLANNED`
- `salesStatus`: `Y`, `P`
- `matchType`: `EXACT`, `NONE`
- `isPreSale`: `0`, `1`

## Database Schema

### Main Tables
- **GeoJSONSource**: Uploaded address files
- **Address**: Individual addresses with coordinates
- **AddressSelection**: Named campaigns/selections
- **ServiceabilityCheck**: Check results (preserves history)
- **BatchJob**: Batch checking jobs with progress

## Project Structure

```
src/
├── app/
│   ├── actions/          # Server actions
│   │   ├── dashboard.ts  # Dashboard stats
│   │   ├── geojson.ts    # GeoJSON operations
│   │   ├── map-timeline.ts # Map timeline data
│   │   ├── selections.ts # Selection management
│   │   └── stats.ts      # Navigation stats
│   ├── api/              # API routes
│   │   ├── batch-check/  # Batch checking
│   │   ├── check-serviceability/ # Single check
│   │   └── upload-geojson/ # File upload
│   ├── checker/          # Checker page
│   ├── map/              # Map view with timeline
│   ├── selections/       # Selection management
│   └── upload/           # File upload
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── navigation.tsx    # Main navigation
│   └── service-map.tsx   # Leaflet map
└── lib/
    ├── batch-processor.ts # Batch logic
    ├── db.ts             # Prisma client
    ├── geojson-parser.ts # GeoJSON parsing
    ├── omni-decoder.ts   # API decoder
    └── utils.ts          # Utilities
```

## Configuration Files

### Environment Variables
- `.env.example` - Template with all required variables
- `.env` - Your local environment (git-ignored, create from example)

### Prisma
- `prisma/schema.prisma` - Database schema definition
- `prisma.config.ts` - Prisma configuration
- `prisma/migrations/` - Database migration history

## Development

### Database Migrations
```bash
# Create migration after schema changes
npx prisma migrate dev --name description

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Open Prisma Studio to view data
npx prisma studio
```

### Build for Production
```bash
npm run build
npm start
```

## Features in Detail

### Timeline Mode
- Automatically detects multiple check dates
- Scrub through time with slider
- Auto-animate with play button
- See service expansion visually
- Export data at specific points in time

### Recheck Modes
- **Unchecked**: Standard mode for new addresses
- **Preorder**: Target addresses awaiting service
- **All**: Full re-validation of entire selection

### Map Timeline
- Visualizes service rollout using Omni Fiber API dates
- Shows when addresses were added and when they became serviceable
- Animated playback through historical snapshots
- Groups changes by day for easy tracking
- Helps identify deployment patterns and expansion progress

## Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes and test thoroughly
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure:
- Code follows existing style conventions
- All TypeScript types are properly defined
- Build passes (`npm run build`)
- Features are tested in both light and dark modes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Maps powered by [Leaflet](https://leafletjs.com/)
- Database with [Prisma](https://www.prisma.io/)
- Address data support for [OpenAddress](https://openaddress.io/) - free, open global address data

## Support

For issues, questions, or feature requests:
- Open a [GitHub Issue](../../issues)
- Check existing issues before creating new ones
- Provide detailed information for bug reports

## Author

**Steven Demanett**

---

**Note**: This is an unofficial tool for analyzing Omni Fiber service availability. Not affiliated with or endorsed by Omni Fiber.
