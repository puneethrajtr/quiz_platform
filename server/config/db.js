const { Pool } = require('pg');
require('dotenv').config();

// Debug: Log connection attempt (remove password for security)
if (process.env.NODE_ENV === 'production') {
  console.log('Attempting database connection...');
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
}

/**
 * PostgreSQL Database Connection Pool
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:Puneeth@localhost:5432/quiz_platform',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
