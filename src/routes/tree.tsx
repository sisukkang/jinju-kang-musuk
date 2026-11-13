import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";
import { CLAN } from "@/lib/site-config";

export const Route = createFileRoute("/tree")({
  head: () => ({
    meta: [
      { title: `세보 가계도 (VIEW TREE) | ${CLAN.name}` },
      { name: "description", content: `${CLAN.name} 시조 및 파조 이하 세보 가계도 시각화` },
    ],
  }),
  component: TreePage,
});

interface FamilyNode {
  id: string;
  generation: number;
  generationLabel?: string;
  nameKr: string;
  nameHanja: string;
  branchRelation?: string;
  title?: string;
  children?: FamilyNode[];
}

/** 예시 종원 명단 (성씨 및 나이 제외, 이름과 한자 중심) */
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

function collectAllIds(node: FamilyNode): string[] {
  const result: string[] = [node.id];
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      const childIds = collectAllIds(node.children[i]);
      for (let j = 0; j < childIds.length; j++) {
        result.push(childIds[j]);
      }
    }
  }
  return result;
}

const ALL_NODE_IDS = collectAllIds(INITIAL_TREE_DATA);

function findMatches(node: FamilyNode, query: string): { matched: string[]; expanded: string[] } {
  const matched: string[] = [];
  const expanded: string[] = [];
  const q = query.trim();
  if (!q) return { matched, expanded };

  function walk(curr: FamilyNode, parents: string[]): boolean {
    const isHit =
      curr.nameKr.includes(q) ||
      curr.nameHanja.includes(q) ||
      `${curr.generation}세`.includes(q) ||
      Boolean(curr.generationLabel && curr.generationLabel.includes(q)) ||
      Boolean(curr.title && curr.title.includes(q));

    let childHit = false;
    if (curr.children) {
      for (let i = 0; i < curr.children.length; i++) {
        if (walk(curr.children[i], [...parents, curr.id])) {
          childHit = true;
        }
      }
    }

    if (isHit) {
      matched.push(curr.id);
      for (let i = 0; i < parents.length; i++) {
        if (!expanded.includes(parents[i])) expanded.push(parents[i]);
      }
    }
    if (childHit && !expanded.includes(curr.id)) {
      expanded.push(curr.id);
    }
    return isHit || childHit;
  }

  walk(node, []);
  return { matched, expanded };
}

function AccordionItem({
  node,
  openIds,
  matchedIds,
  onToggle,
}: {
  node: FamilyNode;
  openIds: string[];
  matchedIds: string[];
  onToggle: (id: string) => void;
}) {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isOpen = openIds.includes(node.id);
  const isMatched = matchedIds.includes(node.id);
  const isFounder = node.generation <= 18;

  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-xl border p-3.5 sm:p-4 transition-all",
          isFounder ? "border-gold/60 bg-ink text-paper" : "border-border bg-card text-foreground",
          isMatched && "border-primary ring-2 ring-primary",
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

          {node.branchRelation ? (
            <span className="inline-flex shrink-0 items-center rounded-sm bg-primary/10 px-2 py-0.5 text-[0.7rem] font-semibold text-primary">
              {node.branchRelation}
            </span>
          ) : null}

          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-lg font-bold tracking-wide">{node.nameKr}</span>
            <span className={cn("font-serif text-sm", isFounder ? "text-paper/80" : "text-muted-foreground")}>
              ({node.nameHanja})
            </span>
          </div>

          {node.title ? (
            <span className={cn("text-xs", isFounder ? "text-gold" : "text-muted-foreground")}>· {node.title}</span>
          ) : null}
        </div>

        {hasChildren ? (
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
            <span>자손 {node.children!.length}명 {isOpen ? "▲" : "▼"}</span>
          </button>
        ) : null}
      </div>

      {hasChildren && isOpen ? (
        <div className="relative mt-2.5 ml-3.5 space-y-2.5 border-l-2 border-gold/40 pl-3.5 sm:ml-6 sm:pl-5">
          {node.children!.map((child) => (
            <AccordionItem
              key={child.id}
              node={child}
              openIds={openIds}
              matchedIds={matchedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function DiagramBranch({ node, matchedIds }: { node: FamilyNode; matchedIds: string[] }) {
  const isMatched = matchedIds.includes(node.id);
  const isFounder = node.generation <= 18;

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-36 rounded-lg border px-2.5 py-2.5 text-center shadow-card",
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

function TreePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"accordion" | "diagram">("accordion");
  const [openIds, setOpenIds] = useState<string[]>(ALL_NODE_IDS);

  const { matched, expanded } = findMatches(INITIAL_TREE_DATA, searchQuery);
  const activeOpenIds = searchQuery.trim() ? expanded : openIds;

  const toggleNode = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <>
      <PageHero eyebrow="GENEALOGY · VIEW TREE" title="무숙공파 세보 가계도">
        시조 강이식 장군과 파조 무숙공 이하 후손들의 세수(世數)와 휘(이름·한자)를 계보 트리로 한눈에 확인하실 수 있습니다.
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="FAMILY TREE"
          title={`직계 · 방계 가계도 열람 (등재 예시 ${ALL_NODE_IDS.length}명)`}
          description="성을 제외한 이름과 한자, 세수 중심으로 간결하게 구성되었습니다. 모바일에서는 '세로 계단형', PC에서는 '전체 가계도'를 추천합니다."
          action={
            <Button asChild variant="outline" size="xl">
              <Link to="/genealogy">전자족보 안내 보기</Link>
            </Button>
          }
        />

        {/* 컨트롤 바 */}
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="이름(예: 병철, 종훈), 한자, 또는 세수(31세) 검색..."
              className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:border-primary focus:outline-none"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                초기화
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1">
              <button
                type="button"
                onClick={() => setViewMode("accordion")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                  viewMode === "accordion" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                세로 계단형 (모바일 추천)
              </button>
              <button
                type="button"
                onClick={() => setViewMode("diagram")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                  viewMode === "diagram" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                전체 가계도 (가로 트리)
              </button>
            </div>

            {viewMode === "accordion" && !searchQuery ? (
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setOpenIds(ALL_NODE_IDS)}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                >
                  전체 펼치기
                </button>
                <button
                  type="button"
                  onClick={() => setOpenIds(["gen-1", "gen-pajo", "gen-28-1"])}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                >
                  29세 이하 접기
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {searchQuery.trim() ? (
          <div className="mt-4 rounded-lg bg-gold-soft px-4 py-2.5 text-xs text-ink">
            <strong>"{searchQuery}"</strong> 검색 결과 총 <strong>{matched.length}명</strong>의 종원이 확인되었습니다.
          </div>
        ) : null}

        <div className="mt-8">
          {viewMode === "accordion" ? (
            <div className="hanji mx-auto max-w-4xl rounded-2xl border border-border p-4 shadow-card sm:p-8">
              <AccordionItem
                node={INITIAL_TREE_DATA}
                openIds={activeOpenIds}
                matchedIds={matched}
                onToggle={toggleNode}
              />
            </div>
          ) : (
            <div className="hanji overflow-x-auto rounded-2xl border border-border p-8 shadow-card">
              <div className="mx-auto w-max">
                <DiagramBranch node={INITIAL_TREE_DATA} matchedIds={matched} />
              </div>
            </div>
          )}
        </div>

        <Link to="/" className="mt-10 inline-flex items-center gap-1 font-semibold text-primary hover:underline">
          <ArrowLeft className="size-4" /> 홈으로 돌아가기
        </Link>
      </div>
    </>
  );
}