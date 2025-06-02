import { useState } from 'react';
import toast from 'react-hot-toast';

interface VideoInputProps {
  onAnalyze: (videoUrl: string) => void;
  isAnalyzing: boolean;
}

export default function VideoInput({ onAnalyze, isAnalyzing }: VideoInputProps) {
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoUrl.trim()) {
      toast.error('Please enter a YouTube URL');
      return;
    }
    
    // Basic YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    if (!youtubeRegex.test(videoUrl)) {
      toast.error('Please enter a valid YouTube URL');
      return;
    }
    
    onAnalyze(videoUrl);
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Analyze a YouTube Video</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="video-url" className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Video URL
          </label>
          <input
            id="video-url"
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="input-field"
            disabled={isAnalyzing}
          />
        </div>
        
        <button
          type="submit"
          disabled={isAnalyzing}
          className="btn-primary w-full"
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            'Analyze Video'
          )}
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Enter a YouTube video URL to fact-check the claims made in the video.</p>
      </div>
    </div>
  );
}
