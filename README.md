# Omni Fiber Service Mapper

A Next.js application for tracking and visualizing Omni Fiber internet service availability across addresses. Features include batch serviceability checking, interactive mapping with timeline playback, and progress tracking for service rollout.

## Features

### 🗺️ Interactive Map View
- Color-coded markers for service status (Available, Preorder, No Service)
- Real-time updates during batch checking
- Timeline mode to visualize service expansion over time
- Animated playback of service rollout progress
- Filter by service type

### ✅ Batch Serviceability Checking
- Check thousands of addresses automatically
- Three check modes:
  - **Unchecked**: Only new addresses
  - **Preorder**: Re-check addresses marked as preorder
  - **All**: Re-validate all addresses
- Pause/resume capability
- Progress tracking with live updates
- Rate-limited API calls (2 seconds between requests)

### 📊 Progress Tracking
- Track service status changes over time
- Identify addresses that transitioned from preorder → available
- Visualize deployment velocity
- Historical analysis

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

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd omni-fiber-service-mapper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage Workflow

### 1. Upload Address Data
- Go to **Upload** page
- Select a GeoJSON file with address features
- Properties should include: `number`, `street`, `city`, `region`, `postcode`
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
- Enable **Timeline Mode** to see changes over time
- Use playback controls to animate service expansion

### 5. Track Progress
- Go to **Progress** page
- Select your campaign
- View transition statistics
- See which addresses changed status
- Analyze service rollout trends

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
│   │   ├── analysis.ts   # Progress tracking
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
│   ├── map/              # Map view
│   ├── progress/         # Progress tracking
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

## Environment Variables

See `.env.example` for required variables:
- `DATABASE_URL`: SQLite database location
- `NEXT_PUBLIC_BASE_URL`: Application base URL

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

### Progress Tracking
- Tracks all transitions: preorder→available, none→preorder, etc.
- Shows recent status changes with timestamps
- Calculates rollout statistics
- Helps identify deployment patterns

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

[Your License]

## Support

For issues or questions, please open a GitHub issue.
