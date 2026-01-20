import { SentimentPost } from './types';
import { Twitter, Facebook, Instagram, Linkedin, MessageCircle, Heart, Share2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SocialFeedProps {
  posts: SentimentPost[];
}

export function SocialFeed({ posts }: SocialFeedProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'bg-blue-100 text-blue-700';
      case 'facebook':
        return 'bg-blue-600 text-white';
      case 'instagram':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white';
      case 'linkedin':
        return 'bg-blue-700 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSentimentDot = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500';
      case 'negative':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">Social Media Feed</h3>
        <p className="text-purple-100 text-sm">Real-time monitoring across platforms</p>
      </div>

      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No posts yet. Analyze some text to get started!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">{post.author}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPlatformColor(post.platform)}`}>
                      {getPlatformIcon(post.platform)}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${getSentimentDot(post.sentiment)}`} />
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                    </span>
                  </div>

                  <p className="text-gray-800 text-sm mb-3 leading-relaxed">
                    {post.text}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5 hover:text-red-500 cursor-pointer">
                      <Heart className="w-4 h-4" />
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-blue-500 cursor-pointer">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-green-500 cursor-pointer">
                      <Share2 className="w-4 h-4" />
                      <span>{post.engagement.shares}</span>
                    </div>
                    <div className="ml-auto">
                      <span className="text-xs font-medium text-gray-600">
                        {(post.score * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
