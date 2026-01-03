const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function setupSupabase() {
  // Supabase connection string (Direct connection)
  const connectionString = 'postgresql://postgres:Puneeth%402004tkd@db.bizsgmqyjnwnxfgfadig.supabase.co:5432/postgres';

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('================================');
    console.log('  SUPABASE DATABASE SETUP');
    console.log('================================\n');

    console.log('Step 1: Connecting to Supabase...');
    await client.connect();
    console.log('✅ Connected!\n');

    console.log('Step 2: Applying schema...');
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await client.query(schema);
    console.log('✅ Schema applied!\n');

    console.log('================================');
    console.log('  ✅ SUPABASE SETUP COMPLETE!');
    console.log('================================\n');
    console.log('Your cloud database is ready!');
    console.log('Next: Deploy to Vercel\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

setupSupabase();
