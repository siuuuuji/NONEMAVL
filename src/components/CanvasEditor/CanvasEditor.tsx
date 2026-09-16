import { useState } from 'react'
import { Save, Plus, Trash2, Copy, ZoomIn, ZoomOut, Download } from 'lucide-react'
import CanvasPreview from './CanvasPreview'
import SceneListPanel from './SceneListPanel'
import PropertiesPanel from './PropertiesPanel'
import './CanvasEditor.css'

interface Scene {
  id: string
  index: number
  text: string
  thumbnail?: string
  imageUrl?: string
  imagePosition?: string
}

interface EditorProps {
  scenes: Scene[]
  selectedTemplates: {
    layout: string
    font: string
    color: string
    animation: string
  }
}

export default function CanvasEditor({ scenes: initialScenes, selectedTemplates }: EditorProps) {
  const [scenes, setScenes] = useState<Scene[]>(initialScenes)
  const [selectedSceneId, setSelectedSceneId] = useState(initialScenes[0]?.id || '')
  const [zoom, setZoom] = useState(100)
  const [isSaving, setIsSaving] = useState(false)

  const selectedScene = scenes.find(s => s.id === selectedSceneId)

  const handleSceneUpdate = (sceneId: string, updates: Partial<Scene>) => {
    setScenes(scenes.map(s =>
      s.id === sceneId ? { ...s, ...updates } : s
    ))
  }

  const handleDeleteScene = (sceneId: string) => {
    const filtered = scenes.filter(s => s.id !== sceneId)
    setScenes(filtered)
    if (selectedSceneId === sceneId) {
      setSelectedSceneId(filtered[0]?.id || '')
    }
  }

  const handleDuplicateScene = (sceneId: string) => {
    const scene = scenes.find(s => s.id === sceneId)
    if (!scene) return

    const newScene = {
      ...scene,
      id: `scene-${Date.now()}`,
      index: scenes.length
    }
    setScenes([...scenes, newScene])
    setSelectedSceneId(newScene.id)
  }

  const handleSaveProject = async () => {
    setIsSaving(true)
    try {
      // Save project logic will be implemented
      console.log('Saving project...', { scenes, selectedTemplates })
      await new Promise(resolve => setTimeout(resolve, 1000))
    } finally {
      setIsSaving(false)
    }
  }

  const handleExport = () => {
    // Export logic will be implemented
    console.log('Exporting project...')
  }

  return (
    <div className="canvas-editor">
      <div className="editor-toolbar">
        <div className="toolbar-section">
          <h2 className="editor-title">캔버스 에디터</h2>
          <div className="zoom-controls">
            <button
              className="zoom-btn"
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              title="축소"
            >
              <ZoomOut size={18} />
            </button>
            <span className="zoom-percentage">{zoom}%</span>
            <button
              className="zoom-btn"
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              title="확대"
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        <div className="toolbar-section">
          <button className="action-btn save-btn" onClick={handleSaveProject} disabled={isSaving}>
            <Save size={18} />
            <span>{isSaving ? '저장 중...' : '저장'}</span>
          </button>
          <button className="action-btn export-btn" onClick={handleExport}>
            <Download size={18} />
            <span>내보내기</span>
          </button>
        </div>
      </div>

      <div className="editor-content">
        <SceneListPanel
          scenes={scenes}
          selectedSceneId={selectedSceneId}
          onSelectScene={setSelectedSceneId}
          onDeleteScene={handleDeleteScene}
          onDuplicateScene={handleDuplicateScene}
        />

        <CanvasPreview
          scene={selectedScene}
          template={selectedTemplates}
          zoom={zoom}
        />

        {selectedScene && (
          <PropertiesPanel
            scene={selectedScene}
            template={selectedTemplates}
            onUpdate={(updates) => handleSceneUpdate(selectedSceneId, updates)}
          />
        )}
      </div>
    </div>
  )
}
