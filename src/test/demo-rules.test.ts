import { describe, expect, it } from "vitest";
import { FONT_SIZES } from "@/lib/font-size";
import { findByBirthYear, findByFatherGeneration, findByNameChar, toDaeson, HANGRYEOL } from "@/lib/hangryeol";
import {
  addNoticeTo,
  addVoteTo,
  cloneSeed,
  deleteNoticeFrom,
  sortNotices,
  summarizeVotes,
  votesForEvent,
} from "@/lib/demo-store";

describe("글자 크기", () => {
  it("가- / 기본 / 가+ 는 18px / 21px / 24px", () => {
    expect(FONT_SIZES).toEqual({ small: 18, base: 21, large: 24 });
  });
});

describe("항렬 찾기", () => {
  it("샘플 데이터는 28세부터 35세까지", () => {
    expect(HANGRYEOL.map((h) => h.generation)).toEqual([28, 29, 30, 31, 32, 33, 34, 35]);
  });
  it("아버지가 30세면 본인은 31세(30대손), 부모·자녀 항렬자를 함께 반환", () => {
    const row = findByFatherGeneration(30)[0]!;
    expect(row.entry.generation).toBe(31);
    expect(row.daeson).toBe(30);
    expect(row.parent?.generation).toBe(30);
    expect(row.child?.generation).toBe(32);
  });
  it("대손은 세수 - 1", () => {
    expect(toDaeson(32)).toBe(31);
  });
  it("이름 속 한글/한자 돌림자로 찾기", () => {
    expect(findByNameChar("병철")[0]?.entry.generation).toBe(30);
    expect(findByNameChar("鍾")[0]?.entry.generation).toBe(32);
  });
  it("출생연도는 가장 가까운 세수를 먼저 보여준다", () => {
    expect(findByBirthYear(1972)[0]?.entry.generation).toBe(32);
    expect(findByBirthYear(1800)).toHaveLength(0);
  });
});

describe("참석 투표", () => {
  const eventId = "e-spring-2026";
  it("동반인원을 포함해 총 인원을 계산", () => {
    const s = cloneSeed();
    const r = addVoteTo(s, { eventId, name: "강테스트", phoneLast4: "9999", companions: 2 });
    expect(r.error).toBeNull();
    const before = summarizeVotes(votesForEvent(s, eventId));
    const after = summarizeVotes(votesForEvent(r.state, eventId));
    expect(after.applicants).toBe(before.applicants + 1);
    expect(after.totalPeople).toBe(before.totalPeople + 3);
  });
  it("연락처 뒷자리는 숫자 4자리만 허용", () => {
    expect(addVoteTo(cloneSeed(), { eventId, name: "강테스트", phoneLast4: "12a4", companions: 0 }).error).toBe("phoneLast4");
  });
  it("같은 이름+뒷자리로 다시 신청하면 기존 신청을 변경", () => {
    const s = cloneSeed();
    const r = addVoteTo(s, { eventId, name: "강병철", phoneLast4: "1234", companions: 4 });
    expect(r.updated).toBe(true);
    expect(r.state.votes).toHaveLength(s.votes.length);
  });
});

describe("공지", () => {
  it("새 공지를 작성하면 목록에 추가되고, 상단고정 글이 먼저 나온다", () => {
    const s = addNoticeTo(cloneSeed(), { title: "새 글", category: "공지", pinned: true, content: "내용" });
    const sorted = sortNotices(s.notices);
    expect(sorted.filter((n) => n.pinned).map((n) => n.title)).toContain("새 글");
    expect(sorted[0]?.pinned).toBe(true);
  });
  it("삭제하면 목록에서 사라진다", () => {
    const s = deleteNoticeFrom(cloneSeed(), "n-1");
    expect(s.notices.find((n) => n.id === "n-1")).toBeUndefined();
  });
});
