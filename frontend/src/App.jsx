import React from 'react';
import { ChatProvider } from '../context/ChatContext';
import Header from '../components/Header';
import ModelSelector from '../components/ModelSelector';
import ChatWindow from '../components/ChatWindow';

export default function App() {
  return (
    <ChatProvider>
      <div className="h-screen flex flex-col bg-gray-950 text-white">
        <Header />
        <div className="flex flex-row gap-4 p-4 h-full">
          <aside className="w-72 bg-gray-900 rounded p-2">
            <ModelSelector />
            <div className="p-2 text-xs text-gray-400">Choose a model (OpenRouter provides many free models; see docs)</div>
          </aside>
          <main className="flex-1 bg-gray-800 rounded">
            <ChatWindow />
          </main>
        </div>
      </div>
    </ChatProvider>
  );
}
