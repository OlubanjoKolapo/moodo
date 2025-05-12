
import { useState, useEffect } from 'react';
import { Task, Emotion, DailySummary } from '@/types';

export const EMOTIONS: Emotion[] = [
  { id: 'easy', emoji: '😌', name: 'Easy' },
  { id: 'neutral', emoji: '😐', name: 'Neutral' },
  { id: 'stressful', emoji: '😓', name: 'Stressful' },
  { id: 'overwhelming', emoji: '😩', name: 'Overwhelming' },
  { id: 'anxious', emoji: '⏰', name: 'Timely' },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [filterEmotion, setFilterEmotion] = useState<string | null>(null);
  
  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (e) {
        console.error('Error parsing tasks from localStorage:', e);
        localStorage.removeItem('tasks');
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Get today's date in YYYY-MM-DD format
  const getTodayDateString = (): string => {
    return new Date().toISOString().split('T')[0];
  };

  // Add a new task
  const addTask = (text: string) => {
    if (!text.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      emotion: selectedEmotion,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setSelectedEmotion(null); // Reset selected emotion after adding task
  };

  // Toggle task completion status
  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === id) {
          const completed = !task.completed;
          return {
            ...task,
            completed,
            completedAt: completed ? new Date().toISOString() : null
          };
        }
        return task;
      })
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Edit a task
  const editTask = (id: string, newText: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            text: newText
          };
        }
        return task;
      })
    );
  };

  // Get daily summary
  const getDailySummary = (): DailySummary => {
    const todayTasks = tasks.filter(task => {
      const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
      return taskDate === getTodayDateString();
    });
    
    const totalTasks = todayTasks.length;
    const completedTasks = todayTasks.filter(task => task.completed).length;
    
    const emotionCounts: { [key: string]: number } = {};
    todayTasks.forEach(task => {
      if (task.emotion) {
        const emotionId = task.emotion.id;
        emotionCounts[emotionId] = (emotionCounts[emotionId] || 0) + 1;
      }
    });
    
    return {
      totalTasks,
      completedTasks,
      emotionCounts,
    };
  };

  // Get filtered tasks for today
  const getFilteredTasks = () => {
    const todayString = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(task => 
      task.createdAt.split('T')[0] === todayString
    );
    
    if (filterEmotion) {
      return todayTasks.filter(task => task.emotion?.id === filterEmotion);
    }
    
    return todayTasks;
  };

  // Download task report
  const downloadTaskReport = () => {
    const todayString = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(task => 
      task.createdAt.split('T')[0] === todayString
    );
    
    if (todayTasks.length === 0) {
      return null;
    }
    
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    let textReport = `Task Report for ${formattedDate}\n`;
    textReport += `Total Tasks: ${todayTasks.length}\n`;
    textReport += `Completed Tasks: ${todayTasks.filter(task => task.completed).length}\n\n`;
    textReport += `Tasks:\n`;
    
    todayTasks.forEach((task, index) => {
      textReport += `${index + 1}. [${task.completed ? 'COMPLETED' : 'PENDING'}] ${task.text}\n`;
      if (task.emotion) {
        textReport += `   Emotion: ${task.emotion.name} ${task.emotion.emoji}\n`;
      }
      textReport += `   Created: ${new Date(task.createdAt).toLocaleTimeString()}\n`;
      if (task.completedAt) {
        textReport += `   Completed: ${new Date(task.completedAt).toLocaleTimeString()}\n`;
      }
      textReport += `\n`;
    });
    
    const blob = new Blob([textReport], { type: 'text/plain' });
    return {
      blob,
      fileName: `task-report-${todayString}.txt`
    };
  };

  return {
    tasks,
    selectedEmotion,
    setSelectedEmotion,
    filterEmotion,
    setFilterEmotion,
    EMOTIONS,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    editTask,
    getDailySummary,
    getFilteredTasks,
    downloadTaskReport,
  };
}
