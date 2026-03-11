"use client";

import { Code, Terminal, GitBranch, Database, Cpu, FileCode, Server, Globe, Smartphone, Monitor, Keyboard, Mouse } from "lucide-react";

interface FloatingIcon {
  id: string;
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

function generateFloatingIcons(): FloatingIcon[] {
  const icons = [Code, Terminal, GitBranch, Database, Cpu, FileCode, Server, Globe, Smartphone, Monitor, Keyboard, Mouse];
  const numIcons = 40;
  
  return Array.from({ length: numIcons }, (_, i) => {
    const seed = i * 7 + 13;
    const r = (s: number) => Math.round(seededRandom(s) * 10000) / 10000;
    return {
      id: `floating-icon-${i}`,
      Icon: icons[Math.floor(r(seed) * icons.length)],
      top: `${(r(seed + 1) * 20).toFixed(2)}%`,
      left: `${(r(seed + 2) * 20).toFixed(2)}%`,
      size: Math.floor(r(seed + 3) * 5) + 4,
      opacity: Math.floor(r(seed + 4) * 16) + 10,
      blur: r(seed + 5) > 0.5 ? (r(seed + 6) > 0.5 ? 'sm' : 'md') : false,
      delay: +(r(seed + 7) * 5).toFixed(2),
      duration: +(r(seed + 8) * 5 + 3).toFixed(2),
    };
  });
}

// Computed at module scope — seeded randomness has no DOM dependency,
// so this avoids the useEffect setState-on-mount hydration flash.
const floatingIcons = generateFloatingIcons();

export function FloatingCodeIcons() {
  if (floatingIcons.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes fall {
          from { transform: translate(0, 0); }
          to { transform: translate(calc(100vw - 100%), calc(100vh - 100%)); }
        }
      `}</style>
      {floatingIcons.map((icon) => (
        <icon.Icon
          key={icon.id}
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

