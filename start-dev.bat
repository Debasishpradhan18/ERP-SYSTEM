@echo off
echo ========================================================
echo       CAMPUS ERP - STUDENT MANAGEMENT SYSTEM
echo ========================================================
echo.
echo Starting Backend API (Port 5000)...
start "Campus ERP Backend" cmd /k "cd backend && npm run dev"

echo Starting Frontend Vite App (Port 5173)...
start "Campus ERP Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers have been launched in separate windows!
echo - Frontend: http://localhost:5173
echo - Backend:  http://localhost:5000
echo.
pause
