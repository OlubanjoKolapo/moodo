
export type Emotion = {
  id: string;
  emoji: string;
  name: string;
};

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  emotion: Emotion | null;
  createdAt: string;
  completedAt: string | null;
};

export type EmotionCounts = {
  [key: string]: number;
};

export type DailySummary = {
  totalTasks: number;
  completedTasks: number;
  emotionCounts: EmotionCounts;
};
