import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Network,
  Briefcase,
  BookOpen,
  Calendar,
  Code2,
  Heart,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Network,
      title: "Professional Networking",
      description: "Connect directly with developers from startups to MNCs across Delhi NCR through genuine conversations and shared experiences.",
      color: "primary",
    },
    {
      icon: Briefcase,
      title: "Job Opportunities",
      description: "Get job referrals and opportunities shared by community members who know your work and want to help you succeed.",
      color: "green-500",
    },
    {
      icon: BookOpen,
      title: "Knowledge Sharing",
      description: "Learn from community members who voluntarily share their expertise through talks, workshops, and hands-on sessions.",
      color: "blue-500",
    },
    {
      icon: Calendar,
      title: "Regular Meetups",
      description: "Join meetups and events organized by fellow community members across different NCR locations.",
      color: "purple-500",
    },
    {
      icon: Code2,
      title: "Project Collaboration",
      description: "Find project partners and form teams with other developers who are passionate about building together.",
      color: "orange-500",
    },
    {
      icon: Heart,
      title: "Mentorship",
      description: "Receive guidance from senior developers and give back by mentoring newcomers in this supportive community.",
      color: "red-500",
    },
  ];

  return (
    <section className="py-20 relative cards-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Join Delhi Devs Rebooted?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This is a community where developers help each other grow. No paid services,
            no corporate handouts - just real people sharing knowledge, opportunities,
            and support to build something amazing together in Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const bgColor = feature.color === "primary" ? "bg-primary/10" : `bg-${feature.color}/10`;
            const textColor = feature.color === "primary" ? "text-primary" : `text-${feature.color}`;
            
            return (
              <Card 
                key={index} 
                className="feature-card group hover:shadow-lg transition-all duration-300 reveal"
              >
                <CardHeader>
                  <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`h-6 w-6 ${textColor}`} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}