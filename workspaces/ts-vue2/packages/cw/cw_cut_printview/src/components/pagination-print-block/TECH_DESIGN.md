# 分页打印组件（pagination-print-block）技术方案

## 1. 概述与目标

### 1.1 功能目标

- 将页面内指定 DOM（`#print-view` 或组件根）按「纸张高度」自动分页，导出为 PDF 并调起打印。
- 支持**多 Section**：通过「分页线」标记（`.print-view-split-line`）将内容拆成多段，每段可独立设置**纵向/横向**。
- 支持**表格跨页表头**：对带 `id^="copy_head_"` 的表格，在换页时自动在新页顶部重复表头。

### 1.2 非目标 / 边界

- 不负责「打印预览」UI，仅提供 `print()` 方法；预览由业务在页面内自行实现。
- 分页与裁剪基于 **html2canvas 截图 + 按高度裁剪**，非 CSS `@media print` 或浏览器原生打印分页。

---

## 2. 技术栈与依赖

| 依赖            | 用途                                                               |
| --------------- | ------------------------------------------------------------------ |
| **Vue 2**       | 组件层（index.vue）                                                |
| **jsPDF**       | 生成 PDF、多页、添加图片                                           |
| **html2canvas** | 将 DOM 转为 Canvas，再转图片参与分页                               |
| **print-js**    | 调起浏览器打印（非 Android 时）；Android 用 `window.open(blobUrl)` |

- 单位约定：PDF 使用 **pt**；DOM/Canvas 使用 **px**。换算：`1px = 0.75pt`（96dpi 下），即 `ptToPx(pt) = pt/0.75`，`pxToPt(px) = px*0.75`。

---

## 3. 架构概览

```
┌─────────────────────────────────────────────────────────────────┐
│  index.vue (PaginationPrintBlock)                                │
│  - ref="printContent" 的 slot 作为打印根                          │
│  - print() → new HTML2PRINT(printContent, params).print()        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  html2print.js (Html2Pdf)                                        │
│  - print() 总控                                                  │
│  - splitDomToSections() 按分页线拆 Section                        │
│  - processSection() 每 Section：建 container → processNormalSection│
│  - processNormalSection() 分页 + 画 PDF                          │
│  - analyzePageBreaks() 收集块/表格行 + 表头信息                   │
│  - toCanvas / clipImage / addCommonHeader|Footer / outputPdf      │
└─────────────────────────────────────────────────────────────────┘
```

- **入口**：业务调用组件的 `print()`，组件内部用 `this.$refs.printContent` 作为根节点，构造 `Html2Pdf` 并传入纸张、边距、方向等参数，再执行 `print()`。
- **输出**：PDF 在内存中生成后，通过 `print-js`（或 Android 下 `window.open`）调起系统打印。

---

## 4. 核心流程

### 4.1 整体打印流程（Html2Pdf#print）

1. **解析打印根**

   - 查找所有 `#print-view`；若传入的 element 自身是 `#print-view`，则以其为第一个，再合并其余 `#print-view`。
   - 若未找到任何 `#print-view`，则用传入的 element 自身作为唯一根。

2. **拆分为 Section**

   - 对每个打印根执行 `splitDomToSections(printViewElement)`，得到 `allSections`。
   - 若 `allSections.length === 0`，则构造一个默认 Section（根节点的直接子节点，方向由 initDirection 决定）。

3. **初始化 PDF**

   - 用 jsPDF 创建文档，首页方向 = 第一个 Section 的 orientation。
   - 若配置了 header/footer，预生成页眉页脚图片（`toCanvas(header)` / `toCanvas(footer)`）。

4. **逐 Section 渲染**

   - 对每个 Section 调用 `processSection(pdf, section, startPageNo, isFirstSection)`，累加 `globalPageCount`。

5. **输出**
   - `outputPdf(pdf)`：生成 Blob → Object URL，再调 print-js 或 `window.open`。

### 4.2 Section 的由来：splitDomToSections

