import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ShieldCheck, CheckCircle2, Circle, ArrowLeft, ListTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";
import { CLAN } from "@/lib/site-config";

export const Route = createFileRoute("/genealogy")({
  head: () => ({
    meta: [
      { title: `전자족보 (3단계 오픈 예정) | ${CLAN.name}` },
      { name: "description", content: "종원 인증 후 열람 가능한 전자족보 상세 기록 및 족보책 열람 서비스 미리보기" },
      { property: "og:title", content: `전자족보 미리보기 | ${CLAN.name}` },
      { property: "og:description", content: "종원 인증 후 열람 가능한 전자족보(3단계 오픈 예정)" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GenealogyPage,
});

interface TreeNode {
  name: string;
  hanja?: string;
  generation: number;
  note?: string;
  locked?: boolean;
  children?: TreeNode[];
}

const TREE: TreeNode = {
  name: "병철",
  hanja: "炳哲",
  generation: 30,
  note: "29대손",
  children: [
    {
      name: "민재",
      hanja: "敏在",
      generation: 31,
      note: "장남",
      children: [
        {
          name: "종훈",
          hanja: "鍾勳",
          generation: 32,
          note: "1남",
          children: [{ name: "비공개", generation: 33, locked: true }],
        },
        { name: "종아", hanja: "鍾雅", generation: 32, note: "1녀" },
      ],
    },
    {
      name: "현재",
      hanja: "炫在",
      generation: 31,
      note: "차남",
      children: [
        {
          name: "종석",
          hanja: "鍾碩",
          generation: 32,
          note: "1남",
          children: [
            { name: "비공개", generation: 33, locked: true },
            { name: "비공개", generation: 33, locked: true },
          ],
        },
      ],
    },
  ],
};

function NodeCard({ node }: { node: TreeNode }) {
  if (node.locked) {
    return (
      <div className="relative w-36 rounded-lg border border-dashed border-input bg-muted px-3 py-3 text-center">
        <div className="pointer-events-none blur-[3px] select-none" aria-hidden>
          <p className="text-[0.7rem] text-muted-foreground">{node.generation}세</p>
          <p className="font-serif font-bold">OO</p>
          <p className="text-[0.7rem]">漢字</p>
        </div>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[0.65rem] font-bold text-paper">
            <Lock className="size-3" /> 종원 인증
          </span>
        </span>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "w-36 rounded-lg border bg-card px-3 py-3 text-center shadow-card",
        node.generation === 30 ? "border-primary ring-2 ring-primary/20" : "border-gold/50",
      )}
    >
      <p className="text-[0.7rem] font-bold text-gold">
        {node.generation}세{node.note ? ` · ${node.note}` : ""}
      </p>
      <p className="mt-0.5 font-serif text-[1.05rem] font-bold">{node.name}</p>
      {node.hanja ? <p className="font-serif text-[0.8rem] text-muted-foreground">({node.hanja})</p> : null}
    </div>
  );
}

function Branch({ node }: { node: TreeNode }) {
  return (
    <div className="flex flex-col items-center">
      <NodeCard node={node} />
      {node.children && node.children.length > 0 ? (
        <>
          <span className="h-6 w-px bg-gold" aria-hidden />
          <ul className="flex">
            {node.children.map((c, i) => (
              <li
                key={`${c.name}-${i}`}
                className={cn(
                  "relative px-2 pt-6",
                  "before:absolute before:top-0 before:right-1/2 before:h-6 before:w-1/2 before:border-t before:border-gold",
                  "after:absolute after:top-0 after:left-1/2 after:h-6 after:w-1/2 after:border-t after:border-l after:border-gold",
                  "first:before:border-t-0 last:after:border-t-0",
                )}
              >
                <Branch node={c} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

const ROADMAP = [
  { step: "1단계", title: "종친회 홈페이지 · 가계도", items: "소개 · 항렬 찾기 · 세보 가계도 · 소식/갤러리", status: "done" as const },
  { step: "2단계", title: "종원 회원 · 관리자 페이지", items: "종원 가입/인증 · 공지 작성 · 참석자 명단 관리", status: "doing" as const },
  { step: "3단계", title: "전자족보 (족보책 원문·수단)", items: "인증 종원 상세 세보록 열람 · 행적 조회 · 수단(收單) 접수", status: "next" as const },
];

function GenealogyPage() {
  return (
    <>
      <PageHero eyebrow="E-JOKBO · 3단계 오픈 예정" title="전자족보 (세보록·원문 열람)">
        상세 행적과 배위·묘소 기록, 족보책 영인본을 열람할 수 있는 전자족보는 <strong>3단계에 오픈 예정</strong>입니다.
        직계·방계 계보 흐름은 현재 운영 중인 <strong>세보 가계도</strong>에서 바로 확인하실 수 있습니다.
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-14 sm:px-6">
        <section>
          <SectionHeading
            eyebrow="PREVIEW"
            title="종원 인증형 상세 계보 미리보기"
            description="개인정보 보호를 위해 상세 족보 기록과 하위 세대는 종원 인증 후에만 공개됩니다."
            action={
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="xl">
                  <Link to="/tree">
                    <ListTree /> 세보 가계도(VIEW TREE) 보러가기
                  </Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="seal" size="xl">
                      <ShieldCheck /> 종원 인증하고 열람하기
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-xl">3단계 오픈 예정 서비스입니다</DialogTitle>
                      <DialogDescription className="text-base leading-relaxed">
                        전자족보는 휴대폰 본인확인과 종친회 사무국의 종원 확인을 거친 분께만 열람 권한이 부여됩니다.
                        오픈 시 공지사항과 문자로 안내해 드리겠습니다.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button size="xl">확인</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            }
          />
          <div className="hanji overflow-x-auto rounded-2xl border border-border p-8">
            <div className="mx-auto w-max">
              <Branch node={TREE} />
            </div>
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="ROADMAP" title="구축 단계" />
          <ol className="grid gap-4 md:grid-cols-3">
            {ROADMAP.map((r) => (
              <li
                key={r.step}
                className={cn(
                  "rounded-xl border bg-card p-6 shadow-card",
                  r.status === "next" ? "border-primary" : "border-border",
                )}
              >
                <p className="flex items-center gap-2 text-[0.8rem] font-bold text-gold">
                  {r.status === "done" ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
                  {r.step}
                  {r.status === "next" ? (
                    <span className="rounded-sm bg-primary px-1.5 py-0.5 text-[0.65rem] text-primary-foreground">오픈 예정</span>
                  ) : null}
                  {r.status === "doing" ? (
                    <span className="rounded-sm bg-gold-soft px-1.5 py-0.5 text-[0.65rem] text-gold">체험 가능</span>
                  ) : null}
                </p>
                <h3 className="mt-2 text-[1.25rem] font-bold">{r.title}</h3>
                <p className="mt-1 text-[0.85rem] text-muted-foreground">{r.items}</p>
              </li>
            ))}
          </ol>
          <Link to="/" className="mt-8 inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            <ArrowLeft className="size-4" /> 홈으로 돌아가기
          </Link>
        </section>
      </div>
    </>
  );
}