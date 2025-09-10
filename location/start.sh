#!/bin/bash

# Start script for Location application
echo "Starting Location Application..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python3 is not installed. Please install Python3 first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Start backend
echo "Starting Flask backend..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp env_example.txt .env
    echo "Please edit .env file with your WhatsApp credentials before running the application."
fi

echo "Backend starting on http://localhost:5000"
python app.py &
BACKEND_PID=$!

# Start frontend
echo "Starting React frontend..."
cd ../client
npm install
echo "Frontend starting on http://localhost:5173"
npm run dev &
FRONTEND_PID=$!

echo "Application started!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for interrupt
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
