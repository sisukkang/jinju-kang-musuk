import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Shield } from "lucide-react";
import { Seal } from "@/components/site/Seal";
import { NAV_ITEMS } from "@/lib/site-config";
import { useDemoStore } from "@/lib/demo-store";

export function SiteFooter() {
  const { clanInfo } = useDemoStore();

  return (
    <footer className="border-t border-border bg-ink text-paper/85">
      <div className="dancheong-band" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="[&_span]:text-paper [&_.text-gold]:text-gold">
            <Seal />
          </div>
          <p className="mt-4 max-w-md text-[0.9rem] text-paper/70">{clanInfo.subSlogan}</p>
        </div>

        <div>
          <h2 className="text-[0.85rem] font-bold tracking-widest text-gold">사무국 및 재실 안내</h2>
          <ul className="mt-3 space-y-2 text-[0.9rem]">
            <li className="flex items-start gap-2">
              <MapPin className="mt-1 size-4 shrink-0 text-gold" />
              <span>{clanInfo.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" />
              <span>{clanInfo.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" />
              <span>{clanInfo.email}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-[0.85rem] font-bold tracking-widest text-gold">바로가기</h2>
          <ul className="mt-3 space-y-1.5 text-[0.9rem]">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-gold hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link to="/admin" className="inline-flex items-center gap-1 text-[0.85rem] text-paper/60 hover:text-gold">
                <Shield className="size-3.5" /> CMS 관리자 접속
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-5 text-center text-[0.8rem] text-paper/50">
        © {new Date().getFullYear()} {clanInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}