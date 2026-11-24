"use client";

import { useEffect, useRef, useState } from "react";

type RevealState = "idle" | "ready" | "shown";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger in ms. Keep the total under ~240ms. */
  delay?: number;
  className?: string;
}

/**
 * Reveals a block once, when it enters the viewport: 12px rise + fade, 320ms.
 * The element renders visible when JS is unavailable, and motion is skipped
 * entirely for `prefers-reduced-motion: reduce`.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("idle");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("shown");
      return;
    }

    // Only animate blocks that start below the fold; anything already visible
    // stays put, so there is no flash of hidden content on load.
    if (element.getBoundingClientRect().top < window.innerHeight) {
      setState("shown");
      return;
    }

    setState("ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("shown");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
