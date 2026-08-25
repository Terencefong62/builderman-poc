@echo off
chcp 65001 >nul
cd /d "%~dp0"

where npm >nul 2>&1
if errorlevel 1 (
  echo [錯誤] 找不到 npm。請先安裝 Node.js：https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo 首次執行，正在安裝依賴...
  call npm install
  if errorlevel 1 (
    echo [錯誤] npm install 失敗
    pause
    exit /b 1
  )
)

echo.
echo  Builderman 開發伺服器啟動中...
echo  瀏覽器會自動開啟：http://127.0.0.1:5173/match/styles
echo  按 Ctrl+C 可停止伺服器
echo.

call npm run dev
