### 基本用法

``` html
<lcap-printPage></lcap-printPage>
```

### 开启自动下载
``` html
<lcap-printPage :download=true></lcap-printPage>
```

### 修改生成的文件类型为图片
``` html
<lcap-printPage :download=true fileType="png"></lcap-printPage>
```

### 控制打印的DOM元素
``` html
<lcap-printPage :download=true printDOM="body"></lcap-printPage>
```

### 设置生成的文件名称
``` html
<lcap-printPage :download=true fileName="自定义文件名"></lcap-printPage>
```

### 设置隐藏组件
``` html
<lcap-printPage :hidden=true></lcap-printPage>
```

### 控制打印宽度
``` html
<lcap-printPage :download=true :canvasWidth=1200></lcap-printPage>
```

