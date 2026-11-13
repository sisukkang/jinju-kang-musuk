import rite from "@/assets/gallery-rite.jpg";
import meeting from "@/assets/gallery-meeting.jpg";
import grave from "@/assets/gallery-grave.jpg";
import jaesil from "@/assets/gallery-jaesil.jpg";
import signboard from "@/assets/founder/jaesil-signboard.jpg.asset.json";

export interface GalleryItem {
  src: string;
  title: string;
  date: string;
  width: number;
  height: number;
}

export const GALLERY: GalleryItem[] = [
  { src: jaesil, title: "재실 춘경재 전경", date: "2026.10", width: 1280, height: 960 },
  { src: rite, title: "2025년 추계 시제 봉행", date: "2025.10.19", width: 1024, height: 768 },
  { src: meeting, title: "무숙공파 정기총회", date: "2026.02.15", width: 1024, height: 768 },
  { src: grave, title: "선영 및 봉안당 정화·벌초", date: "2025.08.30", width: 1024, height: 768 },
  { src: signboard.url, title: "춘경재 현판과 창호", date: "2026.10", width: 1280, height: 960 },
];