- **分页线**：class 含 `print-view-split-line` 的节点为「分页线」，其**自身不进入任何 Section**，只用于分段和切换方向。
- **横向标记**：若分页线同时含 `print-view-split-landscape`，则该分页线**之后**的 Section 为横向（`orientation: 'l'`），否则为纵向（`'p'`）。
- **拆分规则**：
  - 只遍历「打印根」的**直接子节点**。
  - 遇到直接子节点是分页线：先把当前累积的 nodes 成一个 Section 提交，清空，再根据是否 landscape 更新下一段方向。
  - 若直接子节点内部还有分页线（递归）：通过 `processNodeWithSplits` 按分页线拆成多段，每段一个 wrapper，并可能更新 orientation；这些 wrapper 作为 Section 的 nodes 提交（可能多段、多个 Section）。
- **结果**：`sections[]`，每项 `{ nodes: Node[], orientation: 'p'|'l' }`。

### 4.3 单 Section 渲染：processSection

- 根据 `section.orientation` 计算当前节的页面宽高（pt）、contentWidth、页眉页脚高度、**可用内容高度** `availablePageH`。
- **创建离屏 container**：
  - `document.createElement('div')`，`position: absolute; left: -9999px; ...`，避免影响原页面布局。
  - 将 `section.nodes` 依次 `cloneNode(true)` 并 `appendChild` 到 container，再 `document.body.appendChild(container)`。
  - 两帧 rAF 等待布局稳定。
- 调用 **processNormalSection(pdf, container, section, startPageNo, isFirstSection, pageInfo)** 完成该 Section 的全部分页与绘图。
- 最后从 body 移除 container。

### 4.4 分页与绘图核心：processNormalSection

- **容器尺寸**：用 `scrollWidth/offsetWidth/clientWidth` 及首子元素宽度取 max，得到 `actualWidth`，用于 toCanvas 宽度和内容区计算。
- **元素与分页信息**：`analyzePageBreaks(container, availablePageH)` 得到 `allElements`（见下）。
- **排序**：按 `top` 排序得到 `sortedElements`。
- **整 Section 截图**：`toCanvas(container, actualWidth)` 得到整张「大图」`baseImageResult`（含 data、width/pt、canvasWidth/Height/px）。
- **分页状态变量**：
  - `sourceY`：当前在大图上的切割起点（px）。
  - `currentPdfY`：当前 PDF 页上的绘制 Y（pt）。
  - `pageCount`、`isFirstPageOfSection`。
- **若非首个 Section**：先 `pdf.addPage`，并视是否存在 copy_head 表格决定是否将 `isFirstPageOfSection` 置为 false。
- **遍历 sortedElements**：
  - 对每个元素算「当前页剩余可用高度」：若是 table-row 且非首页，则减去表头高度。
  - 若「从 sourceY 到该元素底」的高度 > 当前页可用高度，且元素 top 与 sourceY 有足够间隔（>10px）：
    - 先画「sourceY 到该元素 top」的裁剪图到当前 PDF 页；
    - 给当前页加页眉页脚；
    - 需要时 addPage，并在新页画表头（若有）；
    - 将 sourceY 更新为该元素 top，继续下一元素。
- **剩余内容**：
  - `actualContentBottomPx`：以**最后一个元素的 bottom** 为内容底（避免布局撑高导致多出一页空白）。
  - `remainH = actualContentBottomPx - sourceY`，`safeRemainH = min(remainH, canvasHeightPx - sourceY)`。
  - 若 `safeRemainH > 0`：再根据「当前页剩余可用高度（含表头）」判断是否需新页；需要则先加页眉页脚、addPage、画表头，再**循环**把剩余高度按页裁剪绘制（支持多页），每页画完加页眉页脚。
- **收尾**：若本 Section 有内容但未进入上述「剩余内容」分支，则给当前页补页眉页脚；最后 `document.body.removeChild(container)`。

### 4.5 元素与表头分析：analyzePageBreaks

- **输入**：`container`，`pageHeightPt`（当前 Section 单页可用高度 pt）。
- **输出**：`{ allElements }`（内部还计算了 splitPoints/tableHeaders，但 processNormalSection 只使用 allElements）。
- **表头映射**：
  - 查找所有 `[id^="copy_head_"]` 的容器，在每个容器内找 `.u-table-view_table___...` 和 `.u-table-view_head___...`，用 `getBoundingClientRect` 相对 container 得到 top/height/bottom，存入 `tableHeaderMap`。
