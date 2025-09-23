import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function GroupsSection() {
  const groups = [
    {
      name: "Announcements",
      image: "/delhi-devs-rebooted.png",
      description: "Where the community admins share community related updates",
      features: [
        "Official updates",
        "Community announcements",
        "Important notices",
      ],
    },
    {
      name: "Delhi Devs Community",
      image: "/delhi-devs-community.png",
      description:
        "Where people share their tech doubts and serious stuff related to tech, community or anything that adds value including tech articles and sometimes self promo if thing is big",
      features: [
        "Tech discussions",
        "Problem solving",
        "Articles & resources",
        "Valuable self-promotion",
      ],
    },
    {
      name: "Friends Group",
      image: "/delhi-devs-friends-group.png",
      description:
        "Chit chat group for people to ask more questions unrelated to development and self promo is allowed here",
      features: [
        "Casual conversations",
        "Off-topic discussions",
        "Self-promotion welcome",
        "Networking & friendships",
      ],
    },
    {
      name: "Tech Meetups and Events",
      image: "/delhi-devs-tech-meetups-and-events.png",
      description:
        "People share about meetups and hackathons happening across Delhi NCR",
      features: [
        "Meetup announcements",
        "Hackathon info",
        "Event networking",
        "Delhi NCR focused",
      ],
    },
    {
      name: "Delhi Devs - AI Edition",
      image: "/delhi-devs-ai-edition.png",
      description:
        "People talk about stuff that's around AI, mixed with Delhi Devs Community (main group)",
      features: [
        "AI discussions",
        "ML topics",
        "AI tools & resources",
        "Future tech talks",
      ],
    },
    {
      name: "Delhi Devs Community Meetup",
      image: "/delhi-devs-community-meetup-group.png",
      description:
        "For Delhi Devs specific community meetup where people can network with one another, no self promo and event links allowed here",
      features: [
        "Pure networking",
        "Community meetups",
        "No promotions",
        "Face-to-face connections",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Community Groups
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our specialized groups based on your interests and needs. Each
            group has its own purpose and guidelines to ensure the best
            experience for all members.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {groups.map((group, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="relative">
                {/* Large rectangular image section */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Group name overlay on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                      {group.name}
                    </h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                    {group.description}
                  </CardDescription>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground/80 mb-3">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {group.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3 text-sm group/feature">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-200"></div>
                          <span className="text-muted-foreground group-hover/feature:text-foreground transition-colors duration-200">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each group has its own set of guidelines and community standards.
            Please read and follow the specific rules for each group to maintain
            a positive and productive environment for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
