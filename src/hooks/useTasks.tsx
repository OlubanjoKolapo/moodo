
import { useState, useEffect } from 'react';
import { Task, Emotion, DailySummary } from '@/types';

export const EMOTIONS: Emotion[] = [
  { id: 'happy', emoji: '😊', name: 'Happy' },
  { id: 'anxious', emoji: '😰', name: 'Anxious' },
  { id: 'motivated', emoji: '💪', name: 'Motivated' },
  { id: 'tired', emoji: '😴', name: 'Tired' },
  { id: 'focused', emoji: '🧠', name: 'Focused' },
  { id: 'stressed', emoji: '😖', name: 'Stressed' },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  
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

  return {
    tasks,
    selectedEmotion,
    setSelectedEmotion,
    EMOTIONS,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    getDailySummary,
  };
}
