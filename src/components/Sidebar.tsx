import { FileText, BookOpen, Settings, LogOut } from 'lucide-react'
import './Sidebar.css'

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <BookOpen size={24} />
          <span>NONEMAVL</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${currentPage === 'projects' ? 'active' : ''}`}
          onClick={() => onPageChange('projects')}
        >
          <FileText size={20} />
          <span>프로젝트</span>
        </button>
        <button
          className={`nav-item ${currentPage === 'editor' ? 'active' : ''}`}
          onClick={() => onPageChange('editor')}
        >
          <BookOpen size={20} />
          <span>편집기</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={20} />
          <span>설정</span>
        </button>
        <button className="nav-item logout">
          <LogOut size={20} />
          <span>로그아웃</span>
        </button>
      </div>
    </aside>
  )
}
