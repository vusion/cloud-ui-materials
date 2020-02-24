### 基本用法

``` html
<u-chip>Chip</u-chip>
<u-chip editing>Chip</u-chip>
<u-chip editing error>Chip</u-chip>
```

### 可删除的

删除逻辑需要利用`v-if`和`@remove`事件自己实现。

``` html
<u-chip removable>Chip</u-chip>
```
