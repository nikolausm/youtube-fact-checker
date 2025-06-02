import { AnalysisResult } from '../types';
import { formatDuration, formatDate, getAccuracyClass, getAccuracyLabel } from '../utils/format';
import StatementCard from './StatementCard';

interface ResultsDisplayProps {
  results: AnalysisResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const exportToCSV = () => {
    const headers = ['#', 'Statement', 'Accuracy', 'Assessment', 'Sources'];
    const rows = results.statements.map((statement, index) => [
      index + 1,
      `"${statement.text.replace(/"/g, '""')}"`,
      `${statement.accuracy}%`,
      `"${statement.assessment.replace(/"/g, '""')}"`,
      `"${statement.sources.join(', ')}"`
    ]);
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fact-check-${results.videoInfo.videoId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Video Info */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-2">{results.videoInfo.title}</h2>
        <div className="text-gray-600 space-y-1">
          <p>Channel: {results.videoInfo.author}</p>
          <p>Duration: {formatDuration(results.videoInfo.duration)}</p>
          <p>Analyzed: {formatDate(results.analyzedAt)}</p>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">
            {results.statements.length}
          </div>
          <p className="text-gray-600">Statements Analyzed</p>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">
            {results.statements.filter(s => s.accuracy >= 70).length}
          </div>
          <p className="text-gray-600">High Accuracy</p>
        </div>
        
        <div className="card text-center">
          <div className="text-3xl font-bold text-red-600">
            {results.statements.filter(s => s.accuracy < 40).length}
          </div>
          <p className="text-gray-600">Low Accuracy</p>
        </div>
      </div>
      
      {/* Statements */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Fact-Check Results</h3>
          <button onClick={exportToCSV} className="btn-primary">
            Export CSV
          </button>
        </div>
        
        {results.statements.map((statement, index) => (
          <StatementCard
            key={index}
            statement={statement}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
