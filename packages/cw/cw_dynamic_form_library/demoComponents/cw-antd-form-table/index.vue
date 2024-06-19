<template>
  <div>
    <a-table :columns="columns" :data-source="sourceList">
      <template
      v-for="col in columnsKey"
      :slot="col"
      slot-scope="text, record, index"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Save</a>
          <!-- <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm> -->
          <a @click="() => cancel(record.key)">Cancel</a>
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="()=>edit(text.key)">Edit</a>
        </span>
      </div>
    </template>
    </a-table>
  </div>
</template>


<script>
import supportDatasource from "@/mixins/support.datasource";
const data = [];
for (let i = 0; i < 2; i++) {
  data.push({
    key: i.toString(),
    name: `Edrw1ard ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
    six: "男",
    six222:"男",
    s11ix:"男",
  });
}

export default {
  name:"cw-antd-form-table",
    props:{
      // value:{
      //   type: Array,
      //   default: ()=>[]
      // },
      titleMap: {
        type: Object ,
        default: ()=>{}
      }
  },
  mixins: [supportDatasource],
  data() {
    return {
      cacheData: data.map(item => ({ ...item })),
      sourceList: data,
      editingKey: '',
    }
  },
  async mounted() {
    // await this.load()
    // this.sourceList = this.currentDataSource.data
  },
  // watch: {
  //   value: {
  //     handler(val) {
  //       console.log(val);
  //       this.sourceList = val ||[]
  //     },
  //     immediate:true,
  //     deep: true
  //   }
  // },
  computed: {
    columnsKey() {
      if (this.sourceList.length > 0) {
        return Object.keys(this.sourceList[0]).filter(item=> !['editable','key'].includes(item))
      } else {
        return []
      }
    },
    columns() {
      console.log(this.titleMap);
      let columns = this.columnsKey.map(item=>({
        title: this.titleMap? this.titleMap[item]||item: item ,
        dataIndex:item,
        key: item,
        scopedSlots: { customRender: item },
      })) 
      if (columns.length > 0) {
        columns.push({
        title: 'operation',
        scopedSlots: { customRender: 'operation' },
      })
      }
     
      return columns
    },
  },
  methods: {
    edit(key) {
      console.log(123);
      const newData = [...this.sourceList];
      const target = newData.find(item => key === item.key);
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.sourceList = newData;
      }
    },
    cancel(key) {
      const newData = [...this.sourceList];
      const target = newData.find(item => key === item.key);
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key));
        delete target.editable;
        this.sourceList = newData;
      }
    },
    save(key) {
      const newData = [...this.sourceList];
      const newCacheData = [...this.cacheData];
      const target = newData.find(item => key === item.key);
      const targetCache = newCacheData.find(item => key === item.key);
      if (target && targetCache) {
        delete target.editable;
        this.sourceList = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      console.log(target);
      // this.$emit('update:value', this.cacheData )
      // this.$emit('onCellChange',target)
      this.$emit('onChange', this.cacheData)
      this.editingKey = '';
    },
    handleChange(value, key, column) {
      const newData = [...this.sourceList];
      const target = newData.find(item => key === item.key);
      if (target) {
        target[column] = value;
        this.sourceList = newData;
      }
    },
  }
}
</script>

<style>

</style>