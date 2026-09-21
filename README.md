# NONEMAVL - 소설 기반 인터랙티브 프로토타입 제작 플랫폼

**NONEMAVL**은 작가의 소설 IP를 인터랙티브 웹 프로토타입으로 변환하는 올인원 웹 플랫폼입니다.

## 🎯 주요 기능

### 1️⃣ 텍스트 분할 (Text Segmentation)
- **직접 내용 나누기**: 수동으로 장면 구분
- **문단별로 나누기**: 자동 문단 분석
- **단락별로 나누기**: 논리적 단락 구분
- **AI가 알아서 나누기**: Gemini API 활용한 자동 분할

### 2️⃣ 템플릿 선택 (Template Selection)
**분위기에 따른 다양한 템플릿 제공:**
- **레이아웃 (6가지)**: 상단/중앙/하단/전체/좌측/우측 이미지 배치
- **폰트 (5가지)**: 세리프/산스/모노/한글/수작성 스타일
- **컬러 (6가지)**: 호박색/파랑/초록/진홍/크림/네온 테마
- **애니메이션 (4가지)**: 페이드/슬라이드/줌/블러 전환

### 3️⃣ 이미지 적용 (Visualization)
- 각 장면별 이미지 생성/업로드
- 협업 기능 (화면 공유)
- Pollinations.ai 무료 이미지 생성
- 이미지 위치/크기 조절

### 4️⃣ 효과음 추가 (Sound Design)
- AI 기반 자동 효과음 추천
- 무료 효과음 라이브러리 통합
- Web Audio API 합성음 생성
- 장면별 음향 믹싱

### 5️⃣ 최종 출력
- 인터랙티브 웹 애플리케이션 생성
- 터치/클릭 네비게이션
- 진행 상황 표시
- 반응형 디자인

## 🛠 기술 스택

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **UI Icons**: Lucide React
- **HTTP Client**: Axios
- **Toast Notifications**: React Hot Toast

### Backend (계획)
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: PostgreSQL
- **Real-time**: WebSocket
- **File Storage**: AWS S3 / Local

### APIs (Free Tier)
- **Text Processing**: Google Gemini API
- **Image Generation**: Replicate (무료 크레딧) / Hugging Face
- **Effect Sounds**: Freesound API / Zapsplat

## 📁 프로젝트 구조

```
nonemavl/
├── src/
│   ├── components/        # React 컴포넌트
│   │   ├── Sidebar.tsx
│   │   └── ProjectList.tsx
│   ├── pages/            # 페이지 컴포넌트
│   ├── hooks/            # Custom hooks
│   ├── utils/            # 유틸리티 함수
│   ├── types/            # TypeScript 타입
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── App.css
├── public/               # 정적 자산
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

## 🎨 설계 원칙

1. **무료 우선**: 초기 개발은 모두 무료 API 사용
2. **확장 가능**: 시드 펀딩 후 유료 API 마이그레이션
3. **사용자 중심**: Figma 같은 협업 편의성
4. **고품질 출력**: "재수가더러운날" 수준의 인터랙티브 경험

## 📋 개발 로드맵

- [ ] **Phase 1** (4주): MVP - 텍스트 분할 + 이미지 적용
- [ ] **Phase 2** (2주): 실시간 협업
- [ ] **Phase 3** (3주): 효과음 + 애니메이션
- [ ] **Phase 4**: 마켓플레이스 & 유료 기능

## 📝 라이센스

TBD

---

**문의**: bureem0000@gmail.com

# 배포 환경변수 설정 완료 ✅

- VITE_GEMINI_API_KEY: 설정됨
- Vercel 배포 준비 완료
