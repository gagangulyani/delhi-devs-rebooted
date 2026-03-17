# Delhi Devs Rebooted

A modern, responsive community platform for Delhi developers built with Next.js 15, TypeScript, and Supabase. This platform brings together developers from Delhi NCR to connect, collaborate, and grow together.

## Features

- **Landing Page** - Beautiful glassmorphism hero section with community info
- **About Page** - Learn about the community mission and story
- **Join Community** - WhatsApp group join requests
- **Events** - Discover and browse tech meetups (feature currently disabled)
- **Code of Conduct** - Community guidelines
- **Contribute** - Open source contribution guide

## Pages

The application has 6 public pages:

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, and community info |
| `/about` | About the community |
| `/join` | Join the WhatsApp community |
| `/events` | Browse events (currently disabled) |
| `/code-of-conduct` | Community guidelines |
| `/contribute` | How to contribute to the project |

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18.3** - Latest React features
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern React component library
- **next-themes** - Dark/light mode support

### Backend & Database

- **Supabase** - PostgreSQL database
- **Supabase Auth** - Authentication and user management
- **Row Level Security (RLS)** - Secure data access policies

### Development Tools

- **Bun** - Fast JavaScript runtime and package manager
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking

## Getting Started

### Prerequisites

- **Bun** runtime installed - [Install Bun](https://bun.sh/docs/installation)
- **Node.js** (for compatibility) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```bash
# Clone the repository
git clone https://github.com/gagangulyani/delhi-devs-rebooted.git

# Navigate to the project directory
cd delhi-devs-rebooted

# Install dependencies with Bun (recommended)
bun install

# Or with npm
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
# Start the development server (Bun recommended)
bun run dev

# Or with npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Supabase Setup

### Local Development

1. **Install the Supabase CLI**

   ```bash
   brew install supabase/tap/supabase
   ```

2. **Install and start Docker Desktop**

   Download from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) and make sure it is running before the next step.

3. **Start the local Supabase stack**

   From the project root:

   ```bash
   supabase start
   ```

   This pulls the required Docker images, applies all migrations automatically, and prints your local credentials.

4. **Set your `.env.local`**

   ```env
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>
   ```

5. **Browse your data**

   Open Supabase Studio at [http://127.0.0.1:54323](http://127.0.0.1:54323) → **Table Editor** → `whatsapp_join_requests`.

6. **Stop the stack when done**

   ```bash
   supabase stop
   ```

### Production

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Link your local project and push migrations:

   ```bash
   supabase login
   supabase link --project-ref <project-ref>
   supabase db push
   ```

3. Add your environment variables in Vercel.

## Project Structure

```
delhi-devs-rebooted/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # Landing page
│   ├── about/             # About page
│   ├── join/              # Join community
│   ├── events/            # Events (feature disabled)
│   ├── code-of-conduct/   # Community guidelines
│   └── contribute/        # Contribution guide
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── landing/           # Landing page components
│   ├── events/            # Event components
│   └── skeletons/        # Loading skeletons
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── supabase/             # Database migrations
├── types/                 # TypeScript type definitions
└── constants/             # App constants and config
```

## Feature Flags

Features can be toggled in `constants/features.ts`:

| Feature | Status | Description |
|---------|--------|-------------|
| `events` | Disabled | Events listing and UI |
| `blogs` | Disabled | Blog section |
| `admin` | Disabled | Admin dashboard |
| `projects` | Disabled | Project showcase |
| `activity` | Disabled | Recent activity on profiles |

Set a feature to `true` to enable it. Note: routes remain accessible via URL even if navigation is hidden.

## Design System

### Glassmorphism Theme

The application features a glassmorphism design with:

- Frosted glass effects with backdrop blur
- Minimalist and elegant layouts
- Smooth transitions
- Dark/light mode support with `next-themes`

### Color Palette

- Custom orange accent colors (50-950 scale)
- Sidebar-specific color variables
- Semantic color tokens for consistent theming

## Available Scripts

```bash
# Development
bun run dev          # Start development server (recommended)

# Build
bun run build        # Build for production
bun run start        # Start production server

# Code Quality
bun run lint         # Run ESLint
bun run type-check   # Run TypeScript type checking

# Or with npm
npm run dev
npm run build
npm run start
npm run lint
npm run type-check
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:

- Create an issue in the repository
- Join our community discussions
- Reach out to the maintainers

---

Made with love for the Delhi Developer Community
