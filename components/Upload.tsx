import { CheckCircle2, ImageIcon, UploadIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useOutletContext } from 'react-router'
import { PROGRESS_INCREMENT, REDIRECT_DELAY_MS } from '../lib/constants'

interface UploadProps {
  onComplete?: (base64: string) => void
}

export const Upload: React.FC<UploadProps> = ({ onComplete }) => {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<number | null>(null)

  const { isSignedIn } = useOutletContext<AuthContextType>()

  const processFile = (selectedFile: File) => {
    if (!isSignedIn) return

    setFile(selectedFile)
    setProgress(0)

    const reader = new FileReader()

    reader.onload = () => {
      const base64String = reader.result as string

      if (intervalRef.current) clearInterval(intervalRef.current)

      intervalRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current)

            setTimeout(() => {
              if (onComplete) onComplete(base64String)
            }, REDIRECT_DELAY_MS)

            return 100
          }
          return prev + PROGRESS_INCREMENT
        })
      }, 100)
    }

    reader.readAsDataURL(selectedFile)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isSignedIn) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isSignedIn) return
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSignedIn) return
    const files = e.target.files
    if (files && files.length > 0) {
      processFile(files[0])
    }
  }
  return (
    <div className='upload'>
      {!file ? (
        <div
          className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          <input
            type='file'
            onChange={handleFileChange}
            disabled={!isSignedIn}
            className='drop-input'
            accept='.jpg,.jpeg,.png'
          />
          <div className='drop-content'>
            <div className='drop-icon'>
              <UploadIcon size={24} />
            </div>
            <p>
              {isSignedIn
                ? 'Drag and drop or click to upload your floor plan here'
                : 'Sing in or sing up to upload your floor plan here'}
            </p>
            <p className='help'>Maximum file size: 50MB</p>
          </div>
        </div>
      ) : (
        <div className='upload-status'>
          <div className='status-content'>
            <div className='status-icon'>
              {progress === 100 ? (
                <CheckCircle2 size={24} />
              ) : (
                <ImageIcon size={24} />
              )}
            </div>
            <h3>{file.name}</h3>
            <div className='progress'>
              <div
                className='bar'
                style={{ width: `${progress}%` }}
                role='progressbar'
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
              <p>{progress < 100 ? `Analyzing...` : 'Redirecting...'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
