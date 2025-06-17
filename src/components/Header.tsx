import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
          <BookOpen className="text-white" size={32} />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          GrammarPro
        </h1>
        <Sparkles className="text-yellow-500" size={24} />
      </div>
      
      <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
        Perfect your English with AI-powered grammar correction, detailed explanations, 
        and vocabulary enhancement suggestions.
      </p>
      
      <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Real-time correction</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span>Multiple modes</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span>Better alternatives</span>
        </div>
      </div>
    </header>
  );
};