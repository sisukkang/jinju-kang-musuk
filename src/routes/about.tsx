import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, CalendarDays, BookOpen, ArrowRight, Landmark, PhoneCall, CheckCircle2 } from "lucide-react";
import portrait from "@/assets/founder/founder-portrait.jpg.asset.json";
import bongsansa from "@/assets/founder/bongsansa-view.jpg.asset.json";
import monument from "@/assets/founder/bongsansa-monument.jpg.asset.json";
import graveImg from "@/assets/gallery-grave.jpg";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useDemoStore } from "@/lib/demo-store";
import { CLAN } from "@/lib/site-config";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `종친회 소개 | ${CLAN.name}` },
      {
        name: "description",
        content: `${CLAN.name}의 인사말, 시조 강이식 장군 및 무숙공파 소개, 봉산사, 선영 봉안당 안내를 제공합니다.`,
      },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  {
    year: "597년",
    title: "주전론(主戰論) 제창",
    text: "수 문제가 고구려에 무례한 국서를 보내오자 “붓이 아니라 칼로 답해야 한다”며 맞서 싸울 것을 주장하였습니다.",
  },
  {
    year: "598년",
    title: "임유관 대첩",
    text: "병마원수로 정병 5만을 이끌고 요서로 나아갔습니다. 수나라 수군의 군량선을 격파하고 성을 굳게 지켜, 굶주림과 장마로 지친 30만 대군을 총공격으로 물리쳤습니다.",
  },
  {
    year: "612년",
    title: "살수대첩 (문중 전승)",
    text: "수 양제의 대군이 다시 쳐들어왔을 때 을지문덕 장군과 함께 수나라 군을 크게 물리쳤다고 문중에 전해집니다.",
  },
];

const SHRINE_HISTORY = [
  { year: "950", text: "고려 광종 때 장군의 충절을 기려 봉산사를 세우고 한식날 제사를 모시게 하였다고 전함" },
  { year: "1570", text: "조선 선조 때 사당 중건 — 임진왜란 때 소실" },
  { year: "1716", text: "숙종 42년 다시 중건 — 1802년 진주 대화재로 소실" },
  { year: "1976", text: "후손들의 정성으로 오늘의 봉산사 재건" },
];

