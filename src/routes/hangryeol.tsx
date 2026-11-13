import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { HangryeolFinder } from "@/components/site/HangryeolFinder";
import { CLAN } from "@/lib/site-config";

export const Route = createFileRoute("/hangryeol")({
  head: () => ({
    meta: [
      { title: `항렬 찾기 | ${CLAN.name}` },
      { name: "description", content: "출생연도·이름 돌림자·아버지 세수로 나의 세수, 대손, 한자 항렬자를 찾아보세요." },
      { property: "og:title", content: `나의 항렬 및 세수 찾기 | ${CLAN.name}` },
      { property: "og:description", content: "세수·대손·한자 항렬자와 부모·자녀 항렬을 한 번에 확인합니다." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HangryeolPage,
});

function HangryeolPage() {
  return (
    <>
      <PageHero eyebrow="行列 · 世數" title="나의 항렬 및 세(世)수 찾기">
        항렬(行列)은 같은 세대임을 나타내기 위해 이름에 넣는 돌림자입니다. 아래 표는 오행 상생(水→木→火→土→金)
        순서로 정한 <strong>시연용 샘플</strong>이며, 실제 족보 기준으로 교체할 수 있습니다.
      </PageHero>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <HangryeolFinder showFullTable />
      </div>
    </>
  );
}
