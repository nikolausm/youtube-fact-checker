import { getVideoInfo, getVideoTranscript } from './transcriptService';
import { extractStatements } from './openaiService';
import { factCheckStatements } from './factCheckService';
import { logger } from '../utils/logger';

export interface AnalysisResult {
  videoInfo: {
    title: string;
    author: string;
    duration: number;
    videoId: string;
  };
  statements: Array<{
    text: string;
    accuracy: number;
    assessment: string;
    sources: string[];
  }>;
  analyzedAt: string;
}

export async function analyzeVideo(videoId: string): Promise<AnalysisResult> {
  try {
    // Step 1: Get video information
    logger.info('Fetching video information...');
    const videoInfo = await getVideoInfo(videoId);

    // Step 2: Get transcript
    logger.info('Fetching video transcript...');
    const transcript = await getVideoTranscript(videoId);

    // Step 3: Extract statements
    logger.info('Extracting statements from transcript...');
    const statements = await extractStatements(transcript);

    // Step 4: Fact-check statements
    logger.info('Fact-checking statements...');
    const factCheckedStatements = await factCheckStatements(statements);

    return {
      videoInfo: {
        title: videoInfo.title,
        author: videoInfo.author_name,
        duration: videoInfo.duration || 0,
        videoId
      },
      statements: factCheckedStatements,
      analyzedAt: new Date().toISOString()
    };
  } catch (error) {
    logger.error('Error in analyzeVideo:', error);
    throw error;
  }
}
