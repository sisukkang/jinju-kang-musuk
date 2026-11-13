import { useState, type FormEvent } from "react";
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  ELEMENT_LABEL,
  HANGRYEOL,
  MAX_GENERATION,
  MIN_GENERATION,
  findByBirthYear,
  findByFatherGeneration,
  findByNameChar,
  toRow,
  type HangryeolEntry,
  type HangryeolRow,
} from "@/lib/hangryeol";

type Mode = "birth" | "name" | "father";

const MODES: { key: Mode; label: string; hint: string }[] = [
  { key: "birth", label: "출생연도로 찾기", hint: "예: 1972" },
  { key: "name", label: "이름 항렬자로 찾기", hint: "이름 전체 또는 돌림자 (예: 병철, 炳)" },
  { key: "father", label: "아버지 세수로 찾기", hint: "아버지의 세(世)수를 선택하세요" },
];

const FATHER_OPTIONS = Array.from(
  { length: MAX_GENERATION - MIN_GENERATION + 1 },
  (_, i) => MIN_GENERATION - 1 + i,
);

function CharCell({ entry }: { entry: HangryeolEntry | undefined }) {
  if (!entry) return <span className="text-muted-foreground">—</span>;
  return (
    <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap">
      <span className="font-serif text-[1.3rem] font-bold">{entry.hanja}</span>
      <span className="text-muted-foreground">({entry.hangul})</span>
      <span className="text-[0.7rem] text-muted-foreground">{entry.generation}세</span>
    </span>
  );
}

