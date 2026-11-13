/** 종친회 기본 정보 — 실제 연락처로 교체해서 사용하세요. */
export const CLAN = {
  name: "진주강씨 무숙공파 종친회",
  shortName: "무숙공파 종친회",
  hanjaName: "晉州姜氏 武肅公派",
  englishName: "Jinju Kang Clan (Musukgongpa) Association",
  slogan: "한 뿌리, 더 큰 내일로",
  subSlogan: "시조 강이식 장군과 파조 무숙공의 뜻을 받들어 종원 간의 화합과 숭조돈목(崇祖敦睦)을 실천합니다.",
  address: "경상북도 상주시 부원동 산57번지 춘경재",
  phone: "054-000-0000",
  email: "contact@jinju-kang.org",
} as const;

export const NAV_ITEMS = [
  { to: "/about", label: "종친회 소개" },
  { to: "/hangryeol", label: "항렬 찾기" },
  { to: "/news", label: "공지사항" },
  { to: "/gallery", label: "갤러리" },
  { to: "/genealogy", label: "전자족보", badge: "준비중" },
] as const;