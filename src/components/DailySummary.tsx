
import React from 'react';
import { DailySummary as DailySummaryType, Emotion } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DailySummaryProps {
  summary: DailySummaryType;
  emotions: Emotion[];
  onDownloadReport: () => { blob: Blob, fileName: string } | null;
}

const DailySummary: React.FC<DailySummaryProps> = ({ summary, emotions, onDownloadReport }) => {
  const { totalTasks, completedTasks, emotionCounts } = summary;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  // Find the dominant emotion (the one with highest count)
  let dominantEmotion = null;
  let maxCount = 0;
  
  Object.entries(emotionCounts).forEach(([emotionId, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantEmotion = emotions.find(e => e.id === emotionId) || null;
    }
  });

  const handleDownload = () => {
    const report = onDownloadReport();
    if (report) {
      const { blob, fileName } = report;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ChartBar size={20} /> Today's Summary
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Download Report</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Task completion progress */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">
                Completion: {completedTasks} of {totalTasks} tasks
              </span>
              <span className="text-sm font-medium">
                {completionPercentage.toFixed(0)}%
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          
          {/* Emotion summary */}
          <div>
            <h4 className="text-sm font-medium mb-2">Emotion Breakdown:</h4>
            {Object.keys(emotionCounts).length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(emotionCounts).map(([emotionId, count]) => {
                  const emotion = emotions.find(e => e.id === emotionId);
                  if (!emotion) return null;
                  
                  return (
                    <div key={emotionId} className="flex items-center gap-2 bg-accent/50 rounded-md px-2 py-1">
                      <span className="text-lg">{emotion.emoji}</span>
                      <span className="text-sm">{emotion.name}: {count}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No emotions tracked yet</p>
            )}
          </div>

          {/* Dominant emotion */}
          {dominantEmotion && (
            <div>
              <h4 className="text-sm font-medium">Today's primary mood:</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl">{dominantEmotion.emoji}</span>
                <span className="font-medium">{dominantEmotion.name}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySummary;
