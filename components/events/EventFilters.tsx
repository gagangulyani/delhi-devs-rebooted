"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

interface Filter {
  value: string;
  label: string;
}

interface EventFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedFilter: string;
  onFilterChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  filters: Filter[];
}

export function EventFilters({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
  filters,
}: EventFiltersProps) {
  const glassPanelClass =
    "rounded-3xl border-2 border-orange-500/50 dark:border-orange-600/50 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl transition-all duration-200";

  return (
    <div className={`${glassPanelClass} p-4`}>
      <div className="space-y-3">
        {/* Search Input */}
        <div className="relative w-full">
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-10 rounded-full border-0 bg-background/50 pl-10 text-sm shadow-sm backdrop-blur focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
        </div>

        {/* Filters and View Mode */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? "default" : "ghost"}
                size="sm"
                className={`rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedFilter === filter.value
                    ? "shadow-sm"
                    : "hover:bg-background/80"
                }`}
                onClick={() => onFilterChange(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-1 rounded-full border border-border/50 bg-background/30 p-0.5 backdrop-blur shrink-0">
            <Button
              type="button"
              size="icon"
              variant={viewMode === "grid" ? "default" : "ghost"}
              className="h-8 w-8 rounded-full transition-all duration-200"
              onClick={() => onViewModeChange("grid")}
              aria-label="Grid view"
            >
              <Squares2X2Icon className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant={viewMode === "list" ? "default" : "ghost"}
              className="h-8 w-8 rounded-full transition-all duration-200"
              onClick={() => onViewModeChange("list")}
              aria-label="List view"
            >
              <ListBulletIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
