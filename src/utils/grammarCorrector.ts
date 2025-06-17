import axios from 'axios';
import { CorrectionResult, GrammarIssue } from '../types/grammar';

export class GrammarCorrector {
  async correct(text: string): Promise<CorrectionResult> {
    const params = new URLSearchParams();
    params.append('text', text);
    params.append('language', 'en-US');

    const response = await axios.post(
      'https://api.languagetool.org/v2/check',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const matches = response.data.matches || [];
    let corrected = text;
    const issues: GrammarIssue[] = [];

    // Track offset adjustment since replacing text shifts future positions
    let offsetAdjustment = 0;

    matches.forEach((match: {
      offset: number;
      length: number;
      replacements: { value: string }[];
      message: string;
    }) => {
      const offset = match.offset + offsetAdjustment;
      const length = match.length;

      if (match.replacements && match.replacements.length > 0) {
        const replacement = match.replacements[0].value;

        issues.push({
          type: 'Grammar Error',
          description: match.message,
          original: corrected.substring(offset, offset + length),
          corrected: replacement
        });

        corrected =
          corrected.substring(0, offset) +
          replacement +
          corrected.substring(offset + length);

        offsetAdjustment += replacement.length - length;
      }
    });

    const result: CorrectionResult = {
      original: text,
      corrected,
      issues
    };

    return result;
  }
}
