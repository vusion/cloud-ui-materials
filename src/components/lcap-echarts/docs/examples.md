lcap-echart用于低代码平台中数据可视化的基本呈现，基于原生echart进行封装，以下示例包含了基本的配置数据方式，以及设置表格属性等。
### 基本用法
#### 配置数据源
绑定数据通过数据属性中的数据源和数据类型实现，绑定到组件的数据格式，需要是数组形式的。
#### 生成表格
表格会自动监听属性以及数据源的变化，动态更新数据。通过图属性中的配置信息可以快速修改，生成定制化的图表

### 基本属性
#### 图类型
通过设置`chart-type`可以修改基本的图类型，目前支持基本的柱状图，饼图和折线图
``` html
<lcap-echarts chart-type="line" xAxis="studentName" yAxis="math, english, science, averageScore" xAxisTitle="姓名" yAxisTitle="年龄/岁" title="学生成绩"></lcap-echarts>
<lcap-echarts chart-type="bar" xAxis="studentName" yAxis="math, english, science" xAxisTitle="姓名" yAxisTitle="年龄/岁" title="成绩统计"></lcap-echarts>
<lcap-echarts chart-type="pie" xAxis="studentName" yAxis="averageScore"></lcap-echarts>
<lcap-echarts chart-type="scatter" xAxis="age" yAxis="averageScore"></lcap-echarts>
```
#### 主题
默认为定制的cloud-ui主题，可以通过配置项设置为深色模式
``` html
<lcap-echarts chart-type="line" xAxis="studentName" yAxis="averageScore"></lcap-echarts>
<lcap-echarts chart-type="line" xAxis="studentName" yAxis="averageScore" theme="dark"></lcap-echarts>
```
#### 宽度和高度
生成的柱状图是inline-block格式，可以通过在属性中配置尺寸，调整在界面中显示的大小尺寸, 默认宽度为400px， 高度为300px
#### 分类轴和数值轴
分类轴（xAxis）用于定义数据表格以什么属性做为分类依据，可以简单理解成折线图和柱状图的x轴，用于告诉用户坐标信息，
#### 分类轴标题和数值轴标题
分类轴（xAxisTitle）用于设置分类轴标题，不设置默认为分类轴值，对于饼图无法设置 ,数值轴(yAxisTitle)用于设置数值轴标题，不设置默认为数值轴值，对于饼图无法设置
``` html
<lcap-echarts chart-type="bar" xAxis="studentName" yAxis="age" xAxisTitle="姓名" yAxisTitle="年龄/岁"></lcap-echarts>
```
#### 图标题和标题字体大小
图标题和标题字体大小用于设置标题的内容和基本格式, 默认标题字体大小为18
``` html
<lcap-echarts chart-type="line" xAxis="studentName" yAxis="age" xAxisTitle="姓名" yAxisTitle="年龄/岁" title="学生年龄统计"></lcap-echarts>
```
#### 工具栏
柱状图和折线图支持通过工具栏一键切换，所有图均支持通过工具栏一键下载

