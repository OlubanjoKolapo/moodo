
import React from 'react';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleCompletion, onDelete }) => {
  const formattedDate = format(new Date(task.createdAt), 'MMM d, h:mm a');
  
  return (
    <div className={cn(
      "border p-4 rounded-lg bg-white shadow-sm",
      "transition-all duration-200 ease-in-out",
      task.completed && "bg-muted/50"
    )}>
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={() => onToggleCompletion(task.id)}
          className="h-5 w-5"
        />
        
        <div className="flex-grow">
          <p className={cn(
            "text-lg font-medium",
            task.completed && "line-through text-muted-foreground"
          )}>
            {task.text}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Calendar size={12} />
            <span>{formattedDate}</span>
          </div>
        </div>
        
        {task.emotion && (
          <div className="flex items-center gap-1 bg-accent rounded-full px-3 py-1">
            <span className="text-lg" role="img" aria-label={task.emotion.name}>
              {task.emotion.emoji}
            </span>
            <span className="text-sm font-medium">{task.emotion.name}</span>
          </div>
        )}
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onDelete(task.id)}
          className="text-muted-foreground hover:text-destructive"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;
