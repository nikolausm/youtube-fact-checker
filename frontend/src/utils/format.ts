export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getAccuracyClass(accuracy: number): string {
  if (accuracy >= 70) return 'accuracy-high';
  if (accuracy >= 40) return 'accuracy-medium';
  return 'accuracy-low';
}

export function getAccuracyLabel(accuracy: number): string {
  if (accuracy >= 70) return 'High';
  if (accuracy >= 40) return 'Medium';
  return 'Low';
}
