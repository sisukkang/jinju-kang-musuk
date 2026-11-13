import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Lock,
  LogOut,
  Settings,
  FileText,
  Users,
  Megaphone,
  Image as ImageIcon,
  Calendar,
  Plus,
  Trash2,
  Save,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { NoticeManager } from "@/components/admin/NoticeManager";
import { EventManager } from "@/components/admin/EventManager";
import { ResetDemoButton } from "@/components/admin/ResetDemoButton";
import { useDemoStore, demoActions, ADMIN_PIN } from "@/lib/demo-store";
import { CLAN } from "@/lib/site-config";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: `CMS 관리자 | ${CLAN.name}` },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const AUTH_STORAGE_KEY = "jongchin-admin-auth";

type AdminTab = "basic" | "about" | "historyOrg" | "notices" | "gallery" | "events";

/** 업로드한 이미지를 브라우저 저장소 용량에 맞게 자동 리사이즈(최대 가로 1200px) */
function resizeImageFile(file: File, maxWidth = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function AdminPage() {
  const state = useDemoStore();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("notices");
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const [clanForm, setClanForm] = useState(state.clanInfo);
  const [aboutForm, setAboutForm] = useState(state.aboutContent);

  const [newYear, setNewYear] = useState("");
  const [newHistoryText, setNewHistoryText] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newName, setNewName] = useState("");

  // 갤러리 추가 폼 상태
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoDate, setPhotoDate] = useState("2026.11");
  const [photoSrc, setPhotoSrc] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (saved === "true") setIsUnlocked(true);
    }
  }, []);

  useEffect(() => {
    setClanForm(state.clanInfo);
    setAboutForm(state.aboutContent);
  }, [state.clanInfo, state.aboutContent]);

  function showToast(msg: string) {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(null), 2500);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      setIsUnlocked(true);
      setPinError(false);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(AUTH_STORAGE_KEY, "true");
      }
    } else {
      setPinError(true);
      setPinInput("");
    }
  }

  function handleLogout() {
    setIsUnlocked(false);
    setPinInput("");
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }

  function handleSaveClan(e: React.FormEvent) {
    e.preventDefault();
    demoActions.updateClanInfo(clanForm);
    showToast("기본 정보 및 메인 배너 문구가 저장되었습니다.");
  }

  function handleSaveAbout(e: React.FormEvent) {
    e.preventDefault();
    demoActions.updateAboutContent(aboutForm);
    showToast("종친회 소개 및 봉안당 안내 내용이 저장되었습니다.");
  }

  function handleAddHistory(e: React.FormEvent) {
    e.preventDefault();
    if (!newYear.trim() || !newHistoryText.trim()) return;
    demoActions.addHistory(newYear, newHistoryText);
    setNewYear("");
    setNewHistoryText("");
    showToast("연혁 항목이 추가되었습니다.");
  }

  function handleAddOrg(e: React.FormEvent) {
    e.preventDefault();
    if (!newRole.trim() || !newName.trim()) return;
    demoActions.addOrg(newRole, newName);
    setNewRole("");
    setNewName("");
    showToast("임원 명단이 추가되었습니다.");
  }

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await resizeImageFile(file);
      setPhotoSrc(dataUrl);
      if (!photoTitle.trim()) {
        const cleanName = file.name.replace(/\.[^.]+$/, "");
        setPhotoTitle(cleanName);
      }
    } finally {
      setUploading(false);
    }
  }

  function handleAddPhoto(e: React.FormEvent) {
    e.preventDefault();
    if (!photoSrc.trim() || !photoTitle.trim()) return;
    demoActions.addGalleryPhoto({
      src: photoSrc,
      title: photoTitle,
      date: photoDate,
    });
    setPhotoTitle("");
    setPhotoSrc("");
    showToast("갤러리에 새 사진이 등록되었습니다.");
  }

  if (!isUnlocked) {
    return (
      <>
        <PageHero eyebrow="ADMIN ACCESS" title="종친회 CMS 관리자 인증">
          홈페이지 콘텐츠 및 일정을 관리하려면 관리자 비밀번호를 입력해 주세요.
        </PageHero>
        <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
          <form
            onSubmit={handleLogin}
            className="rounded-2xl border border-border bg-card p-8 shadow-card"
          >
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-gold-soft text-primary">
              <Lock className="size-7" />
            </div>
            <h2 className="text-center text-[1.4rem] font-bold">관리자 비밀번호 입력</h2>
            <p className="mt-2 text-center text-[0.9rem] text-muted-foreground">
              부여받은 4자리 관리자 암호를 입력하세요.
            </p>

            <div className="mt-6">
              <label htmlFor="admin-pin" className="sr-only">
                관리자 비밀번호
              </label>
              <input
                id="admin-pin"
                type="password"
                inputMode="numeric"
                maxLength={10}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="비밀번호 입력"
                autoFocus
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-center text-[1.3rem] font-bold tracking-[0.4em] focus:border-primary focus:outline-none"
              />
              {pinError && (
                <p className="mt-2 text-center text-[0.85rem] font-bold text-destructive">
                  비밀번호가 일치하지 않습니다. 다시 확인해 주세요.
                </p>
              )}
            </div>

            <Button type="submit" variant="seal" size="xl" className="mt-6 w-full">
              관리자 페이지 접속
            </Button>
          </form>
        </div>
      </>
    );
  }

  const TABS: { id: AdminTab; label: string; icon: typeof Settings }[] = [
    { id: "notices", label: "공지사항 관리", icon: Megaphone },
    { id: "gallery", label: "갤러리 관리", icon: ImageIcon },
    { id: "events", label: "행사·참석자 관리", icon: Calendar },
    { id: "basic", label: "기본정보·배너", icon: Settings },
    { id: "about", label: "인사말·봉안당", icon: FileText },
    { id: "historyOrg", label: "연혁·임원진", icon: Users },
  ];

  return (
    <>
      <PageHero eyebrow="CMS DASHBOARD" title="홈페이지 통합 관리 (CMS)">
        공지사항, 갤러리 사진, 행사 일정 및 문중 소개 문구를 실시간으로 업데이트합니다.
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[0.9rem] font-bold transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary text-ink hover:bg-gold-soft hover:text-primary"
                  }`}
                >
                  <Icon className="size-4" />
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <ResetDemoButton />
            <Button type="button" variant="outline" onClick={handleLogout}>
              <LogOut className="size-4" /> 잠금(로그아웃)
            </Button>
          </div>
        </div>

        {savedToast && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-gold bg-gold-soft px-4 py-3 text-[0.95rem] font-bold text-primary">
            <CheckCircle2 className="size-5 shrink-0" />
            <span>{savedToast}</span>
          </div>
        )}

        {/* 탭: 공지사항 관리 */}
        {activeTab === "notices" && <NoticeManager />}

        {/* 탭: 갤러리 관리 (신규) */}
        {activeTab === "gallery" && (
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            {/* 새 사진 등록 폼 */}
            <form
              onSubmit={handleAddPhoto}
              className="h-fit space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card"
            >
              <h2 className="text-[1.3rem] font-bold">새 갤러리 사진 등록</h2>
              <p className="text-[0.85rem] text-muted-foreground">
                내 PC에서 사진 파일을 선택하거나 이미지 주소를 입력해 등록하세요.
              </p>

              <div>
                <label className="mb-1.5 block text-[0.8rem] font-bold">1. 내 PC에서 사진 파일 선택</label>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gold/60 bg-secondary/50 p-5 text-center transition hover:bg-gold-soft/50">
                  <Upload className="size-6 text-primary" />
                  <span className="text-[0.9rem] font-bold text-primary">
                    {uploading ? "사진 변환 중..." : "클릭하여 PC에서 사진 파일 선택 (JPG, PNG)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="mb-1 block text-[0.8rem] font-bold">
                  또는 이미지 주소(URL) 직접 입력
                </label>
                <input
                  type="text"
                  value={photoSrc}
                  onChange={(e) => setPhotoSrc(e.target.value)}
                  placeholder="파일 선택 시 자동 입력됩니다"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[0.85rem]"
                />
              </div>

              {photoSrc && (
                <div className="overflow-hidden rounded-xl border border-border bg-background p-2">
                  <img
                    src={photoSrc}
                    alt="미리보기"
                    className="aspect-[4/3] w-full rounded-lg object-cover"
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-[0.8rem] font-bold">사진 제목</label>
                <input
                  type="text"
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  placeholder="예: 2026년 춘계 대제 봉행"
                  required
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-[0.8rem] font-bold">촬영일 / 연월 표시</label>
                <input
                  type="text"
                  value={photoDate}
                  onChange={(e) => setPhotoDate(e.target.value)}
                  placeholder="예: 2026.04.05"
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2"
                />
              </div>

              <Button type="submit" variant="seal" size="xl" className="w-full" disabled={!photoSrc || !photoTitle}>
                <Plus className="size-4" /> 갤러리에 사진 추가
              </Button>
            </form>

            {/* 등록된 갤러리 목록 및 수정/삭제 */}
            <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="text-[1.3rem] font-bold">등록된 갤러리 사진 ({state.gallery.length}장)</h2>
                <span className="text-[0.8rem] text-muted-foreground">제목과 날짜를 클릭해 바로 수정할 수 있습니다</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {state.gallery.map((g) => (
                  <div
                    key={g.id}
                    className="overflow-hidden rounded-xl border border-border bg-background shadow-xs"
                  >
                    <div className="relative aspect-[4/3] w-full bg-secondary">
                      <img src={g.src} alt={g.title} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          demoActions.deleteGalleryPhoto(g.id);
                          showToast("사진이 삭제되었습니다.");
                        }}
                        aria-label="사진 삭제"
                        className="absolute top-2 right-2 inline-flex size-8 items-center justify-center rounded-full bg-ink/80 text-paper hover:bg-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="space-y-2 p-3">
                      <input
                        type="text"
                        value={g.title}
                        onChange={(e) =>
                          demoActions.updateGalleryPhoto(g.id, { title: e.target.value, date: g.date })
                        }
                        aria-label="사진 제목"
                        className="w-full rounded border border-input bg-card px-2.5 py-1 text-[0.9rem] font-bold"
                      />
                      <input
                        type="text"
                        value={g.date}
                        onChange={(e) =>
                          demoActions.updateGalleryPhoto(g.id, { title: g.title, date: e.target.value })
                        }
                        aria-label="촬영 날짜"
                        className="w-full rounded border border-input bg-card px-2.5 py-1 text-[0.8rem] text-muted-foreground"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 탭: 행사·참석자 관리 */}
        {activeTab === "events" && <EventManager />}

        {/* 탭: 기본정보 및 메인 배너 관리 */}
        {activeTab === "basic" && (
          <form
            onSubmit={handleSaveClan}
            className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            <div>
              <h2 className="text-[1.4rem] font-bold">종친회 기본 정보 및 메인 배너 설정</h2>
              <p className="text-[0.9rem] text-muted-foreground">
                상단 로고, 메인 화면 큰 제목, 하단 푸터(사무국 주소 및 연락처)에 공통으로 표시되는 정보입니다.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-bold">종친회 정식 명칭</label>
                <input
                  type="text"
                  value={clanForm.name}
                  onChange={(e) => setClanForm({ ...clanForm, name: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-bold">한자 표기 (상단 로고 위 표시)</label>
                <input
                  type="text"
                  value={clanForm.hanjaName}
                  onChange={(e) => setClanForm({ ...clanForm, hanjaName: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-bold">메인 배너 슬로건 (큰 제목)</label>
                <input
                  type="text"
                  value={clanForm.slogan}
                  onChange={(e) => setClanForm({ ...clanForm, slogan: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-bold">약칭</label>
                <input
                  type="text"
                  value={clanForm.shortName}
                  onChange={(e) => setClanForm({ ...clanForm, shortName: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[0.85rem] font-bold">메인 배너 보조 설명문</label>
                <input
                  type="text"
                  value={clanForm.subSlogan}
                  onChange={(e) => setClanForm({ ...clanForm, subSlogan: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[0.85rem] font-bold">사무국 및 재실 주소</label>
                <input
                  type="text"
                  value={clanForm.address}
                  onChange={(e) => setClanForm({ ...clanForm, address: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-bold">대표 전화번호</label>
                <input
                  type="text"
                  value={clanForm.phone}
                  onChange={(e) => setClanForm({ ...clanForm, phone: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.85rem] font-bold">대표 이메일</label>
                <input
                  type="text"
                  value={clanForm.email}
                  onChange={(e) => setClanForm({ ...clanForm, email: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="seal" size="xl">
                <Save className="size-4" /> 기본 정보 저장하기
              </Button>
            </div>
          </form>
        )}

        {/* 탭: 회장 인사말 · 무숙공파 유래 · 봉안당 안내 관리 */}
        {activeTab === "about" && (
          <form
            onSubmit={handleSaveAbout}
            className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            <div>
              <h2 className="text-[1.4rem] font-bold">종친회 소개 및 봉안당 안내 문구 편집</h2>
              <p className="text-[0.9rem] text-muted-foreground">
                '종친회 소개' 페이지의 인사말, 무숙공파 소개, 선영 봉안당(납골당) 안내 내용을 수정합니다.
              </p>
            </div>

            <div className="space-y-4 border-b border-border pb-6">
              <h3 className="text-[1.15rem] font-bold text-primary">1. 회장 인사말</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[0.85rem] font-bold">강조 인용구 (좌측 박스)</label>
                  <input
                    type="text"
                    value={aboutForm.presidentQuote}
                    onChange={(e) => setAboutForm({ ...aboutForm, presidentQuote: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[0.85rem] font-bold">회장 직함 및 성함</label>
                  <input
                    type="text"
                    value={aboutForm.presidentName}
                    onChange={(e) => setAboutForm({ ...aboutForm, presidentName: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[0.85rem] font-bold">인사말 첫 번째 문단</label>
                <textarea
                  rows={3}
                  value={aboutForm.greetingParagraph1}
                  onChange={(e) => setAboutForm({ ...aboutForm, greetingParagraph1: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background p-3.5"
                />
              </div>
              <div>
                <label className="mb-1 block text-[0.85rem] font-bold">인사말 두 번째 문단</label>
                <textarea
                  rows={3}
                  value={aboutForm.greetingParagraph2}
                  onChange={(e) => setAboutForm({ ...aboutForm, greetingParagraph2: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background p-3.5"
                />
              </div>
            </div>

            <div className="space-y-4 border-b border-border pb-6">
              <h3 className="text-[1.15rem] font-bold text-primary">2. 무숙공파 유래</h3>
              <div>
                <label className="mb-1 block text-[0.85rem] font-bold">소제목</label>
                <input
                  type="text"
                  value={aboutForm.lineageTitle}
                  onChange={(e) => setAboutForm({ ...aboutForm, lineageTitle: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-[0.85rem] font-bold">유래 설명 본문</label>
                <textarea
                  rows={3}
                  value={aboutForm.lineageDescription}
                  onChange={(e) => setAboutForm({ ...aboutForm, lineageDescription: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background p-3.5"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[1.15rem] font-bold text-primary">3. 선영 봉안당(납골당) 운영 안내</h3>
              <div>
                <label className="mb-1 block text-[0.85rem] font-bold">봉안당 안내 제목</label>
                <input
                  type="text"
                  value={aboutForm.memorialTitle}
                  onChange={(e) => setAboutForm({ ...aboutForm, memorialTitle: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-[0.85rem] font-bold">봉안당 소개 설명</label>
                <textarea
                  rows={3}
                  value={aboutForm.memorialDescription}
                  onChange={(e) => setAboutForm({ ...aboutForm, memorialDescription: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background p-3.5"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[0.85rem] font-bold">안장 대상</label>
                  <input
                    type="text"
                    value={aboutForm.memorialTarget}
                    onChange={(e) => setAboutForm({ ...aboutForm, memorialTarget: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[0.85rem] font-bold">관리 운영 방식</label>
                  <input
                    type="text"
                    value={aboutForm.memorialManagement}
                    onChange={(e) => setAboutForm({ ...aboutForm, memorialManagement: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[0.85rem] font-bold">신청 절차 안내</label>
                <input
                  type="text"
                  value={aboutForm.memorialProcess}
                  onChange={(e) => setAboutForm({ ...aboutForm, memorialProcess: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-[0.85rem] font-bold">하단 문의처 안내 문구</label>
                <input
                  type="text"
                  value={aboutForm.memorialContact}
                  onChange={(e) => setAboutForm({ ...aboutForm, memorialContact: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="seal" size="xl">
                <Save className="size-4" /> 소개 및 봉안당 내용 저장
              </Button>
            </div>
          </form>
        )}

        {/* 탭: 연혁 및 임원 구성 관리 */}
        {activeTab === "historyOrg" && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-[1.3rem] font-bold">종친회 연혁 관리</h2>
              <p className="mt-1 text-[0.85rem] text-muted-foreground">
                연도와 내용을 직접 수정하거나 새 연혁을 추가할 수 있습니다.
              </p>

              <form onSubmit={handleAddHistory} className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="연도 (예: 2026)"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  className="w-28 shrink-0 rounded-lg border border-input bg-background px-3 py-2 text-[0.9rem]"
                />
                <input
                  type="text"
                  placeholder="연혁 내용 입력"
                  value={newHistoryText}
                  onChange={(e) => setNewHistoryText(e.target.value)}
                  className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-[0.9rem]"
                />
                <Button type="submit" variant="seal">
                  <Plus className="size-4" /> 추가
                </Button>
              </form>

              <ul className="mt-5 space-y-2.5">
                {state.history.map((h) => (
                  <li key={h.id} className="flex items-center gap-2 rounded-xl border border-border bg-background p-2.5">
                    <input
                      type="text"
                      value={h.year}
                      onChange={(e) => demoActions.updateHistoryItem(h.id, e.target.value, h.text)}
                      className="w-24 shrink-0 rounded border border-input bg-card px-2.5 py-1 font-bold text-primary"
                    />
                    <input
                      type="text"
                      value={h.text}
                      onChange={(e) => demoActions.updateHistoryItem(h.id, h.year, e.target.value)}
                      className="min-w-0 flex-1 rounded border border-input bg-card px-2.5 py-1 text-[0.9rem]"
                    />
                    <button
                      type="button"
                      onClick={() => demoActions.deleteHistory(h.id)}
                      aria-label="연혁 삭제"
                      className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-[1.3rem] font-bold">임원 구성 관리</h2>
              <p className="mt-1 text-[0.85rem] text-muted-foreground">
                직책과 성함을 입력하면 즉시 종친회 소개 페이지에 반영됩니다.
              </p>

              <form onSubmit={handleAddOrg} className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="직책 (예: 부회장)"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-36 shrink-0 rounded-lg border border-input bg-background px-3 py-2 text-[0.9rem]"
                />
                <input
                  type="text"
                  placeholder="성함 (예: 강길동)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-[0.9rem]"
                />
                <Button type="submit" variant="seal">
                  <Plus className="size-4" /> 추가
                </Button>
              </form>

              <ul className="mt-5 space-y-2.5">
                {state.org.map((o) => (
                  <li key={o.id} className="flex items-center gap-2 rounded-xl border border-border bg-background p-2.5">
                    <input
                      type="text"
                      value={o.role}
                      onChange={(e) => demoActions.updateOrgItem(o.id, e.target.value, o.name)}
                      className="w-36 shrink-0 rounded border border-input bg-card px-2.5 py-1 text-[0.85rem] font-bold text-gold"
                    />
                    <input
                      type="text"
                      value={o.name}
                      onChange={(e) => demoActions.updateOrgItem(o.id, o.role, e.target.value)}
                      className="min-w-0 flex-1 rounded border border-input bg-card px-2.5 py-1 font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => demoActions.deleteOrg(o.id)}
                      aria-label="임원 삭제"
                      className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}