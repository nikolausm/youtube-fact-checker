import { Router, Request, Response } from 'express';
import { factCheckStatements } from '../services/factCheckService';
import { logger } from '../utils/logger';

const router = Router();

interface FactCheckRequest {
  statements: string[];
}

router.post('/', async (req: Request<{}, {}, FactCheckRequest>, res: Response) => {
  try {
    const { statements } = req.body;

    if (!statements || !Array.isArray(statements) || statements.length === 0) {
      return res.status(400).json({ error: 'Statements array is required' });
    }

    logger.info(`Fact-checking ${statements.length} statements`);
    const results = await factCheckStatements(statements);
    
    res.json(results);
  } catch (error) {
    logger.error('Error fact-checking statements:', error);
    res.status(500).json({ 
      error: 'Failed to fact-check statements',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
