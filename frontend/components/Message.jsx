import React from 'react';
export default function Message({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`${isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'} max-w-[70%] p-3 rounded-lg`}>
        <div className="text-sm whitespace-pre-wrap">{typeof content === 'string' ? content : JSON.stringify(content)}</div>
        <div className="text-xs text-gray-400 mt-1">{role}</div>
      </div>
    </div>
  );
}
