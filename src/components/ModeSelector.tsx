import React from 'react';
import { Check, MessageCircle, BookOpen, FileText, Users, Lightbulb } from 'lucide-react';
import { CorrectionMode, CorrectionModeConfig } from '../types/grammar';

interface ModeSelectorProps {
  selectedMode: CorrectionMode;
  onModeChange: (mode: CorrectionMode) => void;
}

const modes: CorrectionModeConfig[] = [
  {
    id: 'basic',
    title: 'Basic',
    description: 'Simple correction only',
    icon: 'Check',
    color: 'bg-blue-500'
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Correction + explanation',
    icon: 'MessageCircle',
    color: 'bg-indigo-500'
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Correction + explanation + alternatives',
    icon: 'BookOpen',
    color: 'bg-purple-500'
  },
  {
    id: 'paragraph',
    title: 'Paragraph',
    description: 'Multiple sentences analysis',
    icon: 'FileText',
    color: 'bg-emerald-500'
  },
  {
    id: 'conversation',
    title: 'Conversation',
    description: 'Practice speaking naturally',
    icon: 'Users',
    color: 'bg-orange-500'
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Word improvement suggestions',
    icon: 'Lightbulb',
    color: 'bg-pink-500'
  }
];

const iconMap = {
  Check,
  MessageCircle,
  BookOpen,
  FileText,
  Users,
  Lightbulb
};

export const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onModeChange }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
      {modes.map((mode) => {
        const IconComponent = iconMap[mode.icon as keyof typeof iconMap];
        const isSelected = selectedMode === mode.id;
        
        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`
              relative p-4 rounded-xl transition-all duration-300 transform hover:scale-105
              ${isSelected 
                ? `${mode.color} text-white shadow-lg shadow-opacity-30` 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="flex flex-col items-center space-y-2">
              <IconComponent size={24} />
              <div className="text-center">
                <h3 className="font-semibold text-sm">{mode.title}</h3>
                <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                  {mode.description}
                </p>
              </div>
            </div>
            {isSelected && (
              <div className="absolute inset-0 rounded-xl ring-2 ring-white ring-opacity-50"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};