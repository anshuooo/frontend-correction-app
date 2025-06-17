export interface CorrectionResult {
  original: string;
  corrected: string;
  explanation?: string;
  betterAlternative?: string;
  issues?: GrammarIssue[];
  suggestions?: string[];
}

export interface GrammarIssue {
  type: string;
  description: string;
  original: string;
  corrected: string;
}

export type CorrectionMode = 
  | 'basic' 
  | 'intermediate' 
  | 'advanced' 
  | 'paragraph' 
  | 'conversation' 
  | 'vocabulary';

export interface CorrectionModeConfig {
  id: CorrectionMode;
  title: string;
  description: string;
  icon: string;
  color: string;
}