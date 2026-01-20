import { SentimentPost } from './types';
import { Smile, Frown, Meh, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SentimentResultProps {
  post: SentimentPost;
}

export function SentimentResult({ post }: SentimentResultProps) {
  const getSentimentIcon = () => {
    switch (post.sentiment) {
      case 'positive':
        return <Smile className="w-6 h-6 text-green-600" />;
      case 'negative':
        return <Frown className="w-6 h-6 text-red-600" />;
      default:
        return <Meh className="w-6 h-6 text-gray-600" />;
    }
  };

  const getSentimentColor = () => {
    switch (post.sentiment) {
      case 'positive':
        return 'bg-green-50 border-green-200';
      case 'negative':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getSentimentBadgeColor = () => {
    switch (post.sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`rounded-xl p-6 border-2 ${getSentimentColor()} transition-all hover:shadow-md`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          {getSentimentIcon()}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentBadgeColor()}`}>
              {post.sentiment.toUpperCase()}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {(post.score * 100).toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500">confidence</span>
            </div>
          </div>

          <p className="text-gray-800 text-base leading-relaxed mb-4">
            {post.text}
          </p>

          {post.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 font-medium">Keywords:</span>
              {post.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-white rounded-md text-xs font-medium text-gray-700 border border-gray-200"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
