const express = require('express');
const router = express.Router();
const { chatSchema } = require('../utils/validator');
const openrouter = require('../services/openrouter');

// POST /api/chat
router.post('/', async (req, res) => {
    try {
      // validate incoming body
      const { error, value } = chatSchema.validate(req.body, { allowUnknown: true });
      if (error) {
        return res.status(400).json({ error: 'Invalid request', details: error.details });
      }
  
      const payload = {
        model: value.model,
        // prefer `messages` if provided; fallback to prompt
        ...(value.messages ? { messages: value.messages } : (value.prompt ? { prompt: value.prompt } : {})),
        max_tokens: value.max_tokens || 512,
        temperature: value.temperature ?? 0.7
      };
  
      const openrouterResp = await openrouter.chatCompletion(payload);
      // return OpenRouter's JSON response directly (so frontend can render choices etc.)
      res.json(openrouterResp);
    } catch (err) {
      console.error('Chat error:', err?.response?.data || err.message);
      const status = err?.response?.status || 500;
  
      // Handle rate limit / 429 specially
      if (status === 429) {
        return res.status(429).json({ error: 'Rate limited by OpenRouter', details: err?.response?.data || 'Too many requests' });
      }
  
      res.status(status).json({ error: 'OpenRouter request failed', details: err?.response?.data || err.message });
    }
  });

  module.exports = router;