import { useState } from 'react'
import { Plus } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import ProjectList from '@/components/ProjectList'
import TextSplitPage from '@/pages/TextSplitPage'
import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('projects')
  const [projects, setProjects] = useState<any[]>([])
  const [isCreatingProject, setIsCreatingProject] = useState(false)

  const handleNewProject = () => {
    setIsCreatingProject(true)
  }

  return (
    <div className="app">
      {isCreatingProject ? (
        <TextSplitPage />
      ) : (
        <>
          <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
          <main className="main-content">
            {currentPage === 'projects' && (
              <div className="projects-page">
                <div className="page-header">
                  <h1>마이 프로젝트</h1>
                  <button className="btn-primary" onClick={handleNewProject}>
                    <Plus size={20} />
                    새 프로젝트
                  </button>
                </div>
                <ProjectList projects={projects} />
              </div>
            )}
          </main>
        </>
      )}
    </div>
  )
}
