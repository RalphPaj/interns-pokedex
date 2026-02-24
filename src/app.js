// src/app.js
import express from 'express';
import router from './routes/index.js';

const app = express();

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Serve static files
app.use(express.static('public'));

// Use main router
app.use('/', router);

export default app;