### 基本用法

``` html
<calculation-formula-design-view value="1,2,a,b" :customMap="[{
    code:'a',
    name:'a'
  },{code:'b',name:'b'}]"></calculation-formula-design-view>
```


``` vue
<template>
<calculation-formula-design-view  :value.sync="data" ></calculation-formula-design-view>
</template>
<script>
export default{
  data(){
    return {
      data:'c,d',
      customMapList:[
        { code:'11', name:'c'}, 
        { code:'12', name:'d'}]
    }
  }
}
</script>
```

### 基本用法

``` vue
<template>
<calculation-formula-design-view  :value.sync="data" :customMapList="customMapList"></calculation-formula-design-view>
</template>
<script>
export default{
  data(){
    return {
      data:'c,d',
      customMapList:[
        { code:'11', name:'c'}, 
        { code:'12', name:'d'}]
    }
  }
}
</script>
```


