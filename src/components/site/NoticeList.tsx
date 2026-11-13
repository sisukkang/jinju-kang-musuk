import { Link } from "@tanstack/react-router";
import { Pin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate, sortNotices, useDemoStore, type Notice } from "@/lib/demo-store";

export function CategoryBadge({ category, className }: { category: Notice["category"]; className?: string }) {
  const tone =
    category === "행사"
      ? "bg-primary text-primary-foreground"
      : category === "장학"
        ? "bg-gold text-gold-foreground"
        : category === "부고"
          ? "bg-ink text-paper"
          : "bg-secondary text-secondary-foreground border border-border";
  return (
    <span className={cn("inline-flex shrink-0 rounded-sm px-2 py-0.5 text-[0.7rem] font-bold", tone, className)}>
      {category}
    </span>
  );
}

/** 메인 페이지용 최신 공지 카드 목록 */
export function LatestNotices({ limit = 4 }: { limit?: number }) {
  const { notices } = useDemoStore();
  const list = sortNotices(notices).slice(0, limit);

  if (list.length === 0)
    return <p className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">등록된 공지가 없습니다.</p>;

  return (
    <ul className="w-full divide-y divide-border overflow-hidden rounded-xl border border-border bg-card shadow-card">
      {list.map((n) => (
        <li key={n.id} className="min-w-0 w-full">
          <Link
            to="/news"
            hash={n.id}
            className="group flex w-full items-center gap-2.5 px-3.5 py-4 transition-colors hover:bg-muted/60 sm:gap-3 sm:px-5"
          >
            {n.pinned ? <Pin className="size-4 shrink-0 text-primary" aria-label="상단 고정" /> : null}
            <CategoryBadge category={n.category} />
            <span className="min-w-0 flex-1 truncate font-medium group-hover:text-primary">{n.title}</span>
            <time className="hidden shrink-0 text-[0.8rem] text-muted-foreground sm:block">{formatDate(n.createdAt)}</time>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** 뉴스/소식 페이지용 전체 목록 (NoticeList 추가) */
export function NoticeList() {
  const { notices } = useDemoStore();
  const list = sortNotices(notices);

  if (list.length === 0)
    return <p className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">등록된 공지가 없습니다.</p>;

  return (
    <ul className="w-full space-y-3">
      {list.map((n) => (
        <li key={n.id} id={n.id} className="min-w-0 w-full scroll-mt-48">
          <div className="rounded-xl border border-border bg-card p-4 shadow-card sm:p-5">
            <div className="mb-3 flex items-center gap-2.5 sm:gap-3">
              {n.pinned ? <Pin className="size-4 shrink-0 text-primary" aria-label="상단 고정" /> : null}
              <CategoryBadge category={n.category} />
              <span className="min-w-0 flex-1 font-semibold break-keep">{n.title}</span>
              <time className="shrink-0 text-[0.8rem] text-muted-foreground">{formatDate(n.createdAt)}</time>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed">{n.content}</p>
            <p className="mt-4 text-[0.8rem] text-muted-foreground">작성: {n.author}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** 소식 페이지용 아카이브 목록 (펼쳐서 본문 보기) */
export function NoticeArchive() {
  const { notices } = useDemoStore();
  const list = sortNotices(notices);
  return (
    <ul className="w-full space-y-3">
      {list.map((n) => (
        <li key={n.id} id={n.id} className="min-w-0 w-full scroll-mt-48">
          <details className="group rounded-xl border border-border bg-card shadow-card open:ring-1 open:ring-gold/50">
            <summary className="flex cursor-pointer list-none items-center gap-2.5 px-3.5 py-4 sm:gap-3 sm:px-5">
              {n.pinned ? <Pin className="size-4 shrink-0 text-primary" aria-label="상단 고정" /> : null}
              <CategoryBadge category={n.category} />
              <span className="min-w-0 flex-1 truncate font-semibold">{n.title}</span>
              <time className="shrink-0 text-[0.8rem] text-muted-foreground">{formatDate(n.createdAt)}</time>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
            </summary>
            <div className="border-t border-border px-4 py-5 sm:px-5">
              <p className="whitespace-pre-line leading-relaxed">{n.content}</p>
              <p className="mt-4 text-[0.8rem] text-muted-foreground">작성: {n.author}</p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}