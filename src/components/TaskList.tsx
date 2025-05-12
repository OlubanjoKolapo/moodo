
import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleCompletion, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="py-8 text-center bg-muted/30 rounded-lg border border-dashed border-muted">
        <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
        <p className="text-muted-foreground">No tasks found with the current filter.</p>
        <p className="text-muted-foreground text-sm">Try selecting a different emotion filter or add a new task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
