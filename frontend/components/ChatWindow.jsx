import React, { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import Message from './Message';
import { sendChat } from '../services/api';

export default function ChatWindow() {
  const { messages, addMessage, model, setLoading, loading } = useContext(ChatContext);
  const [text, setText] = useState('');

  const onSend = async () => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', content: text };
    addMessage(userMsg);
    setText('');
    setLoading(true);

    try {
      // Build minimal request using messages: you might want to pass entire conversation
      const payload = { model, messages: [...messages, userMsg] };
      const resp = await sendChat(payload);
      // OpenRouter returns choices array; we pick first choice.message.content
      const choice = resp.choices && resp.choices[0];
      const assistantText = choice?.message?.content || choice?.text || 'No response';
      addMessage({ role: 'assistant', content: assistantText });
    } catch (err) {
      console.error('Chat error', err);
      addMessage({ role: 'assistant', content: 'Error: failed to get response' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 bg-gray-900">
        {messages.map((m, idx) => <Message key={idx} role={m.role} content={m.content} />)}
      </div>

      <div className="p-3 bg-gray-800 flex items-center gap-2">
        <textarea
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 bg-gray-700 rounded text-white"
          placeholder="Type your message..."
        />
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          onClick={onSend}
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
