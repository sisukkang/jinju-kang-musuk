import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ChevronDown, ChevronRight, Network, ListTree, RotateCcw, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CLAN } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tree")({
  head: () => ({
    meta: [
      { title: `세보 가계도 (VIEW TREE) | ${CLAN.name}` },
      { name: "description", content: `${CLAN.name} 시조 및 파조 이하 세보 가계도 시각화` },
    ],
  }),
  component: TreePage,
});

/** 가계도 노드 데이터 타입 (성씨 및 나이 제외, 이름과 한자 중심) */
export interface FamilyNode {
  id: string;
  generation: number; // 세수 (예: 1, 18, 28~33...)
  generationLabel?: string; // 특별 호칭 (예: "시조(始祖)", "파조(派祖)")
  nameKr: string; // 성을 제외한 한글 이름 (예: "이식", "병철")
  nameHanja: string; // 성을 제외한 한자 이름 (예: "以式", "炳哲")
  branchRelation?: string; // 관계 표기 (예: "장남", "차남", "삼남", "1남", "1녀")
  title?: string; // 관직·시호·직책 등 간략 설명
  children?: FamilyNode[];
}

/** 
 * 임시 예시 종원 명단 데이터 (성씨 및 나이 제외)
 * 28세(永/영) -> 29세(勳/훈) -> 30세(炳/병, 熙/희) -> 31세(在/재) -> 32세(鍾/종) -> 33세(洙/수) 흐름 예시
 */
