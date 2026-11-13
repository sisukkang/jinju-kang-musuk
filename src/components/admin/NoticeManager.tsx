import { useState } from "react";
import { Pin, Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NOTICE_CATEGORIES,
  demoActions,
  formatDate,
  sortNotices,
  useDemoStore,
  type Notice,
  type NoticeCategory,
} from "@/lib/demo-store";

export function NoticeManager() {
  const { notices } = useDemoStore();
  const sorted = sortNotices(notices);

  // 새 공지 입력 상태
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<NoticeCategory>("공지");
  const [author, setAuthor] = useState("사무국");
  const [pinned, setPinned] = useState(false);
  const [content, setContent] = useState("");

  // 기존 공지 수정 상태
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<NoticeCategory>("공지");
  const [editAuthor, setEditAuthor] = useState("");
  const [editPinned, setEditPinned] = useState(false);
  const [editContent, setEditContent] = useState("");

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    demoActions.addNotice({ title, category, pinned, content, author });
    setTitle("");
    setContent("");
    setPinned(false);
  }

  function startEdit(n: Notice) {
    setEditingId(n.id);
    setEditTitle(n.title);
    setEditCategory(n.category);
    setEditAuthor(n.author);
    setEditPinned(n.pinned);
    setEditContent(n.content);
  }

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId || !editTitle.trim() || !editContent.trim()) return;
    demoActions.updateNotice(editingId, {
      title: editTitle,
      category: editCategory,
      pinned: editPinned,
      content: editContent,
      author: editAuthor,
    });
    setEditingId(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      {/* 좌측: 새 공지 작성 폼 */}
      <form
        onSubmit={handleCreate}
        className="h-fit space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card"
      >
        <h2 className="text-[1.3rem] font-bold">새 공지사항 등록</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[0.8rem] font-bold">분류</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as NoticeCategory)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[0.9rem]"
            >
              {NOTICE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[0.8rem] font-bold">작성자</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="예: 사무국, 총무이사"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-[0.9rem]"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[0.8rem] font-bold">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="공지 제목을 입력하세요"
            required
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-[0.8rem] font-bold">본문 내용</label>
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="공지 상세 내용을 입력하세요"
            required
            className="w-full rounded-lg border border-input bg-background p-3.5"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-[0.9rem] font-semibold">
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
            className="size-4 accent-primary"
          />
          상단 고정 공지로 표시
        </label>

        <Button type="submit" variant="seal" size="xl" className="w-full">
          <Plus className="size-4" /> 공지사항 등록하기
        </Button>
      </form>

      {/* 우측: 등록된 공지 목록 및 즉시 수정 */}
      <div className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="text-[1.3rem] font-bold">등록된 공지 목록 ({sorted.length}건)</h2>
          <span className="text-[0.8rem] text-muted-foreground">연필 아이콘을 눌러 내용을 수정할 수 있습니다</span>
        </div>

        <ul className="space-y-3">
          {sorted.map((n) => {
            const isEditing = editingId === n.id;

            if (isEditing) {
              return (
                <li key={n.id} className="rounded-xl border-2 border-primary bg-background p-4">
                  <form onSubmit={handleUpdate} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value as NoticeCategory)}
                        className="rounded-lg border border-input bg-card px-2.5 py-1.5 text-[0.85rem]"
                      >
                        {NOTICE_CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={editAuthor}
                        onChange={(e) => setEditAuthor(e.target.value)}
                        placeholder="작성자"
                        className="rounded-lg border border-input bg-card px-2.5 py-1.5 text-[0.85rem]"
                      />
                    </div>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full rounded-lg border border-input bg-card px-3 py-1.5 font-bold"
                    />
                    <textarea
                      rows={4}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full rounded-lg border border-input bg-card p-2.5 text-[0.9rem]"
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-[0.85rem] font-semibold">
                        <input
                          type="checkbox"
                          checked={editPinned}
                          onChange={(e) => setEditPinned(e.target.checked)}
                          className="size-4 accent-primary"
                        />
                        상단 고정
                      </label>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => setEditingId(null)}>
                          <X className="size-4" /> 취소
                        </Button>
                        <Button type="submit" variant="seal" size="sm">
                          <Check className="size-4" /> 수정 저장
                        </Button>
                      </div>
                    </div>
                  </form>
                </li>
              );
            }

            return (
              <li
                key={n.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {n.pinned && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[0.7rem] font-bold text-primary-foreground">
                        <Pin className="size-3" /> 고정
                      </span>
                    )}
                    <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-[0.75rem] font-bold text-primary">
                      {n.category}
                    </span>
                    <span className="text-[0.8rem] text-muted-foreground">
                      {formatDate(n.createdAt)} · {n.author}
                    </span>
                  </div>
                  <p className="mt-1.5 font-bold">{n.title}</p>
                  <p className="mt-1 line-clamp-2 text-[0.85rem] text-muted-foreground">{n.content}</p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => startEdit(n)}
                    aria-label="공지 수정"
                    className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-primary"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => demoActions.deleteNotice(n.id)}
                    aria-label="공지 삭제"
                    className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}