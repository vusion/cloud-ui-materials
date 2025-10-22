### 基本用法

```html
<lcap-print-page-new></lcap-print-page-new>
```

### 开启自动下载

```html
<lcap-print-page-new :download="true"></lcap-print-page-new>
```

### 修改生成的文件类型为图片

```html
<lcap-print-page-new :download="true" fileType="png"></lcap-print-page-new>
```

### 控制打印的 DOM 元素

```html
<lcap-print-page-new :download="true" printDOM="body"></lcap-print-page-new>
```

### 开启 PDF 分页

```html
<lcap-print-page-new :download="true" canvasWidth="auto" canvasHeight="auto" :isNotFullPage="true"></lcap-print-page-new>
```

### 设置生成的文件名称

```html
<lcap-print-page-new :download="true" fileName="自定义文件名"></lcap-print-page-new>
```

### 设置隐藏组件

```html
<lcap-print-page-new :hidden="true"></lcap-print-page-new>
```

### 控制打印宽度

```html
<lcap-print-page-new :download="true" :canvasWidth="1200"></lcap-print-page-new>
```

### 控制打印宽度,根据页面宽高自动调整

```html
<lcap-print-page-new :download="true" canvasWidth="auto" canvasHeight="auto"></lcap-print-page-new>
```
