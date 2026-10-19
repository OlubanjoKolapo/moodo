
import React, { useState, useEffect } from 'react';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Clock, Pencil, Check, Trash2 } from 'lucide-react';
import { EmotionBadge } from './EmotionIcon';
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
      const colors = ['#7a1f3d', '#a8385c', '#f3d9e1', '#ffffff'];
      
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
    <li className={cn(
      "group flex items-start gap-3 rounded-xl border border-border/70 bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]",
      task.completed && "bg-muted/40"
    )}>
      <Checkbox
        checked={task.completed}
        onCheckedChange={handleCompletionToggle}
        className="mt-0.5 h-5 w-5 rounded-full"
        aria-label="Mark complete"
      />
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <Input value={editText} onChange={(e) => setEditText(e.target.value)} onKeyDown={handleKeyDown} autoFocus className="h-9" />
        ) : (
          <p className={cn("break-words font-medium leading-snug", task.completed && "text-muted-foreground line-through")}>
            {task.text}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {task.emotion && <EmotionBadge id={task.emotion.id} name={task.emotion.name} />}
          <span className="inline-flex items-center gap-1"><Clock size={12} />{formattedDate}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-0.5 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100">
        {isEditing ? (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={saveEdit} aria-label="Save"><Check size={16} /></Button>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={startEditing} disabled={task.completed} aria-label="Edit"><Pencil size={15} /></Button>
        )}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => onDelete(task.id)} aria-label="Delete"><Trash2 size={15} /></Button>
      </div>
    </li>
  );
};

export default TaskItem;
