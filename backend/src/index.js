require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const modelsRoute = require('./routes/models');
const chatRoute = require('./routes/chat');

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// CORS - only allow frontend origin
app.use(cors({
    origin: CLIENT_ORIGIN,
    credentials: true
  }));

// Basic rate limiting to avoid abuse
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // max 60 requests per minute per IP
    standardHeaders: true,
    legacyHeaders: false,
  });



  app.use('/api/', apiLimiter);

  app.use('/api/models', modelsRoute);
  app.use('/api/chat', chatRoute);

  app.get('/', (req, res) => res.send({ ok: true, message: 'OpenRouter proxy running' }));

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });