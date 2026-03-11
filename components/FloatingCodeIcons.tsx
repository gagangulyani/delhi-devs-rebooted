"use client";

import { Code, Terminal, GitBranch, Database, Cpu, FileCode, Server, Globe, Smartphone, Monitor, Keyboard, Mouse } from "lucide-react";
import { useMemo } from "react";

interface FloatingIcon {
  Icon: any;
  top: string;
  left: string;
  size: number;
  opacity: number;
  blur: string | false;
  delay: number;
  duration: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export function FloatingCodeIcons() {
  const icons = [Code, Terminal, GitBranch, Database, Cpu, FileCode, Server, Globe, Smartphone, Monitor, Keyboard, Mouse];
  const numIcons = 40;
  
  const floatingIcons: FloatingIcon[] = useMemo(() => {
    return Array.from({ length: numIcons }, (_, i) => {
      const seed = i * 7 + 13;
      return {
        Icon: icons[Math.floor(seededRandom(seed) * icons.length)],
        top: `${seededRandom(seed + 1) * 20}%`,
        left: `${seededRandom(seed + 2) * 20}%`,
        size: Math.floor(seededRandom(seed + 3) * 5) + 4,
        opacity: Math.floor(seededRandom(seed + 4) * 16) + 10,
        blur: seededRandom(seed + 5) > 0.5 ? (seededRandom(seed + 6) > 0.5 ? 'sm' : 'md') : false,
        delay: seededRandom(seed + 7) * 5,
        duration: seededRandom(seed + 8) * 5 + 3,
      };
    });
  }, []);

  return (
    <>
      <style>{`
        @keyframes fall {
          from { transform: translate(0, 0); }
          to { transform: translate(calc(100vw - 100%), calc(100vh - 100%)); }
        }
      `}</style>
      {floatingIcons.map((icon, index) => (
        <icon.Icon
          key={index}
          className={`absolute w-${icon.size} h-${icon.size} text-orange-400 ${icon.blur ? `blur-${icon.blur}` : ''}`}
          style={{
            top: icon.top,
            left: icon.left,
            animationDelay: `${icon.delay}s`,
            animationDuration: `${icon.duration}s`,
            animationName: 'fall',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            opacity: icon.opacity / 100
          }}
        />
      ))}
    </>
  );
}