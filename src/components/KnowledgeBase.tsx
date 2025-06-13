import React, { useState } from 'react';
import { File, Link2, Upload, X, ChevronRight, BookOpen, FileText, Globe } from 'lucide-react';

interface KnowledgeBaseItem {
  id: string;
  title: string;
  type: 'file' | 'url';
  url?: string;
  content?: string;
  highlights?: string[];
  lastAccessed?: Date;
}

interface KnowledgeBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  isOpen,
  onClose,
}) => {
  const [items, setItems] = useState<KnowledgeBaseItem[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const content = await file.text();
        
        setItems(prev => [...prev, {
          id: `file-${Date.now()}-${i}`,
          title: file.name,
          type: 'file',
          content,
          lastAccessed: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlAdd = (url: string) => {
    if (!url.includes('asu.edu')) {
      alert('Only ASU URLs are allowed');
      return;
    }

    setItems(prev => [...prev, {
      id: `url-${Date.now()}`,
      title: url,
      type: 'url',
      url,
      lastAccessed: new Date()
    }]);
  };

  const getItemIcon = (item: KnowledgeBaseItem) => {
    if (item.type === 'file') {
      if (item.title.endsWith('.pdf')) return FileText;
      return File;
    }
    return Globe;
  };

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Knowledge Base</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Upload Section */}
      <div className="p-4 border-b border-gray-200 space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex-1">
            <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-asu-maroon transition-colors cursor-pointer">
              <Upload className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Upload Files</span>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </div>
          </label>
          <button
            className="px-4 py-2 bg-asu-maroon text-white rounded-lg hover:bg-asu-maroon/90 transition-colors"
            onClick={() => {
              const url = prompt('Enter ASU URL:');
              if (url) handleUrlAdd(url);
            }}
          >
            Add ASU URL
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto">
        {items.map((item) => {
          const ItemIcon = getItemIcon(item);
          const isExpanded = expandedItem === item.id;

          return (
            <div
              key={item.id}
              className="border-b border-gray-100 last:border-0"
            >
              {/* Item Header */}
              <button
                className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-start space-x-3"
                onClick={() => setExpandedItem(isExpanded ? null : item.id)}
              >
                <ItemIcon className="w-5 h-5 text-asu-maroon flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.type === 'url' ? 'ASU URL' : 'Uploaded File'}
                    {item.lastAccessed && ` • Last accessed ${item.lastAccessed.toLocaleDateString()}`}
                  </p>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4">
                  {item.type === 'url' ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gray-50">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-asu-maroon hover:underline flex items-center"
                        >
                          <Link2 className="w-4 h-4 mr-2" />
                          {item.url}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gray-50">
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                          {item.content}
                        </pre>
                      </div>
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-900">Highlights</h4>
                          {item.highlights.map((highlight, index) => (
                            <div
                              key={index}
                              className="p-3 rounded-lg bg-yellow-50 border border-yellow-100"
                            >
                              <p className="text-sm text-yellow-800">{highlight}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}; 