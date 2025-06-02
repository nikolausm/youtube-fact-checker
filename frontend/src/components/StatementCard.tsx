import { Statement } from '../types';
import { getAccuracyClass, getAccuracyLabel } from '../utils/format';

interface StatementCardProps {
  statement: Statement;
  index: number;
}

export default function StatementCard({ statement, index }: StatementCardProps) {
  const accuracyClass = getAccuracyClass(statement.accuracy);
  const accuracyLabel = getAccuracyLabel(statement.accuracy);
  
  return (
    <div className="card hover:shadow-xl transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold">
          {index}
        </div>
        
        <div className="flex-1 space-y-3">
          <p className="text-gray-800 font-medium">{statement.text}</p>
          
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">Accuracy</span>
                <span className={`text-sm font-bold ${accuracyClass === 'accuracy-high' ? 'text-green-600' : accuracyClass === 'accuracy-medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {statement.accuracy}% - {accuracyLabel}
                </span>
              </div>
              <div className="accuracy-bar">
                <div 
                  className={`accuracy-fill ${accuracyClass}`}
                  style={{ width: `${statement.accuracy}%` }}
                />
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-1 font-medium">Assessment:</p>
            <p className="text-gray-700">{statement.assessment}</p>
          </div>
          
          {statement.sources.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-1 font-medium">Sources:</p>
              <div className="flex flex-wrap gap-2">
                {statement.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={`https://www.google.com/search?q=${encodeURIComponent(source)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-800 underline"
                  >
                    {source}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
