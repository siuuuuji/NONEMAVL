import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import FileUpload from '@/components/TextSplit/FileUpload'
import SplitOptions from '@/components/TextSplit/SplitOptions'
import PreviewScenes from '@/components/TextSplit/PreviewScenes'
import TemplateSelector from '@/components/TemplateSelector'
import CanvasEditor from '@/components/CanvasEditor/CanvasEditor'
import './TextSplitPage.css'

type Step = 'upload' | 'options' | 'preview' | 'template' | 'canvas'

interface Scene {
  id: string
  index: number
  text: string
  thumbnail?: string
}

interface SelectedTemplates {
  layout: string
  font: string
  color: string
  animation: string
}

export default function TextSplitPage() {
  const [step, setStep] = useState<Step>('upload')
  const [content, setContent] = useState('')
  const [scenes, setScenes] = useState<Scene[]>([])
  const [splitMethod, setSplitMethod] = useState<'manual' | 'paragraph' | 'clause' | 'ai'>('manual')
  const [selectedTemplates, setSelectedTemplates] = useState<SelectedTemplates | null>(null)

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
    setStep('template')
  }

  const handleTemplateSelect = (templates: SelectedTemplates) => {
    setSelectedTemplates(templates)
    setStep('canvas')
  }

  const handleBack = () => {
    if (step === 'options') setStep('upload')
    else if (step === 'preview') setStep('options')
    else if (step === 'template') setStep('preview')
    else if (step === 'canvas') setStep('template')
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

      {step === 'template' && (
        <TemplateSelector onSelectTemplates={handleTemplateSelect} />
      )}

      {step === 'canvas' && selectedTemplates && (
        <CanvasEditor scenes={scenes} selectedTemplates={selectedTemplates} />
      )}
    </div>
  )
}
