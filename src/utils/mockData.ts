import { Conversation, Message, ModelInfo } from '../types';

// Mock conversations for demo purposes
export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Help me understand what things typically break my focus, so I can think more clearly',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    tokenCount: 15420,
    messages: [
      {
        id: 'm1',
        content: 'Help me understand what things typically break my focus, so I can think more clearly',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        isUser: true
      },
      {
        id: 'm2', 
        content: 'I can help you identify common focus blockers and strategies to maintain mental clarity. Research shows that digital distractions like notifications and social media are among the most significant focus disruptors in modern work environments. Studies have found that it takes an average of 23 minutes to fully regain focus after an interruption. Additionally, cognitive research indicates that multitasking can reduce productivity by up to 40%. Environmental factors and unresolved emotional stress have also been shown to significantly impact cognitive performance and attention span.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30000),
        isUser: false,
        citations: [
          {
            text: 'digital distractions like notifications and social media are among the most significant focus disruptors in modern work environments',
            startIndex: 89,
            endIndex: 201,
            source: {
              title: 'The Cost of Interrupted Work: More Speed and Stress',
              author: 'Gloria Mark et al.',
              year: 2008,
              url: 'https://www.ics.uci.edu/~gmark/chi08-mark.pdf',
              usageContext: 'This research provided evidence that digital interruptions are the primary focus disruptors, which informed the recommendation to minimize digital distractions.',
              preview: "A study of information workers found that they are interrupted every 11 minutes on average, with digital notifications being the most frequent source of interruption.",
              aiContext: "Used to establish the significance of digital distractions in the modern workplace and their impact on focus."
            }
          },
          {
            text: 'it takes an average of 23 minutes to fully regain focus after an interruption',
            startIndex: 203,
            endIndex: 277,
            source: {
              title: 'Brain, Interrupted',
              author: 'Bob Sullivan and Hugh Thompson',
              year: 2013,
              url: 'https://www.nytimes.com/2013/05/05/opinion/sunday/a-focus-on-distraction.html',
              usageContext: 'This finding highlights the severe impact of interruptions, showing that even brief distractions can lead to significant productivity losses.',
              preview: "Research at the University of California, Irvine, demonstrated the significant time cost of interruptions on cognitive focus.",
              aiContext: "Used to quantify the recovery time needed after interruptions, emphasizing the importance of maintaining focus."
            }
          },
          {
            text: 'multitasking can reduce productivity by up to 40%',
            startIndex: 308,
            endIndex: 357,
            source: {
              title: 'Executive Control of Cognitive Processes in Task Switching',
              author: 'Joshua S. Rubinstein et al.',
              year: 2001,
              url: 'https://www.apa.org/research/action/multitask',
              usageContext: 'This research demonstrates the concrete productivity cost of multitasking, supporting the recommendation to focus on one task at a time.',
              preview: "Experimental studies showed significant performance costs when participants attempted to handle multiple tasks simultaneously.",
              aiContext: "Used to demonstrate the quantifiable impact of multitasking on productivity and cognitive performance."
            }
          }
        ]
      }
    ]
  },
  {
    id: '2', 
    title: 'Help me understand what things typically break my...',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    tokenCount: 12800,
    messages: [
      {
        id: 'm3',
        content: 'Can you help me organize my thoughts for a presentation?',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isUser: true
      }
    ]
  },
  {
    id: '3',
    title: 'Walk me through using a Zoom recording transcript...',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    tokenCount: 8900,
    messages: []
  },
  {
    id: '4',
    title: 'can you tell me about yourself and what you can do',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    tokenCount: 5600,
    messages: []
  },
  {
    id: '5',
    title: 'can you tell me about what you understand about...',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    tokenCount: 7200,
    messages: []
  },
  {
    id: '6',
    title: 'Help me understand what things typically break my...',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    tokenCount: 11200,
    messages: []
  },
  {
    id: '7',
    title: 'Walk me through using a Zoom recording transcript...',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    tokenCount: 9800,
    messages: []
  },
  {
    id: '8',
    title: 'Help me understand what things typically break my...',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago (May)
    tokenCount: 13400,
    messages: []
  },
  {
    id: '9',
    title: 'Walk me through using a Zoom recording transcript...',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago (May)
    tokenCount: 6700,
    messages: []
  },
  {
    id: 'steak-conversation',
    title: 'How to cook the perfect steak',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    tokenCount: 8420,
    messages: [
      {
        id: 'steak-q1',
        content: 'What\'s the best way to cook the perfect steak? I want to learn the proper technique.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        isUser: true
      },
      {
        id: 'steak-a1',
        content: 'Let me guide you through the science-backed method for cooking the perfect steak. The key steps are:\n\n1. Start with room temperature meat - remove your steak from the refrigerator 30-60 minutes before cooking. This ensures even cooking throughout the meat.\n\n2. Pat the steak completely dry with paper towels and season generously with salt and pepper. The dry surface is crucial for achieving a proper sear and developing a flavorful crust through the Maillard reaction.\n\n3. For optimal results, use a cast-iron skillet preheated to 450-500°F (232-260°C). At this temperature range, you\'ll achieve the ideal Maillard reaction for flavor development.\n\n4. Cook for 3-4 minutes per side for medium-rare (internal temperature of 135°F/57°C). Research shows this temperature maximizes tenderness while ensuring food safety.\n\n5. Let the steak rest for 5-10 minutes after cooking. During this time, the muscle fibers relax and reabsorb the juices, resulting in a more tender and juicier steak.\n\nFor best results, consider using a reverse sear method for thicker cuts over 1.5 inches. This technique provides more even cooking and better temperature control.',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 30000),
        isUser: false,
        citations: [
          {
            text: 'Start with room temperature meat - remove your steak from the refrigerator 30-60 minutes before cooking',
            startIndex: 89,
            endIndex: 183,
            source: {
              title: 'The Food Lab: The Importance of Resting Meat',
              author: 'J. Kenji López-Alt',
              year: 2020,
              url: 'https://www.seriouseats.com/food-lab-complete-guide-to-pan-seared-steaks',
              imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
              preview: "Allowing the meat to come to room temperature ensures even cooking from edge to edge. Cold meat will cook unevenly, with the outside overcooking before the center reaches the desired temperature.",
              aiContext: "This research informed the recommendation for tempering the steak, which is crucial for achieving consistent doneness throughout the meat."
            }
          },
          {
            text: 'achieving a proper sear and developing a flavorful crust through the Maillard reaction',
            startIndex: 277,
            endIndex: 359,
            source: {
              title: 'The Science of Cooking: Understanding the Biology and Chemistry Behind Food and Cooking',
              author: 'Stuart Farrimond',
              year: 2017,
              url: 'https://www.scienceofcooking.com/maillard_reaction.htm',
              imageUrl: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
              preview: "The Maillard reaction occurs between amino acids and reducing sugars under high heat, creating hundreds of different flavor compounds and the characteristic brown crust on seared meats.",
              aiContext: "This scientific principle was used to explain why a dry surface and high heat are essential for developing flavor through proper searing."
            }
          },
          {
            text: 'use a cast-iron skillet preheated to 450-500°F (232-260°C)',
            startIndex: 378,
            endIndex: 435,
            source: {
              title: 'Cast Iron Cooking: The Science Behind the Heat',
              author: 'America\'s Test Kitchen',
              year: 2021,
              url: 'https://www.americastestkitchen.com/articles/3721-the-science-of-cast-iron-cooking',
              imageUrl: 'https://images.unsplash.com/photo-1531236668087-e0af8ee6a3a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
              preview: "Cast iron's excellent heat retention and even heating make it ideal for achieving the perfect sear on steaks. The pan should be preheated until it's hot enough that a drop of water immediately vaporizes.",
              aiContext: "This research provided the specific temperature range and pan choice recommendations for optimal searing conditions."
            }
          },
          {
            text: 'internal temperature of 135°F/57°C',
            startIndex: 513,
            endIndex: 548,
            source: {
              title: 'USDA Safe Minimum Internal Temperature Chart',
              author: 'USDA Food Safety and Inspection Service',
              year: 2023,
              url: 'https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/safe-temperature-chart'
            }
          },
          {
            text: 'muscle fibers relax and reabsorb the juices, resulting in a more tender and juicier steak',
            startIndex: 644,
            endIndex: 731,
            source: {
              title: 'Meat Science and Muscle Biology: Understanding Rest Time',
              author: 'Harold McGee',
              year: 2020,
              url: 'https://www.finecooking.com/article/the-science-of-cooking-meat-part-2'
            }
          }
        ],
        resources: [
          {
            title: 'The Complete Guide to Steak Temperatures',
            description: 'Comprehensive temperature guide with visual doneness indicators and scientific explanations of protein changes at different temperatures.',
            url: 'https://www.thermoworks.com/steak-temperature-guide/',
            imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947',
            author: 'ThermoWorks Kitchen',
            publishDate: '2023-08-15',
            readingTime: 12
          },
          {
            title: 'Cast Iron Skillet Care and Techniques',
            description: 'Essential tips for maintaining and cooking with cast iron, including seasoning methods and heat management for perfect searing.',
            url: 'https://www.lodgecastiron.com/discover/cleaning-and-care',
            imageUrl: 'https://images.unsplash.com/photo-1575193732883-6fd4bdc71014',
            author: 'Lodge Cast Iron',
            publishDate: '2023-10-01',
            readingTime: 8
          },
          {
            title: 'The Science of the Reverse Sear Method',
            description: 'Detailed explanation of the reverse sear technique with temperature control and timing for different steak thicknesses.',
            url: 'https://www.seriouseats.com/reverse-seared-steak-recipe',
            imageUrl: 'https://images.unsplash.com/photo-1588778272105-1ff4b41e39b8',
            author: 'J. Kenji López-Alt',
            publishDate: '2023-11-30',
            readingTime: 15
          }
        ]
      }
    ]
  }
];

