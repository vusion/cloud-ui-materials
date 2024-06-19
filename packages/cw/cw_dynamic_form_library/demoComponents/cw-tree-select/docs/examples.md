### 基本用法

``` html
<cw-tree-select :dataSource=" [{
            title: '总的',
            value: '0-0',
            key: '0-0',
            children: [
              {
                value: '0-0-1',
                key: '0-0-1',
                title: '一级部门',
              },
              {
                title: '二级部门',
                value: '0-0-2',
                key: '0-0-2',
              },
            ],
          },
          {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
          }]"  :showSearch="true" :replaceFields="{'children':'children','title':'title','key':'key','value':'value'}" ></cw-tree-select>
```


### 多选用法

``` html
<cw-tree-select :dataSource="[{
            title: '总的',
            value: '0-0',
            key: '0-0',
            children: [
              {
                value: '0-0-1',
                key: '0-0-1',
                title: '一级部门',
              },
              {
                title: '二级部门',
                value: '0-0-2',
                key: '0-0-2',
              },
            ],
          },
          {
            title: 'Node2',
            value: '0-1',
            key: '0-1',
          }]" :treeCheckable="true"></cw-tree-select>
```

