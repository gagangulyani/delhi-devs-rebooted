'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface Attendee {
  id: string;
  display_name: string;
  avatar_url: string | null;
}

interface AttendeesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attendees: Attendee[];
  isLoading: boolean;
}

export function AttendeesDialog({ open, onOpenChange, attendees, isLoading }: AttendeesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border border-white/20 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-light">Attendees</DialogTitle>
        </DialogHeader>
        <div className="max-h-80 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : attendees.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No attendees yet</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {attendees.map((a) => (
                <li 
                  key={a.id} 
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-background/50 transition-colors duration-200"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-background/50">
                    <AvatarImage src={a.avatar_url || undefined} />
                    <AvatarFallback className="text-xs">{a.display_name?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{a.display_name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
