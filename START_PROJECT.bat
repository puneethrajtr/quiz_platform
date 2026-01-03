@echo off
echo ================================
echo    QUIZ PLATFORM STARTUP
echo ================================
echo.
echo Checking setup...
echo.

REM Check if node_modules exists
if not exist "client\node_modules" (
    echo Installing dependencies...
    call npm install
    cd client
    call npm install
    cd ..
    cd server
    call npm install
    cd ..
)

echo.
echo ================================
echo Starting servers...
echo ================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Press Ctrl+C to stop the servers
echo ================================
echo.

npm run dev

pause
