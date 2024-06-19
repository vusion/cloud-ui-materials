### 基本用法

``` html
<cw-antd-custom-view 
  mode="dev"
 :formData="{name:'fda',url:'/fd',span:'',labelWidth:'80',labelAlign:'left',isBtn:true,customStyle:''}"
 :customComponentList="[{
          name: 'cw-antd-image',
          title: '图片组件',
          tag: 'cw-antd-image',
          icon:'https://lcpapp-static.nos-eastchina1.126.net/user/dogfood/1710490112213_%E6%95%B0%E5%AD%97.svg',
          belong: 'view',
          property: [{name: 'name',defaultValue: 'input'},
            { name: 'label', defaultValue: '文本框', },
            { name: 'span', defaultValue: '1', },
            { name: 'value', defaultValue: '1123',type:'self' },
            { name: 'contentTitle', defaultValue: '请输入',type:'self', title:'组件标题',fieldType:'input' },
            { name: 'rules', defaultValue: [] },
            { name: 'children', defaultValue: [] },
            { name: 'dependency', defaultValue: [] }]
        }]"
></cw-antd-custom-view>
```
