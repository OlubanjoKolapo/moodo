import React from 'react';
import { useTasks } from '@/hooks/useTasks';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import TaskFilter from '@/components/TaskFilter';
import DailySummary from '@/components/DailySummary';
import TrademarkFooter from '@/components/TrademarkFooter';
import Logo from '@/components/Logo';
import { format } from 'date-fns';

const Index = () => {
  const {
    tasks, selectedEmotion, setSelectedEmotion, filterEmotion, setFilterEmotion, EMOTIONS,
    addTask, toggleTaskCompletion, deleteTask, editTask, getDailySummary, getFilteredTasks, downloadTaskReport,
  } = useTasks();

  const summary = getDailySummary();
  const filteredTasks = getFilteredTasks();
  const open = tasks.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.10),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <nav className="mb-10 flex items-center justify-between sm:mb-14">
          <div className="flex items-center gap-2.5">
            <Logo size={34} />
            <span className="text-lg font-bold tracking-tight">Moodo</span>
          </div>
          <span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {format(new Date(), 'EEEE, MMM d')}
          </span>
        </nav>

        <header className="mb-8 max-w-2xl sm:mb-10">
          <h1 className="font-display text-5xl leading-[1.02] sm:text-7xl">
            Feel it, say it, <em className="text-primary">get it done.</em>
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Let your voice guide your productivity.
          </p>
        </header>

        <section className="surface mb-6 p-4 sm:p-5">
          <TaskInput addTask={addTask} emotions={EMOTIONS} selectedEmotion={selectedEmotion} setSelectedEmotion={setSelectedEmotion} />
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="surface p-5 sm:p-6 lg:col-span-2">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Your list</p>
                <h2 className="font-display text-3xl">Today's tasks</h2>
              </div>
              <span className="text-sm text-muted-foreground">{open} open</span>
            </div>
            <TaskFilter emotions={EMOTIONS} selectedFilter={filterEmotion} onFilterChange={setFilterEmotion} />
            <TaskList tasks={filteredTasks} onToggleCompletion={toggleTaskCompletion} onDelete={deleteTask} onEdit={editTask} />
          </section>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <DailySummary summary={summary} emotions={EMOTIONS} onDownloadReport={downloadTaskReport} />
            </div>
          </aside>
        </div>

        {/* HARDCODED: Do not remove - Trademark Footer */}
        <TrademarkFooter />
      </div>
    </div>
  );
};

export default Index;
