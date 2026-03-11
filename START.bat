@echo off
title CHURINGA SERVER
echo Запуск Истинного Амбера...
start http://localhost:8000/ui/index.html
python -m http.server 8000