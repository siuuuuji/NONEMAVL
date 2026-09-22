import { useState } from 'react'
import { layoutTemplates, fontTemplates, colorTemplates, animationTemplates } from '@/data/templates'
import { Layout, Type, Palette, Zap } from 'lucide-react'
import type { LayoutTemplate, FontTemplate, ColorTemplate, AnimationTemplate } from '@/types/templates'
import './TemplateSelector.css'

type TemplateCategory = 'layout' | 'font' | 'color' | 'animation'

interface TemplateSelectorProps {
  onSelectTemplates: (templates: {
    layout: string
    font: string
    color: string
    animation: string
  }) => void
}

export default function TemplateSelector({ onSelectTemplates }: TemplateSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('layout')
  const [selectedTemplates, setSelectedTemplates] = useState({
    layout: 'layout-top',
    font: 'font-sans-medium',
    color: 'color-dark-amber',
    animation: 'anim-fade'
  })

  const categories = [
    { id: 'layout', name: '레이아웃', icon: Layout },
    { id: 'font', name: '폰트', icon: Type },
    { id: 'color', name: '컬러', icon: Palette },
    { id: 'animation', name: '애니메이션', icon: Zap }
  ]

  const allTemplates = {
    layout: layoutTemplates,
    font: fontTemplates,
    color: colorTemplates,
    animation: animationTemplates
  }

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplates({
      ...selectedTemplates,
      [activeCategory]: templateId
    })
  }

  const handleConfirm = () => {
    onSelectTemplates(selectedTemplates)
  }

  const currentTemplates = allTemplates[activeCategory]

  return (
    <div className="template-selector">
      <div className="selector-container">
        <h1>템플릿 선택</h1>
        <p className="subtitle">인터랙티브 프로토타입의 스타일을 정하세요</p>

        <div className="category-tabs">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                className={`tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id as TemplateCategory)}
              >
                <Icon size={20} />
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>

        <div className="templates-grid">
          {currentTemplates.map((template) => (
            <button
              key={template.id}
              className={`template-card ${selectedTemplates[activeCategory] === template.id ? 'selected' : ''}`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <div className="template-preview">
                <div className="preview-placeholder">
                  {activeCategory === 'color' && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: (template as ColorTemplate).bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: (template as ColorTemplate).textColor
                      }}
                    >
                      <span style={{ fontSize: '12px' }}>Sample Text</span>
                    </div>
                  )}
                  {activeCategory === 'font' && (
                    <div
                      style={{
                        fontSize: `${(template as FontTemplate).fontSize}px`,
                        fontFamily: (template as FontTemplate).fontFamily,
                        lineHeight: `${(template as FontTemplate).lineHeight}`,
                        letterSpacing: `${(template as FontTemplate).letterSpacing}px`,
                        padding: '16px'
                      }}
                    >
                      샘플 텍스트
                    </div>
                  )}
                  {activeCategory === 'layout' && (
                    <div className={`layout-preview layout-${(template as LayoutTemplate).imagePosition}`}>
                      <div className="layout-image">이미지</div>
                      <div className="layout-text">텍스트</div>
                    </div>
                  )}
                  {activeCategory === 'animation' && (
                    <div className={`animation-preview anim-${(template as AnimationTemplate).transitionType}`}>
                      <div className="anim-box">
                        {(template as AnimationTemplate).transitionType}
                        <br />
                        {(template as AnimationTemplate).duration}ms
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="template-info">
                <h3>{template.name}</h3>
                <p>{template.description}</p>
              </div>

              {selectedTemplates[activeCategory] === template.id && (
                <div className="selected-badge">✓</div>
              )}
            </button>
          ))}
        </div>

        <div className="selector-actions">
          <div className="selections-summary">
            <div className="summary-item">
              <span className="label">레이아웃:</span>
              <span className="value">
                {layoutTemplates.find(t => t.id === selectedTemplates.layout)?.name}
              </span>
            </div>
            <div className="summary-item">
              <span className="label">폰트:</span>
              <span className="value">
                {fontTemplates.find(t => t.id === selectedTemplates.font)?.name}
              </span>
            </div>
            <div className="summary-item">
              <span className="label">컬러:</span>
              <span className="value">
                {colorTemplates.find(t => t.id === selectedTemplates.color)?.name}
              </span>
            </div>
            <div className="summary-item">
              <span className="label">애니메이션:</span>
              <span className="value">
                {animationTemplates.find(t => t.id === selectedTemplates.animation)?.name}
              </span>
            </div>
          </div>

          <button className="btn-confirm" onClick={handleConfirm}>
            이 템플릿으로 진행 →
          </button>
        </div>
      </div>
    </div>
  )
}
