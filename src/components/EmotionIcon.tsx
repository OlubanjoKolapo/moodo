import { Feather, Circle, Flame, Waves, Timer, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  easy: Feather,
  neutral: Circle,
  stressful: Flame,
  overwhelming: Waves,
  anxious: Timer,
};

export const EmotionIcon = ({ id, className, ...props }: { id: string } & LucideProps) => {
  const Icon = ICONS[id] ?? Circle;
  return <Icon strokeWidth={1.75} className={cn('shrink-0', className)} {...props} />;
};

export const EmotionBadge = ({ id, name, className }: { id: string; name: string; className?: string }) => (
  <span className={cn('inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary', className)}>
    <EmotionIcon id={id} size={13} />
    {name}
  </span>
);
