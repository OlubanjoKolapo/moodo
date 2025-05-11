
import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleCompletion: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleCompletion, onDelete }) => {
  // Filter tasks for today
  const todayString = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => 
    task.createdAt.split('T')[0] === todayString
  );

  if (todayTasks.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No tasks for today yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todayTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleCompletion={onToggleCompletion}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
