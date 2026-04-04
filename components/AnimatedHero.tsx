'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AnimatedHeroProps {
  line1: string;
  line2: string;
  description?: string;
  badge?: {
    text: string;
    dotColor?: string;
  };
  className?: string;
}

export function AnimatedHero({
  line1,
  line2,
  description,
  badge,
  className,
}: AnimatedHeroProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {badge && (
        <Badge
          variant="outline"
          className="px-4 py-2 text-sm border-primary/30 bg-primary/5 backdrop-blur-sm"
        >
          <div
            className="w-2 h-2 rounded-full mr-2 animate-pulse"
            style={{ backgroundColor: badge.dotColor || 'var(--primary)' }}
          />
          {badge.text}
        </Badge>
      )}

      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85]">
        <span className="block text-foreground drop-shadow-sm">{line1}</span>
        <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]">
          {line2}
        </span>
      </h1>

      {description && (
        <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
