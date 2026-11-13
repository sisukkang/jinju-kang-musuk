import { CLAN } from "@/lib/site-config";

interface SealProps {
  className?: string;
  showText?: boolean;
}

export function Seal({ className = "", showText = true }: SealProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src="/apple-touch-icon.png"
        alt={`${CLAN.name} 종문(宗紋)`}
        width={48}
        height={48}
        className="size-11 shrink-0 rounded-full object-contain sm:size-12"
      />
      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[0.7rem] font-bold tracking-[0.2em] text-gold">
            {CLAN.hanjaName}
          </span>
          <span className="font-serif text-[1.15rem] font-black tracking-tight text-ink sm:text-[1.3rem]">
            {CLAN.name}
          </span>
        </div>
      )}
    </div>
  );
}