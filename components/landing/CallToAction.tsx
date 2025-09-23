import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  const features = [
    { label: "Open Source Friendly", color: "primary" },
    { label: "All Skill Levels Welcome", color: "green-500" },
    { label: "Diverse & Inclusive", color: "blue-500" },
  ];

  return (
    <section className="py-20 border-t">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Ready to Code Together?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of developers who are building the future of
          technology in Delhi NCR. Your next opportunity, collaboration, or
          friendship is just one click away.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/join">
            <Button size="lg" className="text-lg px-8 group">
              Apply for Membership
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/code-of-conduct">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Read Our Code of Conduct
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground mx-4">
          {features.map((feature, index) => {
            const dotColor = feature.color === "primary" ? "bg-primary" : `bg-${feature.color}`;

            return (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-2 h-2 ${dotColor} rounded-full animate-pulse`}></div>
                <span>{feature.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
