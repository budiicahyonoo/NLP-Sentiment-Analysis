export interface SentimentPost {
  id: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  platform: 'twitter' | 'facebook' | 'instagram' | 'reddit' | 'linkedin';
  author: string;
  timestamp: Date;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  keywords: string[];
}

export interface BrandMetrics {
  overallScore: number;
  sentimentBreakdown: {
    positive: number;
    negative: number;
    neutral: number;
  };
  totalMentions: number;
  engagementRate: number;
  trendDirection: 'up' | 'down' | 'stable';
}

export interface KeywordData {
  word: string;
  count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}
