import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5002/api';

export async function fetchModels() {
    const res = await axios.get(`${API_BASE}/models`);
    return res.data.data;
  }
  
export async function sendChat(payload) {
    // payload: { model, messages } or { model, prompt }
    const res = await axios.post(`${API_BASE}/chat`, payload);
    return res.data;
  }