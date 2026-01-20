import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface SentimentChartProps {
  data: Array<{
    time: string;
    positive: number;
    negative: number;
    neutral: number;
  }>;
}

export function SentimentChart({ data }: SentimentChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Sentiment Trends Over Time</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6b7280" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6b7280" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
            iconType="circle"
          />
          <Area
            type="monotone"
            dataKey="positive"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorPositive)"
            name="Positive"
          />
          <Area
            type="monotone"
            dataKey="neutral"
            stroke="#6b7280"
            strokeWidth={2}
            fill="url(#colorNeutral)"
            name="Neutral"
          />
          <Area
            type="monotone"
            dataKey="negative"
            stroke="#ef4444"
            strokeWidth={2}
            fill="url(#colorNegative)"
            name="Negative"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
