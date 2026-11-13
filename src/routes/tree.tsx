import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ChevronDown, ChevronRight, Network, ListTree, RotateCcw, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
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
  generation: number; // 세수 (예: 1, 18, 30, 31...)
  generationLabel?: string; // 특별 호칭 (예: "시조(始祖)", "파조(派祖)")
  nameKr: string; // 성을 제외한 한글 이름 (예: "이식", "병철")
  nameHanja: string; // 성을 제외한 한자 이름 (예: "以式", "炳哲")
  branchRelation?: string; // 관계 표기 (예: "장남", "차남", "삼남", "1남", "1녀")
  title?: string; // 관직·시호 등 간략 설명
  children?: FamilyNode[];
}

/** 가계도 데이터 (성을 뺀 이름 + 한자, 나이 제외) */
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
          id: "gen-29-1",
          generation: 29,
          branchRelation: "문중 대표계열",
          nameKr: "석훈",
          nameHanja: "奭勳",
          children: [
            {
              id: "gen-30-1",
              generation: 30,
              branchRelation: "장남",
              nameKr: "병철",
              nameHanja: "炳哲",
              children: [
                {
                  id: "gen-31-1",
                  generation: 31,
                  branchRelation: "장남",
                  nameKr: "민재",
                  nameHanja: "敏在",
                  children: [
                    { id: "gen-32-1", generation: 32, branchRelation: "1남", nameKr: "종훈", nameHanja: "鍾勳" },
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
                  ],
                },
                {
                  id: "gen-31-3",
                  generation: 31,
                  branchRelation: "삼남",
                  nameKr: "선재",
                  nameHanja: "善在",
                },
              ],
            },
            {
              id: "gen-30-2",
              generation: 30,
              branchRelation: "차남",
              nameKr: "병호",
              nameHanja: "炳浩",
              children: [
                { id: "gen-31-4", generation: 31, branchRelation: "장남", nameKr: "영재", nameHanja: "永在" },
                { id: "gen-31-5", generation: 31, branchRelation: "차남", nameKr: "성재", nameHanja: "成在" },
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
      (current.generationLabel && current.generationLabel.includes(cleanQuery));

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

function TreePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"accordion" | "diagram">("accordion");
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(getAllNodeIds(INITIAL_TREE_DATA)));

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
  const collapseModern = () => setOpenIds(new Set(["gen-1", "gen-pajo", "gen-29-1"]));

  return (
    <>
      <PageHero eyebrow="GENEALOGY · VIEW TREE" title="무숙공파 세보 가계도">
        시조 강이식 장군과 파조 무숙공 이하 후손들의 세수(世數)와 휘(이름·한자)를 계보 트리로 한눈에 확인하실 수 있습니다.
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="FAMILY TREE"
          title="직계 · 방계 가계도 열람"
          description="모바일에서는 '세로 계단형'으로, PC나 넓은 화면에서는 '전체 가계도(가로형)'로 전환하여 편리하게 보실 수 있습니다."
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
              placeholder="이름(예: 병철, 민재), 한자, 또는 세수(31세) 검색..."
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
                    ? "bg-primary text-primary-foreground shadow-xs"
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
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Network className="size-3.5" /> 전체 가계도 (가로 트리)
              </button>
            </div>

            {viewMode === "accordion" && !searchQuery && (
              <div className="flex gap-1.5">
                <Button variant="outline" size="sm" onClick={expandAll} className="text-xs">
                  전체 펼치기
                </Button>
                <Button variant="outline" size="sm" onClick={collapseModern} className="text-xs">
                  <RotateCcw className="mr-1 size-3" /> 기본 접기
                </Button>
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