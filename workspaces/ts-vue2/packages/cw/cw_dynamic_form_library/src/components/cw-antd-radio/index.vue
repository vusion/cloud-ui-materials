<template>
  <div style="width:100%" class="cw-antd-radio">
    <template v-if="sourceList.length">
      <template v-if="viewType==='button'">
        <a-radio-group
          style="width:100%"
          v-bind="[$attrs, $props]"
          v-on="$listeners"
          v-model="currentValue"
          @change="handleChange"
        >
          <template>
            <a-radio-button v-for="(item,index) in sourceList" :key="index" :value="item.value">
              {{ item.label }}
            </a-radio-button>
          </template>
        </a-radio-group>
      </template>
      <template v-else>
        <a-radio-group
          style="width:100%"
          class="cw-radio-view-group"
          :class="direction==='horizontal'?'cw-group-horizontal':'cw-group-vertical'"
          v-bind="[$attrs, $props]"
          v-on="$listeners"
          v-model="currentValue"
          @change="handleChange"
        >
          <template>
            <a-radio v-for="(item,index) in sourceList" :key="index" :value="item.value">
              {{ item.label }}
            </a-radio>
            <div class="othor-radio-room" v-if="otherData">
              <a-radio :value="otherData"> {{ otherData }}</a-radio>
              <a-input
                v-if="!linkage||(currentValue === otherData)"
                style="max-width:200px"
                :disabled="disabled"
                :value="currentInputValue"
                @input="handleInputChange"
              />
            </div>
          </template>
        </a-radio-group>
      </template>
    </template>
    <a-radio v-else>在设计器中或没有数据源</a-radio>
  </div>
</template>

<script>
export default {
  name: 'cw-antd-radio',
  props: {
    value: {
      type: [String, Number],
    },
    viewType: {
      type: String,
    },
    otherData: {
      type: String,
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    linkage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      sourceList: [],
      currentValue: null,
      currentInputValue: '',
    };
  },
  methods: {
    handleInputChange(e) {
      if (this.currentValue != this.otherData) {
        this.currentValue = this.otherData;
      }
      this.currentInputValue = e.target.value;
      console.log(this.otherData + (e.target.value ? '->' + e.target.value : ''));
      this.$emit('update:value', this.otherData + (e.target.value ? '->' + e.target.value : ''));
      this.$emit('onChange', this.otherData + (e.target.value ? '->' + e.target.value : ''));
      this.$emit('change', this.otherData + (e.target.value ? '->' + e.target.value : ''));
    },
    handleChange(value) {
      console.log(value, 222);
    },
  },
  computed: {
    dataObj() {
      return {
        currentValue: this.currentValue,
        currentInputValue: this.currentInputValue,
      };
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val === undefined || val === null) {
          return;
        }
        if (typeof val === 'number') {
          this.currentValue = val;
          return;
        }
        if (typeof val === 'string') {
          this.currentValue = val;
          if (val.indexOf('->') === -1) {
            console.log(this.dataSource.map(item => item.label), val);
            if (!this.dataSource.map(item => item.label).includes(val)) {
              this.currentValue = this.otherData;
              this.currentInputValue = this.otherData !== val ? val : '';
            }
          } else {
            const [currentValue, currentInputValue] = val.split('->');
            this.currentValue = currentValue;
            this.currentInputValue = currentInputValue;
          }
        }
      },
      immediate: true,
    },
    dataObj: {
      handler(val) {
        const { currentValue, currentInputValue } = val;
        if (currentValue === this.otherData) {
          this.$emit('update:value', currentValue + (currentInputValue ? '->' + currentInputValue : ''));
          this.$emit('onChange', currentValue + (currentInputValue ? '->' + currentInputValue : ''));
          this.$emit('change', currentValue + (currentInputValue ? '->' + currentInputValue : ''));
        } else {
          this.$emit('update:value', currentValue);
          this.$emit('onChange', currentValue);
          this.$emit('change', currentValue);
        }
      },
      deep: true,
    },
    dataSource: {
      handler(val) {
        this.sourceList = val;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.othor-radio-room {
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
}

.cw-antd-radio .ant-radio-wrapper {
  display: flex !important;
  align-items: center !important;
  height: 40px;
}

.cw-radio-view-group {
  display: flex !important;
  flex-wrap: wrap;
}

.cw-group-vertical {
  flex-direction: column;
}

.cw-group-vertical input {
  width: 100%;
}
</style>