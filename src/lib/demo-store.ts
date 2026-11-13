import { useSyncExternalStore } from "react";
import { GALLERY } from "@/lib/gallery";

export const NOTICE_CATEGORIES = ["공지", "행사", "소식", "봉안", "부고"] as const;
export type NoticeCategory = (typeof NOTICE_CATEGORIES)[number];

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  pinned: boolean;
  content: string;
  author: string;
  createdAt: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  createdAt: string;
}

export interface Vote {
  id: string;
  eventId: string;
  name: string;
  phoneLast4: string;
  companions: number;
  createdAt: string;
}

export interface ClanInfo {
  name: string;
  shortName: string;
  hanjaName: string;
  slogan: string;
  subSlogan: string;
  address: string;
  phone: string;
  email: string;
}

export interface AboutContent {
  presidentQuote: string;
  presidentName: string;
  greetingParagraph1: string;
  greetingParagraph2: string;
  lineageTitle: string;
  lineageDescription: string;
  memorialTitle: string;
  memorialDescription: string;
  memorialTarget: string;
  memorialProcess: string;
  memorialManagement: string;
  memorialContact: string;
}

export interface HistoryItem {
  id: string;
  year: string;
  text: string;
}

export interface OrgItem {
  id: string;
  role: string;
  name: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  date: string;
}

export interface DemoState {
  version: number;
  clanInfo: ClanInfo;
  aboutContent: AboutContent;
  history: HistoryItem[];
  org: OrgItem[];
  gallery: GalleryPhoto[];
  notices: Notice[];
  events: EventItem[];
  votes: Vote[];
}

export const STORAGE_KEY = "jongchin-demo-store";
export const STORE_VERSION = 5;
export const MAX_COMPANIONS = 10;
export const ADMIN_PIN = "2045";

