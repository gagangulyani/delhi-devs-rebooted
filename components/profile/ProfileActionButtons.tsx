import React from "react";
import { Button } from "@/components/ui/button";
import { PenTool, Calendar } from "lucide-react";

export const ProfileActionButtons = React.memo(function ProfileActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Button size="lg" className="flex-1 gap-2">
        <PenTool className="h-5 w-5" />
        Write New Blog
      </Button>
      <Button size="lg" variant="outline" className="flex-1 gap-2">
        <Calendar className="h-5 w-5" />
        Host New Event
      </Button>
    </div>
  );
});
