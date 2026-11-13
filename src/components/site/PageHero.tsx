import type { ReactNode } from "react";

/** 하위 페이지 상단 제목 영역 */
export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="hanji border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="mb-2 text-[0.75rem] font-bold tracking-[0.25em] text-gold">{eyebrow}</p>
        <h1 className="text-[2.1rem] font-bold leading-tight sm:text-[2.6rem]">{title}</h1>
        {children ? <div className="mt-3 max-w-3xl text-muted-foreground">{children}</div> : null}
      </div>
    </section>
  );
}
