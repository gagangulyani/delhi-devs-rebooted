"use client";

import { 
  Code, 
  Terminal, 
  GitBranch, 
  Database, 
  Cpu, 
  FileCode, 
  Server, 
  Globe, 
  Smartphone, 
  Monitor, 
  Keyboard, 
  Mouse,
  type LucideIcon 
} from "lucide-react";
import { useState, useEffect } from "react";

const ICON_COUNT = 40;

const sizeClasses: Record<number, string> = {
  4: "w-4 h-4",
  5: "w-5 h-5",
  6: "w-6 h-6",
  7: "w-7 h-7",
  8: "w-8 h-8",
};

const blurClasses: Record<string, string> = {
  sm: "blur-sm",
  md: "blur-md",
};

interface FloatingIcon {
  Icon: LucideIcon;
  top: string;
  left: string;
  sizeClass: string;
  opacity: number;
  blurClass: string;
  delay: number;
  duration: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function generateFloatingIcons(): FloatingIcon[] {
  const icons: LucideIcon[] = [Code, Terminal, GitBranch, Database, Cpu, FileCode, Server, Globe, Smartphone, Monitor, Keyboard, Mouse];
  
  return Array.from({ length: ICON_COUNT }, (_, i) => {
    const seed = i * 7 + 13;
    const size = Math.floor(seededRandom(seed + 3) * 5) + 4;
    const blurRoll = seededRandom(seed + 5);
    const blurValue = blurRoll > 0.5 ? (seededRandom(seed + 6) > 0.5 ? 'sm' : 'md') : null;
    
    return {
      Icon: icons[Math.floor(seededRandom(seed) * icons.length)],
      top: `${seededRandom(seed + 1) * 20}%`,
      left: `${seededRandom(seed + 2) * 20}%`,
      sizeClass: sizeClasses[size] || "w-6 h-6",
      opacity: Math.floor(seededRandom(seed + 4) * 16) + 10,
      blurClass: blurValue ? blurClasses[blurValue] : "",
      delay: seededRandom(seed + 7) * 5,
      duration: seededRandom(seed + 8) * 5 + 3,
    };
  });
}

export function FloatingCodeIcons() {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    setFloatingIcons(generateFloatingIcons());
  }, []);

  if (floatingIcons.length === 0) return null;

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
          className={`absolute ${icon.sizeClass} text-orange-400 ${icon.blurClass}`}
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
