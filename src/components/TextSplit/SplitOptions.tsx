import { Zap, Scissors, Layers, Wand2 } from 'lucide-react'
import './SplitOptions.css'

interface SplitOptionsProps {
  onSelect: (method: 'manual' | 'paragraph' | 'clause' | 'ai') => void
  selectedMethod: 'manual' | 'paragraph' | 'clause' | 'ai'
}

const options = [
  {
    id: 'manual',
    title: '직접 나누기',
    description: '원하는 위치에서 직접 장면을 구분합니다',
    icon: Scissors,
    time: '5분',
    features: ['완전한 제어', '수동 편집', '정확한 분할']
  },
  {
    id: 'paragraph',
    title: '문단별로 나누기',
    description: '문단 단위로 자동으로 분할합니다',
    icon: Layers,
    time: '1분',
    features: ['자동 분석', '문단 기준', '빠른 처리']
  },
  {
    id: 'clause',
    title: '단락별로 나누기',
    description: '단락/문장 단위로 세밀하게 분할합니다',
    icon: Zap,
    time: '1분',
    features: ['세밀한 분할', '논리적 단위', '많은 장면']
  },
  {
    id: 'ai',
    title: 'AI가 알아서',
    description: 'Gemini API로 스마트한 분할을 수행합니다',
    icon: Wand2,
    time: '2분',
    features: ['스마트 분석', 'AI 지능형', 'API 활용']
  }
]

export default function SplitOptions({ onSelect, selectedMethod }: SplitOptionsProps) {
  return (
    <div className="split-options-container">
      <div className="options-content">
        <h1>분할 방식 선택</h1>
        <p className="subtitle">소설을 어떻게 장면으로 분할할지 선택하세요</p>

        <div className="options-grid">
          {options.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.id}
                className={`option-card ${selectedMethod === option.id ? 'selected' : ''}`}
                onClick={() => onSelect(option.id as any)}
              >
                <div className="card-header">
                  <Icon size={32} className="card-icon" />
                  <span className="time-badge">{option.time}</span>
                </div>

                <h2>{option.title}</h2>
                <p className="description">{option.description}</p>

                <div className="features-list">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="feature-tag">
                      {feature}
                    </div>
                  ))}
                </div>

                {selectedMethod === option.id && (
                  <div className="selected-indicator">
                    <span>✓ 선택됨</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="action-section">
          <button
            className="btn-continue"
            onClick={() => onSelect(selectedMethod)}
          >
            계속 진행 →
          </button>
        </div>
      </div>
    </div>
  )
}
