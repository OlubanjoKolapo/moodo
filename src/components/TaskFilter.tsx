
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Emotion } from '@/types';
import { FilterIcon, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskFilterProps {
  emotions: Emotion[];
  selectedFilter: string | null;
  onFilterChange: (value: string | null) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ 
  emotions, 
  selectedFilter, 
  onFilterChange 
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <FilterIcon size={16} className="text-primary" />
        <h3 className="text-sm font-medium">Filter by emotion:</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        <div 
          className={cn(
            "flex items-center gap-2 rounded-md border p-2 cursor-pointer transition-all",
            selectedFilter === null ? "bg-primary/10 border-primary/30" : "bg-background hover:bg-muted/50"
          )}
          onClick={() => onFilterChange(null)}
        >
          <CheckSquare 
            size={18} 
            className={cn(
              "transition-opacity",
              selectedFilter === null ? "text-primary opacity-100" : "opacity-40"
            )}
          />
          <span className={cn(
            "text-sm font-medium",
            selectedFilter === null ? "text-primary" : "text-muted-foreground"
          )}>
            All
          </span>
        </div>
        
        {emotions.map((emotion) => (
          <div
            key={emotion.id}
            className={cn(
              "flex items-center gap-2 rounded-md border p-2 cursor-pointer transition-all",
              selectedFilter === emotion.id ? "bg-primary/10 border-primary/30" : "bg-background hover:bg-muted/50"
            )}
            onClick={() => onFilterChange(selectedFilter === emotion.id ? null : emotion.id)}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{emotion.emoji}</span>
              <CheckSquare 
                size={18} 
                className={cn(
                  "transition-opacity",
                  selectedFilter === emotion.id ? "text-primary opacity-100" : "opacity-40"
                )}
              />
            </div>
            <span className={cn(
              "text-sm font-medium",
              selectedFilter === emotion.id ? "text-primary" : "text-muted-foreground"
            )}>
              {emotion.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
