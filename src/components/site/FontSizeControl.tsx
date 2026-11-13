import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FONT_SIZE_STORAGE_KEY, FONT_SIZES, isFontSizeKey, type FontSizeKey } from "@/lib/font-size";

const OPTIONS: { key: FontSizeKey; label: string; aria: string }[] = [
  { key: "small", label: "가-", aria: `글자 작게 (${FONT_SIZES.small}px)` },
  { key: "base", label: "기본", aria: `기본 글자 크기 (${FONT_SIZES.base}px)` },
  { key: "large", label: "가+", aria: `글자 크게 (${FONT_SIZES.large}px)` },
];

export function FontSizeControl({ className }: { className?: string }) {
  const [size, setSize] = useState<FontSizeKey>("base");

  useEffect(() => {
    const saved = window.localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    if (isFontSizeKey(saved)) setSize(saved);
  }, []);

  const apply = (key: FontSizeKey) => {
    setSize(key);
    const root = document.documentElement;
    if (key === "base") root.removeAttribute("data-font-size");
    else root.setAttribute("data-font-size", key);
    try {
      window.localStorage.setItem(FONT_SIZE_STORAGE_KEY, key);
    } catch {
      /* noop */
    }
  };

  return (
    <div
      role="group"
      aria-label="글자 크기 조절"
      className={cn("inline-flex overflow-hidden rounded-md border border-input bg-card", className)}
    >
      {OPTIONS.map((o) => (
        <button
          key={o.key}
          type="button"
          aria-label={o.aria}
          aria-pressed={size === o.key}
          onClick={() => apply(o.key)}
          className={cn(
            "min-w-11 px-2.5 py-1 text-[0.8rem] font-bold transition-colors not-last:border-r not-last:border-input",
            size === o.key ? "bg-ink text-paper" : "text-foreground hover:bg-muted",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
