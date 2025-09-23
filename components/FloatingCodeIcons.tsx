import { Code, Terminal, GitBranch, Database, Cpu, FileCode, Server, Globe, Smartphone, Monitor, Keyboard, Mouse } from "lucide-react";

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

export function FloatingCodeIcons() {
  const icons = [Code, Terminal, GitBranch, Database, Cpu, FileCode, Server, Globe, Smartphone, Monitor, Keyboard, Mouse];
  const numIcons = 40;
  const floatingIcons: FloatingIcon[] = Array.from({ length: numIcons }, () => ({
    Icon: icons[Math.floor(Math.random() * icons.length)],
    top: `${Math.random() * 20}%`,
    left: `${Math.random() * 20}%`,
    size: Math.floor(Math.random() * 5) + 4, // 4-8
    opacity: Math.floor(Math.random() * 16) + 10, // 5-20
    blur: Math.random() > 0.5 ? (Math.random() > 0.5 ? 'sm' : 'md') : false,
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 3, // 3-8s
  }));

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