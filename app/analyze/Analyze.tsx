/*eslint-disable */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronRight, Youtube, BarChart3, MessageCircle, TrendingUp, AlertCircle, CheckCircle, Clock, Loader2, Brain, Hash, ChevronDown, ChevronUp } from 'lucide-react';

interface SentimentStats {
  negatif: { count: number; percentage: number };
  netral: { count: number; percentage: number };
  positif: { count: number; percentage: number };
}

interface FrequentWords {
  negative: {
    words: Array<[string, number]>;
    total_comments: number;
    sample_comments: string[];
  };
  neutral: {
    words: Array<[string, number]>;
    total_comments: number;
    sample_comments: string[];
  };
  positive: {
    words: Array<[string, number]>;
    total_comments: number;
    sample_comments: string[];
  };
}

interface AIInsights {
  key_insights: string;
  policy_recommendations: string;
  action_items: string[];
  risk_assessment: string;
  opportunities: string;
}

interface AnalysisData {
  total_comments: number;
  statistics: SentimentStats;
  analysis: {
    avg_confidence: number;
    dominant_sentiment: string;
    dominant_count: number;
  };
  frequent_words: FrequentWords;
  ai_insights: AIInsights;
  comments_preview: Array<{
    original: string;
    cleaned: string;
    sentiment: string;
    confidence: number;
    probabilities: {
      negatif: number;
      netral: number;
      positif: number;
    };
  }>;
}

interface TaskStatus {
  task_id: string;
  status: string;
  message: string;
  progress?: number;
  data?: AnalysisData;
}

const StatusStep = ({ 
  icon: Icon, 
  title, 
  isActive, 
  isCompleted, 
  message 
}: { 
  icon: any; 
  title: string; 
  isActive: boolean; 
  isCompleted: boolean; 
  message?: string;
}) => (
  <div className={`flex items-start space-x-3 p-4 rounded-lg transition-all duration-300 ${
    isActive ? 'bg-slate-800/50 border border-blue-500/50' : 
    isCompleted ? 'bg-slate-800/30 border border-green-500/50' : 
    'bg-slate-800/20 border border-slate-700/50'
  }`}>
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
      isActive ? 'bg-blue-500 text-white' : 
      isCompleted ? 'bg-green-500 text-white' : 
      'bg-slate-600 text-slate-300'
    }`}>
      {isActive && !isCompleted && <Loader2 className="w-4 h-4 animate-spin" />}
      {isCompleted && <CheckCircle className="w-4 h-4" />}
      {!isActive && !isCompleted && <Icon className="w-4 h-4" />}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className={`text-sm font-medium ${
        isActive ? 'text-blue-300' : 
        isCompleted ? 'text-green-300' : 
        'text-slate-300'
      }`}>
        {title}
      </h3>
      {message && (
        <p className={`text-xs mt-1 ${
          isActive ? 'text-blue-400' : 
          isCompleted ? 'text-green-400' : 
          'text-slate-400'
        }`}>
          {message}
        </p>
      )}
    </div>
  </div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-slate-700/50 rounded-full h-2 mb-4">
    <div 
      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const SentimentCard = ({ 
  label, 
  count, 
  percentage, 
  color, 
  bgColor 
}: { 
  label: string; 
  count: number; 
  percentage: number; 
  color: string; 
  bgColor: string;
}) => (
  <div className={`${bgColor} rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <span className={`text-xl font-bold ${color}`}>{count}</span>
    </div>
    <div className="flex items-center space-x-2">
      <div className="flex-1 bg-slate-800/50 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color.replace('text-', 'bg-')}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`text-sm font-semibold ${color}`}>{percentage}%</span>
    </div>
  </div>
);

