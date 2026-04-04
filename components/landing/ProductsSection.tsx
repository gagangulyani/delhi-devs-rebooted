'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Code, Boxes, ArrowRight } from "lucide-react";
import Link from "next/link";

const buildSlots = [
  { number: 1, status: "In Development" },
  { number: 2, status: "Coming Soon" },
  { number: 3, status: "Building in Public" },
];

const techPlaceholders = ["React?", "Python?", "AI?", "Node?"];

export function ProductsSection() {
  return (
    <section id="products" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Shipped by the Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Great products take time. We&apos;re building in public.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-center text-muted-foreground mb-8">
            Our members are working on real products—SaaS tools, mobile apps, AI projects, and open source libraries. As they ship, they&apos;ll appear here.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {buildSlots.map((slot, index) => (
              <Card
                key={slot.number}
                className={`border-2 border-dashed border-border bg-card/50 relative overflow-hidden group hover:border-primary/50 transition-all duration-300 ${
                  slot.status === "In Development" ? "animate-pulse-border" : ""
                }`}
              >
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px] space-y-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center">
                    {slot.status === "Building in Public" ? (
                      <Rocket className="w-8 h-8 text-primary" />
                    ) : (
                      <Boxes className="w-8 h-8 text-muted-foreground/50" />
                    )}
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      Product #{slot.number}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      slot.status === "In Development"
                        ? "bg-orange-500/20 text-orange-500"
                        : slot.status === "Building in Public"
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {slot.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {techPlaceholders.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-secondary/50 text-muted-foreground/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm">
                    <span className="text-sm text-primary font-medium">
                      Be first to fill this slot →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link href="#join">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base font-semibold glow-orange-hover transition-all duration-300"
            >
              Submit Your Product
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground block">
            Be among the first to showcase your work
          </p>
        </div>
      </div>
    </section>
  );
}