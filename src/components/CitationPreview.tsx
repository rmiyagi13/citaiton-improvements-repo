import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Quote, Bookmark, BookOpen, Link2, FileText, Info } from 'lucide-react';
import { Citation } from '../types';

interface CitationPreviewProps {
  citation: Citation;
  position: { x: number; y: number };
  onClose: () => void;
  isVisible: boolean;
}

interface OGMetadata {
  image: string | null;
  title: string | null;
  description: string | null;
}

export const CitationPreview: React.FC<CitationPreviewProps> = ({
  citation,
  position,
  onClose,
  isVisible,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ogMetadata, setOGMetadata] = useState<OGMetadata | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout>();
  const [shouldClose, setShouldClose] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const fetchOGMetadata = async () => {
      if (citation.source.url) {
        try {
          const proxyUrl = 'https://api.allorigins.win/get?url=';
          const response = await fetch(proxyUrl + encodeURIComponent(citation.source.url));
          const data = await response.json();
          
          if (data.contents) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.contents, 'text/html');
            
            const metadata: OGMetadata = {
              image: doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
                     doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content') ||
                     null,
              title: doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ||
                     doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ||
                     doc.title,
              description: doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
                          doc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ||
                          doc.querySelector('meta[name="description"]')?.getAttribute('content') ||
                          null
            };
            
            setOGMetadata(metadata);
          }
        } catch (error) {
          console.error('Failed to fetch metadata:', error);
        }
      }
    };

    fetchOGMetadata();
  }, [citation.source.url]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!tooltipRef.current || shouldClose) return;

      const tooltip = tooltipRef.current;
      const tooltipRect = tooltip.getBoundingClientRect();
      const safeZone = 40;

      const isInSafeZone = 
        e.clientX >= tooltipRect.left - safeZone &&
        e.clientX <= tooltipRect.right + safeZone &&
        e.clientY >= tooltipRect.top - safeZone &&
        e.clientY <= tooltipRect.bottom + safeZone;

      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }

      if (!isInSafeZone && !isInteracting) {
        closeTimeoutRef.current = setTimeout(() => {
          setShouldClose(true);
          onClose();
        }, 300);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [onClose, shouldClose, isInteracting]);

  const handleTooltipInteraction = (interacting: boolean) => {
    setIsInteracting(interacting);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  };

  const getSourceIcon = (url: string) => {
    if (url.includes('book')) return BookOpen;
    if (url.includes('article')) return FileText;
    return Link2;
  };

  const SourceIcon = citation.source.url ? getSourceIcon(citation.source.url) : Link2;

  if (!isVisible || shouldClose) return null;

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 w-72 bg-white rounded-lg shadow-xl border border-gray-200 pointer-events-auto transform-gpu transition-all duration-200"
      style={{
        top: position.y + 'px',
        left: position.x + 'px',
        transform: `translate(-50%, -100%) translateY(-8px)`,
      }}
      onMouseEnter={() => handleTooltipInteraction(true)}
      onMouseLeave={() => handleTooltipInteraction(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-3 bg-white rounded-lg space-y-2">
        {/* Title and Icon */}
        <div className="flex items-start space-x-2">
          <SourceIcon className="w-4 h-4 text-asu-maroon flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              {ogMetadata?.title || citation.source.title}
            </h4>
            {citation.source.author && (
              <p className="text-xs text-gray-600 mt-0.5">
                {citation.source.author}
                {citation.source.year && ` (${citation.source.year})`}
              </p>
            )}
          </div>
        </div>

        {/* Preview Text */}
        <div className="text-xs text-gray-600 italic border-l-2 border-gray-200 pl-2">
          "{citation.text}"
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-2 pt-1">
          <button
            className="p-1 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors text-xs flex items-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add save functionality
            }}
          >
            <Bookmark className="w-3 h-3 mr-1" />
            Save
          </button>
          {citation.source.url && (
            <a
              href={citation.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded-md bg-gray-50 text-asu-maroon hover:bg-gray-100 transition-colors text-xs flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              View Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}; 