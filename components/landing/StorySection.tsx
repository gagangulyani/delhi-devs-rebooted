'use client';

import { useState } from "react";
import { Sparkles, Users, MapPin, ChevronDown } from "lucide-react";
import { storyCards, principles } from "@/constants/about";

export function StorySection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  return (
    <section id="story" className="py-24 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Story
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From a coffee break at a hackathon to a thriving community of builders.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {storyCards.map((card, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <button
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {index === 0 ? '01' : '02'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.subtitle}</p>
                  </div>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                    expandedCard === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {expandedCard === index && (
                <div className="px-6 pb-6 space-y-3">
                  {card.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-muted-foreground leading-relaxed pl-16">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-card/50 border border-border rounded-lg p-6 text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <principle.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{principle.title}</h4>
              <p className="text-sm text-muted-foreground">{principle.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}