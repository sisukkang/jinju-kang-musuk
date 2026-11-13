import { useState, type FormEvent } from "react";
import { CalendarPlus, Download, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  demoActions,
  formatDateTime,
  formatEventDate,
  sortEvents,
  summarizeVotes,
  useDemoStore,
  votesForEvent,
} from "@/lib/demo-store";
import { downloadAttendeesExcel } from "@/lib/export-attendees";
import { ConfirmButton } from "./ConfirmButton";

function NewEventForm() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("11:00");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !time || !location.trim()) {
      setError("행사명, 날짜, 시간, 장소를 모두 입력해 주세요.");
      return;
    }
    demoActions.addEvent({ title, date, time, location, description });
    setError(null);
    toast.success("새 행사가 추가되었습니다.", { description: "메인 페이지 '다가오는 행사'에서 참석 신청을 받을 수 있습니다." });
    setTitle("");
    setDate("");
    setLocation("");
    setDescription("");
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-card" aria-label="신규 행사 추가">
      <h3 className="flex items-center gap-2 text-[1.2rem] font-bold">
        <CalendarPlus className="size-5 text-primary" /> 신규 행사 추가
      </h3>
      <div className="space-y-1.5">
        <Label htmlFor="ev-title" className="text-[0.85rem]">행사명</Label>
        <Input id="ev-title" value={title} onChange={(e) => setTitle(e.target.value)} className="h-12 text-base" placeholder="예: 2026년 추계 시제" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="ev-date" className="text-[0.85rem]">날짜</Label>
          <Input id="ev-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-12 text-base" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ev-time" className="text-[0.85rem]">시간</Label>
          <Input id="ev-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="h-12 text-base" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="ev-loc" className="text-[0.85rem]">장소</Label>
        <Input id="ev-loc" value={location} onChange={(e) => setLocation(e.target.value)} className="h-12 text-base" placeholder="예: 시조 묘역 재실" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="ev-desc" className="text-[0.85rem]">안내 문구</Label>
        <Textarea id="ev-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="text-base" />
      </div>
      {error ? <p role="alert" className="text-[0.85rem] font-medium text-destructive">{error}</p> : null}
      <Button type="submit" size="xl" className="w-full">행사 추가</Button>
    </form>
  );
}

export function EventManager() {
  const state = useDemoStore();
  const events = sortEvents(state.events);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const event = events.find((e) => e.id === selectedId) ?? events[0];
  const votes = event ? votesForEvent(state, event.id) : [];
  const summary = summarizeVotes(votes);
  const [downloading, setDownloading] = useState(false);

  const download = async () => {
    if (!event) return;
    setDownloading(true);
    try {
      await downloadAttendeesExcel(event, votes);
      toast.success("엑셀 파일을 내려받았습니다.", { description: `${event.title}_참석자명단.xlsx` });
    } catch (err) {
      console.error(err);
      toast.error("엑셀 파일을 만들지 못했습니다. 다시 시도해 주세요.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-5">
        {events.length === 0 ? (
          <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">등록된 행사가 없습니다. 오른쪽에서 추가해 주세요.</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="행사 선택">
              {events.map((ev) => (
                <button
                  key={ev.id}
                  role="tab"
                  aria-selected={ev.id === event?.id}
                  onClick={() => setSelectedId(ev.id)}
                  className={cn(
                    "rounded-lg border-2 px-4 py-2 text-left text-[0.85rem] font-semibold transition-colors",
                    ev.id === event?.id ? "border-primary bg-accent text-accent-foreground" : "border-border bg-card hover:border-gold",
                  )}
                >
                  {ev.title}
                  <span className="block text-[0.7rem] font-normal text-muted-foreground">{formatEventDate(ev.date)}</span>
                </button>
              ))}
            </div>

            {event ? (
              <div className="rounded-xl border border-border bg-card shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-6">
                  <div>
                    <h3 className="text-[1.4rem] font-bold">{event.title}</h3>
                    <p className="text-[0.85rem] text-muted-foreground">
                      {formatEventDate(event.date, event.time)} · {event.location}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="gold" size="xl" onClick={download} disabled={downloading}>
                      <Download /> {downloading ? "만드는 중…" : "참석자 명단 엑셀 다운로드"}
                    </Button>
                    <ConfirmButton
                      title="행사를 삭제할까요?"
                      description={`「${event.title}」과 참석 신청 ${summary.applicants}건이 함께 삭제됩니다.`}
                      onConfirm={() => {
                        demoActions.deleteEvent(event.id);
                        setSelectedId(null);
                        toast("행사가 삭제되었습니다.");
                      }}
                      trigger={
                        <Button variant="outline" size="xl" className="text-destructive" aria-label="행사 삭제">
                          <Trash2 />
                        </Button>
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-6 pb-0">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-[0.75rem] text-muted-foreground">신청 가구</p>
                    <p className="font-serif text-[1.8rem] font-bold">{summary.applicants}<span className="ml-1 text-[0.9rem]">가구</span></p>
                  </div>
                  <div className="rounded-lg bg-gold-soft p-4">
                    <p className="text-[0.75rem] text-muted-foreground">동반 포함 총 인원</p>
                    <p className="font-serif text-[1.8rem] font-bold text-gold">{summary.totalPeople}<span className="ml-1 text-[0.9rem]">명</span></p>
                  </div>
                </div>

                <div className="overflow-x-auto p-6">
                  {votes.length === 0 ? (
                    <p className="flex items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-muted-foreground">
                      <Users className="size-5" /> 아직 참석 신청이 없습니다.
                    </p>
                  ) : (
                    <table className="w-full min-w-[34rem] text-left">
                      <caption className="sr-only">참석 투표 현황</caption>
                      <thead>
                        <tr className="border-b-2 border-ink text-[0.8rem]">
                          <th scope="col" className="py-2 pr-3">번호</th>
                          <th scope="col" className="py-2 pr-3">성명</th>
                          <th scope="col" className="py-2 pr-3">연락처</th>
                          <th scope="col" className="py-2 pr-3 text-right">동반</th>
                          <th scope="col" className="py-2 pr-3">신청일시</th>
                          <th scope="col" className="py-2"><span className="sr-only">삭제</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {votes.map((v, i) => (
                          <tr key={v.id} className="border-b border-border">
                            <td className="py-2.5 pr-3 text-muted-foreground">{i + 1}</td>
                            <td className="py-2.5 pr-3 font-semibold">{v.name}</td>
                            <td className="py-2.5 pr-3 tabular-nums">****-{v.phoneLast4}</td>
                            <td className="py-2.5 pr-3 text-right tabular-nums">{v.companions}명</td>
                            <td className="py-2.5 pr-3 text-[0.8rem] text-muted-foreground tabular-nums">{formatDateTime(v.createdAt)}</td>
                            <td className="py-2.5 text-right">
                              <ConfirmButton
                                title="참석 신청을 삭제할까요?"
                                description={`${v.name}님의 신청이 명단에서 삭제됩니다.`}
                                onConfirm={() => demoActions.deleteVote(v.id)}
                                trigger={
                                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" aria-label={`${v.name} 신청 삭제`}>
                                    <Trash2 />
                                  </Button>
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
      <NewEventForm />
    </div>
  );
}
