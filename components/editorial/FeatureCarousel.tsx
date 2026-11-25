"use client";

import { useCallback, useEffect, useState, Children } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const arrowClass =
  "flex h-10 w-10 items-center justify-center border-2 border-foreground bg-card text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary/10 disabled:pointer-events-none disabled:opacity-35";

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

  return (
    <div className={className}>
      <div ref={emblaRef} className="cursor-grab overflow-hidden p-4 active:cursor-grabbing">
        <div className="flex gap-5">
          {Children.toArray(children).map((slide, i) => (
            <div
              key={i}
              className="flex min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[45%] lg:basis-[31%]"
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
