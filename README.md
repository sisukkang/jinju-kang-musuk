# Jinju Kang

당신은 시니어 프론트엔드 개발자입니다. 깃허브(GitHub) 및 Vercel에 즉시 배포하여 종친회 임원진에게 시연할 수 있는 '[OO O씨 OOO파 대종회]' 인터랙티브 데모 웹사이트를 Next.js(App Router), TypeScript, Tailwind CSS로 만들어 주세요.

[핵심 조건: 외부 DB 없이 100% 프론트엔드 동작]

- Supabase 같은 외부 DB 연동 없이, 초기 샘플 데이터와 브라우저 `localStorage`를 결합한 상태 관리 유틸리티(`src/lib/demo-store.ts`)를 만들어 모든 CRUD(글쓰기, 삭제, 행사 투표, 데이터 초기화)가 실제로 작동하게 구현할 것.

[디자인 및 접근성]

- 컬러: 한지 미색 배경(#FAF8F5), 먹색 텍스트(#1F2937), 단청 적색(#9B2C2C), 금색(#B7791F)

- 시니어 배려 UI: 상단 헤더에 [가- / 기본 / 가+] 버튼을 배치해 전체 폰트 크기(18px / 21px / 24px)를 즉시 조절할 수 있게 할 것.

[필수 구현 페이지 및 컴포넌트]

1. 메인 페이지 (`src/app/page.tsx`):

   - 상단 네비게이션: 종친회 로고, 메뉴(종친회 소개, 항렬 찾기, 소식/갤러리, 전자족보[준비중], [관리자 CMS 체험] 강조 버튼)

   - 히어로 섹션: 슬로건과 주요 바로가기 버튼

   - '나의 항렬 및 세(世)수 찾기' 인터랙티브 섹션: 출생연도, 이름 항렬자, 아버지 세수 중 선택 검색 -> 세수/대손, 한자 항렬자, 부모·자녀 항렬자를 표로 출력 (28세~35세 샘플 데이터)

   - 최신 공지사항 4건 및 활동 갤러리 (샘플 이미지 포함)

   - 다가오는 행사(2026년 춘계 대제) 안내 및 이름/연락처 뒷4자리/동반인원 원클릭 참석 투표 기능

2. 관리자 CMS 페이지 (`src/app/admin/page.tsx`):

   - 탭 1 [공지·소식 관리]: 새 공지사항 작성 폼(제목, 카테고리, 상단고정 여부, 내용) 및 기존 글 삭제 기능 (작성 시 메인 페이지에 즉시 반영)

   - 탭 2 [행사 및 참석자 관리]: 행사 참석 투표 현황 리스트 확인, 신규 행사 추가, `xlsx` 라이브러리를 이용한 **[참석자 명단 엑셀 다운로드]** 실제 동작 구현

   - 우측 하단에 [데모 데이터 초기화] 플로팅 버튼 배치

3. 3단계 확장 안내 모달 또는 페이지 (`src/app/genealogy/page.tsx`):

   - "종원 인증 후 열람 가능한 전자족보 계보도(3단계 오픈 예정)" 안내 및 샘플 계보 트리 UI 미리보기

모든 파일을 누락 없이 작성해 주고, `npm run build` 시 타입 에러가 나지 않도록 깔끔하게 코딩해 주세요.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://jinju-kang.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0004fa14-90c6-460d-8364-b3bf4132ca50).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
