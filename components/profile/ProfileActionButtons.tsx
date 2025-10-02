import React from "react";
import { Button } from "@/components/ui/button";
import { PenTool, Calendar } from "lucide-react";
import { isFeatureEnabled } from "@/constants/features";

export const ProfileActionButtons = React.memo(function ProfileActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {isFeatureEnabled('blogs') && (
        <Button size="lg" className="flex-1 gap-2">
          <PenTool className="h-5 w-5" />
          Write New Blog
        </Button>
      )}

      {isFeatureEnabled('events') && (
        <Button size="lg" variant="outline" className="flex-1 gap-2">
          <Calendar className="h-5 w-5" />
          Host New Event
        </Button>
      )}
    </div>
  );
});
