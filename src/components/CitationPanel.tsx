import React, { useState } from 'react';
import { X, ExternalLink, Quote, Bookmark, BookOpen, Link2, FileText, Info, ChevronRight, Calendar, User, Globe, Book, FileCode, File, Archive } from 'lucide-react';
import { Citation } from '../types';

interface CitationPanelProps {
  citations: Citation[];
  isOpen: boolean;
  onClose: () => void;
  onCitationHover: (citation: Citation | null, event?: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CitationPanel: React.FC<CitationPanelProps> = ({
  citations,
  isOpen,
  onClose,
  onCitationHover,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [expandedCitation, setExpandedCitation] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const getSourceIcon = (url: string) => {
    if (url.includes('book')) return BookOpen;
    if (url.includes('article')) return FileText;
    return Link2;
  };

  const getResourceIcon = (source: any) => {
    // Determine icon based on URL or source type
    if (!source.url) return File;
    const url = source.url.toLowerCase();
    if (url.includes('github') || url.includes('gitlab')) return FileCode;
    if (url.includes('arxiv') || url.includes('paper')) return Archive;
    if (url.includes('book') || url.includes('isbn')) return Book;
    if (url.includes('article') || url.includes('blog')) return FileText;
    return Globe;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-y-0 right-0 w-96 bg-white border-l border-gray-200 shadow-xl transform transition-transform duration-200 ease-in-out z-40"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Citations</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Citations List */}
        <div className="flex-1 overflow-y-auto">
          {citations.map((citation, index) => {
            const SourceIcon = citation.source.url ? getSourceIcon(citation.source.url) : Link2;
            const isExpanded = expandedCitation === citation.text;

            return (
              <div
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
                {/* Citation Header - Always visible */}
                <button
                  className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-start space-x-3"
                  onClick={() => setExpandedCitation(isExpanded ? null : citation.text)}
                  onMouseEnter={(e) => onCitationHover(citation, e)}
                  onMouseLeave={() => onCitationHover(null)}
                >
                  <SourceIcon className="w-5 h-5 text-asu-maroon flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {citation.source.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {citation.text}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4">
                    {/* Sections with hover effects */}
                    <div className="space-y-4">
                      {/* Usage Context */}
                      <div
                        className={`p-4 rounded-lg transition-all duration-200 border ${
                          hoveredSection === 'usage' 
                            ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-sm' 
                            : 'bg-white border-blue-100 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200 hover:shadow-sm'
                        }`}
                        onMouseEnter={() => setHoveredSection('usage')}
                        onMouseLeave={() => setHoveredSection(null)}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Info className="w-4 h-4 text-blue-600" />
                          </div>
                          <h4 className="text-sm font-semibold text-blue-900">How this was used</h4>
                        </div>
                        <p className="text-sm text-blue-800 leading-relaxed pl-8">
                          {citation.source.usageContext}
                        </p>
                      </div>

                      {/* Source Preview */}
                      <div
                        className={`p-4 rounded-lg transition-all duration-200 border ${
                          hoveredSection === 'preview' 
                            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-sm' 
                            : 'bg-white border-emerald-100 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-200 hover:shadow-sm'
                        }`}
                        onMouseEnter={() => setHoveredSection('preview')}
                        onMouseLeave={() => setHoveredSection(null)}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="p-2 bg-emerald-100 rounded-full">
                            <BookOpen className="w-4 h-4 text-emerald-600" />
                          </div>
                          <h4 className="text-sm font-semibold text-emerald-900">From the source</h4>
                        </div>
                        <p className="text-sm text-emerald-800 italic leading-relaxed pl-8">
                          {citation.source.preview}
                        </p>
                      </div>

                      {/* AI's Interpretation */}
                      <div
                        className={`p-4 rounded-lg transition-all duration-200 border ${
                          hoveredSection === 'ai' 
                            ? 'bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-200 shadow-sm' 
                            : 'bg-white border-purple-100 hover:bg-gradient-to-br hover:from-purple-50 hover:to-fuchsia-50 hover:border-purple-200 hover:shadow-sm'
                        }`}
                        onMouseEnter={() => setHoveredSection('ai')}
                        onMouseLeave={() => setHoveredSection(null)}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="p-2 bg-purple-100 rounded-full">
                            <span className="flex items-center justify-center w-4 h-4 text-purple-600">✨</span>
                          </div>
                          <h4 className="text-sm font-semibold text-purple-900">AI's interpretation</h4>
                        </div>
                        <p className="text-sm text-purple-800 leading-relaxed pl-8">
                          {citation.source.aiContext}
                        </p>
                      </div>
                    </div>

                    {/* Actions and Metadata */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        {citation.source.author && (
                          <div className="flex items-center text-gray-600">
                            <div className="p-1.5 bg-gray-100 rounded-full mr-2">
                              <User className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm">{citation.source.author}</span>
                          </div>
                        )}
                        {citation.source.year && (
                          <div className="flex items-center text-gray-600">
                            <div className="p-1.5 bg-gray-100 rounded-full mr-2">
                              <Calendar className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-sm">{citation.source.year}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors group"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          title="Save for later"
                        >
                          <Bookmark className="w-4 h-4 group-hover:text-asu-maroon transition-colors" />
                        </button>
                        {citation.source.url && (
                          <div className="flex items-center space-x-2">
                            <div className="p-2 rounded-full bg-gray-100">
                              {React.createElement(getResourceIcon(citation.source), {
                                className: "w-4 h-4 text-gray-500"
                              })}
                            </div>
                            <a
                              href={citation.source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center px-3 py-2 rounded-full bg-asu-maroon/10 text-asu-maroon hover:bg-asu-maroon/20 transition-colors group"
                            >
                              <ExternalLink className="w-4 h-4 mr-1 group-hover:scale-105 transition-transform" />
                              View Source
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 