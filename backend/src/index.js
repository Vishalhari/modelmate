require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const modelsRoute = require('./routes/models');
const chatRoute = require('./routes/chat');

const PORT = process.env.PORT || 50002;



// Explicitly allow frontend origin
const CLIENT_ORIGINS = process.env.CLIENT_ORIGINS
  ? process.env.CLIENT_ORIGINS.split(',')
  : ['http://localhost:3000'];  // 👈 set your frontend origin here


const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || CLIENT_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
// Explicitly handle preflight requests
app.options('*', cors());

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