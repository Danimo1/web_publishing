# 유럽 여행 회고 웹사이트

## 📁 프로젝트 구조

```
project/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── script.js           # JavaScript 파일
├── img/                # 이미지 폴더
│   ├── 런던 사진들 (10장)
│   │   ├── london-bigben.jpg
│   │   ├── london-eye.jpg
│   │   ├── london-tower-bridge.jpg
│   │   ├── london-museum.jpg
│   │   ├── london-palace.jpg
│   │   ├── london-fish.jpg
│   │   ├── london-tea.jpg
│   │   ├── london-market.jpg
│   │   ├── london-pizza.jpg
│   │   ├── london-cruise.jpg
│   │   ├── london-park.jpg
│   │   ├── london-bookstore.jpg
│   │   ├── london-musical.jpg
│   │   └── london-night.jpg
│   │
│   └── 파리 사진들 (14장)
│       ├── paris-eiffel.jpg
│       ├── paris-louvre.jpg
│       ├── paris-notredame.jpg
│       ├── paris-arc.jpg
│       ├── paris-sacre.jpg
│       ├── paris-croissant.jpg
│       ├── paris-french.jpg
│       ├── paris-macaron.jpg
│       ├── paris-crepe.jpg
│       ├── paris-seine.jpg
│       ├── paris-montmartre.jpg
│       ├── paris-champs.jpg
│       ├── paris-versailles.jpg
│       └── paris-night.jpg
└── README.md           # 이 파일
```

## 🖼️ 이미지 파일 이름 가이드

### 런던 사진 (14장 필요)

**명소 (5장):**
1. `london-bigben.jpg` - 빅벤과 국회의사당
2. `london-eye.jpg` - 런던 아이
3. `london-tower-bridge.jpg` - 타워 브리지
4. `london-museum.jpg` - 대영박물관
5. `london-palace.jpg` - 버킹엄 궁전

**맛집 (4장):**
6. `london-fish.jpg` - 피쉬 앤 칩스
7. `london-tea.jpg` - 애프터눈 티
8. `london-market.jpg` - 보로우 마켓
9. `london-pizza.jpg` - 이탈리안 레스토랑

**특별한 순간 (5장):**
10. `london-cruise.jpg` - 템즈강 크루즈
11. `london-park.jpg` - 하이드 파크
12. `london-bookstore.jpg` - 런던 서점
13. `london-musical.jpg` - 웨스트엔드 뮤지컬
14. `london-night.jpg` - 런던 야경

### 파리 사진 (14장 필요)

**명소 (5장):**
1. `paris-eiffel.jpg` - 에펠탑
2. `paris-louvre.jpg` - 루브르 박물관
3. `paris-notredame.jpg` - 노트르담 대성당
4. `paris-arc.jpg` - 개선문
5. `paris-sacre.jpg` - 사크레쾨르 대성당

**맛집 (4장):**
6. `paris-croissant.jpg` - 크루아상/베이커리
7. `paris-french.jpg` - 프렌치 요리
8. `paris-macaron.jpg` - 마카롱
9. `paris-crepe.jpg` - 크레페

**특별한 순간 (5장):**
10. `paris-seine.jpg` - 센강 유람선
11. `paris-montmartre.jpg` - 몽마르트 언덕
12. `paris-champs.jpg` - 샹젤리제 거리
13. `paris-versailles.jpg` - 베르사유 궁전
14. `paris-night.jpg` - 파리 야경

## 🚀 사용 방법

1. **사진 준비하기**
   - 위의 이름 가이드에 맞춰 사진 파일명을 변경
   - 모든 사진을 `project/img/` 폴더에 넣기
   - 총 28장 필요 (런던 14장 + 파리 14장)

2. **웹사이트 실행하기**
   - `index.html` 파일을 브라우저로 열기
   - 또는 Live Server 등으로 로컬 서버 실행

3. **배포하기 (선택사항)**
   - GitHub Pages
   - Netlify
   - Vercel 등

## ✨ 구현된 기능

### 프로젝트 품질 기준 충족 항목

**디자인과 레이아웃:**
- ✅ L1. Flexbox - 네비게이션, 카드 내부
- ✅ L2. CSS Grid - 카드 배치
- ✅ L3. 반응형 - 3단계 미디어쿼리
- ✅ L4. Sticky - 네비게이션 고정
- ✅ L6. 외부 파일 분리

**상호작용과 UX:**
- ✅ U1. Transition - 부드러운 전환
- ✅ U2. Transform - 3D 효과
- ✅ U3. Toggle - 탭 전환
- ✅ U4. setTimeout - 지연 실행
- ✅ U5. setInterval - 배경 슬라이드쇼
- ✅ U6. Clear - 슬라이드쇼 중지
- ✅ U7. Form - 메모 작성 & 유효성 검사

**접근성:**
- ✅ A1. 시맨틱 HTML
- ✅ A2. H1 규칙
- ✅ A3. Alt & Focus

## 📝 주요 기능

1. **랜딩 페이지** - 도시 선택 화면
2. **네비게이션** - 도시 간 전환
3. **배경 슬라이드쇼** - 5초마다 자동 변경
4. **카드 호버 효과** - 넷플릭스 스타일
5. **여행 메모 작성** - 폼 유효성 검사 포함
6. **키보드 단축키** - 1, 2, ESC
7. **반응형 디자인** - 모든 디바이스 지원

## 💡 팁

- 사진 해상도: 최소 1200x800 권장
- 파일 크기: 각 500KB 이하 권장 (로딩 속도)
- 가로/세로 비율: 3:2 또는 4:3 권장
