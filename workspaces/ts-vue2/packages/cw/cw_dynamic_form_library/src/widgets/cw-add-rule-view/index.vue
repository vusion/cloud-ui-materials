<template>
  <div>
    <a-modal
      width="550px"
      title="校验规则设置"
      :visible="visible"
      :getContainer="getPopupContainer"
      @cancel="handleCancel"
      :footer="null"
    >
      <div v-if="currentRules.length==0">
        暂无数据，请添加展示规则
      </div>
      <div v-else>
        <div class="calculation-cell-room" style="font-size:14px">
          <div class="calculation-cell">规则类型</div>
          <div class="calculation-cell">对应的值</div>
          <div class="calculation-cell">填写错误时的提示</div>
          <div class="calculation-cell"></div>
        </div>
      <div
        class="calculation-cell-room"
        v-for="(item, index) in currentRules"
        :key="index"
      >
        <div class="calculation-cell">
          <cw-antd-select
            placeholder="请选择"
            :dataSource="ruleList"
            :value.sync="item.rule"
          >
          </cw-antd-select>
        </div>
        <div class="calculation-cell">
          <a-input
            :disabled="item.rule === 'required' || item.rule==='mobile'"
            placeholder="请输入对应的值"
            v-model="item.value"
          ></a-input>
        </div>
        <div class="calculation-cell">
          <a-input
            placeholder="请输入文字"
            v-model="item.message"
          ></a-input>
        </div>
        <a-icon
          style="font-size:16px"
          type="delete"
          @click="handleRemove(index)"
        />
      </div>
      </div>
      <a-button style="margin-left:-16px" type="link" @click="handleAdd">+添加规则</a-button>
    </a-modal>
    <div class="input-cell" v-for="(it,idx) in currentRulesValue " :key="idx">
      <a-input :value="it" readOnly></a-input>
       <a-icon
          style="font-size:16px;margin-left:8px"
          type="delete"
          @click="handleRemove(idx)"
        />
    </div>
    <a-button type="dashed" style="width:100%" @click="handleShow">点击添加校验规则</a-button>
  </div>
</template>

<script>
import commonSelectMix from "@/mixins/common.select";
export default {
  name: "cw-add-rule-view",
  props: {
    value: {
      type: Array,
    },
  },
  mixins: [commonSelectMix],
  data() {
    return {
      visible: false,
      currentRules: [],
      ruleList: [
        {
          value: "required",
          label: "必填",
        },
        {
          value: "max",
          label: "最大长度",
        },
        {
          value: "min",
          label: "最小长度",
        },
        {
          value: "mobile",
          label: "手机号",
        },
        {
          value: "pattern",
          label: "正则表达",
        },
      ],
    };
  },
  watch: {
    value: {
      handler(val) {
        this.currentRules = val;
      },
      deep:true,
      immediate: true,
    },
    currentRules: {
      handler(val, oldVal) {
        const arr = val.filter((item) => item.value);
        this.$emit("onChange", arr);
        // this.$emit("change", arr);
      },
      deep: true,
    },
  },
  computed:{
    currentRulesValue(){
      const ruleMap = {
        required: '必填',
        max: `最大长度`,
        min:  `最小长度`,
        pattern:  `正则表达式`,
        mobile:'手机号验证失败'
      };

    const getRule= (item)=>{
    const {value,rule} = item
    return ruleMap[rule] || '';
}
      return this.currentRules.map(item=>{
        let str = ''
        // str +=  item.rule === 'required' ? '必填' : item.rule === 'max' ? `最大长度${item.value}` : item.rule === 'min' ? `最小长度${item.value}` : item.rule === 'pattern' ? `正则表达式${item.value}` : ''
        str +=  getRule(item)
        str += "为"
        str += item.value
        str += "时,出现出错描述"
        str += item.message
        return str
      })
    }
  },
  methods: {
    handleShow() {
      this.visible = true;
    },
    handleAdd() {
      // this.visible = true
      this.currentRules.push({
        rule: undefined,
        value: "",
        message: "",
      });
    },
    handleClick() {
      // console.log(this.currentRules[0].calculation,this.currentList)
    },
    handleRemove(index) {
      this.currentRules.splice(index, 1);
    },
    handleCancel() {
      this.visible = false;
    },
  },
};
</script>

<style>
.calculation-cell-room {
  font-size: 14px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
.calculation-cell-room div:first-child {
  width: 100px;
}

.calculation-cell-room div:nth-child(2) {
  width: 140px;
}

.calculation-cell-room div:nth-child(3) {
  width: 220px;
}

.calculation-cell {
  margin-right: 8px;
  margin-top: 6px;
  margin-bottom: 6px;
}
.input-cell{
  display:flex;
  align-items:center;
  margin-top:6px;
  margin-bottom:6px;
}
</style>
