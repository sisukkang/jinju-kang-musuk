import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { GalleryGrid } from "@/components/site/GalleryGrid";
import { CLAN } from "@/lib/site-config";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `갤러리 | ${CLAN.name}` },
      { name: "description", content: `${CLAN.name}의 재실(춘경재), 시제 봉행, 정기총회, 선영 벌초 활동 사진첩입니다.` },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="GALLERY" title="문중 활동 갤러리">
        춘경재 전경과 시제 봉행, 정기총회, 선영 및 봉안당 정화 등 종원들의 발자취를 담았습니다.
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="PHOTO ARCHIVE"
          title="종친회 사진첩"
          description="사진을 클릭하시면 더 큰 화면으로 보실 수 있습니다."
        />
        <GalleryGrid />
      </div>
    </>
  );
}