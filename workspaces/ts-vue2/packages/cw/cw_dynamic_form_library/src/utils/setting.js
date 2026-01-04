import input from '@/assets/1.svg';
import radio from '@/assets/单选按钮.svg';
import inputArea from '@/assets/多行输入.svg';
import checkbox from '@/assets/多选框.svg';
import cascader from '@/assets/级联.svg';
import datepicker from '@/assets/日期时间.svg';
import upload from '@/assets/上传.svg';
import inputNumber from '@/assets/数字.svg';
import select from '@/assets/下拉.svg';
import switchButton from '@/assets/开关.svg';
import text from '@/assets/文字.svg';
import img from '@/assets/图片.svg';
import grid from '@/assets/栅格布局.svg';
/* 
type
- String
- Long
- Array
- Files
- Boolean
- Text
*/
export const componentDefaultList = [
  {
    name: 'cw-antd-input',
    title: '单行输入',
    tag: 'cw-antd-input',
    icon: input,
    belong: 'form',
    type: 'String',
    property: [
      { name: 'name', defaultValue: 'input' },
      { name: 'label', defaultValue: '文本框' },
      { name: 'span', defaultValue: '1' },
      { name: 'placeholder', defaultValue: '请输入', type: 'self' },
      { name: 'rules', defaultValue: [] },
      { name: 'children', defaultValue: [] },
      { name: 'dependency', defaultValue: [] },
    ],
  },
  {
    name: 'cw-antd-textarea',
    title: '多行输入',
    tag: 'cw-antd-textarea',
    belong: 'form',
    icon: inputArea,
    type: 'Text',
    property: [
      { name: 'name', defaultValue: 'textarea' },
      { name: 'label', defaultValue: '多行输入' },
      { name: 'span', defaultValue: '1' },
      { name: 'placeholder', defaultValue: '请输入', type: 'self' },
      { name: 'rows', defaultValue: '2', type: 'self' },
      { name: 'rules', defaultValue: [] },
      { name: 'dependency', defaultValue: [] },
    ],
  },
  {
    name: 'cw-antd-input-number',
    title: '数字输入',
    icon: inputNumber,
    type: 'Long',
    tag: 'cw-antd-input-number',
    belong: 'form',
    property: [
      { name: 'name', defaultValue: 'inputNumber' },
      { name: 'span', defaultValue: '1' },
      { name: 'label', defaultValue: '数字输入' },
      { name: 'placeholder', defaultValue: '请输入', type: 'self' },
      { name: 'rules', defaultValue: [] },
      { name: 'dependency', defaultValue: [] },
    ],
  },
  {
    name: 'cw-antd-select',
    title: '下拉单选',
    tag: 'cw-antd-select',
    belong: 'form',
    icon: select,
    type: 'String',
    property: [
      { name: 'name', defaultValue: 'select' },
      { name: 'span', defaultValue: '1' },
      { name: 'label', defaultValue: '下拉单选' },
      { name: 'placeholder', defaultValue: '请选择', type: 'self' },
      { name: 'rules', defaultValue: [] },
      { name: 'dependency', defaultValue: [] },
      { name: 'dataSource', defaultValue: {}, type: 'self' },
    ],
  },

  //   {
  //     name: 'cw-antd-auto-complete',
  //     title: "自动完成",
  //     tag: 'cw-antd-auto-complete',
  //     belong: "form",
  //     type:"String",
  //     property: [{ name: "name", defaultValue: "complete" },
  //           { name: "span", defaultValue: "1" },
  //           { name: "label", defaultValue: "自动完成" },
  //           { name: "placeholder", defaultValue: "请选择",type:"self" },
  //           { name: "rules", defaultValue: [] },
  //           { name: "dependency", defaultValue: [] },
  //           { name: "dataSource", defaultValue: {},type:"self" }]
  // },

  {
    name: 'cw-antd-radio',
    title: '单选按钮',
    tag: 'cw-antd-radio',
    belong: 'form',
    type: 'String',
    icon: radio,
    property: [
      { name: 'name', defaultValue: 'radio' },
      {
        name: 'direction',
        defaultValue: 'horizontal',
        type: 'self',
        // options: [{ label: "按钮", value: "button" }, { label: "单选框", value: "radio" }]
      },
      { name: 'span', defaultValue: '1' },
      { name: 'label', defaultValue: '单选' },
      { name: 'linkage', defaultValue: true, type: 'self' },
      { name: 'rules', defaultValue: [] },
      { name: 'dependency', defaultValue: [] },
      { name: 'dataSource', defaultValue: {}, type: 'self' },
      { name: 'otherData', defaultValue: '', type: 'self' },
    ],
  },

  {
    name: 'cw-antd-cascader',
    title: '联级选择',
    tag: 'cw-antd-cascader',
    belong: 'form',
    type: 'Array',
    icon: cascader,
    property: [
      { name: 'name', defaultValue: 'cascader' },
      { name: 'span', defaultValue: '1' },
      { name: 'label', defaultValue: '联级选择' },
      { name: 'placeholder', defaultValue: '请选择', type: 'self' },
      { name: 'rules', defaultValue: [] },
      { name: 'dependency', defaultValue: [] },
      { name: 'dataSource', defaultValue: {}, type: 'self' },
    ],
  },
  {
    name: 'cw-antd-checkbox',
    title: '多选框',
    type: 'Array',
    tag: 'cw-antd-checkbox',
    icon: checkbox,
    belong: 'form',
    property: [
      { name: 'name', defaultValue: 'checkbox' },
      { name: 'span', defaultValue: '1' },
      { name: 'label', defaultValue: '多选' },
      { name: 'linkage', defaultValue: true, type: 'self' },
      {
        name: 'direction',
        defaultValue: 'horizontal',
        type: 'self',
        // options: [{ label: "按钮", value: "button" }, { label: "单选框", value: "radio" }]
      },
      { name: 'rules', defaultValue: [] },
      { name: 'dependency', defaultValue: [] },
      { name: 'dataSource', defaultValue: {}, type: 'self' },
      { name: 'otherData', defaultValue: '', type: 'self' },
    ],
  },
  {
    name: 'cw-antd-switch',
    title: '开关',
    tag: 'cw-antd-switch',
    icon: switchButton,
    belong: 'form',
    type: 'Boolean',
    property: [
      { name: 'name', defaultValue: 'switch' },
      { name: 'span', defaultValue: '1' },
      { name: 'label', defaultValue: '开关' },
      { name: 'dependency', defaultValue: [] },
    ],
  },

  {
    name: 'cw-antd-date-picker',
    title: '日期时间',
    tag: 'cw-antd-date-picker',
    belong: 'form',
    type: 'String',
    icon: datepicker,
    property: [
      { name: 'name', defaultValue: 'datePicker' },
      { name: 'span', defaultValue: '1' },
      { name: 'placeholder', defaultValue: '请选择日期', type: 'self' },
      { name: 'label', defaultValue: '日期时间' },
      { name: 'format', defaultValue: 'YYYY-MM-DD', type: 'self' },
      // { name: "style", defaultValue: "",type:"self" },
      { name: 'rules', defaultValue: [] },
      { name: 'showTime', defaultValue: false, type: 'self', control: 'input' },
      { name: 'dependency', defaultValue: [] },
    ],
  },
  // {
  //   name: 'cw-antd-time-picker',
  //   title: "时间选择",
  //   tag: 'cw-antd-time-picker',
  //   belong:"form",
  //   property:[{ name: "name", defaultValue: "time-picker" },
  //             { name: "span", defaultValue: "1" },
  //             { name: "placeholder", defaultValue: "请选择时间",type:"self" },
  //             { name: "label", defaultValue: "时间选择" },
  //             { name: "format", defaultValue: "HH:mm:ss",type:"self" },
  //             { name: "dependency", defaultValue: [] }]
  // },
  {
    name: 'cw-antd-text',
    title: '文字',
    tag: 'cw-antd-text',
    belong: 'view',
    icon: text,
    property: [
      { name: 'name', defaultValue: 'text' },
      { name: 'span', defaultValue: '1' },
      // { name: "label", defaultValue: "日期选择" },
      { name: 'value', defaultValue: '文字', type: 'self' },
      { name: 'style', defaultValue: '', type: 'style' },
      { name: 'dependency', defaultValue: [] },
    ],
  },
  {
    name: 'cw-antd-upload',
    title: '文件上传',
    tag: 'cw-antd-upload',
    belong: 'form',
    type: 'Files',
    icon: upload,
    property: [
      { name: 'name', defaultValue: 'upload' },
      { name: 'span', defaultValue: '1' },
      { name: 'label', defaultValue: '文件上传' },
      { name: 'rules', defaultValue: [] },
      { name: 'dependency', defaultValue: [] },
      { name: 'uploadTemplate', defaultValue: '', type: 'self' },
    ],
  },
  {
    name: 'cw-antd-checkbox-with-input',
    title: '多选输入',
    type: 'Array',
    tag: 'cw-antd-checkbox-with-input',
    icon: checkbox,
    belong: 'form',
    property: [
      { name: 'name', defaultValue: 'checkboxWithInput' },
      { name: 'span', defaultValue: '1' },
      { name: 'label', defaultValue: '多选输入' },
      { name: 'linkage', defaultValue: true, type: 'self' },
      // {
      //   name: "direction",
      //   defaultValue: "horizontal",
      //   type: "self",
      //   // options: [{ label: "按钮", value: "button" }, { label: "单选框", value: "radio" }]
      // },
      { name: 'rules', defaultValue: [] },
      { name: 'dependency', defaultValue: [] },
      { name: 'dataSource', defaultValue: {}, type: 'self' },
    ],
  },
  {
    name: 'cw-antd-image',
    title: '图片组件',
    tag: 'cw-antd-image',
    icon: img,
    belong: 'view',
    property: [
      { name: 'name', defaultValue: 'image' },
      { name: 'span', defaultValue: '1' },
      // { name: 'value', defaultValue: 'https://img1.baidu.com/it/u=1965663592,580944689&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1712163600&t=4ba8cd42f88b7d8f546995a61cc934a8',type:'self' },
      { name: 'imgUrl', defaultValue: 'https://t9.baidu.com/it/u=1907594407,3775802009&fm=193', type: 'self' },
      { name: 'contentTitle', defaultValue: '', type: 'self' },
      { name: 'children', defaultValue: [] },
      { name: 'style', defaultValue: '', type: 'style' },
      { name: 'dependency', defaultValue: [] },
    ],
  },

  {
    name: 'cw-antd-grid',
    title: '栅格布局',
    tag: 'cw-antd-grid',
    icon: grid,
    belong: 'grid',
    property: [
      { name: 'name', defaultValue: 'grid' },
      { name: 'span', defaultValue: '3' },
      { name: 'label', defaultValue: '栅格布局' },
      { name: 'rows', defaultValue: 3, type: 'self' },
      { name: 'columns', defaultValue: 4, type: 'self' },
      { name: 'dependency', defaultValue: [] },
      // { name: 'gridType', defaultValue: '', type: 'self' },
      // {
      //   name: 'align',
      //   defaultValue: 'top',
      //   type: 'self',
      //   options: [
      //     { label: 'top', value: 'top' },
      //     { label: 'middle', value: 'middle' },
      //     { label: 'bottom', value: 'bottom' },
      //   ],
      // },
      // {
      //   name: 'justify',
      //   defaultValue: 'start',
      //   type: 'self',
      //   options: [
      //     { label: 'start', value: 'start' },
      //     { label: 'end', value: 'end' },
      //     { label: 'center', value: 'center' },
      //     { label: 'space-around', value: 'space-around' },
      //     { label: 'space-between', value: 'space-between' },
      //   ],
      // },
      // { name: 'gutter', defaultValue: 0, type: 'self' },
    ],
  },

  // {
  //   name: "cw-antd-radio-img",
  //   title: "单选图文",
  //   tag: "cw-antd-radio-img",
  //   belong: "form",
  //   type: "String",
  //   icon: radio,
  //   property: [
  //     { name: "name", defaultValue: "radioImg" },
  //     { name: "span", defaultValue: "1" },
  //     { name: "label", defaultValue: "单选图文" },
  //     { name: "imgWidth", defaultValue: "100", type: "self" },
  //     {
  //       name: "layout",
  //       defaultValue: "left-img-right-text",
  //       type: "self",
  //       options: [{ label: "左图右文", value: "left-img-right-text" }, { label: "左文右图", value: "left-text-right-img" }, { label: "上文下图", value: "top-text-bottom-img" }, { label: "上左下右", value: "top-left-bottom-right" }]
  //     },
  //     { name: "rules", defaultValue: [] },
  //     { name: "dependency", defaultValue: [] },
  //     { name: "dataSource", defaultValue: {}, type: "self" },
  //     // { name: "otherData", defaultValue: "" ,type: "self",},
  //   ],
  // },
  // {
  //   name: "cw-antd-checkbox-img",
  //   title: "多选图文",
  //   tag: "cw-antd-checkbox-img",
  //   belong: "form",
  //   type: "Array",
  //   icon: checkbox,
  //   property: [
  //     { name: "name", defaultValue: "checkboxImg" },
  //     { name: "span", defaultValue: "1" },
  //     { name: "label", defaultValue: "多选图文" },
  //     { name: "imgWidth", defaultValue: "100", type: "self" },
  //     {
  //       name: "layout",
  //       defaultValue: "left-img-right-text",
  //       type: "self",
  //       options: [{ label: "左图右文", value: "left-img-right-text" }, { label: "左文右图", value: "left-text-right-img" }, { label: "上文下图", value: "top-text-bottom-img" }, { label: "上左下右", value: "top-left-bottom-right" }]
  //     },
  //     { name: "rules", defaultValue: [] },
  //     { name: "dependency", defaultValue: [] },
  //     { name: "dataSource", defaultValue: {}, type: "self" },
  //     // { name: "otherData", defaultValue: "" ,type: "self",},
  //   ],
  // },
  //   {
  //   name: "cw-gx-input-view",
  //   title: "指标库",
  //   tag: "cw-gx-input-view",
  //   belong: "form",
  //   type: "String",
  //   icon: radio,
  //   property: [
  //     { name: "name", defaultValue: "zbInputView" },
  //     { name: "span", defaultValue: "1" },
  //     { name: "label", defaultValue: "" },
  //     {
  //       name: "custom",
  //       defaultValue: "0",
  //       type: "self",
  //       options: [{ label: "来访量", value: "1" }, { label: "认购套书", value: "2" }, { label: "权益认购金额", value: "3" },]
  //     },
  //     { name: "rules", defaultValue: [] },
  //     { name: "dependency", defaultValue: [] },
  //     // { name: "dataSource", defaultValue: {}, type: "self" },
  //     // { name: "otherData", defaultValue: "" ,type: "self",},
  //   ],
  // },
  // {
  //   name: 'cw-antd-range-picker',
  //   title: "日期范围",
  //   tag: 'cw-antd-range-picker',
  //   belong:"form",
  //   property:[{ name: "name", defaultValue: "ranger-picker" },
  //             { name: "span", defaultValue: "1" },
  //     { name: "label", defaultValue: "日期范围" },
  //     { name: "rules", defaultValue: [] },
  //             { name: "dependency", defaultValue: [] }]
  // },
  // {
  //   name: 'cw-antd-form-table',
  //   title: "表单表格",
  //   tag: 'cw-antd-form-table',
  //   belong:"table",
  //   property:[{ name: "name", defaultValue: "formTable" },
  //             { name: "span", defaultValue: "3" },
  //             { name: "label", defaultValue: "表单表格" },
  //             { name: "rules", defaultValue: [] },
  //             { name: "dependency", defaultValue: [] },
  //             { name: "titleMap", defaultValue: "",type:"self" },
  //             { name: "dataSource", defaultValue: {},type:"self" }]
  // },
  // {
  //   name: 'cw-antd-action-table',
  //   title: "数据表格",
  //   tag: 'cw-antd-action-table',
  //   belong:"form",
  //   property:[{ name: "name", defaultValue: "formTable" },
  //             { name: "span", defaultValue: "3" },
  //             { name: "label", defaultValue: "表格" },
  //             { name: "rules", defaultValue: [] },
  //             { name: "dependency", defaultValue: [] },
  //             { name: "titleMap", defaultValue: "", type:"self" },
  //             { name: "dataSource", defaultValue: {}, type:"self"}]
  // },
  // {
  //   name: 'cw-antd-card',
  //   title: "卡片",
  //   tag: 'cw-antd-card',
  //   belong:"view",
  //   property: [{ name: "name", defaultValue: "formTable" },
  //         { name: "span", defaultValue: "3" },
  //         { name: "label", defaultValue: "" },
  //         { name: "dependency", defaultValue: [] },
  //         { name: "titleMap", defaultValue: "", type: "self" },
  //         { name: "children", defaultValue: []}
  //   ]
  // },
];

// console.log(componentDefaultList,'componentDefaultList')

export const titleMap = {
  name: '编号',
  label: '标题',
  span: '占位',
  placeholder: '提示',
  rules: '校验规则',
  dependency: '展示规则',
  dataSource: '数据源',
  offset: '偏移',
  viewType: '视图类型',
  format: '格式',
  showTime: '显示时间',
  value: '内容',
  style: '样式',
  rows: '行数',
  otherData: '为数据源添加填空选项',
  direction: '布局',
  contentTitle: '文案',
  uploadTemplate: '模版',
  linkage: '联动',
  layout: '定位',
  imgWidth: '图宽',
  imgUrl: '图片',
  testText: '测试文本',
  custom: '指标',
  rows: '行数',
  columns: '列数',
  gridType: '布局模式',
  align: '垂直对齐方式',
  justify: '水平对齐方式',
  gutter: '间距',
};
