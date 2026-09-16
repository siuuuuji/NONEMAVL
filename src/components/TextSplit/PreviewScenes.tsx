import { useState, useEffect } from 'react'
import { AlertCircle, Loader } from 'lucide-react'
import './PreviewScenes.css'

interface Scene {
  id: string
  index: number
  text: string
  thumbnail?: string
}

interface PreviewScenesProps {
  content: string
  method: 'manual' | 'paragraph' | 'clause' | 'ai'
  onComplete: (scenes: Scene[]) => void
}

export default function PreviewScenes({ content, method, onComplete }: PreviewScenesProps) {
  const [scenes, setScenes] = useState<Scene[]>([])
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState('')
  const [selectedSceneId, setSelectedSceneId] = useState<string>('')

  useEffect(() => {
    const processText = async () => {
      setIsProcessing(true)
      setError('')

      try {
        let splitScenes: Scene[] = []

        switch (method) {
          case 'manual':
            // 수동 분할: 초기 스플릿팅 없이 전체 텍스트를 하나의 씬으로
            splitScenes = [{
              id: '0',
              index: 0,
              text: content
            }]
            break

          case 'paragraph':
            // 문단별로 분할 (2개 이상의 공백으로 구분)
            const paragraphs = content.split(/\n\n+/).filter(p => p.trim())
            splitScenes = paragraphs.map((para, idx) => ({
              id: `${idx}`,
              index: idx,
              text: para.trim()
            }))
            break

          case 'clause':
            // 문장별로 분할
            const sentences = content.match(/[^.!?]+[.!?]+/g) || [content]
            splitScenes = sentences.map((sent, idx) => ({
              id: `${idx}`,
              index: idx,
              text: sent.trim()
            }))
            break

          case 'ai':
            // AI 분할 (Gemini API 시뮬레이션)
            // 나중에 실제 API 연결
            const aiSplit = content.split(/\n\n+/).filter(p => p.trim())
            splitScenes = aiSplit.map((para, idx) => ({
              id: `${idx}`,
              index: idx,
              text: para.trim()
            }))
            break
        }

        if (splitScenes.length === 0) {
          throw new Error('텍스트 분할에 실패했습니다')
        }

        setScenes(splitScenes)
        setSelectedSceneId(splitScenes[0].id)
      } catch (err) {
        setError(err instanceof Error ? err.message : '처리 중 오류 발생')
      } finally {
        setIsProcessing(false)
      }
    }

    processText()
  }, [content, method])

  const handleConfirm = () => {
    if (scenes.length > 0) {
      onComplete(scenes)
    }
  }

  if (isProcessing) {
    return (
      <div className="preview-container">
        <div className="loading-state">
          <Loader size={48} className="spinner" />
          <h2>텍스트 분할 중...</h2>
          <p>{method === 'ai' ? 'AI가 최적의 분할점을 찾고 있습니다' : '텍스트를 분석하고 있습니다'}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="preview-container">
        <div className="error-state">
          <AlertCircle size={48} />
          <h2>오류가 발생했습니다</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  const selectedScene = scenes.find(s => s.id === selectedSceneId)

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1>분할 미리보기</h1>
        <p className="subtitle">총 {scenes.length}개의 장면으로 분할되었습니다</p>
      </div>

      <div className="preview-layout">
        <div className="scenes-list">
          <div className="list-header">
            <h3>장면 목록</h3>
            <span className="count">{scenes.length}</span>
          </div>

          <div className="scenes-scroll">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                className={`scene-item ${selectedSceneId === scene.id ? 'active' : ''}`}
                onClick={() => setSelectedSceneId(scene.id)}
              >
                <div className="scene-number">#{scene.index + 1}</div>
                <div className="scene-preview">
                  {scene.text.substring(0, 80)}
                  {scene.text.length > 80 ? '...' : ''}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="preview-viewer">
          {selectedScene && (
            <>
              <div className="viewer-header">
                <h2>장면 #{selectedScene.index + 1}</h2>
                <span className="char-count">
                  {selectedScene.text.length} 글자
                </span>
              </div>

              <div className="viewer-content">
                <p>{selectedScene.text}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="preview-actions">
        <button className="btn-secondary">수정하기</button>
        <button className="btn-primary" onClick={handleConfirm}>
          확인 및 진행 →
        </button>
      </div>
    </div>
  )
}
