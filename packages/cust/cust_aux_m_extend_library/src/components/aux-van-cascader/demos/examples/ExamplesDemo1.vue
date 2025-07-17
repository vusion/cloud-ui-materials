<template>
  <aux-van-cascader
    v-model="base.value2"
    title="selectArea"
    :dataSource="[
      { text: '浙江省', value: '330000' },
      { text: '杭州市', value: '330100', parentId: '330000' },
      { text: '宁波市', value: '330200', parentId: '330000' },
      { text: '江苏省', value: '320000' },
    ]"
    :tree-display="true"
    :filterable="true"
    :closeOnClickOverlay="true"
    clearable
    @close="base.show = false"
    @finish="onFinish1('base', $event)"
    @change="onChange"
  >
    <template #title><van-text text="地区"></van-text></template>
  </aux-van-cascader>
</template>

<script>
import AuxVanCascader from '@/components/aux-van-cascader';

export default {
  components: {
    AuxVanCascader,
  },
  data() {
    return {
      valuepopup: false,
      options: [
        {
          text: '浙江省',
          value: '330000',
          children: [
            {
              text: '杭州市',
              value: '330100',
              children: [
                {
                  text: '上城区',
                  value: '330102',
                },
                {
                  text: '下城区',
                  value: '330103',
                },
                {
                  text: '江干区',
                  value: '330104',
                },
              ],
            },
            {
              text: '宁波市',
              value: '330200',
              children: [
                {
                  text: '海曙区',
                  value: '330203',
                },
                {
                  text: '江北区',
                  value: '330205',
                },
                {
                  text: '北仑区',
                  value: '330206',
                },
              ],
            },
            {
              text: '温州市',
              value: '330300',
              children: [
                {
                  text: '鹿城区',
                  value: '330302',
                },
                {
                  text: '龙湾区',
                  value: '330303',
                },
                {
                  text: '瓯海区',
                  value: '330304',
                },
              ],
            },
          ],
        },
        {
          text: '江苏省',
          value: '320000',
          children: [
            {
              text: '南京市',
              value: '320100',
              children: [
                {
                  text: '玄武区',
                  value: '320102',
                },
                {
                  text: '秦淮区',
                  value: '320104',
                },
                {
                  text: '建邺区',
                  value: '320105',
                },
              ],
            },
            {
              text: '无锡市',
              value: '320200',
              children: [
                {
                  text: '锡山区',
                  value: '320205',
                },
                {
                  text: '惠山区',
                  value: '320206',
                },
                {
                  text: '滨湖区',
                  value: '320211',
                },
              ],
            },
            {
              text: '徐州市',
              value: '320300',
              children: [
                {
                  text: '鼓楼区',
                  value: '320302',
                },
                {
                  text: '云龙区',
                  value: '320303',
                },
                {
                  text: '贾汪区',
                  value: '320305',
                },
              ],
            },
          ],
        },
      ],
      optionstesttt: [
        {
          text: '浙江省',
          value: '330000',
          children: [
            {
              text: '杭州市',
              value: '330100',
              children: [
                { text: '上城区', value: '330102' },
                { text: '下城区', value: '330103' },
                { text: '江干区', value: '330104' },
              ],
            },
            {
              text: '宁波市',
              value: '330200',
              children: [
                { text: '海曙区', value: '330203' },
                { text: '江北区', value: '330205' },
                { text: '北仑区', value: '330206' },
              ],
            },
            {
              text: '温州市',
              value: '330300',
              children: [
                { text: '鹿城区', value: '330302' },
                { text: '龙湾区', value: '330303' },
                { text: '瓯海区', value: '330304' },
              ],
            },
          ],
        },
        {
          text: '江苏省',
          value: '320000',
          children: [
            {
              text: '南京市',
              value: '320100',
              children: [
                { text: '玄武区', value: '320102' },
                { text: '秦淮区', value: '320104' },
                { text: '建邺区', value: '320105' },
              ],
            },
            {
              text: '无锡市',
              value: '320200',
              children: [
                { text: '锡山区', value: '320205' },
                { text: '惠山区', value: '320206' },
                { text: '滨湖区', value: '320211' },
              ],
            },
            {
              text: '徐州市',
              value: '320300',
              children: [
                { text: '鼓楼区', value: '320302' },
                { text: '云龙区', value: '320303' },
                { text: '贾汪区', value: '320305' },
              ],
            },
          ],
        },
      ],
      base: {
        show: false,
        show2: false,
        value2: '',
        value: '',
        result: '',
      },
    };
  },

  methods: {
    onFinish1(type, { value, selectedOptions }) {
      // console.log(arguments);

      const result = selectedOptions.map((option) => option.text || option.name).join('/');

      this[type] = {
        ...this[type],
        value,
        result,
      };
      console.log('onFinish1', this.base.value);
    },
    onChange(value) {
      console.log('onChange', value);
    },
  },
};
</script>
