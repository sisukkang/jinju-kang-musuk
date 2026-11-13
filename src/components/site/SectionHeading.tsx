import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-2 flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.25em] text-gold">
            <span className="inline-block h-px w-8 bg-gold" />
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-[1.7rem] font-bold leading-snug text-foreground sm:text-[2rem]">{title}</h2>
        {description ? <p className="mt-2 text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
