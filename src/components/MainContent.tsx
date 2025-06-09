import React, { useState } from 'react';
import { Menu, ArrowUp } from 'lucide-react';
import { Message, ContextWindowInfo, ModelInfo, RateLimitInfo, Citation } from '../types';
import { ContextLimitWarning } from './ContextLimitWarning';
import { TokenUsagePreview } from './TokenUsagePreview';
import { RateLimitIndicator } from './RateLimitIndicator';
import { ResourceList } from './ResourceList';
import { CitationPanel } from './CitationPanel';
import { CitationPreview } from './CitationPreview';

interface MainContentProps {
  messages: Message[];
  onSendMessage: (message: string, knowledgeBaseEnabled?: boolean) => void;
  onToggleSidebar: () => void;
  contextInfo: ContextWindowInfo;
  availableModels: ModelInfo[];
  onStartNewChat: () => void;
  onSwitchModel: (modelName: string) => void;
  rateLimitInfo: RateLimitInfo;
  onRateLimitReset: () => void;
  showRateLimit: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  messages,
  onSendMessage,
  onToggleSidebar,
  contextInfo,
  availableModels,
  onStartNewChat,
  onSwitchModel,
  rateLimitInfo,
  onRateLimitReset,
  showRateLimit
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showWarning, setShowWarning] = useState(true);
  const [knowledgeBaseEnabled, setKnowledgeBaseEnabled] = useState(true);
  const [showCitationPanel, setShowCitationPanel] = useState(false);
  const [hoveredCitation, setHoveredCitation] = useState<Citation | null>(null);
  const [previewPosition, setPreviewPosition] = useState<{ x: number; y: number } | null>(null);
  const [isOverCitationPanel, setIsOverCitationPanel] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !rateLimitInfo.isBlocked) {
      onSendMessage(inputValue.trim(), knowledgeBaseEnabled);
      setInputValue('');
    }
  };

  const suggestedPrompts = [
    {
      category: "Learn",
      title: "Help me understand what things typically break my focus, so I can think more clearly",
      description: "Identify common focus blockers and mental clarity techniques"
    },
    {
      category: "Practice", 
      title: "Walk me through a vocal brain dump to craft into an essay with AI's help",
      description: "Transform scattered thoughts into structured writing"
    },
    {
      category: "Explore",
      title: "Walk me through using a Zoom recording transcript of the meeting with my team and help us get organized and streamlined",
      description: "Analyze team meetings and improve workflow efficiency"
    }
  ];

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleCitationHover = (citation: Citation | null, event?: React.MouseEvent) => {
    if (isOverCitationPanel) {
      setHoveredCitation(null);
      setPreviewPosition(null);
      return;
    }

    if (citation && event) {
      setHoveredCitation(citation);
      setPreviewPosition({
        x: event.clientX,
        y: event.clientY,
      });
    } else {
      setHoveredCitation(null);
      setPreviewPosition(null);
    }
  };

  const handleCitationClick = (citation: Citation) => {
    if (citation.source.url) {
      window.open(citation.source.url, '_blank');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-100 bg-white">
                        <span className="text-lg">✨</span>
                      </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Custom AI: Unblock and Focus</h1>
              <p className="text-sm text-gray-600">Help use writing to resolve mental blockers and stay focused with the help of AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 lg:px-6">
          {/* Context Warning */}
          {showWarning && (
            <ContextLimitWarning
              contextInfo={contextInfo}
              availableModels={availableModels}
              onStartNewChat={onStartNewChat}
              onSwitchModel={onSwitchModel}
              onDismiss={() => setShowWarning(false)}
            />
          )}

          {/* Chat Messages */}
          {messages.length > 0 ? (
            <div className="space-y-4 mb-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {message.isUser ? (
                      <img
                        src="https://webapp4.asu.edu/photo-ws/directory_photo/dennis4?size=medium&break=1749066236&blankImage2=1"
                        alt="Daniel Ennis"
                        className="w-8 h-8 rounded-full border-2 border-asu-maroon object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-100 bg-white">
                        <span className="text-lg">✨</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Message Content */}
                  <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-3xl rounded-lg px-4 py-3 ${
                        message.isUser
                          ? 'bg-gray-100 text-gray-900 border border-gray-200'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      {message.citations ? (
                        <>
                          <p className="text-sm leading-relaxed">
                            {(() => {
                              let result = [];
                              let currentIndex = 0;
                              
                              message.citations.forEach((citation, citationIndex) => {
                                // Add non-cited text before this citation
                                if (currentIndex < citation.startIndex) {
                                  result.push(
                                    <span key={`text-${citationIndex}`}>
                                      {message.content.slice(currentIndex, citation.startIndex)}
                                    </span>
                                  );
                                }
                                
                                // Add the cited text
                                const citedText = message.content.slice(citation.startIndex, citation.endIndex);
                                const isHighlighted = hoveredCitation?.text === citation.text;
                                
                                result.push(
                                  <span
                                    key={`citation-${citationIndex}`}
                                    className={`cursor-pointer transition-colors duration-200 ${
                                      isHighlighted
                                        ? 'bg-yellow-200 border-b-2 border-yellow-400'
                                        : 'bg-yellow-50 border-b border-yellow-200 hover:bg-yellow-100'
                                    }`}
                                    onMouseEnter={(e) => handleCitationHover(citation, e)}
                                    onMouseLeave={() => handleCitationHover(null)}
                                    onClick={() => handleCitationClick(citation)}
                                  >
                                    {citedText}
                                  </span>
                                );
                                
                                currentIndex = citation.endIndex;
                              });
                              
                              // Add any remaining text after the last citation
                              if (currentIndex < message.content.length) {
                                result.push(
                                  <span key="text-end">
                                    {message.content.slice(currentIndex)}
                                  </span>
                                );
                              }
                              
                              return result;
                            })()}
                          </p>
                          <div className="mt-3 flex justify-end">
                            <button
                              onClick={() => setShowCitationPanel(true)}
                              className="inline-flex items-center px-3 py-1 text-sm text-asu-maroon hover:text-red-700 border border-asu-maroon hover:bg-red-50 rounded-md transition-colors"
                            >
                              Show Citations ({message.citations.length})
                            </button>
                          </div>

                          {/* Display top 3 citation previews */}
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            {message.citations.slice(0, 3).map((citation, index) => (
                              <a
                                key={index}
                                href={citation.source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block aspect-[4/3] overflow-hidden rounded-lg"
                                onMouseEnter={(e) => handleCitationHover(citation, e)}
                              >
                                <div className="absolute inset-0 bg-gray-900 opacity-50 transition-opacity group-hover:opacity-70" />
                                <img
                                  src={citation.source.imageUrl || 'https://via.placeholder.com/400x300?text=Resource'}
                                  alt={citation.source.title}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-4">
                                  <h5 className="text-sm font-medium text-white group-hover:text-asu-maroon line-clamp-2">
                                    {citation.source.title}
                                  </h5>
                                </div>
                              </a>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      )}
                      {message.resources && <ResourceList resources={message.resources} />}
                    </div>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Suggested Prompts */
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {suggestedPrompts.map((prompt, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">{prompt.category}</h3>
                  <button
                    onClick={() => handlePromptClick(prompt.title)}
                    className="text-left w-full"
                    disabled={rateLimitInfo.isBlocked}
                  >
                    <p className={`text-sm leading-relaxed mb-3 transition-colors ${
                      rateLimitInfo.isBlocked 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-gray-700 hover:text-asu-maroon'
                    }`}>
                      {prompt.title}
                    </p>
                    <p className="text-xs text-gray-500">{prompt.description}</p>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Chat Input Form */}
          <form onSubmit={handleSubmit} className="relative mb-4">
            <div className={`flex items-end rounded-lg border transition-colors ${
              rateLimitInfo.isBlocked 
                ? 'bg-gray-100 border-gray-300' 
                : 'bg-gray-50 border-gray-200 focus-within:border-asu-maroon focus-within:ring-1 focus-within:ring-asu-maroon'
            }`}>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={rateLimitInfo.isBlocked ? "Rate limit exceeded - please wait" : "Type a prompt"}
                disabled={rateLimitInfo.isBlocked}
                className={`flex-1 bg-transparent border-0 resize-none px-4 py-3 focus:outline-none placeholder-gray-500 ${
                  rateLimitInfo.isBlocked ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900'
                }`}
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !rateLimitInfo.isBlocked) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || rateLimitInfo.isBlocked}
                className={`m-2 p-2 rounded-md transition-colors ${
                  rateLimitInfo.isBlocked 
                    ? 'bg-gray-200 cursor-not-allowed opacity-50' 
                    : 'bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <ArrowUp className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </form>

          {/* Token Usage Preview */}
          <div className="mb-4">
            <TokenUsagePreview
              inputText={inputValue}
              contextInfo={contextInfo}
              knowledgeBaseEnabled={knowledgeBaseEnabled}
            />
          </div>

          {/* Rate Limit Indicator */}
          {showRateLimit && (
            <div className="mb-4">
              <RateLimitIndicator
                rateLimitInfo={rateLimitInfo}
                onRateLimitReset={onRateLimitReset}
              />
            </div>
          )}

          <p className="text-xs text-gray-500 text-center">
            Unblock and Focus bot may display incorrect or false information.
          </p>
        </div>
      </div>

      {/* Citation Panel */}
      {messages.some(m => m.citations) && (
        <CitationPanel
          citations={messages.flatMap(m => m.citations || [])}
          isOpen={showCitationPanel}
          onClose={() => setShowCitationPanel(false)}
          onCitationHover={handleCitationHover}
          onMouseEnter={() => setIsOverCitationPanel(true)}
          onMouseLeave={() => setIsOverCitationPanel(false)}
        />
      )}

      {/* Citation Preview */}
      {hoveredCitation && previewPosition && !isOverCitationPanel && (
        <CitationPreview
          citation={hoveredCitation}
          position={previewPosition}
          onClose={() => setHoveredCitation(null)}
          isVisible={true}
        />
      )}
    </div>
  );
}; 