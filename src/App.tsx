import { useState } from 'react';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { InputArea } from './components/InputArea';
import { ResultDisplay } from './components/ResultDisplay';
import { GrammarCorrector } from './utils/grammarCorrector';
import { CorrectionMode, CorrectionResult } from './types/grammar';

const grammarCorrector = new GrammarCorrector();

const modePlaceholders: Record<CorrectionMode, string> = {
  basic: 'Enter your sentence here for simple correction...',
  intermediate: 'Type your text to get corrections with explanations...',
  advanced: 'Enter text for detailed analysis with better alternatives...',
  paragraph: 'Paste a paragraph or multiple sentences for comprehensive analysis...',
  conversation: 'Practice your conversational English here...',
  vocabulary: 'Enter text to improve your vocabulary choices...'
};

function App() {
  const [selectedMode, setSelectedMode] = useState<CorrectionMode>('intermediate');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<CorrectionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCorrection = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);

    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    // GrammarCorrector ka async method use karein
    const correctionResult = await grammarCorrector.correct(inputText);
    setResult(correctionResult);
    setIsProcessing(false);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  const handleModeChange = (mode: CorrectionMode) => {
    setSelectedMode(mode);
    setResult(null); // Clear results when mode changes
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        
        <ModeSelector 
          selectedMode={selectedMode} 
          onModeChange={handleModeChange} 
        />
        
        <InputArea
          text={inputText}
          onTextChange={setInputText}
          onSubmit={handleCorrection}
          onClear={handleClear}
          isProcessing={isProcessing}
          placeholder={modePlaceholders[selectedMode]}
        />

        {isProcessing && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-600">Analyzing your text...</span>
            </div>
          </div>
        )}

        <ResultDisplay result={result} mode={selectedMode} />
        
        <footer className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built with React & TypeScript • Made for English learners worldwide
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;