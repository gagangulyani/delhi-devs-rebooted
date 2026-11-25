"use client";

import { useCallback, useEffect, useState, Children, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const arrowClass =
  "flex h-10 w-10 items-center justify-center border-2 border-foreground bg-card text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary/10 disabled:pointer-events-none disabled:opacity-35";

type RevealState = "idle" | "ready" | "shown";

export function FeatureCarousel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [reveal, setReveal] = useState<RevealState>("idle");
  const rootRef = useRef<HTMLDivElement>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReveal("shown");
      return;
    }

    // Anything already in view stays put; only animate blocks below the fold.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setReveal("shown");
      return;
    }

    setReveal("ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setReveal("shown");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slides = Children.toArray(children);

  return (
    <div ref={rootRef} className={className}>
      <div ref={emblaRef} className="cursor-grab overflow-hidden p-4 active:cursor-grabbing">
        <div className="flex gap-5">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={cn(
                "flex min-w-0 shrink-0 grow-0 basis-[85%] transition-[opacity,transform] duration-500 ease-out sm:basis-[45%] lg:basis-[31%]",
                reveal === "ready" && "translate-y-5 opacity-0",
                reveal === "shown" && "translate-y-0 opacity-100"
              )}
              style={reveal === "shown" ? { transitionDelay: `${i * 70}ms` } : undefined}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Swipe or drag
        </span>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous cards"
            className={arrowClass}
            style={{ boxShadow: "3px 3px 0 0 hsl(var(--primary))" }}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label="Next cards"
            className={arrowClass}
            style={{ boxShadow: "3px 3px 0 0 hsl(var(--primary))" }}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
