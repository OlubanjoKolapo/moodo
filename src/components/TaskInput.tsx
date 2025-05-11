
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff } from 'lucide-react';
import EmotionDropdown from './EmotionDropdown';
import { Emotion } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface TaskInputProps {
  addTask: (text: string) => void;
  emotions: Emotion[];
  selectedEmotion: Emotion | null;
  setSelectedEmotion: (emotion: Emotion | null) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ 
  addTask, 
  emotions, 
  selectedEmotion, 
  setSelectedEmotion 
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if Web Speech API is supported
    const hasSpeechRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    setSpeechSupported(hasSpeechRecognition);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTask(inputValue.trim());
      setInputValue('');
    }
  };

  const toggleListening = () => {
    if (!speechSupported) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak now to add your task."
        });
      };

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setInputValue(speechResult);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: "Error",
          description: `Speech recognition error: ${event.error}`,
          variant: "destructive"
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col md:flex-row gap-3 w-full">
        <div className="relative flex-grow">
          <Input
            placeholder="Add a new task..."
            value={inputValue}
            onChange={handleInputChange}
            className="bg-white"
          />
          {speechSupported && (
            <Button 
              type="button" 
              size="icon" 
              variant={isListening ? "destructive" : "outline"}
              onClick={toggleListening}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </Button>
          )}
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <EmotionDropdown 
            emotions={emotions} 
            selectedEmotion={selectedEmotion}
            onSelectEmotion={setSelectedEmotion}
          />
          <Button type="submit" className="whitespace-nowrap">Add Task</Button>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;
