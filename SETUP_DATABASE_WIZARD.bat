@echo off
cls
echo ================================
echo   DATABASE SETUP WIZARD
echo ================================
echo.
echo This will create your quiz_platform database.
echo.
echo Please enter your PostgreSQL password
echo (The password you set when installing PostgreSQL)
echo.
set /p PGPASSWORD="Password: "

echo.
echo ================================
echo Creating database...
echo ================================
echo.

REM Set password environment variable
set PGPASSWORD=%PGPASSWORD%

REM Create database
echo Step 1: Creating database 'quiz_platform'...
createdb -U postgres quiz_platform 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Database created successfully!
) else (
    echo ℹ️  Database might already exist, checking...
)

echo.
echo Step 2: Creating tables from schema...
psql -U postgres -d quiz_platform -f database\schema.sql
if %ERRORLEVEL% EQU 0 (
    echo ✅ Tables created successfully!
    echo.
    echo ================================
    echo   DATABASE SETUP COMPLETE!
    echo ================================
    echo.
    echo Now updating your .env file...
    
    REM Update .env file with the password
    echo # Database Configuration > server\.env
    echo DATABASE_URL=postgresql://postgres:%PGPASSWORD%@localhost:5432/quiz_platform >> server\.env
    echo. >> server\.env
    echo # JWT Secret (use a strong random string in production) >> server\.env
    echo JWT_SECRET=quiz_platform_secret_key_2026_secure_jwt_token_12345 >> server\.env
    echo. >> server\.env
    echo # Server Port >> server\.env
    echo PORT=5000 >> server\.env
    echo. >> server\.env
    echo # Node Environment >> server\.env
    echo NODE_ENV=development >> server\.env
    
    echo ✅ Configuration updated!
    echo.
    echo ================================
    echo   ALL DONE! 🎉
    echo ================================
    echo.
    echo Next step: Double-click START_PROJECT.bat
    echo.
) else (
    echo.
    echo ❌ Error creating tables.
    echo.
    echo Common issues:
    echo 1. Wrong password
    echo 2. PostgreSQL not running
    echo.
    echo Try again? Run this script again.
    echo.
)

pause
