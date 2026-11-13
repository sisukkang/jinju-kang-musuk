/**
 * 항렬(行列) 샘플 데이터 — 28세 ~ 35세
 * 오행 상생(水→木→火→土→金) 순서로 돌림자를 정한 예시입니다.
 */
export type Element = "金" | "水" | "木" | "火" | "土";

export interface HangryeolEntry {
  generation: number; // 세(世)
  hanja: string;
  hangul: string;
  element: Element;
  /** 이름에서 항렬자가 들어가는 자리 */
  position: "앞" | "뒤";
  birthFrom: number;
  birthTo: number;
  example: string;
}

export const ELEMENT_LABEL: Record<Element, string> = {
  金: "쇠 금(金)",
  水: "물 수(水)",
  木: "나무 목(木)",
  火: "불 화(火)",
  土: "흙 토(土)",
};

export const HANGRYEOL: HangryeolEntry[] = [
  { generation: 28, hanja: "永", hangul: "영", element: "水", position: "앞", birthFrom: 1895, birthTo: 1925, example: "강영수" },
  { generation: 29, hanja: "植", hangul: "식", element: "木", position: "뒤", birthFrom: 1915, birthTo: 1945, example: "강종식" },
  { generation: 30, hanja: "炳", hangul: "병", element: "火", position: "앞", birthFrom: 1930, birthTo: 1960, example: "강병철" },
  { generation: 31, hanja: "在", hangul: "재", element: "土", position: "뒤", birthFrom: 1945, birthTo: 1975, example: "강민재" },
  { generation: 32, hanja: "鍾", hangul: "종", element: "金", position: "앞", birthFrom: 1960, birthTo: 1990, example: "강종훈" },
  { generation: 33, hanja: "浩", hangul: "호", element: "水", position: "뒤", birthFrom: 1975, birthTo: 2005, example: "강진호" },
  { generation: 34, hanja: "根", hangul: "근", element: "木", position: "앞", birthFrom: 1990, birthTo: 2020, example: "강근우" },
  { generation: 35, hanja: "煥", hangul: "환", element: "火", position: "뒤", birthFrom: 2005, birthTo: 2035, example: "강지환" },
];

export const MIN_GENERATION = 28;
export const MAX_GENERATION = 35;

/** 대손(代孫) = 세(世) - 1 (시조를 1세로 볼 때) */
export function toDaeson(generation: number): number {
  return generation - 1;
}

export function getByGeneration(generation: number): HangryeolEntry | undefined {
  return HANGRYEOL.find((h) => h.generation === generation);
}

export interface HangryeolRow {
  entry: HangryeolEntry;
  daeson: number;
  parent: HangryeolEntry | undefined;
  child: HangryeolEntry | undefined;
}

export function toRow(entry: HangryeolEntry): HangryeolRow {
  return {
    entry,
    daeson: toDaeson(entry.generation),
    parent: getByGeneration(entry.generation - 1),
    child: getByGeneration(entry.generation + 1),
  };
}

/** 출생연도로 해당 가능성이 있는 세수를 찾습니다(출생 범위가 겹칠 수 있음). */
export function findByBirthYear(year: number): HangryeolRow[] {
  if (!Number.isFinite(year)) return [];
  return HANGRYEOL.filter((h) => year >= h.birthFrom && year <= h.birthTo)
    .sort((a, b) => {
      const ma = Math.abs((a.birthFrom + a.birthTo) / 2 - year);
      const mb = Math.abs((b.birthFrom + b.birthTo) / 2 - year);
      return ma - mb;
    })
    .map(toRow);
}

/** 이름 속 항렬자(한글 또는 한자)로 찾습니다. 이름 전체를 넣어도 됩니다. */
export function findByNameChar(input: string): HangryeolRow[] {
  const chars = Array.from(input.replace(/\s/g, ""));
  if (chars.length === 0) return [];
  return HANGRYEOL.filter((h) => chars.includes(h.hangul) || chars.includes(h.hanja)).map(toRow);
}

/** 아버지 세수를 넣으면 본인(자녀) 세수를 찾습니다. */
export function findByFatherGeneration(fatherGeneration: number): HangryeolRow[] {
  const mine = getByGeneration(fatherGeneration + 1);
  return mine ? [toRow(mine)] : [];
}