export const SEED: DemoState = {
  version: STORE_VERSION,
  clanInfo: {
    name: "진주강씨 무숙공파 종친회",
    shortName: "무숙공파 종친회",
    hanjaName: "晉州姜氏 武肅公派",
    slogan: "한 뿌리, 더 큰 내일로",
    subSlogan: "시조 강이식 장군과 파조 무숙공의 뜻을 받들어 종원 간의 화합과 숭조돈목(崇祖敦睦)을 실천합니다.",
    address: "경상북도 상주시 부원동 산57번지 춘경재",
    phone: "054-000-0000",
    email: "contact@jinju-kang.org",
  },
  aboutContent: {
    presidentQuote: "뿌리를 아는 사람은 흔들리지 않습니다.",
    presidentName: "종친회장 강 O O",
    greetingParagraph1:
      "존경하는 종원 여러분, 진주강씨 무숙공파 종친회 홈페이지를 찾아주셔서 감사합니다. 우리 종친회는 시조 강이식 장군과 파조 무숙공 선조님의 숭고한 뜻을 받들어 선영과 재실(춘경재)을 수호하고, 춘추 제향 봉행과 문중 봉안당 운영을 통해 숭조돈목(崇祖敦睦)의 전통을 이어오고 있습니다.",
    greetingParagraph2:
      "이제 전국 각지와 해외에 계신 종원들이 언제든 문중 소식을 나누고, 자손들이 자신의 항렬과 뿌리를 쉽게 찾을 수 있도록 디지털 종친회를 열어 갑니다. 많은 관심과 참여를 부탁드립니다.",
    lineageTitle: "진주강씨 무숙공파(武肅公派) 유래",
    lineageDescription:
      "무숙공파는 시조 강이식 장군의 후손으로서 나라에 큰 공훈을 세우시고 시호 무숙(武肅)을 받으신 선조님을 파조로 모시는 계파입니다. 대대로 조상을 공경하는 숭조(崇祖)와 일가 간의 화목을 다지는 돈목(敦睦)을 가풍으로 삼아 선영을 수호하고 종원 간 우애를 이어오고 있습니다.",
    memorialTitle: "후손을 위한 영원한 안식처",
    memorialDescription:
      "우리 종친회에서는 후손들이 별세하였을 때 장지 마련의 어려움을 덜고, 대대로 한자리에서 조상님과 함께 모실 수 있도록 상주 부원동 선영 내 문중 봉안당(납골당)을 체계적으로 관리·운영하고 있습니다.",
    memorialTarget: "진주강씨 무숙공파 종원 및 배우자",
    memorialProcess: "상(喪) 발생 시 또는 이장 희망 시 종친회 총무·전례이사에 사전 연락 후 안장 진행",
    memorialManagement: "종친회 주관 상시 벌초·정화 및 합동 추모 관리",
    memorialContact: "종친회 사무국(춘경재) 또는 전례·봉안이사에게 문의해 주시면 상세한 절차를 안내해 드립니다.",
  },
  history: [
    { id: "h-1", year: "1958", text: "종친회 창립 및 초대 회장 추대" },
    { id: "h-2", year: "1976", text: "선영 묘역 정화 사업 완료" },
    { id: "h-3", year: "1994", text: "재실 춘경재 정비 및 종보(宗報) 발간" },
    { id: "h-4", year: "2008", text: "종중 선영 봉안당(납골당) 조성 및 운영 개시" },
    { id: "h-5", year: "2019", text: "춘경재 중수 및 신도비 건립" },
    { id: "h-6", year: "2026", text: "디지털 종친회 홈페이지 및 전자족보 구축 착수" },
  ],
  org: [
    { id: "o-1", role: "회장", name: "강 O O" },
    { id: "o-2", role: "수석부회장", name: "강 O O" },
    { id: "o-3", role: "총무이사", name: "강 O O" },
    { id: "o-4", role: "재무이사", name: "강 O O" },
    { id: "o-5", role: "전례·봉안이사", name: "강 O O" },
    { id: "o-6", role: "감사", name: "강 O O" },
  ],
  gallery: GALLERY.map((item, idx) => ({
    id: `g-${idx + 1}`,
    src: item.src,
    title: item.title,
    date: item.date,
  })),
  notices: [
    {
      id: "n-1",
      title: "2026년 춘계 대제 봉행 안내",
      category: "행사",
      pinned: true,
      content:
        "선조님의 음덕을 기리는 2026년 춘계 대제를 아래와 같이 봉행하오니 종원 여러분의 많은 참석을 바랍니다. 일시: 2026년 4월 5일(일) 오전 11시 / 장소: 경상북도 상주시 부원동 산57번지 춘경재",
      author: "총무이사",
      createdAt: "2026-03-02T09:00:00+09:00",
    },
    {
      id: "n-2",
      title: "제48차 정기총회 결과 및 신임 임원 명단",
      category: "공지",
      pinned: false,
      content:
        "지난 정기총회에서 2025년 결산 및 2026년 사업계획이 원안대로 승인되었습니다. 신임 임원 명단은 종친회 소개 페이지를 참고해 주시기 바랍니다.",
      author: "사무국",
      createdAt: "2026-02-18T14:00:00+09:00",
    },
    {
      id: "n-3",
      title: "문중 선영 봉안당(납골당) 안장 신청 및 이용 안내",
      category: "봉안",
      pinned: false,
      content:
        "우리 무숙공파 종친회에서는 후손들이 조상님의 품에서 편안히 영면하실 수 있도록 상주시 부원동 선영 내 문중 전용 봉안당을 운영하고 있습니다. 상(喪) 발생 시 또는 기존 묘소의 이장을 희망하시는 종원께서는 사전에 사무국(춘경재) 및 전례·봉안이사에게 연락해 주시기 바랍니다.",
      author: "전례·봉안이사",
      createdAt: "2026-02-10T10:00:00+09:00",
    },
    {
      id: "n-4",
      title: "종보(宗報) 제112호 발간 안내",
      category: "소식",
      pinned: false,
      content:
        "종보 제112호가 발간되었습니다. 종원 동정, 지역 종친회 소식, 선조 유적 답사기를 담았습니다. 주소 변경을 원하시는 분은 사무국에 알려주세요.",
      author: "편집위원회",
      createdAt: "2026-01-25T11:00:00+09:00",
    },
    {
      id: "n-5",
      title: "선영 및 봉안당 벌초 일정 사전 안내",
      category: "행사",
      pinned: false,
      content:
        "올해 상주 부원동 선영 및 봉안당 주변 정화·벌초는 8월 마지막 주 토요일로 예정되어 있습니다. 세부 일정은 추후 공지합니다.",
      author: "총무이사",
      createdAt: "2026-01-12T09:30:00+09:00",
    },
  ],
  events: [
    {
      id: "e-spring-2026",
      title: "2026년 춘계 대제",
      date: "2026-04-05",
      time: "11:00",
      location: "경상북도 상주시 부원동 산57번지 춘경재",
      description: "선대 조상님께 올리는 봄 제향입니다. 제례 후 재실(춘경재)에서 음복과 종원 상견례가 있습니다.",
      createdAt: "2026-03-01T09:00:00+09:00",
    },
  ],
  votes: [
    { id: "v-1", eventId: "e-spring-2026", name: "강병철", phoneLast4: "1234", companions: 1, createdAt: "2026-03-03T10:12:00+09:00" },
    { id: "v-2", eventId: "e-spring-2026", name: "강민재", phoneLast4: "5521", companions: 0, createdAt: "2026-03-04T08:40:00+09:00" },
    { id: "v-3", eventId: "e-spring-2026", name: "강종훈", phoneLast4: "7788", companions: 3, createdAt: "2026-03-05T19:05:00+09:00" },
    { id: "v-4", eventId: "e-spring-2026", name: "강진호", phoneLast4: "0412", companions: 2, createdAt: "2026-03-06T21:30:00+09:00" },
  ],
};

