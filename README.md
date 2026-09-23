# NONEMAVL - 소설을 인터랙티브 시각적 프로토타입으로 변환하는 웹 플랫폼

**NONEMAVL**은 소설 텍스트를 인터랙티브 시각적 프로토타입으로 빠르게 변환하는 플랫폼입니다.
작가가 소설 텍스트를 업로드하면 **5분 안에** 동작하는 시각적 프로토타입을 생성합니다.

🎬 **Cinematic Reader MVP** - 우아한 독서 경험을 위해 설계됨

## 🎯 MVP 주요 기능

### 🔥 Cinematic Reader (핵심)
- **아름다운 독서 경험**: 최소한의 UI, 최대의 몰입감
- **매끄러운 애니메이션**: Fade/Zoom 전환, 영화 같은 경험
- **스마트 네비게이션**: 이전/다음, 자동 재생, 속도 제어
- **모바일 최적화**: 반응형 디자인, 터치 친화적

### 1️⃣ 텍스트 분할 (4가지 방식)
- **수동 분할**: 빈 줄(`\n\n`)로 장면 구분 - 가장 정확
- **문단 분할**: 약 200-400자 단위 자동 분할 - 균형잡힘
- **절 분할**: 문장 부호(`.!?`)를 기준 세밀한 분할 - 대사 중심
- **AI 분할**: Gemini API 기반 의미 있는 분할 - 가장 자연스러움

### 2️⃣ 이미지 생성
- **Pollinations.ai 통합**: 무료, API 키 불필요
- **한글 프롬프트 완벽 지원**: 한글만으로 이미지 생성
- **자동 캐싱**: 반복 요청 1초 이내 반환
- **고해상도**: 1024×1024 이상

### 3️⃣ 효과음 시스템 (향후)
- **Web Audio API**: 브라우저 기반 사운드
- **자동 추천**: 장면 텍스트 기반 효과음 추천
- **무료 라이브러리**: 저작권 자유 효과음

### 4️⃣ 성능
- **로드 시간**: < 2초
- **텍스트 분할**: < 3초
- **이미지 생성**: < 5초 (첫 요청), < 1초 (캐시)
- **전체 워크플로우**: < 5분

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

## 📋 개발 진도

### Phase 1: Cinematic Reader MVP ✅ (현재)
- ✅ 타입 + Zustand 상태관리
- ✅ 텍스트 분할 (4가지 방식)
- ✅ Cinematic Reader 구현 (fade/zoom 애니메이션)
- ✅ 자동 재생 + 속도 제어
- ✅ 모바일 최적화
- 🔄 배포 (Vercel)

### Phase 2: 이미지 + 사운드
- ⏳ Pollinations.ai 이미지 통합
- ⏳ 배치 이미지 생성
- ⏳ 효과음 시스템 (Web Audio API)
- ⏳ Ambient + SFX 레이어

### Phase 3: 최소 Creator Editor
- ⏳ 씬 순서 편집
- ⏳ 텍스트/이미지/모션 수정
- ⏳ 사운드 믹싱

### Phase 4: 완성 + 배포
- ⏳ 1개 작품 완성 (처음부터 끝까지)
- ⏳ 사용자 테스트
- ⏳ 행동 측정 (독자 참여도)

### Phase 5: 확장 (미래)
- ⏳ 20가지 템플릿
- ⏳ 고급 에디터
- ⏳ 자동 생성 기능 확대

## 📝 라이센스

TBD

---

**문의**: bureem0000@gmail.com

# 배포 환경변수 설정 완료 ✅

- VITE_GEMINI_API_KEY: 설정됨
- Vercel 배포 준비 완료
