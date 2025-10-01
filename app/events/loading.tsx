import { Skeleton } from "@/components/ui/skeleton";

export default function EventsLoading() {
  // Show static content immediately, only skeleton for dynamic events
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 py-8 px-4 sm:py-12 sm:px-6">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {/* Static Header - Loads immediately */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-foreground">Events</h1>
            <p className="text-sm text-muted-foreground">
              Discover upcoming meetups and workshops
            </p>
          </div>
        </div>
        
        {/* Static Filters Placeholder - Shows while loading */}
        <div className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl p-4">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        
        {/* Only events grid shows skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-9 w-28 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
