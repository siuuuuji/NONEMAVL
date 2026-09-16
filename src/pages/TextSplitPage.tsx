import { useState } from 'react'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import FileUpload from '@/components/TextSplit/FileUpload'
import SplitOptions from '@/components/TextSplit/SplitOptions'
import PreviewScenes from '@/components/TextSplit/PreviewScenes'
import './TextSplitPage.css'

type Step = 'upload' | 'options' | 'preview' | 'editor'

interface Scene {
  id: string
  index: number
  text: string
  thumbnail?: string
}

export default function TextSplitPage() {
  const [step, setStep] = useState<Step>('upload')
  const [content, setContent] = useState('')
  const [scenes, setScenes] = useState<Scene[]>([])
  const [splitMethod, setSplitMethod] = useState<'manual' | 'paragraph' | 'clause' | 'ai'>('manual')

  const handleFileUpload = (text: string) => {
    setContent(text)
    setStep('options')
  }

  const handleSplitMethodSelect = (method: 'manual' | 'paragraph' | 'clause' | 'ai') => {
    setSplitMethod(method)
    setStep('preview')
  }

  const handlePreviewComplete = (splitScenes: Scene[]) => {
    setScenes(splitScenes)
    setStep('editor')
  }

  const handleBack = () => {
    if (step === 'options') setStep('upload')
    else if (step === 'preview') setStep('options')
    else if (step === 'editor') setStep('preview')
  }

  return (
    <div className="text-split-page">
      {step !== 'upload' && (
        <button className="btn-back" onClick={handleBack}>
          <ChevronLeft size={20} />
          이전
        </button>
      )}

      {step === 'upload' && (
        <FileUpload onUpload={handleFileUpload} />
      )}

      {step === 'options' && (
        <SplitOptions
          onSelect={handleSplitMethodSelect}
          selectedMethod={splitMethod}
        />
      )}

      {step === 'preview' && (
        <PreviewScenes
          content={content}
          method={splitMethod}
          onComplete={handlePreviewComplete}
        />
      )}

      {step === 'editor' && (
        <div className="step-container">
          <h2>장면 편집</h2>
          <p className="subtitle">총 {scenes.length}개 장면으로 분할되었습니다</p>
          {/* Scene editor will go here */}
        </div>
      )}
    </div>
  )
}