function ResultTable({ rows, highlight }: { rows: HangryeolRow[]; highlight?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-card">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <caption className="sr-only">항렬 조회 결과</caption>
        <thead className="bg-ink text-paper">
          <tr className="text-[0.8rem]">
            <th scope="col" className="px-4 py-3 font-semibold">세수 / 대손</th>
            <th scope="col" className="px-4 py-3 font-semibold">항렬자</th>
            <th scope="col" className="px-4 py-3 font-semibold">오행 · 이름 자리</th>
            <th scope="col" className="px-4 py-3 font-semibold">부모 항렬자</th>
            <th scope="col" className="px-4 py-3 font-semibold">자녀 항렬자</th>
            <th scope="col" className="px-4 py-3 font-semibold">출생 추정</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ entry, daeson, parent, child }, i) => (
            <tr
              key={entry.generation}
              className={cn(
                "border-t border-border align-middle",
                highlight && i === 0 ? "bg-accent/60" : "even:bg-muted/40",
              )}
            >
              <th scope="row" className="px-4 py-3 whitespace-nowrap">
                <span className="font-serif text-[1.25rem] font-bold text-primary">{entry.generation}세</span>
                <span className="ml-2 text-muted-foreground">{daeson}대손</span>
              </th>
              <td className="px-4 py-3">
                <span className="inline-flex items-baseline gap-2 whitespace-nowrap">
                  <span className="font-serif text-[1.8rem] leading-none font-bold">{entry.hanja}</span>
                  <span className="text-[1.05rem] font-semibold">{entry.hangul}</span>
                </span>
              </td>
              <td className="px-4 py-3 text-[0.85rem] whitespace-nowrap">
                {ELEMENT_LABEL[entry.element]}
                <br />
                <span className="text-muted-foreground">
                  이름 {entry.position}자 · 예) {entry.example}
                </span>
              </td>
              <td className="px-4 py-3">
                <CharCell entry={parent} />
              </td>
              <td className="px-4 py-3">
                <CharCell entry={child} />
              </td>
              <td className="px-4 py-3 text-[0.85rem] whitespace-nowrap text-muted-foreground">
                {entry.birthFrom}~{entry.birthTo}년경
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HangryeolFinder({ showFullTable = false }: { showFullTable?: boolean }) {
  const [mode, setMode] = useState<Mode>("birth");
  const [birth, setBirth] = useState("");
  const [name, setName] = useState("");
  const [father, setFather] = useState<string>("");
  const [rows, setRows] = useState<HangryeolRow[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    let result: HangryeolRow[] = [];
    if (mode === "birth") {
      const y = Number(birth);
      if (!/^\d{4}$/.test(birth)) {
        setRows(null);
        setMessage("출생연도를 4자리 숫자로 입력해 주세요. (예: 1972)");
        return;
      }
      result = findByBirthYear(y);
      if (result.length > 1)
        setMessage("해당 연도는 두 세대가 겹치는 시기입니다. 가장 가능성이 높은 세수를 위에 표시했습니다.");
    } else if (mode === "name") {
      if (!name.trim()) {
        setRows(null);
        setMessage("이름 또는 항렬자를 입력해 주세요.");
        return;
      }
      result = findByNameChar(name);
    } else {
      if (!father) {
        setRows(null);
        setMessage("아버지의 세수를 선택해 주세요.");
        return;
      }
      result = findByFatherGeneration(Number(father));
      if (result.length) setMessage(`아버지가 ${father}세이시면 본인은 ${Number(father) + 1}세입니다.`);
    }
    setRows(result);
    if (result.length === 0)
      setMessage(`샘플 데이터(${MIN_GENERATION}세~${MAX_GENERATION}세)에서 일치하는 항렬을 찾지 못했습니다.`);
  };

  const reset = () => {
    setBirth("");
    setName("");
    setFather("");
    setRows(null);
    setMessage(null);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={onSearch}
        className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-7"
        aria-label="항렬 검색"
      >
        <div role="radiogroup" aria-label="검색 방법" className="mb-5 grid gap-2 sm:grid-cols-3">
          {MODES.map((m) => (
            <button
              key={m.key}
              type="button"
              role="radio"
              aria-checked={mode === m.key}
              onClick={() => {
                setMode(m.key);
                setRows(null);
                setMessage(null);
              }}
              className={cn(
                "rounded-lg border-2 px-4 py-3 text-left text-[0.9rem] font-bold transition-colors",
                mode === m.key
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border bg-background hover:border-gold",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-1.5">
            {mode === "birth" && (
              <>
                <Label htmlFor="hr-birth" className="text-[0.85rem]">출생연도</Label>
                <Input
                  id="hr-birth"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="예: 1972"
                  value={birth}
                  onChange={(e) => setBirth(e.target.value.replace(/\D/g, ""))}
                  className="h-12 text-base"
                />
              </>
            )}
            {mode === "name" && (
              <>
                <Label htmlFor="hr-name" className="text-[0.85rem]">이름 또는 항렬자</Label>
                <Input
                  id="hr-name"
                  placeholder="예: 병철 / 炳"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-base"
                />
              </>
            )}
            {mode === "father" && (
              <>
                <Label htmlFor="hr-father" className="text-[0.85rem]">아버지 세수</Label>
                <select
                  id="hr-father"
                  value={father}
                  onChange={(e) => setFather(e.target.value)}
                  className="h-12 w-full rounded-md border border-input bg-background px-3 text-base focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <option value="">선택하세요</option>
                  {FATHER_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}세 ({g - 1}대손)
                    </option>
                  ))}
                </select>
              </>
            )}
            <p className="text-[0.75rem] text-muted-foreground">{MODES.find((m) => m.key === mode)?.hint}</p>
          </div>
          <div className="flex gap-2 sm:pb-7">
            <Button type="submit" size="xl" className="flex-1 sm:flex-none">
              <Search />
              항렬 찾기
            </Button>
            <Button type="button" variant="outline" size="xl" onClick={reset} aria-label="검색 초기화">
              <RotateCcw />
            </Button>
          </div>
        </div>
      </form>

      <div aria-live="polite" className="space-y-4">
        {message ? (
          <p className="rounded-md border-l-4 border-gold bg-gold-soft px-4 py-3 text-[0.9rem]">{message}</p>
        ) : null}
        {rows && rows.length > 0 ? <ResultTable rows={rows} highlight /> : null}
      </div>

      {showFullTable ? (
        <div className="pt-6">
          <h3 className="mb-3 text-[1.3rem] font-bold">전체 항렬표 ({MIN_GENERATION}세 ~ {MAX_GENERATION}세)</h3>
          <ResultTable rows={HANGRYEOL.map(toRow)} />
        </div>
      ) : null}
    </div>
  );
}
