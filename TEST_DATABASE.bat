@echo off
echo ================================
echo   DATABASE CONNECTION TEST
echo ================================
echo.

cd server

echo Testing database connection...
echo.

node -e "require('dotenv').config(); const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URL }); pool.query('SELECT NOW() as time, version()', (err, res) => { if (err) { console.log('❌ ERROR:', err.message); console.log(''); console.log('Please check:'); console.log('1. PostgreSQL is running'); console.log('2. Database quiz_platform exists'); console.log('3. Password in server\\.env is correct'); } else { console.log('✅ Database connected successfully!'); console.log('Time:', res.rows[0].time); console.log(''); console.log('Database is ready! You can now start the project.'); } pool.end(); });"

cd ..

echo.
pause
