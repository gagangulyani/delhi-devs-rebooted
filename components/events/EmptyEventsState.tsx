'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";

interface EmptyEventsStateProps {
  searchQuery: string;
  selectedFilter: string;
  showCreateButton: boolean;
  onCreateClick: () => void;
}

export function EmptyEventsState({
  searchQuery,
  selectedFilter,
  showCreateButton,
  onCreateClick,
}: EmptyEventsStateProps) {
  const glassPanelClass = "rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/40 shadow-lg backdrop-blur-2xl transition-all duration-200";

  return (
    <div className={`${glassPanelClass} p-12 text-center`}>
      <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">No Events Found</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
        {searchQuery || selectedFilter !== "all" 
          ? "Try adjusting your filters or search terms."
          : "Be the first to create an event for the community!"
        }
      </p>
      {showCreateButton && (
        <Button 
          onClick={onCreateClick}
          className="rounded-full"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create First Event
        </Button>
      )}
    </div>
  );
}
