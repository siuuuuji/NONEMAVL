import { FileText, MoreVertical } from 'lucide-react'
import './ProjectList.css'

interface Project {
  id: string
  title: string
  description: string
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

interface ProjectListProps {
  projects: Project[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="project-list">
      {projects.length === 0 ? (
        <div className="empty-state">
          <FileText size={64} />
          <h2>프로젝트가 없습니다</h2>
          <p>새로운 프로젝트를 만들어 시작하세요</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-thumbnail">
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.title} />
                ) : (
                  <div className="thumbnail-placeholder">
                    <FileText size={40} />
                  </div>
                )}
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-meta">
                  <span className="date">
                    {new Date(project.updatedAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              </div>
              <button className="project-menu">
                <MoreVertical size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
