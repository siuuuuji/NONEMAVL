import { Image, Type, Wand2 } from 'lucide-react'
import './PropertiesPanel.css'

interface Scene {
  id: string
  index: number
  text: string
  imageUrl?: string
  imagePosition?: string
}

interface Template {
  layout: string
  font: string
  color: string
  animation: string
}

interface PanelProps {
  scene: Scene
  template: Template
  onUpdate: (updates: Partial<Scene>) => void
}

export default function PropertiesPanel({ scene, template, onUpdate }: PanelProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({ text: e.target.value })
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ imageUrl: e.target.value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onUpdate({ imageUrl: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="properties-panel">
      <div className="panel-header">
        <h3>속성</h3>
        <span className="scene-badge">씬 #{scene.index + 1}</span>
      </div>

      <div className="properties-content">
        {/* 텍스트 섹션 */}
        <div className="property-section">
          <div className="section-header">
            <Type size={16} />
            <h4>텍스트</h4>
          </div>
          <textarea
            className="text-editor"
            value={scene.text}
            onChange={handleTextChange}
            placeholder="씬의 텍스트를 입력하세요"
          />
          <div className="text-info">
            <span className="char-count">{scene.text.length}자</span>
          </div>
        </div>

        {/* 이미지 섹션 */}
        <div className="property-section">
          <div className="section-header">
            <Image size={16} />
            <h4>이미지</h4>
          </div>

          <div className="image-preview">
            {scene.imageUrl ? (
              <img src={scene.imageUrl} alt="씬 이미지" />
            ) : (
              <div className="placeholder">이미지 없음</div>
            )}
          </div>

          <div className="upload-buttons">
            <label className="upload-btn upload-file">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              파일 업로드
            </label>
            <button className="upload-btn generate-btn" disabled>
              <Wand2 size={14} />
              AI 생성
            </button>
          </div>

          <div className="url-input-group">
            <label>이미지 URL</label>
            <input
              type="text"
              className="url-input"
              value={scene.imageUrl || ''}
              onChange={handleImageUrlChange}
              placeholder="이미지 URL 입력"
            />
          </div>
        </div>

        {/* 템플릿 정보 */}
        <div className="property-section">
          <div className="section-header">
            <Wand2 size={16} />
            <h4>현재 템플릿</h4>
          </div>

          <div className="template-info">
            <div className="info-row">
              <span className="label">레이아웃</span>
              <span className="value">{template.layout}</span>
            </div>
            <div className="info-row">
              <span className="label">폰트</span>
              <span className="value">{template.font}</span>
            </div>
            <div className="info-row">
              <span className="label">컬러</span>
              <span className="value">{template.color}</span>
            </div>
            <div className="info-row">
              <span className="label">애니메이션</span>
              <span className="value">{template.animation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
