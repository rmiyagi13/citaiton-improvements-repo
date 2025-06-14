import React from 'react';
import { MainContent } from './components/MainContent';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Citations Knowledge Base</h1>
        </div>
      </header>
      <main>
        <MainContent />
      </main>
    </div>
  );
}

export default App; 