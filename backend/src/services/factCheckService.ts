import { verifyStatement } from './openaiService';
import { logger } from '../utils/logger';

export interface FactCheckResult {
  text: string;
  accuracy: number;
  assessment: string;
  sources: string[];
}

export async function factCheckStatements(statements: string[]): Promise<FactCheckResult[]> {
  const results: FactCheckResult[] = [];
  
  // Process statements in parallel with a limit to avoid rate limiting
  const batchSize = 3;
  
  for (let i = 0; i < statements.length; i += batchSize) {
    const batch = statements.slice(i, i + batchSize);
    
    const batchResults = await Promise.all(
      batch.map(async (statement) => {
        try {
          const verification = await verifyStatement(statement);
          return {
            text: statement,
            ...verification
          };
        } catch (error) {
          logger.error(`Error fact-checking statement: ${statement}`, error);
          return {
            text: statement,
            accuracy: 50,
            assessment: 'Unable to verify this statement due to an error',
            sources: []
          };
        }
      })
    );
    
    results.push(...batchResults);
    
    // Add a small delay between batches to avoid rate limiting
    if (i + batchSize < statements.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  logger.info(`Fact-checked ${results.length} statements`);
  return results;
}
