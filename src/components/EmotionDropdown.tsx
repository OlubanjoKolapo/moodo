import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Emotion } from '@/types';
import { EmotionIcon } from './EmotionIcon';

interface EmotionDropdownProps {
  emotions: Emotion[];
  selectedEmotion: Emotion | null;
  onSelectEmotion: (emotion: Emotion | null) => void;
}

const EmotionDropdown: React.FC<EmotionDropdownProps> = ({ emotions, selectedEmotion, onSelectEmotion }) => (
  <Select
    value={selectedEmotion?.id || ''}
    onValueChange={(value) => onSelectEmotion(emotions.find(e => e.id === value) || null)}
  >
    <SelectTrigger className="h-12 w-full md:w-[180px] rounded-xl bg-card">
      <SelectValue placeholder="How does it feel?" />
    </SelectTrigger>
    <SelectContent>
      {emotions.map((emotion) => (
        <SelectItem key={emotion.id} value={emotion.id} className="cursor-pointer">
          <span className="flex items-center gap-2">
            <EmotionIcon id={emotion.id} size={16} className="text-primary" />
            <span>{emotion.name}</span>
          </span>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default EmotionDropdown;
