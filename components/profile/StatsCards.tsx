import React from "react";
import { ProfileStats } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Calendar, Users, Eye } from "lucide-react";

interface StatsCardsProps {
  stats: ProfileStats;
}

export const StatsCards = React.memo(function StatsCards({ stats }: StatsCardsProps) {
  const statItems = [
    { icon: FileText, label: "Total Blogs", value: stats.totalBlogs },
    { icon: Calendar, label: "Events Hosted", value: stats.totalEvents },
    { icon: Users, label: "Total Attendees", value: stats.totalAttendees },
    { icon: Eye, label: "Blog Views", value: stats.totalViews },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label}>
            <CardContent className="pt-6">
              <div className="text-center">
                <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
});
