import { cn } from "@/lib/utils";
import { Tilt } from "@/components/editorial/motion";

/** Big numbered section header with a hard rule and optional serif note. */
export function SectionHead({
  index,
  label,
  note,
  className,
}: {
  index: string;
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t-2 border-foreground pt-5", className)}>
      <h2 className="flex items-baseline gap-4">
        <span aria-hidden="true" className="font-mono text-lg font-semibold tabular-nums text-primary">
          {index}
        </span>
        <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {label}
        </span>
      </h2>
      {note && (
        <span className="serif-i text-lg text-muted-foreground sm:text-xl">{note}</span>
      )}
    </header>
  );
}

/** A large stat number with a mono label. */
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-foreground pl-4">
      <div className="font-mono text-3xl font-semibold tabular-nums tracking-tight text-foreground sm:text-4xl">
        {value}
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
    </div>
  );
}

/** A photo framed like a physical print with an optional tilt and caption. */
export function PrintPhoto({
  src,
  alt,
  caption,
  tilt = "left",
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  tilt?: "left" | "right" | "none";
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={className}>
      <div
        className={cn(
          "print overflow-hidden",
          tilt === "left" && "print-tilt-l",
          tilt === "right" && "print-tilt-r"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="block h-auto w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-4 flex items-start justify-between gap-3 border-t border-border pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

/** Scrolling marquee ticker. Duplicated content keeps the loop seamless. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-mono text-sm font-medium uppercase tracking-[0.22em] text-foreground">
            {item}
          </span>
          <span aria-hidden="true" className="h-2 w-2 bg-primary" />
        </span>
      ))}
    </>
  );

  return (
    <div className={cn("marquee", className)}>
      <div className="marquee-track" aria-hidden="true">
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  );
}

/** Icon card: the visual unit for feature/reason/groups content. */
export function IconCard({
  icon: Icon,
  title,
  desc,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <Tilt className="h-full">
      <div
        className={cn(
          "group h-full border-2 border-foreground bg-card p-6 transition-all duration-200 hover:-translate-y-1",
          className
        )}
        style={{ boxShadow: "4px 4px 0 0 hsl(var(--foreground))" }}
      >
        <div className="flex h-12 w-12 items-center justify-center border-2 border-foreground bg-primary/10 transition-colors duration-200 group-hover:bg-primary">
          <Icon className="h-6 w-6 text-primary transition-all duration-200 group-hover:-rotate-6 group-hover:scale-110 group-hover:text-primary-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">{title}</h3>
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{desc}</p>
      </div>
    </Tilt>
  );
}

/** Compact tile for the chat groups. */
export function Tile({
  icon: Icon,
  title,
  desc,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <Tilt className="h-full">
      <div
        className={cn(
          "group flex h-full items-start gap-4 border-2 border-foreground bg-card p-5 transition-transform duration-150 hover:-translate-y-1",
          className
        )}
        style={{ boxShadow: "4px 4px 0 0 hsl(var(--foreground))" }}
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-foreground transition-colors duration-150 group-hover:bg-primary">
          <Icon className="h-5 w-5 text-background" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold tracking-tight text-foreground">{title}</h3>
          <p className="mt-1 text-[13px] leading-5 text-muted-foreground">{desc}</p>
        </div>
      </div>
    </Tilt>
  );
}

/** Image tile: the chat groups' real artwork, framed like a print. */
export function GroupTile({
  src,
  title,
  desc,
  tilt,
  className,
}: {
  src: string;
  title: string;
  desc: string;
  tilt?: "left" | "right" | "none";
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "group border-2 border-foreground bg-card p-3 transition-transform duration-150 hover:-translate-y-1",
        tilt === "left" && "print-tilt-l",
        tilt === "right" && "print-tilt-r",
        className
      )}
      style={{ boxShadow: "5px 5px 0 0 hsl(var(--foreground))" }}
    >
      <div className="overflow-hidden border-2 border-foreground bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${title} group`}
          loading="lazy"
          className="aspect-square h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <figcaption className="flex items-baseline justify-between gap-3 pt-3">
        <h3 className="text-base font-bold tracking-tight text-foreground">{title}</h3>
        <span aria-hidden="true" className="text-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          ↗
        </span>
      </figcaption>
      <p className="mt-0.5 text-[13px] leading-5 text-muted-foreground">{desc}</p>
    </figure>
  );
}

/** Vertical timeline: years/markers instead of prose. */
export function Timeline({
  items,
  className,
}: {
  items: { year: string; title: string; desc: string }[];
  className?: string;
}) {
  return (
    <ol className={cn("relative ml-2 border-l-2 border-foreground pl-6 sm:pl-8", className)}>
      {items.map((item, i) => (
        <li key={i} className="relative pb-10 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[1.95rem] top-1.5 h-3 w-3 -translate-x-1/2 border-2 border-foreground bg-primary sm:-left-[2.45rem]"
          />
          <div className="font-mono text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            {item.year}
          </div>
          <h3 className="mt-1.5 text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
          <p className="mt-1 max-w-[56ch] text-sm leading-6 text-muted-foreground">{item.desc}</p>
        </li>
      ))}
    </ol>
  );
}

/** Numbered step card: big mono number, title, one line. */
export function StepCard({
  n,
  title,
  desc,
  className,
}: {
  n: string;
  title: string;
  desc: string;
  className?: string;
}) {
  return (
    <Tilt className="h-full">
      <div
        className={cn(
          "h-full border-2 border-foreground bg-card p-6 transition-transform duration-150 hover:-translate-y-1",
          className
        )}
        style={{ boxShadow: "4px 4px 0 0 hsl(var(--foreground))" }}
      >
        <div className="font-mono text-4xl font-bold tabular-nums text-primary">{n}</div>
        <h3 className="mt-3 text-lg font-bold tracking-tight text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{desc}</p>
      </div>
    </Tilt>
  );
}
