// Vercel serverless function wrapper
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', 'server', '.env') });

const app = require('../server/index.js');

module.exports = app;
