import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { NoticeList } from "@/components/site/NoticeList";
import { EventVote } from "@/components/site/EventVote";
import { CLAN } from "@/lib/site-config";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: `공지사항 | ${CLAN.name}` },
      { name: "description", content: `${CLAN.name}의 공지사항, 제향 및 종중 행사 일정을 안내합니다.` },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <>
      <PageHero eyebrow="NOTICE & EVENTS" title="공지사항 및 행사 안내">
        종친회의 주요 공지사항과 춘추 제향·정기총회 등 행사 일정을 전해 드립니다.
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-20 px-4 py-14 sm:px-6">
        <section>
          <SectionHeading
            eyebrow="NOTICE"
            title="종친회 공지사항"
            description="문중 소식, 대제 안내, 봉안당 이용 안내 등 주요 공지사항을 확인하실 수 있습니다."
          />
          <NoticeList />
        </section>

        <div className="gold-rule" />

        <section id="event" className="scroll-mt-24">
          <SectionHeading
            eyebrow="UPCOMING EVENT"
            title="다가오는 행사 및 참석 신청"
            description="참석 여부를 미리 남겨주시면 제수와 음복 준비에 큰 도움이 됩니다."
          />
          <EventVote />
        </section>
      </div>
    </>
  );
}