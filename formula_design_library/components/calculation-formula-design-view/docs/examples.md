### 基本用法

``` html
<calculation-formula-design-view value="1,2,a,b" :customMap="[{
    code:'a',
    name:'a'
  },{code:'b',name:'b'}]"></calculation-formula-design-view>
```

### 基本用法

``` vue
<template>
<calculation-formula-design-view  :value.sync="data" :customMap="customMap"></calculation-formula-design-view>
</template>
<script>
export default{
  data(){
    return {
      data:'',
      customMap:[
        { code:'c', name:'c'}, 
        { code:'d', name:'d'}]
    }
  }
}
</script>
```


