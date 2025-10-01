import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileHeaderSkeleton = React.memo(function ProfileHeaderSkeleton() {
  return (
    <div className="rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Avatar */}
        <Skeleton className="h-24 w-24 sm:h-32 sm:w-32 rounded-full shrink-0" />
        
        {/* Info */}
        <div className="flex-1 space-y-4 w-full">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-32" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
});

export const StatsCardsSkeleton = React.memo(function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl p-4 sm:p-6"
        >
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
});

export const ProjectCardSkeleton = React.memo(function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-18" />
      </div>
      
      <div className="flex items-center gap-4 pt-2">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
});

export const ProjectsListSkeleton = React.memo(function ProjectsListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
});

export const ProfilePageSkeleton = React.memo(function ProfilePageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 py-8 px-4 sm:py-12 sm:px-6">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        {/* Back Button Skeleton */}
        <Skeleton className="h-10 w-24" />
        
        {/* Profile Header */}
        <ProfileHeaderSkeleton />
        
        {/* Stats Cards */}
        <StatsCardsSkeleton />
        
        {/* Projects Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
          <ProjectsListSkeleton />
        </div>
        
        {/* Activity Section */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-40" />
          <div className="rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl p-6">
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
});
