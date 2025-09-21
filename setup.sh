#!/bin/bash

# Hirely Consultants - Quick Setup Script
# This script will help you get the project running quickly

echo "🚀 Setting up Hirely Consultants Employee Management System..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+ and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 To run the application:"
echo ""
echo "1. Start the JSON Server (Backend API):"
echo "   npx json-server --watch db.json --port 3000"
echo ""
echo "2. Start the Angular Application (Frontend):"
echo "   npm start"
echo ""
echo "3. Open your browser and navigate to:"
echo "   http://localhost:4200"
echo ""
echo "🔗 The API will be available at:"
echo "   http://localhost:3000"
echo ""
echo "Happy coding! 🎯"