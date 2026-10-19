import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { Inbox } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleCompletion, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-14 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-primary">
          <Inbox size={26} strokeWidth={1.5} />
        </div>
        <p className="font-display text-2xl">Nothing here yet</p>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">Add a task above, or pick another filter to see more.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2.5 animate-fade-in">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggleCompletion={onToggleCompletion} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default TaskList;
