interface ProgressDisplayProps {
  progress: string[];
}

export default function ProgressDisplay({ progress }: ProgressDisplayProps) {
  return (
    <div className="card mt-6">
      <h3 className="text-lg font-semibold mb-4">Analysis Progress</h3>
      
      <div className="space-y-2">
        {progress.map((message, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-500 mt-1.5 mr-3 animate-pulse-dot" />
            <p className="text-gray-700">{message}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-2">
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
