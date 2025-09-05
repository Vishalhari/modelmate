import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [model, setModel] = useState(null);
    const [messages, setMessages] = useState([]); // { role, content }
    const [loading, setLoading] = useState(false);
  
    const addMessage = (msg) => setMessages((m) => [...m, msg]);
    const reset = () => { setMessages([]); setModel(null); };
  
    return (
      <ChatContext.Provider value={{
        model, setModel, messages, setMessages, addMessage, reset, loading, setLoading
      }}>
        {children}
      </ChatContext.Provider>
    );
  }