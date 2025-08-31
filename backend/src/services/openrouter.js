const axios = require('axios');

const OPENROUTER_BASE = 'https://openrouter.ai';
const API_KEY = process.env.OPENROUTER_API_KEY;
if (!API_KEY) {
  console.warn('OPENROUTER_API_KEY is not set. Set it in .env before running.');
}

const defaultHeaders = () => {
    const headers = {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    };
    // Optional site attribution (helps OpenRouter show app on their site)
    if (process.env.SITE_URL) {
      headers['HTTP-Referer'] = process.env.SITE_URL;
      headers['X-Title'] = process.env.SITE_NAME || 'My OpenRouter App';
    }
    return headers;
  };

  async function listModels() {
    const url = `${OPENROUTER_BASE}/api/v1/models`;
    const res = await axios.get(url, { headers: defaultHeaders(), timeout: 10000 });
    // `res.data` is the OpenRouter model listing. We'll lightly transform it.
    return res.data;
  }
  
  async function chatCompletion(payload) {
    // payload should be { model, messages } or { model, prompt }
    const url = `${OPENROUTER_BASE}/api/v1/chat/completions`;
    const res = await axios.post(url, payload, { headers: defaultHeaders(), timeout: 60000 });
    return res.data;
  }

  module.exports = {
    listModels,
    chatCompletion
  };