import { YoutubeTranscript } from 'youtube-transcript';
import axios from 'axios';
import { logger } from '../utils/logger';

export async function getVideoTranscript(videoId: string): Promise<string> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    // Combine all transcript segments into a single string
    const fullTranscript = transcript
      .map(segment => segment.text)
      .join(' ');
    
    logger.info(`Transcript fetched successfully. Length: ${fullTranscript.length} characters`);
    return fullTranscript;
  } catch (error) {
    logger.error('Error fetching transcript:', error);
    throw new Error('Failed to fetch video transcript. Make sure the video has captions available.');
  }
}

export async function getVideoInfo(videoId: string): Promise<any> {
  try {
    const response = await axios.get(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    
    return response.data;
  } catch (error) {
    logger.error('Error fetching video info:', error);
    throw new Error('Failed to fetch video information. Please check the video ID.');
  }
}
