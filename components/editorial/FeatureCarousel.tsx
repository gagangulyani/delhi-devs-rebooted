"use client";

import { useCallback, useEffect, useState, Children, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const AUTOPLAY_DELAY = 3500;

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reveal, setReveal] = useState<RevealState>("idle");
  const rootRef = useRef<HTMLDivElement>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelected(emblaApi.selectedScrollSnap());
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

  // Slideshow auto-play — pauses while the user hovers or drags.
  useEffect(() => {
    if (!emblaApi || paused) return;
    const interval = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [emblaApi, paused]);

  // Staggered entrance when scrolled into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReveal("shown");
      return;
    }

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
    <div
      ref={rootRef}
      className={className}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
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

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === selected ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === selected ? "w-7 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
              )}
            />
          ))}
        </div>

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
