import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Calendar, MapPin } from "lucide-react";
import { useCommunityStats } from "@/hooks/use-community-stats";

export function CommunityStats() {
  const { data: stats, isLoading } = useCommunityStats();

  const statsData = [
    {
      icon: Users,
      value: stats?.totalMembers || 0,
      label: "Total Members",
      suffix: "+",
      color: "primary",
    },
    {
      icon: TrendingUp,
      value: stats?.approvedMembers || 0,
      label: "Active Developers",
      suffix: "",
      color: "green-500",
    },
    {
      icon: Calendar,
      value: stats?.recentJoins || 0,
      label: "Joined This Month",
      suffix: "",
      color: "blue-500",
    },
    {
      icon: MapPin,
      value: "NCR",
      label: "Cities Connected",
      suffix: "",
      color: "orange-500",
      isText: true,
    },
  ];

  return (
    <section className="py-20 relative stats-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Growing Strong Together
          </h2>
          <p className="text-xl text-muted-foreground">
            Real numbers from our thriving Delhi NCR developer ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            const bgColor = stat.color === "primary" ? "bg-primary/10" : `bg-${stat.color}/10`;
            const textColor = stat.color === "primary" ? "text-primary" : `text-${stat.color}`;
            
            return (
              <Card key={index} className="text-center reveal">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`h-8 w-8 ${textColor}`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {stat.isText ? (
                      stat.value
                    ) : (
                      <>
                        <span
                          className="stat-number"
                          data-value={stat.value}
                        >
                          {isLoading ? "..." : "0"}
                        </span>
                        {stat.suffix}
                      </>
                    )}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}