import React from 'react';
import { Send, RotateCcw } from 'lucide-react';

interface InputAreaProps {
  text: string;
  onTextChange: (text: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  isProcessing: boolean;
  placeholder: string;
}

export const InputArea: React.FC<InputAreaProps> = ({
  text,
  onTextChange,
  onSubmit,
  onClear,
  isProcessing,
  placeholder
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSubmit();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Enter your text</h2>
        <div className="flex space-x-2">
          <button
            onClick={onClear}
            disabled={!text || isProcessing}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Clear text"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
      
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-colors"
          disabled={isProcessing}
        />
        
        <button
          onClick={onSubmit}
          disabled={!text.trim() || isProcessing}
          className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
          title="Check grammar (Ctrl+Enter)"
        >
          <Send size={18} />
        </button>
      </div>
      
      <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
        <span>{text.length} characters</span>
        <span>Press Ctrl+Enter to check</span>
      </div>
    </div>
  );
};