function AboutPage() {
  const { clanInfo, aboutContent, history, org } = useDemoStore();

  return (
    <>
      <PageHero eyebrow="ABOUT US" title="종친회 및 시조 소개">
        {clanInfo.subSlogan}
      </PageHero>

      {/* 상단 빠른 이동 앵커 바 */}
      <nav
        aria-label="페이지 내 섹션 이동"
        className="sticky top-0 z-20 border-b border-border bg-paper/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-3 sm:px-6">
          <a
            href="#greeting"
            className="rounded-full border border-border bg-card px-4 py-1.5 text-[0.9rem] font-bold hover:border-primary hover:text-primary"
          >
            회장 인사말
          </a>
          <a
            href="#founder"
            className="rounded-full border border-border bg-card px-4 py-1.5 text-[0.9rem] font-bold hover:border-primary hover:text-primary"
          >
            시조·무숙공 소개
          </a>
          <a
            href="#bongsansa"
            className="rounded-full border border-border bg-card px-4 py-1.5 text-[0.9rem] font-bold hover:border-primary hover:text-primary"
          >
            봉산사 안내
          </a>
          <a
            href="#memorial"
            className="rounded-full border border-border bg-card px-4 py-1.5 text-[0.9rem] font-bold hover:border-primary hover:text-primary"
          >
            선영·봉안당 안내
          </a>
          <a
            href="#history"
            className="rounded-full border border-border bg-card px-4 py-1.5 text-[0.9rem] font-bold hover:border-primary hover:text-primary"
          >
            종친회 연혁·임원
          </a>
        </div>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-20 px-4 py-14 sm:px-6">
        {/* 1. 회장 인사말 (CMS 연동) */}
        <section id="greeting" className="scroll-mt-24 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl bg-ink p-8 text-paper">
            <p className="font-serif text-[3.5rem] leading-none font-black text-gold">“</p>
            <p className="font-serif text-[1.4rem] leading-relaxed font-bold">
              {aboutContent.presidentQuote}
            </p>
            <p className="mt-6 text-[0.85rem] text-paper/70">{aboutContent.presidentName}</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-[1.7rem] font-bold">회장 인사말</h2>
            <p>{aboutContent.greetingParagraph1}</p>
            <p>{aboutContent.greetingParagraph2}</p>
          </div>
        </section>

        <div className="gold-rule" />

        {/* 2. 시조 강이식 장군 & 무숙공파 소개 */}
        <section id="founder" className="scroll-mt-24 space-y-14">
          <SectionHeading
            eyebrow="FOUNDER & LINEAGE"
            title="시조 강이식 장군과 무숙공파"
            description="진주강씨의 뿌리이신 시조 병마원수 강이식 장군과 무숙공파의 유래를 소개합니다."
          />

          <div className="relative overflow-hidden rounded-2xl bg-ink text-paper shadow-float">
            <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_70%_40%,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_60%)] md:block" />
            <div className="relative grid items-center gap-10 p-6 sm:p-10 md:grid-cols-[1.2fr_1fr]">
              <div className="order-2 md:order-1">
                <p className="text-[0.75rem] font-bold tracking-[0.25em] text-gold">始祖 · 晉州姜氏</p>
                <h3 className="mt-3 text-[2rem] leading-tight font-black sm:text-[2.6rem]">
                  시조 강이식 장군
                  <span className="mt-2 block font-serif text-[1.2rem] font-bold text-paper/70 sm:text-[1.4rem]">
                    姜以式 · 고구려 병마원수(兵馬元帥)
                  </span>
                </h3>
                <blockquote className="mt-6 border-l-4 border-primary pl-5 font-serif text-[1.15rem] leading-relaxed sm:text-[1.35rem]">
                  “이러한 오만무례한 국서는
                  <br className="hidden sm:block" /> 붓으로 답할 것이 아니라 칼로 대답해야 한다.”
                </blockquote>
                <p className="mt-6 text-paper/80">
                  고구려 영양왕 때 최고 사령관인 병마원수로서 수나라의 침략을 물리친 명장이시며, 진주강씨의 시조로
                  받들어 모시는 분입니다.
                </p>
              </div>
              <figure className="order-1 mx-auto md:order-2">
                <div className="rounded-lg border-2 border-gold/60 bg-paper/5 p-2 shadow-float">
                  <img
                    src={portrait.url}
                    alt="봉산사에 모셔진 강이식 장군 영정"
                    width={332}
                    height={576}
                    className="h-72 w-auto rounded sm:h-96"
                  />
                </div>
                <figcaption className="mt-2 text-center text-[0.7rem] text-paper/60">
                  봉산사 강이식 시조님 영정
                </figcaption>
              </figure>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[1.4rem] font-bold">시조님의 생애와 업적</h3>
            <ol className="grid gap-4 md:grid-cols-3">
              {TIMELINE.map((t) => (
                <li key={t.year} className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <p className="font-serif text-[1.6rem] font-black text-primary">{t.year}</p>
                  <h4 className="mt-1 text-[1.2rem] font-bold">{t.title}</h4>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground">{t.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-xl border-l-4 border-gold bg-gold-soft p-5 text-[0.95rem]">
              임유관 대첩의 승리로 수 문제의 1차 침략은 실패로 끝났고, 고구려는 요동 지방을 안전하게 지킬 수 있었습니다.
              장군의 묘는 만주 심양 원수림(元帥林)에 ‘병마원수강공지총(兵馬元帥姜公之塚)’ 비석과 함께 있었다고 전하나,
              지금은 거북 받침돌만 남아 있습니다.
            </div>
          </div>

          <div className="rounded-2xl border-2 border-gold/40 bg-card p-6 shadow-card sm:p-8">
            <p className="text-[0.8rem] font-bold tracking-widest text-gold">武肅公派 · 派祖</p>
            <h3 className="mt-1 text-[1.5rem] font-bold">{aboutContent.lineageTitle}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{aboutContent.lineageDescription}</p>
          </div>
        </section>

        <div className="gold-rule" />

        {/* 3. 봉산사 안내 */}
        <section id="bongsansa" className="scroll-mt-24">
          <SectionHeading
            eyebrow="BONGSANSA"
            title="봉산사(鳳山祠)"
            description="시조 강이식 장군의 영정과 위패를 모신 사당입니다."
          />
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <figure>
              <img
                src={bongsansa.url}
                alt="봉산사 전경"
                width={762}
                height={506}
                loading="lazy"
                className="aspect-[3/2] w-full rounded-xl object-cover"
              />
              <figcaption className="mt-2 text-[0.75rem] text-muted-foreground">
                봉산사 전경 — 시조님의 위패를 모신 곳
              </figcaption>
            </figure>
            <div className="flex flex-col gap-4">
              <dl className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="flex gap-3">
                  <MapPin className="mt-1 size-5 shrink-0 text-primary" />
                  <div>
                    <dt className="text-[0.75rem] font-bold text-gold">봉산사 소재지</dt>
                    <dd>경상남도 진주시 상봉동 (의병로 149)</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CalendarDays className="mt-1 size-5 shrink-0 text-primary" />
                  <div>
                    <dt className="text-[0.75rem] font-bold text-gold">향사(享祀)</dt>
                    <dd>매년 음력 3월 10일</dd>
                  </div>
                </div>
              </dl>
              <figure className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card">
                <img
                  src={monument.url}
                  alt="봉산사 강이식 장군 추모비"
                  width={376}
                  height={566}
                  loading="lazy"
                  className="h-40 w-auto shrink-0 rounded-md object-cover"
                />
                <figcaption className="text-[0.9rem]">
                  <span className="block font-bold">강이식 장군 추모비</span>
                  <span className="text-muted-foreground">
                    봉산사 경내에 세워진 비석으로, 장군의 공적을 기립니다.
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>

          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SHRINE_HISTORY.map((h) => (
              <li key={h.year} className="rounded-lg border-t-4 border-primary bg-card p-5 shadow-card">
                <p className="font-serif text-[1.3rem] font-bold">{h.year}년</p>
                <p className="mt-1 text-[0.9rem] text-muted-foreground">{h.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl bg-secondary p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-[1.3rem] font-bold">
              <BookOpen className="size-6 text-primary" /> 장군을 전하는 기록
            </h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[0.95rem]">
              <li>신채호 『조선상고사』 — 『서곽잡록』·『대동운해』의 기록을 인용</li>
              <li>『증보문헌비고』, 권문해 『대동운부군옥』</li>
              <li>『진양강씨세보(晋陽姜氏世譜)』 등 문중 족보</li>
            </ul>
            <p className="mt-3 text-[0.75rem] text-muted-foreground">사진: 종친회 소장 자료</p>
          </div>
        </section>

        <div className="gold-rule" />

        {/* 4. 선영 및 문중 봉안당(납골당) 안내 (CMS 연동) */}
        <section id="memorial" className="scroll-mt-24">
          <SectionHeading
            eyebrow="FAMILY MEMORIAL"
            title="선영 및 봉안당(납골당) 안내"
            description="종원들이 조상님의 품에서 편안히 영면하실 수 있도록 문중 전용 봉안당을 조성하여 운영하고 있습니다."
          />
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <img
                src={graveImg}
                alt="무숙공파 선영 및 봉안당 전경"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <figcaption className="p-4 text-[0.85rem] text-muted-foreground">
                소재지: {clanInfo.address}
              </figcaption>
            </figure>

            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3.5 py-1 text-[0.8rem] font-bold text-primary">
                  <Landmark className="size-4" /> 숭조돈목(崇祖敦睦) 실천 사업
                </div>
                <h3 className="text-[1.4rem] font-bold">{aboutContent.memorialTitle}</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
                  {aboutContent.memorialDescription}
                </p>
                <ul className="space-y-2.5 pt-2 text-[0.95rem]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                    <span>
                      <strong>안장 대상:</strong> {aboutContent.memorialTarget}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                    <span>
                      <strong>신청 절차:</strong> {aboutContent.memorialProcess}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" />
                    <span>
                      <strong>관리 운영:</strong> {aboutContent.memorialManagement}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-secondary p-4 text-[0.9rem]">
                <p className="flex items-center gap-2 font-bold text-ink">
                  <PhoneCall className="size-4 text-primary" /> 안장 및 봉안 문의 ({clanInfo.phone})
                </p>
                <p className="mt-1 text-muted-foreground">{aboutContent.memorialContact}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="gold-rule" />

        {/* 5. 종친회 연혁 및 임원 구성 (CMS 연동) */}
        <section id="history" className="scroll-mt-24 grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="HISTORY" title="종친회 연혁" />
            <ol className="relative space-y-6 border-l-2 border-gold/40 pl-8">
              {history.map((h) => (
                <li key={h.id} className="relative">
                  <span className="absolute top-2 -left-[2.45rem] size-4 rounded-full border-4 border-background bg-primary" />
                  <p className="font-serif text-[1.3rem] font-bold text-primary">{h.year}</p>
                  <p>{h.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <SectionHeading eyebrow="ORGANIZATION" title="임원 구성" />
            <ul className="grid grid-cols-2 gap-3">
              {org.map((o) => (
                <li key={o.id} className="rounded-xl border border-border bg-card p-5 text-center shadow-card">
                  <p className="text-[0.8rem] font-bold text-gold">{o.role}</p>
                  <p className="mt-1 font-serif text-[1.2rem] font-bold">{o.name}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-border bg-secondary p-6 text-center">
              <p className="font-bold">나의 세대와 항렬자가 궁금하신가요?</p>
              <Button asChild variant="seal" size="xl" className="mt-4">
                <Link to="/hangryeol">
                  나의 항렬 찾아보기 <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}