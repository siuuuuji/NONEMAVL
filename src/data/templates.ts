import { LayoutTemplate, FontTemplate, ColorTemplate, AnimationTemplate } from '@/types/templates'

export const layoutTemplates: LayoutTemplate[] = [
  {
    id: 'layout-top',
    name: '상단 이미지',
    description: '이미지를 상단에 배치, 텍스트는 하단에',
    imagePosition: 'top',
    thumbnail: 'top',
    category: 'layout'
  },
  {
    id: 'layout-middle',
    name: '중앙 이미지',
    description: '이미지가 중앙, 텍스트는 양옆 또는 하단',
    imagePosition: 'middle',
    thumbnail: 'middle',
    category: 'layout'
  },
  {
    id: 'layout-bottom',
    name: '하단 이미지',
    description: '텍스트는 상단, 이미지는 하단에 배치',
    imagePosition: 'bottom',
    thumbnail: 'bottom',
    category: 'layout'
  },
  {
    id: 'layout-full',
    name: '전체 이미지 (텍스트 오버레이)',
    description: '이미지가 전체를 차지, 텍스트는 투명배경으로 오버레이',
    imagePosition: 'full',
    thumbnail: 'full',
    category: 'layout'
  },
  {
    id: 'layout-left',
    name: '좌측 이미지',
    description: '이미지는 좌측, 텍스트는 우측에 배치',
    imagePosition: 'left',
    thumbnail: 'left',
    category: 'layout'
  },
  {
    id: 'layout-right',
    name: '우측 이미지',
    description: '텍스트는 좌측, 이미지는 우측에 배치',
    imagePosition: 'right',
    thumbnail: 'right',
    category: 'layout'
  }
]

export const fontTemplates: FontTemplate[] = [
  {
    id: 'font-serif-large',
    name: '세리프 - 대',
    description: '고급스러운 세리프 폰트, 큰 크기 (26px)',
    fontSize: 26,
    fontFamily: 'Georgia, serif',
    lineHeight: 1.8,
    letterSpacing: 0.5,
    thumbnail: 'serif-large',
    category: 'font'
  },
  {
    id: 'font-sans-medium',
    name: '산스 - 중',
    description: '현대적인 산스폰트, 중간 크기 (18px)',
    fontSize: 18,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    lineHeight: 1.6,
    letterSpacing: 0,
    thumbnail: 'sans-medium',
    category: 'font'
  },
  {
    id: 'font-mono-small',
    name: '모노스페이스 - 소',
    description: '고정폭 폰트, 작은 크기 (16px)',
    fontSize: 16,
    fontFamily: '"Courier New", monospace',
    lineHeight: 1.5,
    letterSpacing: 0.8,
    thumbnail: 'mono-small',
    category: 'font'
  },
  {
    id: 'font-korean-hangul',
    name: '한글 전용 - 우아함',
    description: '한글에 최적화된 서체, 세련된 느낌 (20px)',
    fontSize: 20,
    fontFamily: '"Noto Sans KR", "Pretendard", sans-serif',
    lineHeight: 1.7,
    letterSpacing: -0.5,
    thumbnail: 'korean-hangul',
    category: 'font'
  },
  {
    id: 'font-manuscript',
    name: '수작성 스타일',
    description: '손글씨 같은 편안한 폰트 (22px)',
    fontSize: 22,
    fontFamily: '"Comic Sans MS", cursive',
    lineHeight: 1.8,
    letterSpacing: 0.2,
    thumbnail: 'manuscript',
    category: 'font'
  }
]

export const colorTemplates: ColorTemplate[] = [
  {
    id: 'color-dark-amber',
    name: '어두운 밤 - 호박색',
    description: '어두운 배경에 따뜻한 호박색 텍스트',
    bgColor: '#0a0908',
    textColor: '#f3ede2',
    accentColor: '#e2a95c',
    thumbnail: 'dark-amber',
    category: 'color'
  },
  {
    id: 'color-midnight-blue',
    name: '자정 - 파란색',
    description: '깊은 어두움 속의 차가운 파랑',
    bgColor: '#0a0e27',
    textColor: '#e8f0f7',
    accentColor: '#5b7bff',
    thumbnail: 'midnight-blue',
    category: 'color'
  },
  {
    id: 'color-forest-green',
    name: '숲 - 초록색',
    description: '숲의 신비로움, 초록색 강조',
    bgColor: '#0d2818',
    textColor: '#e8f0ea',
    accentColor: '#4ade80',
    thumbnail: 'forest-green',
    category: 'color'
  },
  {
    id: 'color-crimson-red',
    name: '진홍색 - 드라마틱',
    description: '긴장감 있는 붉은 톤',
    bgColor: '#1a0a0a',
    textColor: '#fce8e8',
    accentColor: '#ef4444',
    thumbnail: 'crimson-red',
    category: 'color'
  },
  {
    id: 'color-light-cream',
    name: '밝은 크림 - 클래식',
    description: '고전적인 책처럼 밝은 느낌',
    bgColor: '#fef9f3',
    textColor: '#2c2c2c',
    accentColor: '#b8860b',
    thumbnail: 'light-cream',
    category: 'color'
  },
  {
    id: 'color-neon-purple',
    name: '네온 퍼플 - 미래형',
    description: '사이버펑크 느낌의 네온 퍼플',
    bgColor: '#0f0515',
    textColor: '#f0e6ff',
    accentColor: '#c026d3',
    thumbnail: 'neon-purple',
    category: 'color'
  }
]

export const animationTemplates: AnimationTemplate[] = [
  {
    id: 'anim-fade',
    name: '페이드 (흐려짐)',
    description: '부드럽게 흐려지면서 전환',
    transitionType: 'fade',
    duration: 480,
    thumbnail: 'fade',
    category: 'animation'
  },
  {
    id: 'anim-slide',
    name: '슬라이드 (밀기)',
    description: '옆으로 밀리면서 전환',
    transitionType: 'slide',
    duration: 600,
    thumbnail: 'slide',
    category: 'animation'
  },
  {
    id: 'anim-zoom',
    name: '줌 (확대/축소)',
    description: '확대되거나 축소되면서 전환',
    transitionType: 'zoom',
    duration: 500,
    thumbnail: 'zoom',
    category: 'animation'
  },
  {
    id: 'anim-blur',
    name: '블러 (흐릿함)',
    description: '흐릿해지면서 전환 (영화 같은 느낌)',
    transitionType: 'blur',
    duration: 550,
    thumbnail: 'blur',
    category: 'animation'
  }
]
