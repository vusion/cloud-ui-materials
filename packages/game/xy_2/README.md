# 📘 game-html-reader 使用说明

这个组件可以帮你把网页上的一部分内容（比如活动公告）抓取下来，渲染到你的页面里，并且不会被外部样式影响。

---

## ✨ 它能做什么？

- 从网页中提取 `.g_content` 区块里的内容
- 显示加载骨架屏，提升体验
- 抓取到的内容样式不会污染你的页面（使用了 Shadow DOM）
- 支持自定义内容样式（比如设置文字颜色、字体大小）
- 自动识别开发或生产环境，开发时支持跨域代理
- 如果浏览器不支持 Shadow DOM，会自动降级，依然能显示内容

---

## ⚙️ 怎么用？

```vue
<game-html-reader
  :url="'https://xy2.163.com/zt/nopub/20250320/32808_1220509.html'"
  :p-style="'color: #333; font-size: 16px;'"
  :highlight-style="{ backgroundColor: 'yellow', color: 'black' }"
/>
```

---

## 🔧 可配置项（props）

| 参数名             | 类型           | 作用说明                              | 示例值 |
|--------------------|----------------|---------------------------------------|--------|
| `url`              | String         | 要抓取的网页地址                      | `'https://...'` |
| `defaultContent`   | Array          | 如果抓取失败，显示的备用内容          | `['<p>加载失败</p>']` |
| `pStyle`           | String/Object  | `<p>` 标签的样式                      | `'color:red;'` 或 `{ color: 'red' }` |
| `h1Style` ~ `h3Style` | String/Object | 各级标题样式                          | `'font-size:24px;'` |
| `spanStyle`        | String/Object  | `<span>` 的默认样式                   | `'color:blue;'` |
| `strongStyle`      | String/Object  | `<strong>` 的默认样式                 | `'font-weight: bold;'` |
| `liStyle`          | String/Object  | `<li>` 列表项样式                     | `'padding: 4px;'` |
| `imgStyle`         | String/Object  | `<img>` 图片样式                      | `'border-radius: 4px;'` |
| `highlightStyle`   | String/Object  | 覆盖网页中自带颜色的高亮样式         | `{ color: 'white', backgroundColor: 'red' }` |

---

## 🧪 开发模式说明（开发用）

- 如果你本地运行时需要绕过跨域限制：
  - 自动使用 `http://127.0.0.1:8898/fetch?target=你的地址`
  - 你只需要传入目标地址即可

---

## 🌐 浏览器兼容性

| 浏览器       | 是否支持样式隔离 | 降级兼容 |
|--------------|------------------|-----------|
| Chrome / Firefox / Edge / Safari | ✅ 是     | -         |
| IE11 或老浏览器                  | ❌ 否     | ✅ 会自动切换为普通模式 |

---

## 📝 注意事项

- 建议网页中目标内容在 `.g_content` 区块内
- 所有样式 props 都可以是字符串或对象
- 默认不会加载 `<script>`，也不会执行外部样式
- 构建时必须手动传入 `url`，不会自动代理

---

如需加载更多页面，或自定义懒加载 / 视频支持，请联系开发者扩展功能。

