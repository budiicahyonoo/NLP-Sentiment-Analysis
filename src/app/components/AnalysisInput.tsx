import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface AnalysisInputProps {
  onAnalyze: (text: string) => void;
}

export function AnalysisInput({ onAnalyze }: AnalysisInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text);
      setText('');
    }
  };

  const examples = [
    "Just tried this amazing product! Best purchase ever! 😍",
    "Terrible customer service. Very disappointed with this brand.",
    "It's okay, nothing special but gets the job done.",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Analyze New Text</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze sentiment... (e.g., social media post, review, feedback)"
          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-gray-900"
        />

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {text.length} characters
          </span>
          <button
            type="submit"
            disabled={!text.trim()}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
            Analyze Sentiment
          </button>
        </div>
      </form>

      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-3">Try these examples:</p>
        <div className="space-y-2">
          {examples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setText(example)}
              className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