const INITIAL_TREE_DATA: FamilyNode = {
  id: "gen-1",
  generation: 1,
  generationLabel: "시조(始祖)",
  nameKr: "이식",
  nameHanja: "以式",
  title: "고구려 병마원수",
  children: [
    {
      id: "gen-pajo",
      generation: 18,
      generationLabel: "파조(派祖)",
      nameKr: "민첨",
      nameHanja: "民瞻",
      title: "무숙공(武肅公)",
      children: [
        {
          id: "gen-28-1",
          generation: 28,
          branchRelation: "상주 종중",
          nameKr: "대영",
          nameHanja: "大永",
          title: "전 종친회장",
          children: [
            // === [1] 장남(석훈) 계열 ===
            {
              id: "gen-29-1",
              generation: 29,
              branchRelation: "장남",
              nameKr: "석훈",
              nameHanja: "奭勳",
              title: "종중 고문",
              children: [
                {
                  id: "gen-30-1",
                  generation: 30,
                  branchRelation: "장남",
                  nameKr: "병철",
                  nameHanja: "炳哲",
                  title: "종친회장",
                  children: [
                    {
                      id: "gen-31-1",
                      generation: 31,
                      branchRelation: "장남",
                      nameKr: "민재",
                      nameHanja: "敏在",
                      children: [
                        {
                          id: "gen-32-1",
                          generation: 32,
                          branchRelation: "1남",
                          nameKr: "종훈",
                          nameHanja: "鍾勳",
                          children: [
                            { id: "gen-33-1", generation: 33, branchRelation: "1남", nameKr: "현수", nameHanja: "賢洙" },
                            { id: "gen-33-2", generation: 33, branchRelation: "1녀", nameKr: "지수", nameHanja: "智洙" },
                          ],
                        },
                        { id: "gen-32-2", generation: 32, branchRelation: "1녀", nameKr: "종아", nameHanja: "鍾雅" },
                        { id: "gen-32-3", generation: 32, branchRelation: "2남", nameKr: "종민", nameHanja: "鍾旻" },
                      ],
                    },
                    {
                      id: "gen-31-2",
                      generation: 31,
                      branchRelation: "차남",
                      nameKr: "현재",
                      nameHanja: "炫在",
                      children: [
                        { id: "gen-32-4", generation: 32, branchRelation: "1남", nameKr: "종석", nameHanja: "鍾碩" },
                        { id: "gen-32-5", generation: 32, branchRelation: "2남", nameKr: "종윤", nameHanja: "鍾允" },
                      ],
                    },
                    {
                      id: "gen-31-3",
                      generation: 31,
                      branchRelation: "삼남",
                      nameKr: "선재",
                      nameHanja: "善在",
                      children: [
                        { id: "gen-32-6", generation: 32, branchRelation: "1녀", nameKr: "종희", nameHanja: "鍾姬" },
                      ],
                    },
                  ],
                },
                {
                  id: "gen-30-2",
                  generation: 30,
                  branchRelation: "차남",
                  nameKr: "병호",
                  nameHanja: "炳浩",
                  title: "총무이사",
                  children: [
                    {
                      id: "gen-31-4",
                      generation: 31,
                      branchRelation: "장남",
                      nameKr: "영재",
                      nameHanja: "永在",
                      children: [
                        { id: "gen-32-7", generation: 32, branchRelation: "1남", nameKr: "종우", nameHanja: "鍾宇" },
                      ],
                    },
                    { id: "gen-31-5", generation: 31, branchRelation: "차남", nameKr: "성재", nameHanja: "成在" },
                  ],
                },
                {
                  id: "gen-30-3",
                  generation: 30,
                  branchRelation: "삼남",
                  nameKr: "병수",
                  nameHanja: "炳守",
                  children: [
                    { id: "gen-31-6", generation: 31, branchRelation: "1남", nameKr: "준재", nameHanja: "俊在" },
                  ],
                },
              ],
            },

            // === [2] 차남(보훈) 계열 ===
            {
              id: "gen-29-2",
              generation: 29,
              branchRelation: "차남",
              nameKr: "보훈",
              nameHanja: "輔勳",
              title: "전례위원",
              children: [
                {
                  id: "gen-30-4",
                  generation: 30,
                  branchRelation: "장남",
                  nameKr: "태희",
                  nameHanja: "泰熙",
                  children: [
                    {
                      id: "gen-31-7",
                      generation: 31,
                      branchRelation: "장남",
                      nameKr: "윤재",
                      nameHanja: "允在",
                      children: [
                        { id: "gen-32-8", generation: 32, branchRelation: "1남", nameKr: "종하", nameHanja: "鍾河" },
                      ],
                    },
                    { id: "gen-31-8", generation: 31, branchRelation: "차남", nameKr: "원재", nameHanja: "元在" },
                  ],
                },
                {
                  id: "gen-30-5",
                  generation: 30,
                  branchRelation: "차남",
                  nameKr: "건희",
                  nameHanja: "建熙",
                  children: [
                    { id: "gen-31-9", generation: 31, branchRelation: "1남", nameKr: "도재", nameHanja: "道在" },
                    { id: "gen-31-10", generation: 31, branchRelation: "1녀", nameKr: "은재", nameHanja: "恩在" },
                  ],
                },
              ],
            },

            // === [3] 삼남(정훈) 계열 ===
            {
              id: "gen-29-3",
              generation: 29,
              branchRelation: "삼남",
              nameKr: "정훈",
              nameHanja: "正勳",
              children: [
                {
                  id: "gen-30-6",
                  generation: 30,
                  branchRelation: "장남",
                  nameKr: "승희",
                  nameHanja: "承熙",
                  children: [
                    { id: "gen-31-11", generation: 31, branchRelation: "1남", nameKr: "우재", nameHanja: "宇在" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

/** 검색어가 포함된 노드 ID와 상위 부모 ID들을 찾는 함수 */
function findMatchingPaths(node: FamilyNode, query: string): { matchedIds: Set<string>; expandedIds: Set<string> } {
  const matchedIds = new Set<string>();
  const expandedIds = new Set<string>();
  const cleanQuery = query.trim();

  if (!cleanQuery) return { matchedIds, expandedIds };

  function traverse(current: FamilyNode, ancestors: string[]): boolean {
    const isMatch =
      current.nameKr.includes(cleanQuery) ||
      current.nameHanja.includes(cleanQuery) ||
      `${current.generation}세`.includes(cleanQuery) ||
      Boolean(current.generationLabel && current.generationLabel.includes(cleanQuery)) ||
      Boolean(current.title && current.title.includes(cleanQuery));

    let childMatched = false;
    if (current.children) {
      for (const child of current.children) {
        if (traverse(child, [...ancestors, current.id])) {
          childMatched = true;
        }
      }
    }

    if (isMatch) {
      matchedIds.add(current.id);
      ancestors.forEach((id) => expandedIds.add(id));
    }

    if (childMatched) {
      expandedIds.add(current.id);
    }

    return isMatch || childMatched;
  }

  traverse(node, []);
  return { matchedIds, expandedIds };
}

/** 모든 노드의 ID를 수집 (전체 펼치기용) */
function getAllNodeIds(node: FamilyNode): string[] {
  let ids = [node.id];
  if (node.children) {
    for (const c of node.children) {
      ids = ids.concat(getAllNodeIds(c));
    }
  }
  return ids;
}

/** 전체 인원수 계산 */
function countNodes(node: FamilyNode): number {
  let count = 1;
  if (node.children) {
    for (const c of node.children) {
      count += countNodes(c);
    }
  }
  return count;
}

function TreePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"accordion" | "diagram">("accordion");
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(getAllNodeIds(INITIAL_TREE_DATA)));

  const totalMembers = useMemo(() => countNodes(INITIAL_TREE_DATA), []);

  const { matchedIds, expandedIds } = useMemo(
    () => findMatchingPaths(INITIAL_TREE_DATA, searchQuery),
    [searchQuery],
  );

  const activeOpenIds = searchQuery.trim() ? expandedIds : openIds;

  const toggleNode = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => setOpenIds(new Set(getAllNodeIds(INITIAL_TREE_DATA)));
  const collapseModern = () => setOpenIds(new Set(["gen-1", "gen-pajo", "gen-28-1"]));

  return (
    <>
      {/* 상단 배너 영역 (직접 구현하여 외부 컴포넌트 의존성 충돌 방지) */}
      <section className="bg-ink text-paper border-b border-gold/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-[0.75rem] font-bold tracking-[0.25em] text-gold">GENEALOGY · VIEW TREE</p>
          <h1 className="mt-2 font-serif text-[2rem] font-bold sm:text-[2.6rem]">무숙공파 세보 가계도</h1>
          <p className="mt-3 max-w-2xl text-[0.95rem] text-paper/80">
            시조 강이식 장군과 파조 무숙공 이하 후손들의 세수(世數)와 휘(이름·한자)를 계보 트리로 한눈에 확인하실 수 있습니다.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="FAMILY TREE"
          title={`직계 · 방계 가계도 열람 (등재 예시 ${totalMembers}명)`}
          description="성을 제외한 이름과 한자, 세수 중심으로 간결하게 구성되었습니다. 모바일에서는 '세로 계단형', PC에서는 '전체 가계도'를 추천합니다."
          action={
            <Button asChild variant="outline">
              <Link to="/genealogy">
                <BookOpen className="size-4" /> 전자족보(상세 기록) 안내
              </Link>
            </Button>
          }
        />

        {/* 검색 및 뷰 전환 컨트롤 바 */}
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="이름(예: 병철, 종훈), 한자, 또는 세수(31세) 검색..."
              className="h-11 w-full rounded-lg border border-input bg-background pr-14 pl-10 text-sm focus:border-primary focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                초기화
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setViewMode("accordion")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                  viewMode === "accordion"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <ListTree className="size-3.5" /> 세로 계단형 (모바일 추천)
              </button>
              <button
                type="button"
                onClick={() => setViewMode("diagram")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                  viewMode === "diagram"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Network className="size-3.5" /> 전체 가계도 (가로 트리)
              </button>
            </div>

            {viewMode === "accordion" && !searchQuery && (
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={expandAll}
                  className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  전체 펼치기
                </button>
                <button
                  type="button"
                  onClick={collapseModern}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  <RotateCcw className="size-3" /> 29세 이하 접기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 검색 결과 안내 */}
        {searchQuery.trim() && (
          <div className="mt-4 flex items-center justify-between rounded-lg bg-gold-soft px-4 py-2.5 text-xs text-ink">
            <span>
              <strong>"{searchQuery}"</strong> 검색 결과 총 <strong>{matchedIds.size}명</strong>의 종원이 확인되었습니다.
            </span>
          </div>
        )}

        {/* 가계도 출력 영역 */}
        <div className="mt-8">
          {viewMode === "accordion" ? (
            <div className="hanji mx-auto max-w-4xl rounded-2xl border border-border p-4 shadow-card sm:p-8">
              <AccordionTreeItem
                node={INITIAL_TREE_DATA}
                openIds={activeOpenIds}
                matchedIds={matchedIds}
                onToggle={toggleNode}
              />
            </div>
          ) : (
            <div className="hanji overflow-x-auto rounded-2xl border border-border p-8 shadow-card">
              <div className="mx-auto w-max">
                <DiagramBranch node={INITIAL_TREE_DATA} matchedIds={matchedIds} />
              </div>
              <p className="mt-6 text-center text-xs text-muted-foreground">
                💡 가계도가 화면보다 넓을 경우 박스 내부를 좌우로 스크롤하여 전체 형제·후손 가지를 확인하실 수 있습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/** 1. 세로 계단식(아코디언) 트리 아이템 */
function AccordionTreeItem({
  node,
  openIds,
  matchedIds,
  onToggle,
}: {
  node: FamilyNode;
  openIds: Set<string>;
  matchedIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isOpen = openIds.has(node.id);
  const isMatched = matchedIds.has(node.id);
  const isFounder = node.generation <= 18;

  return (
    <div className="relative">
      <div
        className={cn(
          "group relative flex items-center justify-between gap-3 rounded-xl border p-3.5 sm:p-4 transition-all",
          isFounder
            ? "border-gold/60 bg-ink text-paper"
            : "border-border bg-card text-foreground hover:border-gold/50",
          isMatched && "border-primary bg-accent/20 ring-2 ring-primary",
        )}
      >
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-bold",
              isFounder ? "bg-gold text-gold-foreground" : "border border-border bg-secondary text-secondary-foreground",
            )}
          >
            {node.generationLabel ? `${node.generationLabel} · ${node.generation}세` : `${node.generation}세`}
          </span>

          {node.branchRelation && (
            <span className="inline-flex shrink-0 items-center rounded-sm bg-primary/10 px-2 py-0.5 text-[0.7rem] font-semibold text-primary">
              {node.branchRelation}
            </span>
          )}

          {/* 성을 제외한 이름 + 한자 */}
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg font-bold tracking-wide">{node.nameKr}</span>
            <span className={cn("font-serif text-sm", isFounder ? "text-paper/80" : "text-muted-foreground")}>
              ({node.nameHanja})
            </span>
          </div>

          {node.title && (
            <span className={cn("text-xs", isFounder ? "text-gold" : "text-muted-foreground")}>
              · {node.title}
            </span>
          )}
        </div>

        {hasChildren && (
          <button
            type="button"
            onClick={() => onToggle(node.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors",
              isFounder
                ? "bg-paper/10 text-paper hover:bg-paper/20"
                : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Users className="size-3.5" />
            <span>자손 {node.children!.length}</span>
            {isOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="relative mt-2.5 ml-3.5 space-y-2.5 border-l-2 border-gold/40 pl-3.5 sm:ml-6 sm:pl-5">
          {node.children!.map((child) => (
            <AccordionTreeItem
              key={child.id}
              node={child}
              openIds={openIds}
              matchedIds={matchedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** 2. 가로 가지형 트리 다이어그램 */
function DiagramBranch({ node, matchedIds }: { node: FamilyNode; matchedIds: Set<string> }) {
  const isMatched = matchedIds.has(node.id);
  const isFounder = node.generation <= 18;

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-36 rounded-lg border px-2.5 py-2.5 text-center shadow-card transition-all",
          isFounder ? "border-gold bg-ink text-paper" : "border-gold/50 bg-card text-foreground",
          isMatched && "border-primary ring-2 ring-primary",
        )}
      >
        <p className="text-[0.65rem] font-bold text-gold">
          {node.generationLabel || `${node.generation}세`}
          {node.branchRelation ? ` · ${node.branchRelation}` : ""}
        </p>
        <p className="mt-0.5 font-serif text-[1.05rem] font-bold">{node.nameKr}</p>
        <p className={cn("font-serif text-[0.75rem]", isFounder ? "text-paper/80" : "text-muted-foreground")}>
          ({node.nameHanja})
        </p>
        {node.title ? (
          <p className={cn("mt-0.5 text-[0.65rem]", isFounder ? "text-gold" : "text-muted-foreground")}>{node.title}</p>
        ) : null}
      </div>

      {node.children && node.children.length > 0 ? (
        <>
          <span className="h-6 w-px bg-gold" aria-hidden />
          <ul className="flex">
            {node.children.map((c) => (
              <li
                key={c.id}
                className={cn(
                  "relative px-1.5 pt-6",
                  "before:absolute before:top-0 before:right-1/2 before:h-6 before:w-1/2 before:border-t before:border-gold",
                  "after:absolute after:top-0 after:left-1/2 after:h-6 after:w-1/2 after:border-t after:border-l after:border-gold",
                  "first:before:border-t-0 last:after:border-t-0",
                )}
              >
                <DiagramBranch node={c} matchedIds={matchedIds} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}