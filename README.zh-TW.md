# sable-ui

以 design token 驅動、建立在原生 CSS 變數之上的小型 React 設計系統。

**[Storybook →](https://minghan1994.github.io/sable-ui/)** · [English](./README.md)

---

多數元件庫是一堆元件的集合。設計系統真正有意思的部分在下面那一層 —— 顏色在哪裡被命名、主題被允許改動哪些東西、以及建置流程會擋下什麼。這個 repo 做的就是那一層，上面放了二十個元件來證明它可行。

## 這裡實際做了哪些決定

**Token 是唯一的真實來源。** `tokens/*.json` 是整個專案裡唯一容許出現原始值的地方，建置腳本把它編譯成 199 個 CSS 變數與一份帶型別的 TypeScript 模組。沒有任何元件寫死顏色、尺寸或動畫時間。

**兩層 token，元件只准碰其中一層。** Primitive（`color.brand.600`、`space.4`）是沒有語境的原始值；semantic（`color-accent-solid`、`color-text-muted`）說明這個值「用來做什麼」。元件只引用 semantic 層，所以換主題是改一個檔案，而不是全專案搜尋替換。

**主題不會走鐘。** 若淺色與深色兩份 token 檔宣告的名稱對不起來，建置直接失敗。主題漂移這種 bug 通常幾個月後才會以「深色模式下有一行字看不見」的形式出現，讓建置當場失敗便宜得多。

**對比度是用測試驗證的，不是用嘴巴保證的。** 測試會計算兩個主題中每一組文字／背景、以及 solid／on-solid 配對的 WCAG 對比值，低於 4.5:1 就失敗。深色主題達標的方式是把關係反過來 —— 淺色填滿配深色文字 —— 而不是把中間色一路加深到混濁。

**純 CSS，零執行期。** 沒有 CSS-in-JS、沒有樣式相依套件、沒有 class name 雜湊。一份樣式表、正常的權重規則，要覆寫就用你自己的 CSS。

## 安裝

```bash
npm install sable-ui
```

```tsx
import { Button, Input, Stack } from 'sable-ui';
import 'sable-ui/styles.css';

export function SignIn() {
  return (
    <form className="sable-root">
      <Stack gap={4}>
        <Input label="Email" type="email" required />
        <Input label="密碼" type="password" required />
        <Button type="submit">登入</Button>
      </Stack>
    </form>
  );
}
```

`sable-root` 是選用的，套上去才會接收字體與頁面配色的預設值；不加也不影響元件運作。

只想要 token？`import 'sable-ui/tokens.css'` 只包含 CSS 變數，不含任何元件樣式。

## 主題

預設淺色。深色會跟隨作業系統設定，除非頁面明確指定：

```html
<html data-theme="dark">
```

`data-theme` 可以放在任何元素上，所以淺色頁面裡要有一塊深色面板是做得到的。

要整套換皮，只需覆寫 semantic 層，大約十來行，而且永遠不用動到元件：

```css
:root {
  --sable-color-accent-solid: #0f766e;
  --sable-color-accent-solid-hover: #115e59;
  --sable-color-accent-on-solid: #ffffff;
  --sable-color-focus-ring: #14b8a6;
}
```

Token 的值在 JavaScript 端也拿得到，且已依主題解析完成：

```ts
import { themes, token } from 'sable-ui';

themes.dark['--sable-color-accent-solid']; // '#818cf8'
token('color-accent-solid'); // 'var(--sable-color-accent-solid)'
```

## 元件

| | |
| --- | --- |
| **動作** | `Button` · `IconButton` |
| **表單** | `Field` · `Input` · `Textarea` · `Select` · `Checkbox` · `Radio` · `RadioGroup` · `Switch` |
| **回饋** | `Alert` · `Spinner` · `Tooltip` · `Modal` |
| **呈現** | `Badge` · `Avatar` · `Card` · `Divider` |
| **導覽** | `Tabs` |
| **版面** | `Stack` · `VisuallyHidden` |

每個元件在 [Storybook](https://minghan1994.github.io/sable-ui/) 都有可互動的範例與文件。

## 無障礙

這不是勾選項目，有好幾個 API 決定本身就是為了它而存在：

- `IconButton` 沒有 `label` 就建不出來 —— 型別不允許。
- 表單元件自己處理 `aria-describedby` 與 `aria-invalid` 的接線，說明文字與錯誤訊息一定會被朗讀。
- `RadioGroup` 用真正的 `<fieldset>`，讓 legend 為整組選項命名，而不是讓每個選項被孤立地讀出來。
- `Modal` 建立在原生 `<dialog>` 之上：焦點鎖定、背景 inert、Escape 關閉、top layer 全部交給瀏覽器，而不是交給通常會漏掉其中一項的自製程式碼。
- `Tabs` 實作 ARIA tabs pattern —— 單一 tab stop、方向鍵切換、Home/End 跳兩端。
- `Alert` 把語氣對應到 live region 的插話程度：`warning` 與 `danger` 會打斷，`info` 與 `success` 會等。
- 焦點樣式只會被重畫，不會被移除。所有動畫在 `prefers-reduced-motion` 下都收斂成 1ms。
- 每個 story 都經過 Storybook a11y addon 的 axe 檢查。

## 開發

```bash
npm install        # 同時會產生 tokens
npm run dev        # Storybook，:6006
npm test           # Vitest
npm run typecheck
npm run lint       # Biome
npm run build      # 打包成 dist/
```

改 token 就是改 `tokens/*.json` 然後跑 `npm run tokens`。產生出來的 `src/styles/tokens.css` 與 `src/tokens/index.ts` 不進版控，也永遠不該手動編輯。

版本與發佈走 [changesets](https://github.com/changesets/changesets)：

```bash
npx changeset
```

## 刻意沒做的部分

沒有資料表格、沒有日期選擇器、沒有 combobox、沒有 toast。每一個都是獨立的專案規模，做一半比不做更糟。真要加，也會以完整思考過的形式加進來 —— 一個把定位數學誠實處理好的 Tooltip，比一個只顧得了 happy path 的 combobox 更能說明這套系統的價值。

Tooltip 正是目前唯一看得見這個取捨的地方：它用純 CSS 相對於觸發元素定位，所以出現在會裁切內容的容器邊緣時可能被切掉。要不要為此引入一整套定位引擎，是個比表面上更大的決定，目前還沒有做。

## 授權

MIT © Minghan Cheng
