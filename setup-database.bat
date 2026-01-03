@echo off
REM Database Setup Script for Quiz Platform (Windows)
REM This script creates the database and runs the schema

echo Setting up Quiz Platform Database...

REM Database name
set DB_NAME=quiz_platform

REM Check if psql is available
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo PostgreSQL is not installed or not in PATH. Please install PostgreSQL first.
    exit /b 1
)

REM Check if database exists
psql -U postgres -lqt | findstr /C:"%DB_NAME%" >nul
if %ERRORLEVEL% EQU 0 (
    echo Database '%DB_NAME%' already exists.
    set /p REPLY="Do you want to drop and recreate it? (y/N): "
    if /i "%REPLY%"=="y" (
        echo Dropping database...
        dropdb -U postgres %DB_NAME%
        echo Database dropped.
    )
)

REM Create database
echo Creating database '%DB_NAME%'...
createdb -U postgres %DB_NAME%
if %ERRORLEVEL% EQU 0 (
    echo Database created successfully!
) else (
    echo Database might already exist. Continuing...
)

REM Run schema
echo Running database schema...
psql -U postgres -d %DB_NAME% -f database\schema.sql

if %ERRORLEVEL% EQU 0 (
    echo Database schema applied successfully!
    echo.
    echo Database setup complete!
    echo.
    echo Next steps:
    echo 1. Update server\.env with your database credentials
    echo 2. Run 'npm run dev' to start the application
) else (
    echo Error applying database schema.
    exit /b 1
)

pause
