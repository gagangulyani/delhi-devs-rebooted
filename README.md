# Delhi Devs Rebooted 🚀

A modern community platform for Delhi developers built with Next.js 15, TypeScript, and Supabase.

[![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-green?logo=supabase)](https://supabase.com/)

## ✅ Current Features

- 🎨 **Glassmorphism UI** - Beautiful responsive design with dark/light mode
- 🔐 **Clerk Auth** - Secure authentication with social logins
- 🗄️ **Supabase Backend** - PostgreSQL with Row Level Security
- 📱 **Mobile-First** - Three-tier navigation (desktop/tablet/mobile)
- ⚙️ **Feature Flags** - Toggle features via `constants/features.ts`
- 🏗️ **Modern Stack** - Next.js 15, React 18, TypeScript, Tailwind CSS

## 📋 TODO

- [ ] 👤 **Community Profiles** - Developer profiles with projects and social links
- [ ] 📅 **Event Management** - Create and attend tech meetups with RSVP tracking
- [ ] 🚀 **Project Showcase** - Share projects and find collaborators
- [ ] 👥 **Admin Dashboard** - Manage community members and moderation
- [ ] 📝 **Blog System** - Tech articles and community posts
- [ ] 🔍 **Advanced Search** - Filter and discover members/events/projects

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/gagangulyani/community-welcome-app.git
cd delhi-devs-rebooted
bun install

# Setup environment
cp .env.local.example .env.local
# Add your Supabase and Clerk credentials to .env.local

# Run development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

**Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS, shadcn/ui  
**Backend**: Supabase (PostgreSQL + Auth)  
**Auth**: Clerk  
**State**: React Query, React Hook Form, Zod  
**Icons**: Lucide React + Font Awesome

## 🛠️ Setup

Requires: Bun (or Node 18+), Supabase account, Clerk account

```bash
# Install
git clone https://github.com/gagangulyani/community-welcome-app.git
cd delhi-devs-rebooted
bun install

# Configure environment
cp .env.local.example .env.local
# Add Supabase & Clerk credentials to .env.local

# Run
bun run dev  # Development
bun run build && bun run start  # Production
```

## 📁 Project Structure

```
app/                    # Next.js App Router
components/             # React components
  ui/                   # shadcn/ui components
  events/               # Event components
  profile/              # Profile components
constants/              # Config & feature flags
lib/                    # Utilities
supabase/migrations/    # Database schema
```

## 🧭 Navigation

All navigation configured in `constants/navigation.ts`:

- **Desktop**: Collapsible sidebar with icon-only mode
- **Mobile**: Fixed bottom nav with glassmorphism
- **Smart Filtering**: Role-based + feature flag integration

## 🎨 Design

**Theme**: Glassmorphism with warm orange accent (`#f97316`)  
**Colors**: HSL-based with light/dark mode via CSS variables  
**Layout**: Mobile-first responsive design  
**Icons**: Dual system (Lucide + Font Awesome) via `lib/icon-utils.tsx`

## 🔐 Auth & Security

- **Clerk** for user management with role-based access control
  - **Admin Role**: Full access to admin dashboard and management features
  - **User Role**: Standard community member access
- **Supabase RLS** for database security
- Protected routes via `middleware.ts`
- Session persistence with auto-refresh
- Role metadata stored in Clerk's `publicMetadata.role`

## 📊 Database

Tables in `supabase/migrations/`:

- `user_profiles` - Extended user info
- `user_projects` - Project showcase
- `events` - Event management
- `event_attendees` - RSVP tracking

All tables use UUID keys, RLS policies, and automatic timestamps.

## 🛠️ Common Tasks

### Add a shadcn component

```bash
bunx shadcn@latest add button dialog form
```

### Add a new page

1. Create `app/{name}/page.tsx`
2. Add to `constants/navigation.ts`
3. Register icon in `lib/icon-utils.tsx`

### Query Supabase

```typescript
import { supabase } from "@/integrations/supabase/client";

const { data } = await supabase
  .from("user_profiles")
  .select("*")
  .eq("id", userId)
  .single();
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/name`
3. Commit changes: `git commit -m 'feat: description'`
4. Push and open a Pull Request

## 📜 Scripts

```bash
bun run dev         # Development server
bun run build       # Production build
bun run start       # Production server
bun run lint        # ESLint
bun run type-check  # TypeScript validation
```

## 📜 License

MIT License - see [LICENSE](LICENSE)

## 🙏 Credits

Built with [Lovable.dev](https://lovable.dev) | Powered by [Vercel](https://vercel.com), [Supabase](https://supabase.com), [Clerk](https://clerk.com)

---

> Made with ❤️ for the Delhi Developer Community
