import { Trash2, Copy, ChevronRight } from 'lucide-react'
import './SceneListPanel.css'

interface Scene {
  id: string
  index: number
  text: string
  thumbnail?: string
}

interface PanelProps {
  scenes: Scene[]
  selectedSceneId: string
  onSelectScene: (sceneId: string) => void
  onDeleteScene: (sceneId: string) => void
  onDuplicateScene: (sceneId: string) => void
}

export default function SceneListPanel({
  scenes,
  selectedSceneId,
  onSelectScene,
  onDeleteScene,
  onDuplicateScene
}: PanelProps) {
  return (
    <div className="scene-list-panel">
      <div className="panel-header">
        <h3>씬 목록</h3>
        <span className="scene-count">{scenes.length}</span>
      </div>

      <div className="scenes-list">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className={`scene-item ${selectedSceneId === scene.id ? 'active' : ''}`}
            onClick={() => onSelectScene(scene.id)}
          >
            <div className="scene-content">
              <div className="scene-number">#{scene.index + 1}</div>
              <div className="scene-preview">
                <p className="scene-text">
                  {scene.text.substring(0, 60)}
                  {scene.text.length > 60 ? '...' : ''}
                </p>
                <span className="char-count">{scene.text.length}자</span>
              </div>
            </div>

            <div className="scene-actions">
              <button
                className="action-icon duplicate"
                onClick={(e) => {
                  e.stopPropagation()
                  onDuplicateScene(scene.id)
                }}
                title="복제"
              >
                <Copy size={16} />
              </button>
              <button
                className="action-icon delete"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteScene(scene.id)
                }}
                title="삭제"
              >
                <Trash2 size={16} />
              </button>
              <ChevronRight size={16} className="chevron" />
            </div>
          </div>
        ))}
      </div>

      <div className="panel-info">
        <p>총 {scenes.length}개 씬</p>
      </div>
    </div>
  )
}
