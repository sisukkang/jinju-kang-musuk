import { useState, type FormEvent } from "react";
import { CalendarDays, MapPin, Minus, Plus, Users, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  MAX_COMPANIONS,
  demoActions,
  formatEventDate,
  sortEvents,
  summarizeVotes,
  useDemoStore,
  votesForEvent,
  type VoteError,
} from "@/lib/demo-store";

const ERROR_TEXT: Record<VoteError, string> = {
  name: "성함을 2자 이상 입력해 주세요.",
  phoneLast4: "연락처 뒷자리 4자리 숫자를 입력해 주세요.",
  companions: `동반인원은 0~${MAX_COMPANIONS}명까지 가능합니다.`,
  event: "행사를 찾을 수 없습니다. 새로고침 후 다시 시도해 주세요.",
};

export function EventVote() {
  const state = useDemoStore();
  const events = sortEvents(state.events);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const event = events.find((e) => e.id === selectedId) ?? events[0];

  const [name, setName] = useState("");
  const [last4, setLast4] = useState("");
  const [companions, setCompanions] = useState(0);
  const [error, setError] = useState<VoteError | null>(null);
  const [done, setDone] = useState<string | null>(null);

  if (!event) {
    return (
      <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
        예정된 행사가 없습니다. 관리자 페이지에서 행사를 추가해 보세요.
      </p>
    );
  }

  const summary = summarizeVotes(votesForEvent(state, event.id));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const res = demoActions.vote({ eventId: event.id, name, phoneLast4: last4, companions });
    if (res.error) {
      setError(res.error);
      return;
    }
    setError(null);
    const msg = res.updated
      ? `${name.trim()}님의 참석 신청이 변경되었습니다.`
      : `${name.trim()}님, 참석 신청이 완료되었습니다.`;
    setDone(msg);
    toast.success(msg, { description: `${event.title} · 본인 포함 ${companions + 1}명` });
  };

  return (
    <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-card lg:grid-cols-[1.1fr_1fr]">
      {/* 행사 정보 */}
      <div className="relative bg-ink p-7 text-paper sm:p-10">
        <div className="absolute top-0 left-0 h-full w-1.5 bg-primary" />
        {events.length > 1 ? (
          <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="행사 선택">
            {events.map((ev) => (
              <button
                key={ev.id}
                role="tab"
                aria-selected={ev.id === event.id}
                onClick={() => {
                  setSelectedId(ev.id);
                  setDone(null);
                }}
                className={cn(
                  "rounded-full border px-3 py-1 text-[0.75rem] font-semibold transition-colors",
                  ev.id === event.id ? "border-gold bg-gold text-gold-foreground" : "border-paper/30 hover:border-gold",
                )}
              >
                {ev.title}
              </button>
            ))}
          </div>
        ) : null}
        <p className="text-[0.75rem] font-bold tracking-[0.25em] text-gold">UPCOMING · 다가오는 행사</p>
        <h3 className="mt-2 text-[2rem] leading-tight font-bold">{event.title}</h3>
        <p className="mt-3 text-paper/80">{event.description}</p>
        <dl className="mt-6 space-y-3 text-[0.95rem]">
          <div className="flex gap-3">
            <dt className="sr-only">일시</dt>
            <CalendarDays className="mt-1 size-5 shrink-0 text-gold" />
            <dd>{formatEventDate(event.date, event.time)}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="sr-only">장소</dt>
            <MapPin className="mt-1 size-5 shrink-0 text-gold" />
            <dd>{event.location}</dd>
          </div>
        </dl>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-paper/15 p-4">
            <p className="text-[0.75rem] text-paper/60">참석 신청</p>
            <p className="font-serif text-[1.8rem] font-bold">
              {summary.applicants}
              <span className="ml-1 text-[0.9rem]">가구</span>
            </p>
          </div>
          <div className="rounded-lg border border-gold/40 bg-gold/10 p-4">
            <p className="text-[0.75rem] text-paper/60">동반 포함 총</p>
            <p className="font-serif text-[1.8rem] font-bold text-gold">
              {summary.totalPeople}
              <span className="ml-1 text-[0.9rem]">명</span>
            </p>
          </div>
        </div>
      </div>

      {/* 원클릭 투표 */}
      <form onSubmit={submit} className="space-y-5 p-7 sm:p-10" aria-label="참석 신청">
        <div>
          <h3 className="text-[1.4rem] font-bold">원클릭 참석 신청</h3>
          <p className="text-[0.85rem] text-muted-foreground">이름과 연락처 뒷자리만 입력하시면 됩니다.</p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="vote-name" className="text-[0.85rem]">성함</Label>
          <Input
            id="vote-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: O병철"
            autoComplete="name"
            aria-invalid={error === "name"}
            className="h-12 text-base"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="vote-phone" className="text-[0.85rem]">연락처 뒷 4자리</Label>
          <Input
            id="vote-phone"
            value={last4}
            onChange={(e) => setLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
            inputMode="numeric"
            placeholder="예: 1234"
            aria-invalid={error === "phoneLast4"}
            className="h-12 text-base tracking-[0.4em]"
          />
        </div>
        <div className="space-y-1.5">
          <Label id="vote-comp-label" className="text-[0.85rem]">동반 인원 (본인 제외)</Label>
          <div className="flex items-center gap-3" role="group" aria-labelledby="vote-comp-label">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-12"
              aria-label="동반인원 줄이기"
              onClick={() => setCompanions((c) => Math.max(0, c - 1))}
            >
              <Minus />
            </Button>
            <output className="w-20 text-center font-serif text-[1.6rem] font-bold" aria-live="polite">
              {companions}명
            </output>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-12"
              aria-label="동반인원 늘리기"
              onClick={() => setCompanions((c) => Math.min(MAX_COMPANIONS, c + 1))}
            >
              <Plus />
            </Button>
            <span className="ml-auto flex items-center gap-1 text-[0.8rem] text-muted-foreground">
              <Users className="size-4" /> 총 {companions + 1}명
            </span>
          </div>
        </div>

        {error ? (
          <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-[0.85rem] font-medium text-destructive">
            {ERROR_TEXT[error]}
          </p>
        ) : null}
        {done ? (
          <p role="status" className="flex items-center gap-2 rounded-md bg-gold-soft px-3 py-2 text-[0.85rem] font-medium">
            <CheckCircle2 className="size-5 text-gold" />
            {done}
          </p>
        ) : null}

        <Button type="submit" variant="seal" size="xl" className="h-14 w-full text-[1.05rem]">
          참석합니다
        </Button>
        <p className="text-center text-[0.7rem] text-muted-foreground">
          같은 이름·뒷자리로 다시 신청하면 기존 신청이 변경됩니다.
        </p>
      </form>
    </div>
  );
}
