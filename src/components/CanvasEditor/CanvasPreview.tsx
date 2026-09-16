import './CanvasPreview.css'

interface Scene {
  id: string
  index: number
  text: string
  thumbnail?: string
  imageUrl?: string
  imagePosition?: string
}

interface Template {
  layout: string
  font: string
  color: string
  animation: string
}

interface PreviewProps {
  scene?: Scene
  template: Template
  zoom: number
}

export default function CanvasPreview({ scene, template, zoom }: PreviewProps) {
  if (!scene) {
    return (
      <div className="canvas-preview empty">
        <div className="empty-state">
          <p>씬을 선택해주세요</p>
        </div>
      </div>
    )
  }

  // 색상 템플릿 매핑
  const colorMap: Record<string, { bg: string; text: string; accent: string }> = {
    'color-dark-amber': { bg: '#0a0908', text: '#f3ede2', accent: '#e2a95c' },
    'color-midnight-blue': { bg: '#0a0e27', text: '#e8f0f7', accent: '#5b7bff' },
    'color-forest-green': { bg: '#0d2818', text: '#e8f0ea', accent: '#4ade80' },
    'color-crimson-red': { bg: '#1a0a0a', text: '#fce8e8', accent: '#ef4444' },
    'color-light-cream': { bg: '#fef9f3', text: '#2c2c2c', accent: '#b8860b' },
    'color-neon-purple': { bg: '#0f0515', text: '#f0e6ff', accent: '#c026d3' }
  }

  const colors = colorMap[template.color] || colorMap['color-dark-amber']

  // 폰트 매핑
  const fontMap: Record<string, { family: string; size: number; weight: number }> = {
    'font-serif-large': { family: 'Georgia, serif', size: 26, weight: 400 },
    'font-sans-medium': { family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto', size: 18, weight: 400 },
    'font-mono-small': { family: '"Courier New", monospace', size: 16, weight: 400 },
    'font-korean-hangul': { family: '"Noto Sans KR", "Pretendard", sans-serif', size: 20, weight: 400 },
    'font-manuscript': { family: '"Comic Sans MS", cursive', size: 22, weight: 400 }
  }

  const font = fontMap[template.font] || fontMap['font-sans-medium']

  const previewStyle = {
    backgroundColor: colors.bg,
    color: colors.text,
    fontFamily: font.family,
    fontSize: `${font.size}px`,
    fontWeight: font.weight,
    transform: `scale(${zoom / 100})`
  }

  return (
    <div className="canvas-preview">
      <div className="preview-container">
        <div className="preview-frame" style={previewStyle}>
          {/* 레이아웃별 렌더링 */}
          {template.layout === 'layout-top' && (
            <div className="layout-top">
              <div className="image-container">
                {scene.imageUrl ? (
                  <img src={scene.imageUrl} alt="씬 이미지" />
                ) : (
                  <div className="placeholder">이미지 추가</div>
                )}
              </div>
              <div className="text-container">
                <p>{scene.text}</p>
              </div>
            </div>
          )}

          {template.layout === 'layout-middle' && (
            <div className="layout-middle">
              <div className="text-container small">
                <p>{scene.text.substring(0, 50)}...</p>
              </div>
              <div className="image-container">
                {scene.imageUrl ? (
                  <img src={scene.imageUrl} alt="씬 이미지" />
                ) : (
                  <div className="placeholder">이미지 추가</div>
                )}
              </div>
              <div className="text-container small">
                <p>...</p>
              </div>
            </div>
          )}

          {template.layout === 'layout-bottom' && (
            <div className="layout-bottom">
              <div className="text-container">
                <p>{scene.text}</p>
              </div>
              <div className="image-container">
                {scene.imageUrl ? (
                  <img src={scene.imageUrl} alt="씬 이미지" />
                ) : (
                  <div className="placeholder">이미지 추가</div>
                )}
              </div>
            </div>
          )}

          {template.layout === 'layout-full' && (
            <div className="layout-full">
              <div className="image-container full">
                {scene.imageUrl ? (
                  <img src={scene.imageUrl} alt="씬 이미지" />
                ) : (
                  <div className="placeholder">이미지 추가</div>
                )}
              </div>
              <div className="text-overlay">
                <p>{scene.text}</p>
              </div>
            </div>
          )}

          {template.layout === 'layout-left' && (
            <div className="layout-left">
              <div className="image-container small">
                {scene.imageUrl ? (
                  <img src={scene.imageUrl} alt="씬 이미지" />
                ) : (
                  <div className="placeholder">이미지</div>
                )}
              </div>
              <div className="text-container">
                <p>{scene.text}</p>
              </div>
            </div>
          )}

          {template.layout === 'layout-right' && (
            <div className="layout-right">
              <div className="text-container">
                <p>{scene.text}</p>
              </div>
              <div className="image-container small">
                {scene.imageUrl ? (
                  <img src={scene.imageUrl} alt="씬 이미지" />
                ) : (
                  <div className="placeholder">이미지</div>
                )}
              </div>
            </div>
          )}

          {/* 씬 번호 표시 */}
          <div className="scene-indicator">
            씬 #{scene.index + 1}
          </div>
        </div>
      </div>
    </div>
  )
}
