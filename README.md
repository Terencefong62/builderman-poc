# Builderman

香港住宅裝修配對平台 — 前端專案。

## 開發

**最簡單：** 雙擊 `start.bat`（會自動啟動伺服器並開啟瀏覽器）

或手動執行：

```bash
npm install
npm run dev
```

開啟 http://127.0.0.1:5173/match/styles

> 請勿直接雙擊 `index.html` — 這是 Vite + React 專案，需要透過開發伺服器執行。

## 目前頁面

- `/match/styles` — 裝修風格喜好選擇（Step 01）
- `/match/unit` — 單位資料（Step 02）
- `/match/contact` — 聯絡資料（Step 03）
- `/match/matching` — 智能配對過場（1–2 秒）
- `/match/results` — 配對結果／推薦公司（Step 04）
