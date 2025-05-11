
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Emotion } from '@/types';
import { FilterIcon } from 'lucide-react';

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
      <div className="flex items-center gap-2 mb-2">
        <FilterIcon size={16} />
        <h3 className="text-sm font-medium">Filter by emotion:</h3>
      </div>
      <Tabs 
        defaultValue="all" 
        value={selectedFilter || 'all'} 
        onValueChange={(value) => {
          onFilterChange(value === 'all' ? null : value);
        }}
      >
        <TabsList className="w-full overflow-x-auto flex flex-nowrap">
          <TabsTrigger value="all" className="px-3">
            All
          </TabsTrigger>
          {emotions.map((emotion) => (
            <TabsTrigger key={emotion.id} value={emotion.id} className="flex items-center gap-1 px-3">
              <span>{emotion.emoji}</span>
              <span className="hidden sm:inline">{emotion.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TaskFilter;
