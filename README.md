# 失落的神兵——煉鐵師的氧之戰

繁體中文國中自然科互動教材。跟著小葵與阿公探索氧化還原、元素對氧活性、金屬冶煉與防鏽，最後以生活中的抗氧化概念收尾。

此專案收錄目前本機的完整網站版本，包括插圖、互動程式、樣式、第一章化學反應教材與自動化測試。

## 分享與發布

[開啟公開作品：失落的神兵](https://urpig.github.io/K12-yujen/)（免登入，可直接操作）

後續發布統一使用 GitHub Pages，repo 已依使用者授權設為公開。作品仍在 `main` 的 `dist/` 修改；Pages 從同一 repo 的 `gh-pages` 分支根目錄發布。

完成下方建置與測試、將來源 commit 並 push 至 `main` 後，執行：

```sh
node publish-pages.mjs
```

工具會確認工作目錄沒有未提交變更、本機與遠端 `main` 一致，再將已提交的 `dist/` 原樣推送到 `gh-pages`，由 GitHub Pages 更新網站。首次需在 Settings → Pages 選擇 **Deploy from a branch → gh-pages → /(root)**。每次發布後仍須確認公開網址可開啟與操作，實際部署紀錄見 `publication.json`。

## 本機預覽

需要 Node.js 24 或更新版本，無需安裝額外套件。在專案目錄執行：

```sh
node server.mjs
```

瀏覽器開啟 <http://127.0.0.1:4176/>。互動進度儲存在使用者瀏覽器的本機儲存空間。

## 建置與測試

```sh
node build.mjs
node build-chemistry.mjs
node --test tests/*.test.mjs
```

建置結果寫入專案內的 `outputs/` 與 `release/`，不納入版本控制。測試前須先建置第一章，供測試檢查打包內容。

## 目錄

- `dist/`：可直接由靜態伺服器提供的完整網站；首頁為 `dist/index.html`。
- `dist/chemistry/`：第一章化學反應教材。
- `dist/assets/`：人物、故事場景與元素樣本圖片。
- `tests/`：互動狀態、教學模型與視覺結構測試。
- `build.mjs`、`build-chemistry.mjs`：單檔 HTML 打包工具。
- `server.mjs`：本機預覽伺服器。

完整網站的發布目錄為 `dist/`。此 repo 的提交與推送不會自動更新既有公開網站。
