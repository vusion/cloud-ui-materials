# export_excel (导出表格)

这是一个基于 Vue 2 的表格组件库，提供了强大的表格展示及 Excel 导出功能。

## 主要功能

*   **数据表格展示**：支持分页、排序、过滤、选择、树形展示等。
*   **Excel 导出**：支持将表格数据导出为 Excel 文件（`.xlsx` 格式）。
    *   支持导出样式（字体、边框、对齐等）。
    *   支持单元格自动合并。
    *   支持添加文本或图片水印。
    *   支持排除特定列。
*   **组件丰富**：包括 `ExUTableView`, `ExUTableViewColumn`, `ExUTableViewColumnGroup` 等。

## 安装

```bash
npm install
```

## 开发

```bash
npm run dev
# 或
npm start
```

## 使用方法

### 组件引入

在你的 LCAP 项目中，你可以直接使用 `ExUTableView` 组件。

### 导出 Excel 方法

可以通过组件实例调用 `exportExcel` 方法：

```javascript
this.$refs.table.exportExcel(page, size, filename, sort, order, excludeColumns, includeStyles, watermarkText, watermarkImageBase64, textAlpha, imageAlpha);
```

**参数说明：**

| 参数名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `page` | `Number` | 导出起始页码，默认 `1` |
| `size` | `Number` | 每页数据条数，默认 `2000` |
| `filename` | `String` | 导出文件名 |
| `sort` | `String` | 排序字段 |
| `order` | `String` | 排序顺序 (`asc` 或 `desc`) |
| `excludeColumns` | `Array` | 需要排除的列索引或字段名 |
| `includeStyles` | `Boolean` | 是否包含样式，默认 `false` |
| `watermarkText` | `String` | 水印文字 |
| `watermarkImageBase64` | `String` | 水印图片 (Base64 格式) |
| `textAlpha` | `Number` | 文字水印透明度 (0-1) |
| `imageAlpha` | `Number` | 图片水印透明度 (0-1) |

## 构建 & 发布

```bash
npm run build
```

构建完成后，将 `export_excel@[version].zip` 文件上传到平台即可。

## 相关资源

*   开发构建工具 [vite](https://vitejs.dev/)
*   单元测试工具 [vitest](https://cn.vitest.dev/guide/)
*   UI demo 调试 [storybook](https://storybook.js.org/docs/get-started/install)

