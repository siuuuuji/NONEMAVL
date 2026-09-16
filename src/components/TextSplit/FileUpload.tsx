import { useState, useRef } from 'react'
import { Upload, FileText, AlertCircle } from 'lucide-react'
import './FileUpload.css'

interface FileUploadProps {
  onUpload: (text: string) => void
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setError('')
    setIsLoading(true)

    try {
      if (!file.type.includes('text') && !file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
        throw new Error('텍스트 파일만 지원합니다 (.txt, .md)')
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('파일 크기는 5MB 이하여야 합니다')
      }

      const text = await file.text()
      if (text.trim().length < 100) {
        throw new Error('최소 100자 이상의 텍스트가 필요합니다')
      }

      onUpload(text)
    } catch (err) {
      setError(err instanceof Error ? err.message : '파일 처리 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  return (
    <div className="file-upload-container">
      <div className="upload-content">
        <h1>소설 IP 업로드</h1>
        <p className="subtitle">당신의 소설을 인터랙티브 프로토타입으로 변환하세요</p>

        <div
          className={`upload-zone ${isDragging ? 'dragging' : ''} ${isLoading ? 'loading' : ''}`}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="upload-icon">
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <Upload size={48} />
            )}
          </div>
          <h2>소설 파일을 드래그하거나 클릭하세요</h2>
          <p className="zone-subtitle">
            TXT, Markdown 형식 지원 (최대 5MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="features">
          <div className="feature">
            <FileText size={20} />
            <div>
              <h3>자동 분할</h3>
              <p>다양한 방식으로 소설을 장면별로 분할</p>
            </div>
          </div>
          <div className="feature">
            <FileText size={20} />
            <div>
              <h3>AI 지원</h3>
              <p>Gemini API로 스마트한 텍스트 분석</p>
            </div>
          </div>
          <div className="feature">
            <FileText size={20} />
            <div>
              <h3>수동 편집</h3>
              <p>각 장면을 세밀하게 조정 가능</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
