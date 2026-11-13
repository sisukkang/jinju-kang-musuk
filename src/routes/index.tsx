import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Search, Newspaper, Landmark, HandHeart, Trees, Swords } from "lucide-react";
import heroImg from "@/assets/hero-jaesil.jpg";
import portrait from "@/assets/founder/founder-portrait.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { HangryeolFinder } from "@/components/site/HangryeolFinder";
import { LatestNotices } from "@/components/site/NoticeList";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { EventVote } from "@/components/site/EventVote";
import { CLAN } from "@/lib/site-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${CLAN.name} | 숭조돈목의 뜻을 잇는 종친 공동체` },
      { name: "description", content: `${CLAN.name} — 나의 항렬·세수 찾기, 선영 봉안당 안내, 종친 소식, 대제 참석 신청` },
      { property: "og:title", content: `${CLAN.name}` },
      { property: "og:description", content: "숭조돈목의 정신을 잇는 진주강씨 무숙공파 종친회 공식 홈페이지" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PILLARS = [
  {
    icon: Landmark,
    title: "숭조(崇祖)",
    text: "시조 강이식 장군과 파조 무숙공 이하 선대 조상의 묘역·재실을 수호하고 춘추 제향을 봉행합니다.",
  },
  {
    icon: HandHeart,
    title: "돈목(敦睦)",
    text: "종원 간 친목과 화합을 다지며, 애경사를 함께 나누는 상부상조의 전통을 이어갑니다.",
  },
  {
    icon: Trees,
    title: "선영 봉안(奉安)",
    text: "후손들이 선조님의 품에서 편안히 영면할 수 있도록 문중 전용 봉안당(납골당)을 조성·운영합니다.",
  },
];

function Index() {
  return (
    <>
      {/* 히어로 */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="종친회 재실 춘향재(春鄕齋) 전경"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto flex min-h-[72svh] max-w-7xl flex-col justify-end px-4 pt-28 pb-12 sm:min-h-[78vh] sm:justify-center sm:px-6 sm:py-20">
          <p className="animate-rise mb-4 flex items-center gap-3 text-[0.8rem] font-bold tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold" /> {CLAN.name}
          </p>
          <h1 className="animate-rise max-w-3xl text-[2.1rem] leading-[1.25] font-black text-paper sm:text-[3.2rem]">
            {CLAN.slogan}
          </h1>
          <p className="animate-rise mt-5 max-w-xl text-[1.05rem] text-paper/85 [animation-delay:120ms]">
            {CLAN.subSlogan}
          </p>
          <div className="animate-rise mt-8 grid max-w-3xl grid-cols-1 gap-2.5 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap sm:gap-3 [animation-delay:220ms]">
            <Button asChild size="xl" variant="seal">
              <a href="#hangryeol">
                <Search /> 나의 항렬 찾기
              </a>
            </Button>
            <Button asChild size="xl" variant="paper">
              <a href="#event">
                <CalendarCheck /> 춘계 대제 참석 신청
              </a>
            </Button>
            <Button asChild size="xl" variant="onImage">
              <Link to="/news">
                <Newspaper /> 종친 소식
              </Link>
            </Button>
            <Button asChild size="xl" variant="onImage">
              <Link to="/about">
                <Swords /> 종친회·시조 소개
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 소개 (숭조·돈목·선영봉안) */}
      <section className="hanji border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-card text-primary">
                <p.icon className="size-6" />
              </span>
              <div>
                <h2 className="text-[1.2rem] font-bold">{p.title}</h2>
                <p className="mt-1 text-[0.9rem] text-muted-foreground">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto flex flex-wrap gap-6 max-w-7xl px-4 pb-10 sm:px-6">
          <Link to="/about" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            종친회 및 시조 소개 자세히 보기 <ArrowRight className="size-4" />
          </Link>
          <a href="/about#memorial" className="inline-flex items-center gap-1 font-semibold text-gold hover:underline">
            문중 봉안당(납골당) 이용 안내 <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* 시조 */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-[auto_1fr]">
          <img
            src={portrait.url}
            alt="시조 강이식 장군 영정"
            width={332}
            height={576}
            loading="lazy"
            className="mx-auto h-64 w-auto rounded-md border-2 border-gold/60 object-cover sm:h-80"
          />
          <div>
            <p className="text-[0.75rem] font-bold tracking-[0.25em] text-gold">始祖 · 派祖</p>
            <h2 className="mt-2 text-[1.8rem] font-bold sm:text-[2.2rem]">고구려 병마원수 강이식(姜以式) 장군</h2>
            <blockquote className="mt-5 border-l-4 border-primary pl-4 font-serif text-[1.15rem] leading-relaxed sm:text-[1.3rem]">
              “오만무례한 국서는 붓으로 답할 것이 아니라 칼로 답해야 한다.”
            </blockquote>
            <p className="mt-4 text-paper/80">
              598년 임유관에서 수나라 30만 대군을 물리친 고구려의 명장이자 우리 진주강씨의 시조이시며, 무숙공파는
              선조님의 충절과 숭조돈목의 가풍을 대대로 이어오고 있습니다.
            </p>
            <Button asChild variant="gold" size="xl" className="mt-6">
              <Link to="/about">
                시조 및 무숙공파 이야기 보기 <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 항렬 찾기 */}
      <section id="hangryeol" className="scroll-mt-48">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="行列 · 世數"
            title="나의 항렬 및 세(世)수 찾기"
            description="출생연도, 이름 속 돌림자, 아버지의 세수 중 아시는 것 하나만 입력하세요. (28세~35세 샘플 데이터)"
            action={
              <Button asChild variant="outline">
                <Link to="/hangryeol">
                  전체 항렬표 보기 <ArrowRight />
                </Link>
              </Button>
            }
          />
          <HangryeolFinder />
        </div>
      </section>

      {/* 공지 + 갤러리 */}
      <section className="hanji border-y border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="NOTICE"
              title="최신 공지사항"
              action={
                <Link to="/news" className="inline-flex items-center gap-1 text-[0.85rem] font-semibold text-primary">
                  전체 보기 <ArrowRight className="size-4" />
                </Link>
              }
            />
            <LatestNotices limit={4} />
          </div>
          <div>
            <SectionHeading
              eyebrow="GALLERY"
              title="활동 갤러리"
              action={
                <Link to="/news" className="inline-flex items-center gap-1 text-[0.85rem] font-semibold text-primary">
                  더 보기 <ArrowRight className="size-4" />
                </Link>
              }
            />
            <GalleryGrid limit={4} compact />
          </div>
        </div>
      </section>

      {/* 행사 */}
      <section id="event" className="scroll-mt-48">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="EVENT"
            title="다가오는 행사"
            description="참석 여부를 미리 알려주시면 제수와 음복 준비에 큰 도움이 됩니다."
          />
          <EventVote />
        </div>
      </section>
    </>
  );
}