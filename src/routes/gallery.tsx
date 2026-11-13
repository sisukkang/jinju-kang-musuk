import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { CLAN } from "@/lib/site-config";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `활동 갤러리 | ${CLAN.name}` },
      { name: "description", content: `${CLAN.name} 춘추 제향, 정기총회, 선영 및 재실 전경 사진 갤러리` },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="GALLERY · 종친회 활동 사진" title="활동 갤러리">
        시조 및 파조 제향 봉행, 정기총회, 상주 춘경재 재실과 선영의 모습을 담은 기록입니다.
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="ARCHIVE"
          title="문중 행사 및 선영 사진첩"
          description="사진을 클릭하시면 크게 보실 수 있습니다."
        />
        <div className="mt-8">
          <GalleryGrid />
        </div>

        <Link to="/" className="mt-12 inline-flex items-center gap-1 font-semibold text-primary hover:underline">
          <ArrowLeft className="size-4" /> 홈으로 돌아가기
        </Link>
      </div>
    </>
  );
}