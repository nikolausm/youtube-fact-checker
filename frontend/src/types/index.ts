export interface VideoInfo {
  title: string;
  author: string;
  duration: number;
  videoId: string;
}

export interface Statement {
  text: string;
  accuracy: number;
  assessment: string;
  sources: string[];
}

export interface AnalysisResult {
  videoInfo: VideoInfo;
  statements: Statement[];
  analyzedAt: string;
}

export interface AnalysisProgress {
  step: string;
  message: string;
  progress?: number;
}