const WordCloud = ({ 
  words, 
  sentiment, 
  sampleComments 
}: { 
  words: Array<[string, number]>; 
  sentiment: 'positive' | 'negative' | 'neutral';
  sampleComments: string[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getColorClass = () => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-900/20 border-green-600/30';
      case 'negative': return 'text-red-400 bg-red-900/20 border-red-600/30';
      default: return 'text-yellow-400 bg-yellow-900/20 border-yellow-600/30';
    }
  };

  const getSentimentLabel = () => {
    switch (sentiment) {
      case 'positive': return 'Positive';
      case 'negative': return 'Negative';
      default: return 'Neutral';
    }
  };

  return (
    <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className={`font-semibold ${sentiment === 'positive' ? 'text-green-300' : sentiment === 'negative' ? 'text-red-300' : 'text-yellow-300'}`}>
          {getSentimentLabel()} Words
        </h4>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            {words.slice(0, 20).map(([word, count], index) => (
              <span
                key={index}
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getColorClass()}`}
              >
                {word} ({count})
              </span>
            ))}
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-slate-300 mb-2">Sample Comments:</h5>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {sampleComments.slice(0, 3).map((comment, index) => (
                <p key={index} className="text-xs text-slate-400 bg-slate-900/40 p-2 rounded border border-slate-700/30">
                  "{comment}"
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AIInsightsPanel = ({ insights }: { insights: AIInsights }) => {
  const [activeTab, setActiveTab] = useState('insights');

  const parseRecommendations = (recommendations: string) => {
    try {
      // Try to extract JSON from the recommendations string
      const jsonMatch = recommendations.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[1]);
        return parsed;
      }
    } catch (error) {
      console.error('Failed to parse recommendations:', error);
    }
    return {
      key_insights: insights.key_insights,
      policy_recommendations: recommendations,
      action_items: insights.action_items,
      risk_assessment: insights.risk_assessment,
      opportunities: insights.opportunities
    };
  };

  const parsedData = parseRecommendations(insights.policy_recommendations);

  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 mt-8">
      <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center space-x-2">
        <Brain className="w-5 h-5 text-purple-400" />
        <span>AI Insights & Recommendations</span>
      </h2>

      <div className="flex space-x-1 mb-6 bg-slate-800/40 p-1 rounded-lg">
        {[
          { id: 'insights', label: 'Key Insights' },
          { id: 'recommendations', label: 'Recommendations' },
          { id: 'actions', label: 'Action Items' },
          { id: 'risks', label: 'Risk Assessment' },
          { id: 'opportunities', label: 'Opportunities' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-slate-200 hover:bg-slate-700/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
        {activeTab === 'insights' && (
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">Key Insights</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {parsedData.key_insights || insights.key_insights}
            </p>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">Policy Recommendations</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {parsedData.policy_recommendations || insights.policy_recommendations}
            </p>
          </div>
        )}

        {activeTab === 'actions' && (
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">Action Items</h3>
            <ul className="space-y-2">
              {(parsedData.action_items || insights.action_items).map((item: string, index: number) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-slate-300">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'risks' && (
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">Risk Assessment</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {parsedData.risk_assessment || insights.risk_assessment}
            </p>
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div>
            <h3 className="font-semibold text-slate-200 mb-3">Opportunities</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {parsedData.opportunities || insights.opportunities}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Analyze() {
  const searchParams = useSearchParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [maxComments, setMaxComments] = useState(50);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskStatus, setTaskStatus] = useState<TaskStatus | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const API_BASE_URL = "https://arjunaadlina-sentimainbe.hf.space"


  // Effect to capture URL from search parameters
  useEffect(() => {
    const urlParam = searchParams.get('url');
    if (urlParam) {
      // Decode the URL parameter and set it to the video URL state
      const decodedUrl = decodeURIComponent(urlParam);
      setVideoUrl(decodedUrl);
    }
  }, [searchParams]);

  const startAnalysis = async () => {
    if (!videoUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setTaskStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video_url: videoUrl,
          max_comments: maxComments,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start analysis');
      }

      const data = await response.json();
      setTaskId(data.task_id);
      startPolling(data.task_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsAnalyzing(false);
    }
  };

const startPolling = (id: string) => {
  // Clear previous polling interval if exists
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }

  intervalRef.current = setInterval(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/status/${id}`);
      if (!response.ok) throw new Error('Failed to fetch status');

      const status: TaskStatus = await response.json();
      setTaskStatus(status);
      console.log(`Status for ${id}:`, status);

      if (status.status === 'completed' || status.status === 'error') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    } catch (err) {
      console.error(`Polling error for ${id}:`, err);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, 1000);
};


  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getStepStatus = (stepName: string) => {
    if (!taskStatus) return { isActive: false, isCompleted: false };
    
    const steps = ['started', 'scraping', 'preprocessing', 'tokenizing', 'predicting', 'calculating', 'completed'];
    const currentIndex = steps.indexOf(taskStatus.status);
    const stepIndex = steps.indexOf(stepName);
    
    return {
      isActive: currentIndex === stepIndex,
      isCompleted: currentIndex > stepIndex || taskStatus.status === 'completed'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6">
              <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span>Analysis Configuration</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    YouTube Video URL
                  </label>
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-200 placeholder-slate-400"
                    disabled={isAnalyzing}
                  />
                  {searchParams.get('url') && (
                    <p className="text-xs text-blue-400 mt-1">
                      ✓ URL loaded from previous page
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Maximum Comments to Analyze
                  </label>
                  <select
                    value={maxComments}
                    onChange={(e) => setMaxComments(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-200"
                    disabled={isAnalyzing}
                  >
                    <option value={50}>50 comments</option>
                    <option value={100}>100 comments</option>
                  </select>
                </div>

                {error && (
                  <div className="flex items-center space-x-2 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-300">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <button
                  onClick={startAnalysis}
                  disabled={isAnalyzing || !videoUrl.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Start Analysis</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results */}
            {taskStatus?.data && (
              <div className="mt-8 bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6">
                <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>Analysis Results</span>
                </h2>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <SentimentCard
                    label="Positive"
                    count={taskStatus.data.statistics.positif.count}
                    percentage={taskStatus.data.statistics.positif.percentage}
                    color="text-green-400"
                    bgColor="bg-green-900/20"
                  />
                  <SentimentCard
                    label="Neutral"
                    count={taskStatus.data.statistics.netral.count}
                    percentage={taskStatus.data.statistics.netral.percentage}
                    color="text-yellow-400"
                    bgColor="bg-yellow-900/20"
                  />
                  <SentimentCard
                    label="Negative"
                    count={taskStatus.data.statistics.negatif.count}
                    percentage={taskStatus.data.statistics.negatif.percentage}
                    color="text-red-400"
                    bgColor="bg-red-900/20"
                  />
                </div>

                {/* Key Insights */}
                <div className="bg-slate-800/40 rounded-xl p-4 mb-6 border border-slate-700/30">
                  <h3 className="font-semibold text-slate-200 mb-3">Key Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Total Comments:</span>
                      <span className="ml-2 font-semibold text-slate-200">{taskStatus.data.total_comments}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Dominant Sentiment:</span>
                      <span className="ml-2 font-semibold text-slate-200">{taskStatus.data.analysis.dominant_sentiment}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Avg. Confidence:</span>
                      <span className="ml-2 font-semibold text-slate-200">{taskStatus.data.analysis.avg_confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Frequent Words */}
                {taskStatus.data.frequent_words && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-slate-200 mb-4 flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-blue-400" />
                      <span>Frequent Words by Sentiment</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <WordCloud
                        words={taskStatus.data.frequent_words.positive.words}
                        sentiment="positive"
                        sampleComments={taskStatus.data.frequent_words.positive.sample_comments}
                      />
                      <WordCloud
                        words={taskStatus.data.frequent_words.neutral.words}
                        sentiment="neutral"
                        sampleComments={taskStatus.data.frequent_words.neutral.sample_comments}
                      />
                      <WordCloud
                        words={taskStatus.data.frequent_words.negative.words}
                        sentiment="negative"
                        sampleComments={taskStatus.data.frequent_words.negative.sample_comments}
                      />
                    </div>
                  </div>
                )}

                {/* Sample Comments */}
                <div>
                  <h3 className="font-semibold text-slate-200 mb-4">Sample Comments</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {taskStatus.data.comments_preview.map((comment, index) => (
                      <div key={index} className="border border-slate-700/50 bg-slate-800/30 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            comment.sentiment === 'Positif' ? 'bg-green-900/40 text-green-300 border border-green-600/30' :
                            comment.sentiment === 'Negatif' ? 'bg-red-900/40 text-red-300 border border-red-600/30' :
                            'bg-yellow-900/40 text-yellow-300 border border-yellow-600/30'
                          }`}>
                            {comment.sentiment}
                          </span>
                          <span className="text-xs text-slate-400">{comment.confidence}% confidence</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">{comment.original}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AI Insights Panel */}
            {taskStatus?.data?.ai_insights && (
              <AIInsightsPanel insights={taskStatus.data.ai_insights} />
            )}
          </div>

          {/* Status Panel */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-slate-100 mb-6 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span>Analysis Progress</span>
              </h2>

              {taskStatus && (
                <div className="mb-6">
                  <ProgressBar progress={taskStatus.progress || 0} />
                  <p className="text-sm text-slate-400 text-center">{taskStatus.message}</p>
                </div>
              )}

              <div className="space-y-3">
                <StatusStep
                  icon={Youtube}
                  title="Scraping Comments"
                  {...getStepStatus('scraping')}
                  message={taskStatus?.status === 'scraping' ? taskStatus.message : undefined}
                />
                <StatusStep
                  icon={MessageCircle}
                  title="Preprocessing Text"
                  {...getStepStatus('preprocessing')}
                  message={taskStatus?.status === 'preprocessing' ? taskStatus.message : undefined}
                />
                <StatusStep
                  icon={BarChart3}
                  title="Tokenizing"
                  {...getStepStatus('tokenizing')}
                  message={taskStatus?.status === 'tokenizing' ? taskStatus.message : undefined}
                />
                <StatusStep
                  icon={TrendingUp}
                  title="Predicting Sentiment"
                  {...getStepStatus('predicting')}
                  message={taskStatus?.status === 'predicting' ? taskStatus.message : undefined}
                />
                <StatusStep
                  icon={CheckCircle}
                  title="Finalizing Results"
                  {...getStepStatus('calculating')}
                  message={taskStatus?.status === 'calculating' ? taskStatus.message : undefined}
                />
              </div>

              {taskStatus?.status === 'completed' && (
                <div className="mt-6 p-4 bg-green-900/30 border border-green-500/50 rounded-xl">
                  <div className="flex items-center space-x-2 text-green-300">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Analysis Complete!</span>
                  </div>
                  <p className="text-sm text-green-400 mt-1">
                    Successfully analyzed {taskStatus.data?.total_comments} comments
                  </p>
                </div>
              )}

              {taskStatus?.status === 'error' && (
                <div className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl">
                  <div className="flex items-center space-x-2 text-red-300">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Analysis Failed</span>
                  </div>
                  <p className="text-sm text-red-400 mt-1">{taskStatus.message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
}