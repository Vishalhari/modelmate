const Joi = require('joi');

const chatSchema = Joi.object({
    model: Joi.string().min(3).required(),
    messages: Joi.array().items(
      Joi.object({
        role: Joi.string().valid('user','assistant','system','tool').required(),
        content: Joi.alternatives().try(
          Joi.string(),
          Joi.array()
        ).required()
      })
    ).optional(),
    prompt: Joi.string().optional(),
    max_tokens: Joi.number().integer().min(1).max(100000).optional(),
    temperature: Joi.number().min(0).max(2).optional()
  });

module.exports = {
    chatSchema
};