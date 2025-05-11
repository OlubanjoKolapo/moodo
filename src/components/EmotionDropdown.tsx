
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Emotion } from '@/types';

interface EmotionDropdownProps {
  emotions: Emotion[];
  selectedEmotion: Emotion | null;
  onSelectEmotion: (emotion: Emotion | null) => void;
}

const EmotionDropdown: React.FC<EmotionDropdownProps> = ({ 
  emotions, 
  selectedEmotion, 
  onSelectEmotion 
}) => {
  return (
    <Select
      value={selectedEmotion?.id || ''}
      onValueChange={(value) => {
        if (value) {
          const emotion = emotions.find(e => e.id === value) || null;
          onSelectEmotion(emotion);
        } else {
          onSelectEmotion(null);
        }
      }}
    >
      <SelectTrigger className="w-full md:w-[180px] bg-white">
        <SelectValue placeholder="Select emotion" />
      </SelectTrigger>
      <SelectContent>
        {emotions.map((emotion) => (
          <SelectItem key={emotion.id} value={emotion.id} className="cursor-pointer">
            <span className="flex items-center gap-2">
              <span className="text-lg">{emotion.emoji}</span>
              <span>{emotion.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default EmotionDropdown;