export function makeId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function cloneSeed(): DemoState {
  return JSON.parse(JSON.stringify(SEED)) as DemoState;
}

export function sortNotices(notices: Notice[]): Notice[] {
  return [...notices].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export function sortEvents(events: EventItem[]): EventItem[] {
  return [...events].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
}

export type NoticeInput = Pick<Notice, "title" | "category" | "pinned" | "content"> & { author?: string };

export function addNoticeTo(state: DemoState, input: NoticeInput, now = new Date()): DemoState {
  const notice: Notice = {
    id: makeId("n"),
    title: input.title.trim(),
    category: input.category,
    pinned: input.pinned,
    content: input.content.trim(),
    author: input.author?.trim() || "관리자",
    createdAt: now.toISOString(),
  };
  return { ...state, notices: [notice, ...state.notices] };
}

export function updateNoticeIn(state: DemoState, id: string, input: NoticeInput): DemoState {
  return {
    ...state,
    notices: state.notices.map((n) =>
      n.id === id
        ? {
            ...n,
            title: input.title.trim(),
            category: input.category,
            pinned: input.pinned,
            content: input.content.trim(),
            author: input.author?.trim() || n.author,
          }
        : n,
    ),
  };
}

export function deleteNoticeFrom(state: DemoState, id: string): DemoState {
  return { ...state, notices: state.notices.filter((n) => n.id !== id) };
}

export type EventInput = Pick<EventItem, "title" | "date" | "time" | "location" | "description">;

export function addEventTo(state: DemoState, input: EventInput, now = new Date()): DemoState {
  const ev: EventItem = {
    id: makeId("e"),
    title: input.title.trim(),
    date: input.date,
    time: input.time,
    location: input.location.trim(),
    description: input.description.trim(),
    createdAt: now.toISOString(),
  };
  return { ...state, events: [...state.events, ev] };
}

export function deleteEventFrom(state: DemoState, id: string): DemoState {
  return {
    ...state,
    events: state.events.filter((e) => e.id !== id),
    votes: state.votes.filter((v) => v.eventId !== id),
  };
}

export interface VoteInput {
  eventId: string;
  name: string;
  phoneLast4: string;
  companions: number;
}

export type VoteError = "name" | "phoneLast4" | "companions" | "event";

export function validateVote(state: DemoState, input: VoteInput): VoteError | null {
  if (!state.events.some((e) => e.id === input.eventId)) return "event";
  const name = input.name.trim();
  if (name.length < 2 || name.length > 20) return "name";
  if (!/^[0-9]{4}$/.test(input.phoneLast4)) return "phoneLast4";
  if (!Number.isInteger(input.companions) || input.companions < 0 || input.companions > MAX_COMPANIONS)
    return "companions";
  return null;
}

export interface VoteResult {
  state: DemoState;
  error: VoteError | null;
  updated: boolean;
}

export function addVoteTo(state: DemoState, input: VoteInput, now = new Date()): VoteResult {
  const error = validateVote(state, input);
  if (error) return { state, error, updated: false };
  const name = input.name.trim();
  const existing = state.votes.find(
    (v) => v.eventId === input.eventId && v.name === name && v.phoneLast4 === input.phoneLast4,
  );
  if (existing) {
    return {
      state: {
        ...state,
        votes: state.votes.map((v) =>
          v.id === existing.id ? { ...v, companions: input.companions, createdAt: now.toISOString() } : v,
        ),
      },
      error: null,
      updated: true,
    };
  }
  const vote: Vote = {
    id: makeId("v"),
    eventId: input.eventId,
    name,
    phoneLast4: input.phoneLast4,
    companions: input.companions,
    createdAt: now.toISOString(),
  };
  return { state: { ...state, votes: [...state.votes, vote] }, error: null, updated: false };
}

export function deleteVoteFrom(state: DemoState, id: string): DemoState {
  return { ...state, votes: state.votes.filter((v) => v.id !== id) };
}

export function votesForEvent(state: DemoState, eventId: string): Vote[] {
  return state.votes
    .filter((v) => v.eventId === eventId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function summarizeVotes(votes: Vote[]): { applicants: number; totalPeople: number } {
  return {
    applicants: votes.length,
    totalPeople: votes.reduce((sum, v) => sum + 1 + v.companions, 0),
  };
}

type Listener = () => void;
const listeners = new Set<Listener>();
let cache: DemoState | null = null;

function isDemoState(v: unknown): v is DemoState {
  if (!v || typeof v !== "object") return false;
  const s = v as Partial<DemoState>;
  return (
    s.version === STORE_VERSION &&
    Boolean(s.clanInfo) &&
    Boolean(s.aboutContent) &&
    Array.isArray(s.history) &&
    Array.isArray(s.org) &&
    Array.isArray(s.gallery) &&
    Array.isArray(s.notices) &&
    Array.isArray(s.events) &&
    Array.isArray(s.votes)
  );
}

function readStorage(): DemoState {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isDemoState(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return cloneSeed();
}

function emit() {
  listeners.forEach((l) => l());
}

export function getState(): DemoState {
  if (cache === null) cache = readStorage();
  return cache;
}

export function setState(next: DemoState) {
  cache = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }
  emit();
}

function onStorage(e: StorageEvent) {
  if (e.key === STORAGE_KEY || e.key === null) {
    cache = readStorage();
    emit();
  }
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  if (listeners.size === 1 && typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

const getServerSnapshot = () => SEED;

export function useDemoStore(): DemoState {
  return useSyncExternalStore(subscribe, getState, getServerSnapshot);
}

export const demoActions = {
  updateClanInfo(clanInfo: ClanInfo) {
    setState({ ...getState(), clanInfo });
  },
  updateAboutContent(aboutContent: AboutContent) {
    setState({ ...getState(), aboutContent });
  },
  addHistory(year: string, text: string) {
    const cur = getState();
    setState({
      ...cur,
      history: [...cur.history, { id: makeId("h"), year: year.trim(), text: text.trim() }],
    });
  },
  updateHistoryItem(id: string, year: string, text: string) {
    const cur = getState();
    setState({
      ...cur,
      history: cur.history.map((h) => (h.id === id ? { ...h, year: year.trim(), text: text.trim() } : h)),
    });
  },
  deleteHistory(id: string) {
    const cur = getState();
    setState({ ...cur, history: cur.history.filter((h) => h.id !== id) });
  },
  addOrg(role: string, name: string) {
    const cur = getState();
    setState({
      ...cur,
      org: [...cur.org, { id: makeId("o"), role: role.trim(), name: name.trim() }],
    });
  },
  updateOrgItem(id: string, role: string, name: string) {
    const cur = getState();
    setState({
      ...cur,
      org: cur.org.map((o) => (o.id === id ? { ...o, role: role.trim(), name: name.trim() } : o)),
    });
  },
  deleteOrg(id: string) {
    const cur = getState();
    setState({ ...cur, org: cur.org.filter((o) => o.id !== id) });
  },
  addGalleryPhoto(input: { src: string; title: string; date: string }) {
    const cur = getState();
    const item: GalleryPhoto = {
      id: makeId("g"),
      src: input.src.trim(),
      title: input.title.trim(),
      date: input.date.trim() || "2026",
    };
    setState({ ...cur, gallery: [item, ...cur.gallery] });
  },
  updateGalleryPhoto(id: string, input: { src?: string; title: string; date: string }) {
    const cur = getState();
    setState({
      ...cur,
      gallery: cur.gallery.map((g) =>
        g.id === id
          ? {
              ...g,
              src: input.src !== undefined ? input.src : g.src,
              title: input.title.trim(),
              date: input.date.trim(),
            }
          : g,
      ),
    });
  },
  deleteGalleryPhoto(id: string) {
    const cur = getState();
    setState({ ...cur, gallery: cur.gallery.filter((g) => g.id !== id) });
  },
  addNotice(input: NoticeInput) {
    setState(addNoticeTo(getState(), input));
  },
  updateNotice(id: string, input: NoticeInput) {
    setState(updateNoticeIn(getState(), id, input));
  },
  deleteNotice(id: string) {
    setState(deleteNoticeFrom(getState(), id));
  },
  addEvent(input: EventInput) {
    setState(addEventTo(getState(), input));
  },
  deleteEvent(id: string) {
    setState(deleteEventFrom(getState(), id));
  },
  vote(input: VoteInput): Omit<VoteResult, "state"> {
    const result = addVoteTo(getState(), input);
    if (!result.error) setState(result.state);
    return { error: result.error, updated: result.updated };
  },
  deleteVote(id: string) {
    setState(deleteVoteFrom(getState(), id));
  },
  reset() {
    setState(cloneSeed());
  },
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function formatEventDate(date: string, time?: string): string {
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return date;
  const wd = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  let out = `${y}년 ${m}월 ${d}일(${wd})`;
  if (time) {
    const [hh = 0, mm = 0] = time.split(":").map(Number);
    const ampm = hh < 12 ? "오전" : "오후";
    const h12 = hh % 12 === 0 ? 12 : hh % 12;
    out += ` ${ampm} ${h12}시${mm ? ` ${mm}분` : ""}`;
  }
  return out;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  const y = kst.getUTCFullYear();
  const m = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kst.getUTCDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  const hh = String(kst.getUTCHours()).padStart(2, "0");
  const mm = String(kst.getUTCMinutes()).padStart(2, "0");
  return `${formatDate(iso)} ${hh}:${mm}`;
}