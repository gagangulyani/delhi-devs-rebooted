import { Skeleton } from "@/components/ui/skeleton";

export default function CodeOfConductLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 py-8 px-4 sm:py-12 sm:px-6">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        {/* Back Button Skeleton */}
        <Skeleton className="h-10 w-24" />
        
        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        
        {/* Content Skeleton */}
        <div className="rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl p-8 space-y-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-7 w-48" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              {i % 2 === 0 && (
                <div className="pl-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
