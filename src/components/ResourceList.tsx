import React, { useState } from 'react';
import { ExternalLink, Calendar, User, Clock } from 'lucide-react';
import { Resource } from '../types';

interface ResourceListProps {
  resources: Resource[];
}

export const ResourceList: React.FC<ResourceListProps> = ({ resources }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!resources || resources.length === 0) return null;

  // Only show top 3 resources
  const topResources = resources.slice(0, 3);

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <h4 className="text-sm font-medium text-gray-900 mb-3">Top Resources</h4>
      <div className="grid grid-cols-3 gap-4">
        {topResources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/3] overflow-hidden rounded-lg"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background Image */}
            <img
              src={resource.imageUrl || 'https://via.placeholder.com/400x300?text=Resource'}
              alt={resource.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay that becomes fully transparent on hover */}
            <div 
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                hoveredIndex === index ? 'opacity-80' : 'opacity-50'
              }`}
            />

            {/* Content Container */}
            <div className={`absolute inset-0 p-4 flex flex-col transition-opacity duration-300 ${
              hoveredIndex === index ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="flex-1">
                <h5 className="text-lg font-medium text-white mb-2">
                  {resource.title}
                </h5>
                <p className="text-sm text-gray-200 line-clamp-3">
                  {resource.description}
                </p>
              </div>

              {/* Metadata */}
              <div className="mt-auto">
                <div className="flex flex-col space-y-1">
                  {resource.author && (
                    <div className="flex items-center text-xs text-gray-300">
                      <User className="w-3 h-3 mr-1" />
                      <span>{resource.author}</span>
                    </div>
                  )}
                  {resource.publishDate && (
                    <div className="flex items-center text-xs text-gray-300">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(resource.publishDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {resource.readingTime && (
                    <div className="flex items-center text-xs text-gray-300">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{resource.readingTime} min read</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center mt-2 text-white text-sm">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  <span>View Resource</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}; 