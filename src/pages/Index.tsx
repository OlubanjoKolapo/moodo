
import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import TaskFilter from '@/components/TaskFilter';
import DailySummary from '@/components/DailySummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const {
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
    downloadTaskReport
  } = useTasks();
  
  const isMobile = useIsMobile();
  const summary = getDailySummary();
  const filteredTasks = getFilteredTasks();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 py-6 px-4 sm:py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-2">
            Moodo
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Feel it, Say it, Get it done - Let your voice guide your productivity.
          </p>
        </header>

        {/* Task Input Section */}
        <Card className="shadow-sm border-border/60">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Summary Section - On mobile, it comes after tasks */}
          <div className={`${isMobile ? 'order-2' : 'order-1'} lg:col-span-1`}>
            <DailySummary 
              summary={summary} 
              emotions={EMOTIONS} 
              onDownloadReport={downloadTaskReport}
            />
          </div>

          {/* Task List Section - On mobile, it comes before summary */}
          <div className={`${isMobile ? 'order-1' : 'order-2'} lg:col-span-2`}>
            <Card className="shadow-sm border-border/60 h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <List size={20} className="text-primary" /> Today's Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TaskFilter 
                  emotions={EMOTIONS}
                  selectedFilter={filterEmotion}
                  onFilterChange={setFilterEmotion}
                />
                <TaskList
                  tasks={filteredTasks}
                  onToggleCompletion={toggleTaskCompletion}
                  onDelete={deleteTask}
                  onEdit={editTask}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Trademark Footer */}
        <footer className="text-center pt-8 pb-4">
          <a 
            href="https://x.com/Kolapo_Olubanjo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Built by Olubanjo Kolapo
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;
