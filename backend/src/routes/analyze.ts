import { Router, Request, Response } from 'express';
import { analyzeVideo } from '../services/analyzeService';
import { validateYouTubeUrl } from '../utils/validators';
import { logger } from '../utils/logger';

const router = Router();

interface AnalyzeRequest {
  videoUrl: string;
}

router.post('/', async (req: Request<{}, {}, AnalyzeRequest>, res: Response) => {
  try {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ error: 'Video URL is required' });
    }

    const videoId = validateYouTubeUrl(videoUrl);
    if (!videoId) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    logger.info(`Analyzing video: ${videoId}`);
    const results = await analyzeVideo(videoId);
    
    res.json(results);
  } catch (error) {
    logger.error('Error analyzing video:', error);
    res.status(500).json({ 
      error: 'Failed to analyze video',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
