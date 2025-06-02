import OpenAI from 'openai';
import { logger } from '../utils/logger';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractStatements(transcript: string): Promise<string[]> {
  try {
    const prompt = `Analyze the following video transcript and extract all factual claims that can be fact-checked. 
    Focus on statements that:
    - Make specific claims about facts, statistics, or events
    - Can be verified or disproven with evidence
    - Are not opinions or subjective statements
    
    Return the statements as a JSON array of strings.
    
    Transcript:
    ${transcript.substring(0, 8000)} // Limit to avoid token limits
    
    Format: ["Statement 1", "Statement 2", ...]`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at identifying factual claims in text. Extract only verifiable, factual statements.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    try {
      const parsed = JSON.parse(content);
      const statements = parsed.statements || parsed.claims || Object.values(parsed)[0];
      
      if (Array.isArray(statements)) {
        logger.info(`Extracted ${statements.length} statements`);
        return statements;
      }
      
      throw new Error('Invalid response format');
    } catch (parseError) {
      logger.error('Error parsing OpenAI response:', parseError);
      // Fallback: try to extract statements manually
      const lines = content.split('\n').filter(line => line.trim().startsWith('-') || line.trim().match(/^\d+\./));
      return lines.map(line => line.replace(/^[-\d.\s]+/, '').trim()).filter(s => s.length > 0);
    }
  } catch (error) {
    logger.error('Error extracting statements:', error);
    throw new Error('Failed to extract statements from transcript');
  }
}

export async function verifyStatement(statement: string): Promise<{
  accuracy: number;
  assessment: string;
  sources: string[];
}> {
  try {
    const prompt = `Fact-check the following statement and provide:
    1. An accuracy score from 0-100 (where 100 is completely accurate)
    2. A brief assessment explaining the rating
    3. Credible sources that support or refute the claim
    
    Statement: "${statement}"
    
    Return as JSON with format:
    {
      "accuracy": number,
      "assessment": "string",
      "sources": ["source1", "source2"]
    }`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a fact-checker. Evaluate statements objectively and cite credible sources.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 500,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    const result = JSON.parse(content);
    return {
      accuracy: Math.min(100, Math.max(0, result.accuracy || 50)),
      assessment: result.assessment || 'Unable to verify',
      sources: result.sources || []
    };
  } catch (error) {
    logger.error('Error verifying statement:', error);
    throw error;
  }
}
