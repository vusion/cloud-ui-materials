### 基本用法

```vue
<template>
    <div>
      <cust-row-grouping-grid :options="options" :dataSource="data" :height="height">汇总表格</cust-row-grouping-grid>
    </div>
</template>
<script>
import { faker } from '@faker-js/faker'
export default {
  data() {
    return {
      height: '500px',
      options: [{
        propertyPath: 'orderId',
        title: 'id'
      },{
        propertyPath: 'createTime',
        title: '创建时间'
      },{
        propertyPath: 'country',
        title: '国家'
      },{
        propertyPath: 'city',
        title: '城市'
      }],
      data: Array.from({ length: 1000 }, () => {
        return {
          orderId: faker.string.uuid(),
          createTime: faker.date.anytime(),
          country: faker.location.country(),
          city: faker.location.country(),
        };
      })
    }
  }
};
</script>
```