- **线性元素列表**：
  - 遍历 container 的直接子节点，对每个子节点算相对 container 的 top/height/bottom。
  - 若子节点内**无** copy_head：推入一条 `{ type: 'normal', top, height, bottom, header: null }`。
  - 若子节点内**有** copy_head：在每个 copy_head 内用 `.u-table-view_row___...` 取所有行，每行推入 `{ type: 'table-row', top, height, bottom, header: tableHeaderMap 对应项 }`。
- **排序**：allElements 按 top 排序，保证与 DOM 顺序一致，供 processNormalSection 按顺序分页与绘制。

---

## 5. 关键数据结构

### 5.1 Section

```ts
{
  nodes: Node[];      // 该段的 DOM 节点（通常为 1 个 wrapper 或多个直接子节点）
  orientation: 'p' | 'l';  // 纵向 / 横向
}
```

### 5.2 allElements 项

```ts
| { type: 'normal';  top: number; height: number; bottom: number; header: null; }
| { type: 'table-row'; top: number; height: number; bottom: number;
    header: { top: number; height: number; bottom: number } | null; }
```

- 坐标均为相对**当前 container** 的 px。

### 5.3 页眉页脚与 PDF 尺寸

- 页眉/页脚：由外部传入的 `param.header` / `param.footer`（DOM），在 `print()` 开始时一次性 `toCanvas` 成图，之后每页用 `addCommonHeader` / `addCommonFooter` 贴图。
- 纸张：`pagerWidth` / `pagerHeight`（pt），A4 默认 595.28 × 841.89；横向时 Section 内会交换宽高使用。

---

## 6. 配置与扩展（组件 props → Html2Pdf 参数）

| 组件 prop              | 含义                                       | 传入 Html2Pdf 的 key              |
| ---------------------- | ------------------------------------------ | --------------------------------- |
| paperSize              | 纸张类型（a4/a3/…）                        | 用于 format                       |
| pageWidth / pageHeight | 宽高 mm                                    | pagerWidth / pagerHeight（转 pt） |
| xBorder / yBorder      | 页边距 pt                                  | baseX / baseY                     |
| printDirection         | 默认方向 vertical/horizontal               | defaultOrientation: 'p'/'l'       |
| debug                  | 是否打日志                                 | debug                             |
| inheritPageStyle       | 是否挂回原父级（易导致表格计算错误，慎用） | inheritPageStyle                  |

---

## 7. 已知限制与注意事项

- **container 挂载环境**：为保障分页计算正确，container 默认挂在 `body` 下并左移 -9999px。若开启 `inheritPageStyle` 挂回原父级，可能受父级 `height/overflow` 影响，导致 `getBoundingClientRect`/`scrollHeight` 与真实内容不一致，表格分页错乱，因此**不推荐**开启。
- **内容底部高度**：`actualContentBottomPx` 以「最后一个元素的 bottom」为准，不再与 `canvasHeightPx` 取 max，避免布局撑高产生多余空白页（仅表头的尾页）。
- **表格表头**：仅对 `id` 以 `copy_head_` 开头且内含 `.u-table-view_*` 的表格做跨页表头；表头通过 `analyzePageBreaks` 建立映射，在 processNormalSection 换页时从 baseImage 裁剪同一块区域绘制到新页顶部。
- **单位**：PDF 与 pt 一致；DOM/Canvas 为 px；换算 0.75 贯穿 toCanvas、clipImage、addImage。

---

## 8. 文件职责一览

| 文件              | 职责                                                |
| ----------------- | --------------------------------------------------- |
| **index.vue**     | 打印容器 UI、loading、调用 Html2Pdf、生成打印参数   |
| **html2print.js** | Html2Pdf 类：分节、分页、截图、裁剪、PDF 生成与输出 |
| **api.ts**        | 低代码/IDE 侧组件描述（Props、Method、Slot）        |
| **index.ts**      | 导出 PaginationPrintBlock 组件                      |
