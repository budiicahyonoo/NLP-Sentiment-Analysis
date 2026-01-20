import { SentimentPost } from '../components/types';

// Simple sentiment analysis using keyword matching
const positiveWords = [
  'amazing', 'excellent', 'great', 'awesome', 'fantastic', 'wonderful',
  'love', 'best', 'perfect', 'happy', 'beautiful', 'good', 'nice',
  'incredible', 'outstanding', 'brilliant', 'superb', 'delightful',
  'enjoy', 'pleased', 'satisfied', 'recommend', 'helpful'
];

const negativeWords = [
  'terrible', 'horrible', 'awful', 'bad', 'worst', 'hate', 'disappointed',
  'poor', 'useless', 'broken', 'waste', 'angry', 'frustrated', 'disgusting',
  'annoying', 'pathetic', 'garbage', 'ridiculous', 'disaster', 'nightmare'
];

const platforms = ['twitter', 'facebook', 'instagram', 'reddit', 'linkedin'] as const;

export function analyzeSentiment(text: string): SentimentPost {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  
  let positiveScore = 0;
  let negativeScore = 0;
  const keywords: string[] = [];

  // Count positive and negative words
  words.forEach(word => {
    const cleanWord = word.replace(/[^\w]/g, '');
    if (positiveWords.includes(cleanWord)) {
      positiveScore++;
      if (!keywords.includes(cleanWord)) keywords.push(cleanWord);
    }
    if (negativeWords.includes(cleanWord)) {
      negativeScore++;
      if (!keywords.includes(cleanWord)) keywords.push(cleanWord);
    }
  });

  // Check for emojis
  const positiveEmojis = ['😊', '😃', '😄', '😁', '🥰', '😍', '❤️', '💕', '👍', '✨', '🎉', '👏'];
  const negativeEmojis = ['😢', '😭', '😡', '😠', '💔', '👎', '😞', '😔', '😤'];
  
  positiveEmojis.forEach(emoji => {
    if (text.includes(emoji)) positiveScore += 2;
  });
  
  negativeEmojis.forEach(emoji => {
    if (text.includes(emoji)) negativeScore += 2;
  });

  // Determine sentiment
  let sentiment: 'positive' | 'negative' | 'neutral';
  let score: number;

  const totalScore = positiveScore + negativeScore;
  
  if (totalScore === 0) {
    sentiment = 'neutral';
    score = 0.5;
  } else if (positiveScore > negativeScore) {
    sentiment = 'positive';
    score = 0.6 + (positiveScore / (positiveScore + negativeScore)) * 0.35;
  } else if (negativeScore > positiveScore) {
    sentiment = 'negative';
    score = 0.6 + (negativeScore / (positiveScore + negativeScore)) * 0.35;
  } else {
    sentiment = 'neutral';
    score = 0.5 + Math.random() * 0.2;
  }

  // Generate realistic data
  const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
  
  return {
    id: `post-${Date.now()}-${Math.random()}`,
    text,
    sentiment,
    score,
    platform: randomPlatform,
    author: `User${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date(),
    engagement: {
      likes: Math.floor(Math.random() * 500) + 10,
      comments: Math.floor(Math.random() * 100) + 5,
      shares: Math.floor(Math.random() * 50) + 2,
    },
    keywords: keywords.slice(0, 5),
  };
}
