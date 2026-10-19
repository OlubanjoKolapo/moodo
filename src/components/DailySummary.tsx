
import React from 'react';
import { DailySummary as DailySummaryType, Emotion } from '@/types';
import { TrendingUp, Download } from 'lucide-react';
import { EmotionIcon } from './EmotionIcon';
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

  const R = 42, C = 2 * Math.PI * R;
  return (
    <section className="surface h-full p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Today</p>
          <h2 className="font-display text-3xl">Summary</h2>
        </div>
        <TrendingUp size={20} strokeWidth={1.5} className="text-primary" />
      </div>

      <div className="flex items-center gap-5">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={R} fill="none" strokeWidth="8" className="stroke-muted" />
            <circle cx="50" cy="50" r={R} fill="none" strokeWidth="8" strokeLinecap="round" className="stroke-primary transition-all duration-700"
              strokeDasharray={C} strokeDashoffset={C - (completionPercentage / 100) * C} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl leading-none">{completionPercentage.toFixed(0)}%</span>
          </div>
        </div>
        <div>
          <p className="text-2xl font-semibold">{completedTasks}<span className="text-muted-foreground">/{totalTasks}</span></p>
          <p className="text-sm text-muted-foreground">tasks completed</p>
          {dominantEmotion && (
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">Mostly</span>
              <EmotionIcon id={(dominantEmotion as Emotion).id} size={15} className="text-primary" />
              <strong className="font-semibold">{(dominantEmotion as Emotion).name}</strong>
            </p>
          )}
        </div>
      </div>

      <div className="mt-7">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Mood breakdown</h3>
        {totalTasks > 0 ? (
          <ul className="space-y-3">
            {emotions.map((emotion) => {
              const count = emotionCounts[emotion.id] || 0;
              const pct = totalTasks ? (count / totalTasks) * 100 : 0;
              return (
                <li key={emotion.id} className="text-sm">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2"><EmotionIcon id={emotion.id} size={15} className="text-primary" />{emotion.name}</span>
                    <span className="tabular-nums text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">Your mood trends will appear as you add tasks.</p>
        )}
      </div>

      <Button onClick={handleDownload} variant="outline" className="mt-7 h-11 w-full gap-2 rounded-xl border-primary/25 text-primary hover:bg-primary hover:text-primary-foreground">
        <Download size={16} /> Download today's report
      </Button>
    </section>
  );
};

export default DailySummary;
