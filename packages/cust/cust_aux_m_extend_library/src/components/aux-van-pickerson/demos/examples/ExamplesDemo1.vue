<template>
  <aux-van-pickerson
    class="cw-css-rule-pickerson1___asada"
    :clearable="false"
    :multiple="false"
    :enable-select-all="true"
    :enable-selected-count="false"
    type="list"
    ref="pickerson1"
    title="标题"
    :show-toolbar="true"
    :value.sync="pickerValue"
    :data-source="load"
    :pageable="true"
    :pageSize="10"
    :filterable="true"
    clearable
    @confirm="confirm111"
    @change="handleChange"
  >
    <template #title>
      <van-text ref="text19" text="标题"></van-text>
    </template>
  </aux-van-pickerson>
</template>

<script>
import AuxVanPickerson from '@/components/aux-van-pickerson';
const data = [
  { text: '浙江省', value: '330000' },
  { text: '杭州市', value: '330100', parentId: '330000' },
  { text: '宁波市', value: '330200', parentId: '330000' },
  { text: '江苏省', value: '320000' },
  { text: '江苏省1', value: '320001' },
  { text: '江苏省2', value: '320002' },
  { text: '江苏省3', value: '320003' },
  { text: '江苏省4', value: '320004' },
  { text: '江苏省5', value: '320005' },
  { text: '江苏省6', value: '320006' },
  { text: '江苏省7', value: '320007' },
  { text: '江苏省8', value: '320008' },
  { text: '江苏省9', value: '320009' },
  { text: '江苏省14', value: '3200010' },
  { text: '江苏省24', value: '3201000' },
  { text: '江苏省34', value: '320000000' },
  { text: '江苏省44', value: '320100220' },
  { text: '江苏省54', value: '32011000' },
  { text: '江苏省64', value: '320111000' },
  { text: '江苏省74', value: '3210111000' },
  { text: '江苏省84', value: '3120000' },
  { text: '江苏省94', value: '32100010' },
  { text: '江苏省114', value: '31201000' },
  { text: '江苏省124', value: '32110111000' },
  { text: '江苏省134', value: '32001100' },
  { text: '江苏省144', value: '320110010' },
  { text: '江苏省154', value: '32001111100' },
];

export default {
  components: {
    AuxVanPickerson,
  },
  data() {
    return {
      son: '温州',
      showPicker: false,
      fieldValue: '',
      pupupd: true,
      list: data,
      pickerValue: ['32001111100'],
      pickerVal: [],
    };
  },

  computed: {
    columns() {
      const column = this.t('column3');
      return [
        {
          values: Object.keys(column),
          className: 'column1',
        },
        {
          values: column[Object.keys(column)[0]],
          className: 'column2',
          defaultIndex: 2,
        },
      ];
    },
  },

  methods: {
    onChange1(picker, value, index) {
      this.$toast(this.t('toastContent', value, index));
    },

    onChange2(picker, values) {
      picker.setColumnValues(1, this.t('column3')[values[0]]);
    },

    onConfirm(value, index) {
      this.$toast(this.t('toastContent', value, index));
    },

    onCancel() {
      this.$toast(this.t('cancel'));
    },

    onClickField() {
      this.showPicker = true;
    },

    onConfirm2(value) {
      this.showPicker = false;
      this.fieldValue = value;
    },
    onConfirm222(value) {
      console.log(value);
    },
    onCancel2() {
      this.showPicker = false;
    },
    confirm111(value, index) {
      console.log('pickerValue', this.pickerValue);
      console.log(`confirm 当前值：${value}, 当前索引：${index}`);
    },
    change111(picker, value, index) {
      console.log('pickerValue', this.pickerValue);
      console.log(`change 当前值：${value}, 当前索引：${index}`);
    },
    load(params) {
      const { page, size, filterText } = params;

      let arr = data.filter((item) => item.text.includes(filterText));

      return {
        total: arr.length,
        list: arr.slice((page - 1) * size, page * size),
      };
    },
    reload() {
      this.$refs.pickerson1.reload();
    },
    handleChange(item, value, index) {
      debugger;
    },
  },
};
</script>
