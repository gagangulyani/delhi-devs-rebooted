import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest contributions and interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Joined Delhi Devs Community</p>
              <p className="text-xs text-muted-foreground">2 weeks ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Attended Meetup #1</p>
              <p className="text-xs text-muted-foreground">1 week ago</p>
            </div>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">More activity coming soon...</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
