@echo off
REM Hirely Consultants - Quick Setup Script for Windows
REM This script will help you get the project running quickly

echo 🚀 Setting up Hirely Consultants Employee Management System...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18+ and try again.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm and try again.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed
echo.

REM Install dependencies
echo 📦 Installing project dependencies...
npm install

if %errorlevel% eq 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🎉 Setup complete!
echo.
echo 📋 To run the application:
echo.
echo 1. Start the JSON Server (Backend API):
echo    npx json-server --watch db.json --port 3000
echo.
echo 2. Start the Angular Application (Frontend):
echo    npm start
echo.
echo 3. Open your browser and navigate to:
echo    http://localhost:4200
echo.
echo 🔗 The API will be available at:
echo    http://localhost:3000
echo.
echo Happy coding! 🎯
pause