import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import VideoInput from './components/VideoInput'
import ProgressDisplay from './components/ProgressDisplay'
import ResultsDisplay from './components/ResultsDisplay'
import { analyzeVideo } from './services/api'
import { AnalysisResult } from './types'
import './App.css'

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState<string[]>([])
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (videoUrl: string) => {
    setIsAnalyzing(true)
    setError(null)
    setResults(null)
    setProgress(['Connecting to server...'])

    try {
      const result = await analyzeVideo(videoUrl, (update) => {
        setProgress(prev => [...prev, update])
      })
      
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50">
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🔍 YouTube Fact-Checker
          </h1>
          <p className="text-gray-600 text-lg">
            AI-powered fact verification for YouTube videos
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <VideoInput 
            onAnalyze={handleAnalyze} 
            isAnalyzing={isAnalyzing}
          />

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {isAnalyzing && (
            <ProgressDisplay progress={progress} />
          )}

          {results && !isAnalyzing && (
            <ResultsDisplay results={results} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
