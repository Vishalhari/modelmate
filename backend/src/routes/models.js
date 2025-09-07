const express = require('express');
const router = express.Router();
const openrouter = require('../services/openrouter');

const ALLOWED_MODELS = [
  "openai/gpt-4o-mini",
  "anthropic/claude-3.5-sonnet",
  "deepseek/deepseek-chat"
];


// GET /api/models
router.get('/', async (req, res) => {
    try {
      const raw = await openrouter.listModels();
      // raw.data is array of models - return compact list with id and name and price
      const compact = (raw.data || []).map(m => ({
        id: m.id || `${m.author}/${m.slug}` || m.name,
        name: m.name || m.id,
        description: m.description,
        prompt_pricing: m.prompt_pricing || null,
        output_pricing: m.completion_pricing || null,
        supported_parameters: m.supported_parameters || []
      }));
      // ✅ Only include whitelisted models
    const filtered = compact.filter(m => ALLOWED_MODELS.includes(m.id));

    res.json({ data: filtered });






      // const compact = (raw.data || []).map(m => ({
      //   id: m.id || `${m.author}/${m.slug}` || m.name,
      //   name: m.name || m.id,
      //   description: m.description,
      //   prompt_pricing: m.prompt_pricing || null,
      //   output_pricing: m.completion_pricing || null,
      //   supported_parameters: m.supported_parameters || []
      // }));

      // Optionally filter to free models only if ?free=true
      // if (req.query.free === 'true') {
      //   return res.json({ data: compact.filter(m => {
      //     const priceTag = (m.prompt_pricing || '').toLowerCase();
      //     return priceTag.includes('free') || priceTag.includes('$0') || priceTag.includes('0/m');
      //   })});
      // }
      // const filtered = compact.filter(m => ALLOWED_MODELS.includes(m.id));
      // res.json({ data: filtered });
    } catch (err) {
      console.error('Failed to fetch models:', err?.response?.data || err.message);
      const status = err?.response?.status || 500;
      res.status(status).json({ error: 'Failed to fetch models from OpenRouter', details: err?.response?.data || err.message });
    }
  });

  module.exports = router;