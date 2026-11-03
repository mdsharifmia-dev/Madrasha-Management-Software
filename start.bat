@echo off
TITLE Madrasha Management Software
COLOR 0A
echo ======================================================================
echo    JAMIA ISLAMIA - MADRASHA MANAGEMENT SOFTWARE v3.0 (ENTERPRISE)
echo ======================================================================
echo.
echo Starting Application Server...
echo.

if not exist node_modules (
    echo Installing dependencies...
    npm install
)

echo Opening default browser to http://localhost:5000 ...
start http://localhost:5000

node src/server.js
pause
