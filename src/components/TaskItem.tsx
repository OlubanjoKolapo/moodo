
import React, { useState, useEffect } from 'react';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Calendar, Edit, Check } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { Input } from '@/components/ui/input';

// List of motivational quotes
const MOTIVATIONAL_QUOTES = [
  "Great job on completing that task!",
  "One step closer to your goals!",
  "Keep up the great work!",
  "You're making excellent progress!",
  "Success is built one task at a time!",
  "You're crushing it today!",
  "That's the way to get things done!",
  "Productivity win!",
  "Task complete, what's next on your journey?",
  "You're unstoppable today!"
];

interface TaskItemProps {
  task: Task;
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleCompletion, onDelete, onEdit }) => {
  const formattedDate = format(new Date(task.createdAt), 'MMM d, h:mm a');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const { toast } = useToast();
  
  const handleCompletionToggle = () => {
    onToggleCompletion(task.id);
    
    if (!task.completed) {
      // Task is being completed
      setShowConfetti(true);
      
      // Trigger confetti effect
      const end = Date.now() + 500;
      const colors = ['#9b87f5', '#7E69AB', '#D6BCFA'];
      
      const frame = () => {
        confetti({
          particleCount: 25,
          angle: 60,
          spread: 55,
          origin: { x: 0.1, y: 0.6 },
          colors,
          disableForReducedMotion: true
        });
        
        confetti({
          particleCount: 25,
          angle: 120,
          spread: 55,
          origin: { x: 0.9, y: 0.6 },
          colors,
          disableForReducedMotion: true
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      frame();
      
      // Show motivational quote
      const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
      toast({
        title: "Task Completed",
        description: randomQuote
      });
    }
  };

  const startEditing = () => {
    if (!task.completed) {
      setIsEditing(true);
      setEditText(task.text);
    }
  };

  const saveEdit = () => {
    if (editText.trim() !== '') {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
      toast({
        title: "Task Updated",
        description: "Your task has been updated successfully"
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(task.text);
    }
  };
  
  return (
    <div className={cn(
      "border p-4 rounded-lg bg-white shadow-sm",
      "transition-all duration-200 ease-in-out",
      task.completed && "bg-muted/50"
    )}>
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={handleCompletionToggle}
          className="h-5 w-5"
        />
        
        <div className="flex-grow">
          {isEditing ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="text-lg"
            />
          ) : (
            <p className={cn(
              "text-lg font-medium",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.text}
            </p>
          )}
          
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

        {isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={saveEdit}
            className="text-primary"
          >
            <Check size={18} />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={startEditing}
            className="text-muted-foreground hover:text-primary"
            disabled={task.completed}
          >
            <Edit size={18} />
          </Button>
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
