import React from 'react';
export default function Header({ title = 'OpenRouter Chat' }) {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex gap-3 items-center">
        <span className="text-sm text-gray-400">Model test</span>
      </div>
    </header>
  );
}
