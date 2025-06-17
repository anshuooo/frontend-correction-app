import React from 'react';
import { CheckCircle, AlertCircle, Lightbulb, Copy, Volume2 } from 'lucide-react';
import { CorrectionResult, CorrectionMode } from '../types/grammar';

interface ResultDisplayProps {
  result: CorrectionResult | null;
  mode: CorrectionMode;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, mode }) => {
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!result) {
    return (
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <div className="text-gray-400 mb-4">
          <CheckCircle size={48} className="mx-auto" />
        </div>
        <p className="text-gray-600">Enter some text above to get started with grammar correction.</p>
      </div>
    );
  }

  const hasChanges = result.original.toLowerCase() !== result.corrected.toLowerCase();

  return (
    <div className="space-y-6">
      {/* Corrected Text */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {hasChanges ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : (
              <CheckCircle className="text-blue-500" size={20} />
            )}
            <h3 className="font-semibold text-gray-800">
              {hasChanges ? 'Corrected Text' : 'Perfect! No corrections needed'}
            </h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => speakText(result.corrected)}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              title="Listen to pronunciation"
            >
              <Volume2 size={16} />
            </button>
            <button
              onClick={() => copyToClipboard(result.corrected, 'corrected')}
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              title="Copy corrected text"
            >
              {copiedText === 'corrected' ? (
                <CheckCircle size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </div>
        
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
          <p className="text-gray-800 leading-relaxed">{result.corrected}</p>
        </div>
      </div>

      {/* Explanation */}
      {result.explanation && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="text-orange-500" size={20} />
            <h3 className="font-semibold text-gray-800">Explanation</h3>
          </div>
          
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{result.explanation}</p>
          </div>
        </div>
      )}

      {/* Better Alternative */}
      {result.betterAlternative && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="text-purple-500" size={20} />
              <h3 className="font-semibold text-gray-800">Better Alternative</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => speakText(result.betterAlternative!)}
                className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
                title="Listen to pronunciation"
              >
                <Volume2 size={16} />
              </button>
              <button
                onClick={() => copyToClipboard(result.betterAlternative!, 'alternative')}
                className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
                title="Copy alternative text"
              >
                {copiedText === 'alternative' ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
            <p className="text-gray-700 leading-relaxed">{result.betterAlternative}</p>
          </div>
        </div>
      )}

      {/* Issues (for paragraph mode) */}
      {result.issues && result.issues.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="text-red-500" size={20} />
            <h3 className="font-semibold text-gray-800">Grammar Issues Found</h3>
          </div>
          
          <div className="space-y-3">
            {result.issues.map((issue, index) => (
              <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{issue.type}</span>
                </div>
                <p className="text-gray-700">{issue.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vocabulary Suggestions */}
      {result.suggestions && result.suggestions.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="text-yellow-500" size={20} />
            <h3 className="font-semibold text-gray-800">Vocabulary Suggestions</h3>
          </div>
          
          <div className="space-y-3">
            {result.suggestions.map((suggestion, index) => (
              <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};