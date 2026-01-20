import { BrandMetrics } from './types';
import { TrendingUp, TrendingDown, Minus, Users, Activity, Heart } from 'lucide-react';

interface BrandDashboardProps {
  metrics: BrandMetrics;
}

export function BrandDashboard({ metrics }: BrandDashboardProps) {
  const getTrendIcon = () => {
    switch (metrics.trendDirection) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getScoreColor = () => {
    if (metrics.overallScore >= 70) return 'text-green-600';
    if (metrics.overallScore >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendColor = () => {
    switch (metrics.trendDirection) {
      case 'up':
        return 'bg-green-100 text-green-800';
      case 'down':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Brand Health Score</h2>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-sm font-medium capitalize">{metrics.trendDirection}</span>
        </div>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${metrics.overallScore * 5.53} 553`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold ${getScoreColor()}`}>
              {metrics.overallScore}
            </span>
            <span className="text-sm text-gray-500 mt-1">Overall Score</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">
            {metrics.sentimentBreakdown.positive}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Positive</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-3xl font-bold text-gray-600">
            {metrics.sentimentBreakdown.neutral}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Neutral</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-3xl font-bold text-red-600">
            {metrics.sentimentBreakdown.negative}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Negative</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700 font-medium">Total Mentions</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            {metrics.totalMentions.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-purple-600" />
            <span className="text-gray-700 font-medium">Engagement Rate</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            {metrics.engagementRate.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
