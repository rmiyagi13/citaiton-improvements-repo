export interface Resource {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  author?: string;
  publishDate?: string;
  readingTime?: number;
}

export interface Citation {
  text: string;
  startIndex: number;
  endIndex: number;
  source: Source;
}

export interface Source {
  title: string;
  author?: string;
  year?: number;
  url?: string;
  imageUrl?: string;
  preview?: string;
  aiContext?: string;
  usageContext?: string; // How this source was used in the response
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isUser: boolean;
  citations?: Citation[];
  resources?: Resource[];
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  tokenCount: number;
  messages: Message[];
}

export interface ContextWindowInfo {
  currentTokens: number;
  maxTokens: number;
  warningThreshold: number; // percentage when to show warning
  modelName: string;
}

export interface ModelInfo {
  name: string;
  maxContextTokens: number;
  description: string;
}

export interface RateLimitInfo {
  currentRequests: number;
  maxRequests: number;
  resetTime: Date;
  isBlocked: boolean;
} 