import { Link } from "@tanstack/react-router";
import { Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { Seal } from "@/components/site/Seal";
import { FontSizeControl } from "@/components/site/FontSizeControl";
import { NAV_ITEMS } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur">
      <div className="dancheong-band" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Seal />
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav aria-label="주요 메뉴" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative rounded-lg px-3.5 py-2 text-[0.95rem] font-bold text-ink/85 transition hover:bg-secondary hover:text-primary [&.active]:text-primary"
            >
              {item.label}
              {"badge" in item && item.badge && (
                <span className="ml-1.5 rounded-full bg-gold-soft px-2 py-0.5 text-[0.65rem] font-bold text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <FontSizeControl />
          <Link
            to="/admin"
            className="hidden items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-[0.8rem] font-bold text-muted-foreground hover:border-primary hover:text-primary sm:inline-flex"
          >
            <Shield className="size-3.5" /> 관리자
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <nav aria-label="모바일 메뉴" className="border-t border-border bg-paper px-4 py-4 lg:hidden">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[1rem] font-bold hover:bg-secondary [&.active]:text-primary"
                >
                  <span>{item.label}</span>
                  {"badge" in item && item.badge && (
                    <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[0.7rem] font-bold text-primary">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.9rem] font-bold text-muted-foreground hover:bg-secondary"
              >
                <Shield className="size-4" /> 관리자 페이지
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}