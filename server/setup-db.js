const { Client } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  console.log('================================');
  console.log('  DATABASE SETUP (Automated)');
  console.log('================================\n');
  
  // First, connect to postgres database to create our database
  const adminClient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres', // Connect to default postgres database
    password: 'Puneeth', // Your PostgreSQL password
    port: 5432,
  });

  try {
    console.log('Step 1: Connecting to PostgreSQL...');
    await adminClient.connect();
    console.log('✅ Connected!\n');

    console.log('Step 2: Creating database quiz_platform...');
    try {
      await adminClient.query('CREATE DATABASE quiz_platform');
      console.log('✅ Database created!\n');
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('ℹ️  Database already exists, continuing...\n');
      } else {
        throw err;
      }
    }

    await adminClient.end();

    // Now connect to quiz_platform database to create tables
    const dbClient = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'quiz_platform',
      password: 'Puneeth',
      port: 5432,
    });

    console.log('Step 3: Connecting to quiz_platform database...');
    await dbClient.connect();
    console.log('✅ Connected!\n');

    console.log('Step 4: Creating tables from schema...');
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await dbClient.query(schema);
    console.log('✅ Tables created!\n');

    await dbClient.end();

    console.log('================================');
    console.log('  ✅ DATABASE SETUP COMPLETE!');
    console.log('================================\n');
    console.log('Your database is ready!');
    console.log('Next: Run START_PROJECT.bat\n');

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('\nPossible issues:');
    console.log('1. PostgreSQL service not running');
    console.log('2. Wrong password in server\\.env');
    console.log('3. PostgreSQL not installed\n');
    process.exit(1);
  }
}

setupDatabase();
