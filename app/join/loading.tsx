import { Skeleton } from "@/components/ui/skeleton";

export default function JoinLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 py-8 px-4 sm:py-12 sm:px-6">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        {/* Back Button Skeleton */}
        <Skeleton className="h-10 w-24" />
        
        {/* Title Skeleton */}
        <div className="text-center space-y-3">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>
        
        {/* Form Skeleton */}
        <div className="rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl p-8 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
          
          <div className="flex gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 flex-1" />
          </div>
          
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
