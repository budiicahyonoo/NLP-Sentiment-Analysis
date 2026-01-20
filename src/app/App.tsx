import { useState, useEffect } from 'react';
import { AnalysisInput } from './components/AnalysisInput';
import { SentimentResult } from './components/SentimentResult';
import { BrandDashboard } from './components/BrandDashboard';
import { SocialFeed } from './components/SocialFeed';
import { SentimentChart } from './components/SentimentChart';
import { SentimentPost, BrandMetrics } from './components/types';
import { analyzeSentiment } from './utils/sentimentAnalyzer';
import { Brain, Zap } from 'lucide-react';

export default function App() {
  const [posts, setPosts] = useState<SentimentPost[]>([]);
  const [latestPost, setLatestPost] = useState<SentimentPost | null>(null);
  const [metrics, setMetrics] = useState<BrandMetrics>({
    overallScore: 75,
    sentimentBreakdown: {
      positive: 60,
      negative: 15,
      neutral: 25,
    },
    totalMentions: 0,
    engagementRate: 0,
    trendDirection: 'stable',
  });

  const [chartData, setChartData] = useState([
    { time: '00:00', positive: 45, neutral: 30, negative: 15 },
    { time: '04:00', positive: 52, neutral: 28, negative: 12 },
    { time: '08:00', positive: 58, neutral: 25, negative: 10 },
    { time: '12:00', positive: 65, neutral: 22, negative: 8 },
    { time: '16:00', positive: 60, neutral: 26, negative: 14 },
    { time: '20:00', positive: 55, neutral: 28, negative: 17 },
  ]);

  const handleAnalyze = (text: string) => {
    const result = analyzeSentiment(text);
    setPosts((prev) => [result, ...prev]);
    setLatestPost(result);

    // Update metrics
    setTimeout(() => {
      const allPosts = [result, ...posts];
      const positive = allPosts.filter(p => p.sentiment === 'positive').length;
      const negative = allPosts.filter(p => p.sentiment === 'negative').length;
      const neutral = allPosts.filter(p => p.sentiment === 'neutral').length;
      const total = allPosts.length;

      const positivePercent = Math.round((positive / total) * 100);
      const negativePercent = Math.round((negative / total) * 100);
      const neutralPercent = 100 - positivePercent - negativePercent;

      const totalEngagement = allPosts.reduce((sum, p) => 
        sum + p.engagement.likes + p.engagement.comments + p.engagement.shares, 0
      );

      const overallScore = Math.round(
        (positivePercent * 1.0) + (neutralPercent * 0.5) + (negativePercent * 0.1)
      );

      const oldScore = metrics.overallScore;
      let trendDirection: 'up' | 'down' | 'stable' = 'stable';
      if (overallScore > oldScore + 5) trendDirection = 'up';
      else if (overallScore < oldScore - 5) trendDirection = 'down';

      setMetrics({
        overallScore,
        sentimentBreakdown: {
          positive: positivePercent,
          negative: negativePercent,
          neutral: neutralPercent,
        },
        totalMentions: total,
        engagementRate: total > 0 ? totalEngagement / total / 10 : 0,
        trendDirection,
      });

      // Update chart data
      const now = new Date();
      const timeLabel = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      
      setChartData(prev => {
        const newData = [...prev.slice(-5), {
          time: timeLabel,
          positive: positivePercent,
          neutral: neutralPercent,
          negative: negativePercent,
        }];
        return newData;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-xl shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">NLP Sentiment Analysis</h1>
                <p className="text-gray-600 mt-1">Advanced AI-powered social media monitoring & brand reputation management</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="text-purple-900 font-medium">AI Powered</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-8 space-y-6">
            {/* Analysis Input */}
            <AnalysisInput onAnalyze={handleAnalyze} />

            {/* Latest Result */}
            {latestPost && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Latest Analysis</h3>
                <SentimentResult post={latestPost} />
              </div>
            )}

            {/* Chart */}
            <SentimentChart data={chartData} />

            {/* Social Feed */}
            <SocialFeed posts={posts} />
          </div>

          {/* Right Column - Dashboard */}
          <div className="col-span-4">
            <div className="sticky top-6">
              <BrandDashboard metrics={metrics} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
