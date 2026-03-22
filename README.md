# Minji Portfolio 2026

정적 HTML 기반 포트폴리오입니다.  
파일 수정은 `index.html` 한 곳에서 대부분 가능합니다.

추가로 `Next.js app router` 환경에서 바로 붙여쓸 수 있는 React 버전도 준비되어 있습니다.

- `app/page.tsx` : 애니메이션/차트/반응형/연봉 어필 섹션 포함 개선본

## 프로필 사진 반영

증명사진을 넣으려면 아래 파일명으로 저장하면 자동 반영됩니다.

- 정적 페이지(`index.html`)용: `profile-photo.jpg` (프로젝트 루트)
- Next.js(`app/page.tsx`)용: `public/profile-photo.jpg`

사진이 없으면 자동으로 `profile-placeholder.svg`가 표시됩니다.

## 문서 링크

사이트 내 다운로드 버튼은 아래 파일을 사용합니다.

- `/public/docs/minji_resume.pdf`
- `/public/docs/minji_marketing_portfolio.pdf`

## 로컬 미리보기

```bash
cd "minji-portfolio-2026"
python3 -m http.server 4173
```

브라우저에서 `http://localhost:4173` 접속

## GitHub 업로드

프로젝트 루트(`/Users/office/Documents/New project 2`) 기준:

```bash
git add "minji-portfolio-2026"
git commit -m "Add deploy-ready 2026 portfolio homepage"
git push origin <your-branch>
```

## Vercel 배포

1. Vercel에서 **New Project** 생성
2. 이 저장소 연결
3. **Root Directory**는 저장소 구조에 맞게 지정
   - `index.html`이 저장소 루트에 있으면 `./`
   - 서브폴더 안에 있으면 해당 폴더명 (예: `minji-portfolio-2026`)
4. Framework Preset은 `Other`
5. Deploy

`vercel.json`이 포함되어 있어 clean URL 설정이 적용됩니다.

## 404 Not Found가 뜰 때

아래 2가지를 먼저 확인하세요.

1. `Settings > General > Root Directory`가 실제 파일 위치와 일치하는지
2. 최신 커밋이 배포됐는지 (`Deployments`에서 최신 배포 확인)

`Redeploy` 버튼이 안 보이면, 파일 1줄 수정 후 커밋/푸시하면 새 배포가 자동으로 생성됩니다.
