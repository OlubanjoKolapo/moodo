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
      'inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all',
      active
        ? 'border-primary bg-primary text-primary-foreground shadow-sm'
        : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
    )}
  >
    {children}
  </button>
);

const TaskFilter: React.FC<TaskFilterProps> = ({ emotions, selectedFilter, onFilterChange }) => (
  <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
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
