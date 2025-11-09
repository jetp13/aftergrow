# Afterglow Web App 結構對齊 v1.2
- 入口：/index.html（年齡與免責勾選）→ /Home.html（兩顆膠囊）
- 冥想：/meditation/menu.html → breathing.html / guide.html
- 緊急支援：/support/menu.html → firstaid.html / risk.html / rights.html
- 靜態：/privacy.html / /disclaimer.html
- 共用：/assets/theme.css, /assets/common.js（Footer 注入、入口流程）
變更重點：
- 修正 fire.mp3 相對路徑 ../assets/fire.mp3
- 新增 JS Footer 注入，統一兩連結（隱私／免責）