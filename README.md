# Delhi Devs Rebooted 🚀

A modern, responsive community platform for Delhi developers built with Next.js 15, TypeScript, and Supabase. This platform brings together developers from Delhi NCR to connect, collaborate, and grow together.

## 🌟 Features

- **Community Profiles**: Create and manage professional developer profiles
- **Event Management**: Discover, create, and attend tech meetups and workshops
- **Project Showcase**: Share your projects and find collaborators
- **Responsive Design**: Beautiful glassmorphism UI that works on all devices
- **Real-time Updates**: Live event registrations and community interactions
- **Admin Dashboard**: Manage community members and moderate content

## 🏗️ Architecture

This is a **Next.js 15** application with a modern three-tier navigation system:

- **Desktop**: Collapsible sidebar with icon-only collapse mode
- **Mobile**: Fixed bottom glassmorphism navigation with floating action button
- **Authentication**: Supabase auth with session persistence and RLS policies

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18.3** - Latest React features
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern React component library (40+ components)
- **Framer Motion** - Smooth animations and transitions

### Backend & Database

- **Supabase** - PostgreSQL database with real-time subscriptions
- **Row Level Security (RLS)** - Secure data access policies
- **Supabase Auth** - Authentication and user management

### State Management & Data

- **React Query (@tanstack/react-query)** - Server state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Development Tools

- **Bun** - Fast JavaScript runtime and package manager
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites

- **Bun** runtime installed - [Install Bun](https://bun.sh/docs/installation)
- **Node.js** (for compatibility) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```bash
# Clone the repository
git clone https://github.com/gagangulyani/community-welcome-app.git

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

See the **Supabase Setup** section below for how to get these values locally or for production.

### Development

```bash
# Start the development server (Bun recommended)
bun run dev

# Or with npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🗄️ Supabase Setup

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

   This pulls the required Docker images, applies all migrations automatically, and prints your local credentials:

   ```
   Project URL    │ http://127.0.0.1:54321
   Publishable    │ sb_publishable_xxxxxxxxxxxxxxxxxxxx
   ```

4. **Set your `.env.local`**

   ```env
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<Publishable key from above>
   ```

5. **Browse your data**

   Open Supabase Studio at [http://127.0.0.1:54323](http://127.0.0.1:54323) → **Table Editor** → `whatsapp_join_requests`.

6. **Stop the stack when done**

   ```bash
   supabase stop
   ```

---

### Production (Vercel + Supabase Cloud)

#### Step 1 — Create a Supabase cloud project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Wait for the project to finish provisioning.

#### Step 2 — Apply migrations to the cloud database

Link your local project to the cloud project and push all migrations:

```bash
supabase login                          # authenticates the CLI
supabase link --project-ref <project-ref>   # found in Project Settings → General
supabase db push                        # runs all migrations in supabase/migrations/
```

#### Step 3 — Get your API credentials

In the Supabase dashboard go to **Project Settings → API**:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` / `public` key |

#### Step 4 — Add environment variables in Vercel

1. Open your project in the [Vercel dashboard](https://vercel.com/dashboard).
2. Go to **Settings → Environment Variables**.
3. Add both variables from Step 3, and set the environment to **Production** (and **Preview** if needed).
4. Redeploy — Vercel picks up the new env vars automatically.

#### Step 5 — Verify RLS is enabled

The migration already enables Row Level Security and adds an insert policy for anonymous users. You can confirm in the Supabase dashboard under **Authentication → Policies** → `whatsapp_join_requests`.

### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
```

## 📁 Project Structure

````text
delhi-devs-rebooted/
├── app/                    # Next.js 15 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Landing page
│   ├── profile/[...slug]/ # Dynamic profile pages
│   ├── events/           # Event management
│   ├── admin/            # Admin dashboard
│   └── auth/             # Authentication flow
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── profile/          # Profile-related components
│   ├── events/           # Event-related components
│   ├── landing/          # Landing page components
│   └── skeletons/        # Loading skeletons
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── supabase/            # Database migrations
├── types/               # TypeScript type definitions
└── constants/           # App constants and config

## Feature Flags

There's a single place to toggle major features used across the app:

- `constants/features.ts` - toggles for `events`, `blogs`, and `admin`.

Set a feature to `false` to hide related navigation items across the site. Note: routes remain accessible via URL even if the navigation item is hidden.

Example:

```ts
// constants/features.ts
export const features = {
  events: true,
  blogs: false, // hide blogs from navigation
  admin: true,
}
````

```

## 🎨 Design System

### Glassmorphism Theme

The application features a beautiful glassmorphism design with:

- Frosted glass effects with backdrop blur
- Minimalist and elegant layouts
- Smooth transitions and subtle animations
- Dark/light mode support with `next-themes`

### Color Palette

- Custom orange accent colors (50-950 scale)
- Sidebar-specific color variables
- Semantic color tokens for consistent theming

## 🔐 Authentication & Security

- **Supabase Auth** with email/password authentication
- **Row Level Security (RLS)** policies on all database tables
- **Session persistence** and automatic token refresh
- **Protected routes** with authentication middleware

## 📊 Database Schema

Key tables:

- `user_profiles` - Extended user information
- `user_projects` - Community member projects
- `events` - Event management with attendance tracking
- `event_attendees` - Join table for event registrations

## 🚀 Performance Optimizations

- **Code Splitting** - Lazy loading for non-critical components
- **React.memo** - Optimized component re-renders
- **Skeleton Loaders** - Improved perceived performance
- **Parallel Data Fetching** - Concurrent API calls
- **Static Content First** - Instant page load feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Originally started with [Lovable.dev](https://lovable.dev)
- Built for the Delhi developer community
- Inspired by modern developer collaboration platforms

## 📞 Support

For support and questions:

- Create an issue in the repository
- Join our community discussions
- Reach out to the maintainers

---

## Made with ❤️ for the Delhi Developer Community
```
