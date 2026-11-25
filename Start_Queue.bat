@echo off
cd /d "C:\Users\vjnag\Desktop\queue ms"

start "Queue Server" cmd /k "python app.py"

timeout /t 5 /nobreak >nul

start chrome http://127.0.0.1:5000