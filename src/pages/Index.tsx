
import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import DailySummary from '@/components/DailySummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List } from 'lucide-react';

const Index = () => {
  const {
    tasks,
    selectedEmotion,
    setSelectedEmotion,
    EMOTIONS,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    getDailySummary
  } = useTasks();

  const summary = getDailySummary();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-2">
            Vibecheck Tasks
          </h1>
          <p className="text-muted-foreground">
            Track your tasks and emotions to boost productivity
          </p>
        </header>

        {/* Task Input Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskInput
              addTask={addTask}
              emotions={EMOTIONS}
              selectedEmotion={selectedEmotion}
              setSelectedEmotion={setSelectedEmotion}
            />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Summary Section */}
          <div className="md:col-span-1 order-2 md:order-1">
            <DailySummary summary={summary} emotions={EMOTIONS} />
          </div>

          {/* Task List Section */}
          <div className="md:col-span-2 order-1 md:order-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <List size={20} /> Today's Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList
                  tasks={tasks}
                  onToggleCompletion={toggleTaskCompletion}
                  onDelete={deleteTask}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
