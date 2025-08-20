# Afterglow PWA Starter (重練版)

這是一個最小可運行（離線可用）的 PWA 基底，符合你現有需求：
- 黑底 + 霓虹粉 Glow Ball（6s 呼吸、柔和/強烈可切）
- 兩顆主按鈕（開始冥想／緊急支援）
- 首次進站免責覆蓋層（localStorage 記憶）
- 訪問計數器（total + session）
- 緊急支援卡片由 `data/emergency.json` 驅動
- Service Worker 預快取 + 資料/音訊強制新鮮度
- `reset.html` 可一鍵清除舊 SW 與 cache

## 使用
1. 將整個資料夾上傳到 GitHub Repo（建議新 Repo），啟用 Pages（main branch / root）。
2. 將你的冥想音檔覆蓋 `audio/afterglow-5min.m4a`（建議 5 分鐘）。
3. 如需更醒目的 Glow Ball，在 `.glow-ball` 元素加上 `.glow-ball--strong`。
4. 若遇到舊版 SW 卡住，訪問 `/reset.html` 後重整。

## 檔案結構
- index.html / styles.css / app.js / sw.js / manifest.webmanifest
- icons/icon-192.png, icon-512.png
- audio/afterglow-5min.m4a（請自行替換）
- data/emergency.json
- reset.html
