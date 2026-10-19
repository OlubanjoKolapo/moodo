import React from 'react';
import { Emotion } from '@/types';
import { LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmotionIcon } from './EmotionIcon';

interface TaskFilterProps {
  emotions: Emotion[];
  selectedFilter: string | null;
  onFilterChange: (value: string | null) => void;
}

const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm font-medium transition-all',
      active
        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
        : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
    )}
  >
    {children}
  </button>
);

const TaskFilter: React.FC<TaskFilterProps> = ({ emotions, selectedFilter, onFilterChange }) => (
  <div className="mb-5 flex flex-wrap gap-2">
    <Chip active={selectedFilter === null} onClick={() => onFilterChange(null)}>
      <LayoutGrid size={15} strokeWidth={1.75} /> All
    </Chip>
    {emotions.map((e) => (
      <Chip key={e.id} active={selectedFilter === e.id} onClick={() => onFilterChange(selectedFilter === e.id ? null : e.id)}>
        <EmotionIcon id={e.id} size={15} /> {e.name}
      </Chip>
    ))}
  </div>
);

export default TaskFilter;
