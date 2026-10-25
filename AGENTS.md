# 後續網站更新約定

- 本網站的主要專案為此 repo：`https://github.com/urpig/ch2`（使用者於 2026-10-25 指定由 K12-yujen 改名為 ch2）。
- 後續網站修改直接在此 repo 進行；完整網站位於 `dist/`，不再以先前 Desktop/k12 中的副本作為主要修改來源。
- 依使用者 2026-10-25 的指示，後續更新完成並通過必要檢查後，將相關變更 commit 並 push 至此 repo；目前使用 `origin/main`。若使用者另行要求只保留本機或指定其他分支，以新指示為準。
- GitHub 同步與公開網站部署分開處理；更新公開網站仍依使用者的明確發布指示執行。
- 使用者指定後續一律以 GitHub Pages 發布，並於 2026-10-25 明確授權將此 repo 改為公開；先前保留私有的選擇已被這項新指示取代。不得自行升級付費方案或改用其他代管服務。
- GitHub Pages 使用同一 repo 的 `gh-pages` 分支根目錄。必要檢查通過、來源已 commit 並 push 至 `main` 後，依發布指示執行 `node publish-pages.mjs`；此工具只把已提交的 `dist/` 發布至 `gh-pages`，不切換目前工作目錄，也不強制推送。發布後確認公開網址能匿名開啟並操作，再更新 `publication.json`。
- 建置方式與測試方式見 `README.md`；`outputs/`、`release/` 與測試產生的結果不納入版本控制。
