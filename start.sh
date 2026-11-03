#!/usr/bin/env bash
echo "======================================================================"
echo "   JAMIA ISLAMIA - MADRASHA MANAGEMENT SOFTWARE v3.0 (ENTERPRISE)"
echo "======================================================================"
echo ""

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Starting server on port 5000..."
node src/server.js
