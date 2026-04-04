# Delhi Devs Rebooted - AI Agent Instructions

## Project Overview
Next.js 15 community platform for Delhi Devs with TypeScript, Supabase backend, shadcn/ui components, and Bun runtime. Originally bootstrapped via Lovable.dev but actively developed locally.

## Architecture & Key Patterns

### Responsive Layout System
Three-tier navigation strategy:
- **Desktop**: Collapsible sidebar (`DesktopSidebar.tsx`) using shadcn sidebar primitives with icon-only collapse mode
- **Mobile**: Fixed bottom glassmorphism nav (`MobileBottomNavigation.tsx`) with floating center action button, plus sticky top header
- **Layout**: Defined in `app/layout.tsx` with `SidebarProvider` wrapping entire app

### State Management
- **React Query** (`@tanstack/react-query`) for server state with 60s stale time
- **Custom Context**: `LoadingContext` for global loading states with message support
- **Auth**: Supabase auth with session persistence, `onAuthStateChange` listeners

### Component Architecture
- **shadcn/ui**: All UI components from `components/ui/` (40+ components)
- **Path alias**: `@/*` maps to project root (configured in `tsconfig.json` and `components.json`)
- **Icon system**: Dual-icon support in `lib/icon-utils.tsx` - both Lucide React and Font Awesome, mapped by string name
- **Variants**: Mobile/desktop component variants (see `NavigationItem.tsx` with `variant` prop)

### Route Structure
```
app/
├── page.tsx           # Landing → redirects to /profile/me if authed
├── profile/[...slug]/ # Catch-all: /profile/me (own) or /profile/{userId}
├── events/            # Event listings
├── auth/              # Authentication flow
├── admin/             # Admin dashboard (isPublic: false)
└── about|join|code-of-conduct/ # Static pages
```

### Navigation System
- **Central config**: `constants/navigation.ts` with `isPublic` flag
- **Filtering helpers**: `getPublicNavigationItems()` and `getAuthenticatedNavigationItems(isAdmin)`
- **Icons**: String references like `"faHome"` resolved via `getIcon()` from icon-utils

## Database Schema (Supabase)

Key tables in `supabase/migrations/`:
- `user_profiles`: Extended user data (display_name, bio, socials, etc.)
- `user_projects`: Community member projects with tech stack arrays
- `events`: Event management with location_type enum, max_attendees
- `event_attendees`: Join table with status tracking

**RLS enabled** on all tables. Policies allow public reads, authenticated writes to own data.

## Development Workflows

### Running the App
**IMPORTANT**: Do not run `bun run dev` - the development server is already running in the background.

```bash
# Server commands (DO NOT RUN - server is active)
# bun run dev      # Dev server already running on port 3000

# Available commands:
bun run build    # Production build
bun run start    # Production server
bun run lint     # ESLint
```

### TypeScript Configuration
- **Strict mode**: OFF (`strict: false` in tsconfig)
- No unused var/param checks, no implicit any enforcement
- Target: ES2017 with DOM libs

### Environment Variables
Required in `.env.local` (fallbacks hardcoded in `integrations/supabase/client.ts` for demo):
```
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### Supabase Integration
- Client in `integrations/supabase/client.ts` with auto-generated types
- Auth: `persistSession: true`, `autoRefreshToken: true`
- Mock data: Profile page currently uses mock data for demo purposes

## Styling Conventions

### Design Philosophy
**IMPORTANT**: Follow the website's glassmorphism theme with minimalist elegance and subtle animations.
- **Glassmorphism**: Use frosted glass effects with backdrop blur (`backdrop-blur-2xl`, `bg-white/70 dark:bg-black/40`)
- **Minimalism**: Clean, spacious layouts with purposeful whitespace
- **Elegance**: Smooth transitions (`transition-all duration-200 ease-out`), rounded corners, subtle shadows
- **Animations**: Gentle hover effects (scale, translate), no jarring movements - see `NavigationItem.tsx` for examples

### Tailwind + CSS Variables
- Theme system via `next-themes` with dark mode class strategy
- Custom colors: `sidebar-*`, `orange-*` scale (50-950)
- Glassmorphism pattern: `bg-white/70 dark:bg-black/40 backdrop-blur-2xl` (see mobile nav)
- Orange accent: Gradient tags use `from-orange-800 via-orange-700 to-orange-600`

### Component Patterns
- **cn() utility**: `lib/utils.ts` - combines `clsx` + `tailwind-merge`
- **Radix primitives**: Heavy use of Radix UI under shadcn components
- **Form handling**: `react-hook-form` + `zod` + `@hookform/resolvers`

### Code Organization Principles
**IMPORTANT**: Prioritize reusability and maintainability.
- **Reuse first**: Check existing components/utilities before creating new ones
- **Make it common**: If building something, create it as a reusable component/utility from the start
- **Refactor when needed**: If components/files grow too large or complex, break them into smaller, focused modules
- **DRY principle**: Extract repeated patterns into shared utilities (see `lib/` folder)
- **No auto-documentation**: Do NOT create summary documents, completion reports, or refactoring guides unless explicitly requested by the user

## Critical Gotchas

1. **Params in App Router**: Use `Promise<{ slug: string[] }>` type and resolve with `await params` before accessing
2. **Icon mapping**: Must register icons in `iconMap` (icon-utils) before use in navigation config
3. **Mobile nav curation**: `MobileBottomNavigation` filters/reorders tabs based on auth state and space constraints
4. **Loading states**: Always use `useLoading()` hook instead of local state for consistency
5. **RLS policies**: Remember to add policies when creating new Supabase tables

## Common Tasks

### Adding a New Page
1. Create route in `app/{name}/page.tsx`
2. Add entry to `constants/navigation.ts` with icon
3. Register icon in `lib/icon-utils.tsx` if new
4. Test mobile/desktop navigation rendering

### Adding a shadcn Component
```bash
bunx shadcn@latest add [component-name]
```
Auto-configured via `components.json` to use `@/` aliases.

### Database Migrations
Place in `supabase/migrations/` with timestamp prefix. Include:
- Table creation with UUID primary keys
- RLS policies (enable + create policies)
- Trigger functions for updated_at timestamps

### Form Implementation Pattern
```tsx
// 1. Define Zod schema
const schema = z.object({ ... });

// 2. useForm with zodResolver
const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
});

// 3. Wrap in shadcn Form component
<Form {...form}>
  <FormField name="field" render={({ field }) => (
    <FormItem>
      <FormLabel>Label</FormLabel>
      <FormControl><Input {...field} /></FormControl>
      <FormMessage />
    </FormItem>
  )} />
</Form>
```

## External Dependencies

- **Bun**: Runtime + package manager (not Node/npm)
- **Next.js 15**: App Router, React 18.3
- **Supabase**: Auth + Postgres + RLS
- **Lovable.dev**: Original project scaffold (see README)

## SEO & Metadata
Rich metadata in `app/layout.tsx` including:
- OpenGraph tags with community-specific images
- Structured data (JSON-LD) for organization
- Dynamic title templates with `%s | Delhi Devs Rebooted`

---

**Note**: When implementing features, check if mock data is being used (e.g., profile page) and consider replacing with real Supabase queries. Always maintain mobile-first responsive design with glassmorphism aesthetic.
