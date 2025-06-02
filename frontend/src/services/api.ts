import axios from 'axios';
import { AnalysisResult } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 300000, // 5 minutes for long analysis
});

export async function analyzeVideo(
  videoUrl: string,
  onProgress?: (message: string) => void
): Promise<AnalysisResult> {
  try {
    // Simulate progress updates
    onProgress?.('Extracting video information...');
    
    const response = await api.post<AnalysisResult>('/api/analyze', {
      videoUrl,
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to analyze video');
    }
    throw error;
  }
}

export async function getTranscript(videoId: string): Promise<string> {
  const response = await api.get<{ transcript: string }>(`/api/transcript/${videoId}`);
  return response.data.transcript;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await api.get('/api/health');
    return response.data.status === 'healthy';
  } catch {
    return false;
  }
}
