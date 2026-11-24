import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  meta?: string;
  children?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, lede, meta, children }: PageHeaderProps) {
  return (
    <header className="border-b-2 border-foreground pb-10">
      <div className="flex items-baseline justify-between gap-4">
        <span className="marker">{eyebrow}</span>
        {meta && <span className="eyebrow">{meta}</span>}
      </div>

      <h1 className="display-hero mt-6 text-foreground">{title}</h1>

      {lede && <p className="lede mt-6">{lede}</p>}

      {children && <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">{children}</div>}
    </header>
  );
}

interface SectionProps {
  label: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function EditorialSection({ label, title, children, className = "" }: SectionProps) {
  return (
    <section className={cn("mt-16", className)}>
      <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <h2 className="eyebrow text-foreground">{label}</h2>
        {title && <span className="serif-i text-lg text-muted-foreground">{title}</span>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
