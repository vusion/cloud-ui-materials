<template>
  <div class="cw-antd-checkbox-img" :class="layoutClass">
    <a-checkbox-group 
      v-bind="[$attrs, $props]" v-on="$listeners"
      class="checkbox-group-container"
      v-model="currentValue" 
      @change="handleChange"
    >
      <div 
        v-for="(item, index) in sourceList" 
        :key="index"
        class="checkbox-item"
      >
        <a-checkbox :value="item.value" class="option-checkbox">
          <p>{{ item.label }}</p>
          <img 
            v-if="item.img" 
            :src="item.img"
            :style="{ width: imgWidth + 'px' }"
            class="option-img"
          />
        </a-checkbox>
      </div>
    </a-checkbox-group>
  </div>
</template>

<script>
export default {
    name:"cw-antd-checkbox-img",
    props:{
      value:{
        type: Array,
        default: () => []
      },
      viewType:{
        type: String,
      },
      otherData:{
        type: String,
      },
      direction:{
        type: String,
        default: "horizontal"
      },
      dataSource:{
        type: Array,
        default: () => []
      },
      disabled:{
        type: Boolean,
        default: false
      },
      linkage:{
        type: Boolean,
        default: true
      },
      layout: {
        type: String,
        default: 'left-img-right-text',
        validator: function(value) {
          return ['left-img-right-text', 'left-text-right-img', 'top-img-bottom-text', 'top-text-bottom-img'].indexOf(value) !== -1
        }
      },
      imgWidth: {
        type: Number,
        default: 100
      }
    },
        data() {
      return {
        sourceList: [],
        currentValue: [],
        currentInputValue: '',
      };
    },
    computed: {
      layoutClass() {
        return `layout-${this.layout}`
      }
    },
    watch: {
      value: {
        handler(val) {
          if (val) {
            this.currentValue = val;
          }
        },
        immediate: true
      },
      dataSource: {
        handler(val) {
          this.sourceList = this.currentDataSource.data.map(item => {
            const [label, img] = item.value.split("%%")
            return {
              ...item,
              label: label,
              img: img
            }
          })
        }
      }
    },
    methods: {
      handleChange(value) {
        this.$emit('change', value)
        this.$emit('update:value', value)
      }
    },
    async mounted() {
      await this.load()
      this.sourceList = this.currentDataSource.data.map(item => {
        const [label, img] = item.value.split("%%")
        return {
          ...item,
          label: label,
          img: img
        }
      })
    }
}
</script>

<style scoped>

.cw-antd-checkbox-img .ant-checkbox-wrapper {
  height: unset;
}

.cw-antd-checkbox-img .checkbox-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.cw-antd-checkbox-img .ant-checkbox-wrapper {
  display: flex;
}

.cw-antd-checkbox-img .ant-checkbox-wrapper > span {
  display: flex;
  flex-direction: column;
}

.cw-antd-checkbox-img .ant-checkbox-wrapper > span p {
  word-break: break-all;
  white-space: wrap;
  margin: 0;
}

.cw-antd-checkbox-img .ant-checkbox-wrapper .option-img {
  width: 60px;
  object-fit: contain;
}

/* 布局 左图右文 */
.cw-antd-checkbox-img.layout-left-img-right-text .ant-checkbox-wrapper .option-img {
  margin-right: 10px;
}

.cw-antd-checkbox-img.layout-left-img-right-text .ant-checkbox-wrapper > span {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.cw-antd-checkbox-img.layout-left-img-right-text .ant-checkbox {
  align-items: center;
}

/* 布局 左文右图 */
.cw-antd-checkbox-img.layout-left-text-right-img .ant-checkbox-wrapper > span {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cw-antd-checkbox-img.layout-left-text-right-img .ant-checkbox-wrapper .option-img {
  margin-left: 10px;
}

.cw-antd-checkbox-img.layout-left-text-right-img .ant-checkbox {
  align-items: center;
}

/* 布局 上图下文 */
.cw-antd-checkbox-img.layout-top-img-bottom-text .ant-checkbox-wrapper > span {
  display: flex;
  flex-direction: column-reverse;
}

.cw-antd-checkbox-img.layout-top-img-bottom-text .ant-checkbox-wrapper .option-img {
  margin-bottom: 6px;
}

.cw-antd-checkbox-img.layout-top-img-bottom-text .ant-checkbox {
  align-self: flex-start;
  margin-top: 5px;
}

/* 布局 上文下图 */
.cw-antd-checkbox-img.layout-top-text-bottom-img .ant-checkbox-wrapper > span {
  display: flex;
  flex-direction: column;
}

.cw-antd-checkbox-img.layout-top-text-bottom-img .ant-checkbox-wrapper .option-img {
  margin-top: 6px;
}

.cw-antd-checkbox-img.layout-top-text-bottom-img .ant-checkbox {
  align-self: flex-start;
  margin-top: 5px;
}
</style>