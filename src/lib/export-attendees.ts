import { formatDateTime, formatEventDate, summarizeVotes, type EventItem, type Vote } from "./demo-store";

/** 참석자 명단을 실제 .xlsx 파일로 내려받습니다 (브라우저 전용). */
export async function downloadAttendeesExcel(event: EventItem, votes: Vote[]): Promise<void> {
  const XLSX = await import("xlsx");
  const summary = summarizeVotes(votes);

  const header = [
    [`${event.title} 참석자 명단`],
    [`일시: ${formatEventDate(event.date, event.time)}`, "", `장소: ${event.location}`],
    [`신청 ${summary.applicants}명 · 동반 포함 총 ${summary.totalPeople}명`],
    [],
    ["번호", "성명", "연락처 뒷4자리", "동반인원", "총 인원", "신청일시"],
  ];
  const rows = votes.map((v, i) => [
    i + 1,
    v.name,
    v.phoneLast4,
    v.companions,
    v.companions + 1,
    formatDateTime(v.createdAt),
  ]);
  const footer = [[], ["합계", "", "", summary.totalPeople - summary.applicants, summary.totalPeople, ""]];

  const ws = XLSX.utils.aoa_to_sheet([...header, ...rows, ...footer]);
  ws["!cols"] = [{ wch: 8 }, { wch: 14 }, { wch: 16 }, { wch: 10 }, { wch: 10 }, { wch: 20 }];
  ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "참석자 명단");
  const safeTitle = event.title.replace(/[\\/:*?"<>|]/g, "_");
  XLSX.writeFile(wb, `${safeTitle}_참석자명단.xlsx`);
}
