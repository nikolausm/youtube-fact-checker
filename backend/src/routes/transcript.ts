import { Router, Request, Response } from 'express';
import { getVideoTranscript } from '../services/transcriptService';
import { logger } from '../utils/logger';

const router = Router();

router.get('/:videoId', async (req: Request, res: Response) => {
  try {
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    logger.info(`Fetching transcript for video: ${videoId}`);
    const transcript = await getVideoTranscript(videoId);
    
    res.json({ videoId, transcript });
  } catch (error) {
    logger.error('Error fetching transcript:', error);
    res.status(500).json({ 
      error: 'Failed to fetch transcript',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
