
import React from 'react';
import { DailySummary as DailySummaryType, Emotion } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartBar, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";

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
      toast({
        title: "Report Downloaded",
        description: `Your task report has been saved as ${fileName}`,
      });
    } else {
      toast({
        title: "Nothing to download",
        description: "Add some tasks to generate a report",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ChartBar size={20} className="text-primary" /> Today's Summary
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-1 transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Download</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {/* Task completion progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">
                Completion Progress
              </span>
              <span className="text-sm font-medium bg-secondary px-2 py-1 rounded-full">
                {completedTasks} of {totalTasks} tasks ({completionPercentage.toFixed(0)}%)
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2.5" />
          </div>
          
          {/* Emotion summary */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <FileText size={16} className="text-primary" />
              Emotion Breakdown:
            </h4>
            {Object.keys(emotionCounts).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(emotionCounts).map(([emotionId, count]) => {
                  const emotion = emotions.find(e => e.id === emotionId);
                  if (!emotion) return null;
                  
                  return (
                    <div 
                      key={emotionId} 
                      className="flex items-center gap-2 bg-accent/50 rounded-md px-3 py-1.5 border border-border hover:border-primary transition-colors"
                    >
                      <span className="text-lg">{emotion.emoji}</span>
                      <span className="text-sm">{emotion.name}: <strong>{count}</strong></span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                No emotions tracked yet
              </div>
            )}
          </div>

          {/* Dominant emotion */}
          {dominantEmotion && (
            <div className="bg-accent/30 p-3 rounded-md border border-border">
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