// Available AI models with different context windows
export const availableModels: ModelInfo[] = [
  {
    name: 'GPT-3.5 Turbo',
    maxContextTokens: 16385,
    description: 'Fast and efficient for most tasks'
  },
  {
    name: 'GPT-4',
    maxContextTokens: 32768,
    description: 'More capable reasoning, longer context'
  },
  {
    name: 'GPT-4 Turbo',
    maxContextTokens: 128000,
    description: 'Newest model with extended context window'
  },
  {
    name: 'Claude-3 Sonnet',
    maxContextTokens: 200000,
    description: 'High-performance model with very large context'
  }
];

// Simulate token counting (in real app, this would come from API)
export const estimateTokenCount = (text: string): number => {
  // Rough estimation: ~1 token per 4 characters for English text
  return Math.ceil(text.length / 4);
};

// Generate mock conversation with high token count to trigger warning
export const generateHighTokenConversation = (): Conversation => {
  const messages: Message[] = [];
  let totalTokens = 0;
  
  // Generate enough messages to approach context limit
  for (let i = 0; i < 50; i++) {
    const userMessage = `This is user message ${i + 1}. I'm asking about something that requires a detailed response to help me understand the concept better.`;
    const assistantMessage = `This is a detailed response from the assistant for message ${i + 1}. I'm providing comprehensive information that includes multiple paragraphs, examples, and explanations to help you understand the topic thoroughly. This response is intentionally long to simulate how context windows fill up during extended conversations.`;
    
    const userTokens = estimateTokenCount(userMessage);
    const assistantTokens = estimateTokenCount(assistantMessage);
    
    totalTokens += userTokens + assistantTokens;
    
    messages.push({
      id: `user-${i}`,
      content: userMessage,
      timestamp: new Date(Date.now() - (50 - i) * 60000), // 1 minute intervals
      isUser: true
    });
    
    messages.push({
      id: `assistant-${i}`,
      content: assistantMessage, 
      timestamp: new Date(Date.now() - (50 - i) * 60000 + 30000), // 30 seconds after user
      isUser: false
    });
  }
  
  return {
    id: 'high-token-conversation',
    title: 'Extended conversation approaching context limit',
    createdAt: new Date(),
    tokenCount: totalTokens,
    messages
  };
}; 