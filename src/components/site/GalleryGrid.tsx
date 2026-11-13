import { useState } from "react";
import { X, Calendar } from "lucide-react";
import { useDemoStore, type GalleryPhoto } from "@/lib/demo-store";

interface GalleryGridProps {
  limit?: number;
  compact?: boolean;
}

export function GalleryGrid({ limit, compact = false }: GalleryGridProps) {
  const { gallery } = useDemoStore();
  const [selected, setSelected] = useState<GalleryPhoto | null>(null);

  const items = limit ? gallery.slice(0, limit) : gallery;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
        등록된 갤러리 사진이 없습니다. 관리자 페이지에서 사진을 추가해 주세요.
      </div>
    );
  }

  return (
    <>
      <div
        className={
          compact
            ? "grid grid-cols-2 gap-3 sm: gap-4"
            : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {items.map((item) => (
          <figure
            key={item.id}
            onClick={() => setSelected(item)}
            className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-0.5 hover:border-gold"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-secondary">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
            <figcaption className={compact ? "p-3" : "p-4"}>
              <p className="truncate font-bold text-ink group-hover:text-primary">{item.title}</p>
              <p className="mt-1 flex items-center gap-1 text-[0.8rem] text-muted-foreground">
                <Calendar className="size-3.5 text-gold" /> {item.date}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* 사진 확대 모달 */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/40 bg-card shadow-float"
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="닫기"
              className="absolute top-3 right-3 z-10 inline-flex size-10 items-center justify-center rounded-full bg-ink/75 text-paper hover:bg-primary"
            >
              <X className="size-5" />
            </button>
            <img
              src={selected.src}
              alt={selected.title}
              className="max-h-[75vh] w-full bg-ink object-contain"
            />
            <div className="p-5">
              <h3 className="text-[1.25rem] font-bold">{selected.title}</h3>
              <p className="mt-1 text-[0.85rem] text-muted-foreground">촬영·등록일: {selected.date}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}