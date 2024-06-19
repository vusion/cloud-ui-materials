import CwAntdInput from './components/cw-antd-input';
import CwAntdInputNumber from './components/cw-antd-input-number';
import CwAntdCustomView from './components/cw-antd-custom-view';
import CwAntdCustomRenderView from './components/cw-antd-custom-render-view';
import CwAntdSelect from './components/cw-antd-select';
import CwAntdTextarea from './components/cw-antd-textarea';
import CwAntdAutoComplete from './components/cw-antd-auto-complete';
import CwAntdCheckbox from './components/cw-antd-checkbox';
import CwAntdRadio from './components/cw-antd-radio';
import CwAntdSwitch from './components/cw-antd-switch';
import CwAntdTimePicker from './components/cw-antd-time-picker';
import CwAntdDatePicker from './components/cw-antd-date-picker';
import CwAntdRangePicker from './components/cw-antd-range-picker';
import CwAntdCascader from './components/cw-antd-cascader';
// import CwAntdFormTable from './components/cw-antd-form-table';
// import CwAddDependencyView from './widgets/cw-add-dependency-view';
// import CwAddDataSourceView from './widgets/cw-add-data-source-view';
// import CwAddRuleView from './widgets/cw-add-rule-view';
// import CwAntdButton from './components/cw-antd-button';
// import CwAntdIcon from './components/cw-antd-icon';
// import CwAntdUpload from './components/cw-antd-upload';
// import CwAntdAffix from './components/cw-antd-affix';
// import CwAntdDropdown from './components/cw-antd-dropdown';
// import CwAntdSteps from './components/cw-antd-steps';
// import CwAntdCalendar from './components/cw-antd-calendar';
// import CwAntdCard from './components/cw-antd-card';
// import CwAntdTest from './components/cw-antd-test';
// import CwAntdNestedEmample from './components/cw-antd-nested-emample';
// import CwAntdActionTable from './components/cw-antd-action-table';
// import CwTreeSelect from './components/cw-tree-select';
import CwAntdCustomTable from './components/cw-antd-custom-table';
// import CwAddSelectSourceView from './components/cw-add-select-source-view';
import CwAntdImage from './components/cw-antd-image';
import CwAntdText from './components/cw-antd-text';
import CwAntdUpload from './components/cw-antd-upload';
import CwAntdCheckboxWithInput from './components/cw-antd-checkbox-with-input';
// COMPONENT IMPORTS


import Vue from 'vue';
import Antd from './lib/antd';
import 'ant-design-vue/dist/antd.css';
// import '@/styles/antd.css'
// import 'ant-design-vue/lib/style/index.less'
import '@/styles/index.css'
// import '@/styles/index.less'

Vue.use(Antd);
export {
	CwAntdInput,
	CwAntdInputNumber,
	CwAntdCustomView,
	CwAntdCustomRenderView,
	CwAntdSelect,
	CwAntdTextarea,
	CwAntdAutoComplete,
	CwAntdCheckbox,
	CwAntdRadio,
	CwAntdSwitch,
	CwAntdTimePicker,
	CwAntdDatePicker,
	CwAntdRangePicker,
	CwAntdCascader,
	// CwAntdFormTable,
	// CwAddDependencyView,
	// CwAddDataSourceView,
	// CwAddRuleView,
	// CwAntdButton,
	// CwAntdIcon,
	// CwAntdNestedEmample,
	// CwAntdTest,
	// CwAntdAffix,
	// CwAntdDropdown,
	// CwAntdSteps,
	// CwAntdCalendar,
	// CwAntdCard,
	// CwAntdUpload,
	// CwAntdActionTable,
	// CwTreeSelect,
	CwAntdCustomTable,
	// CwAddSelectSourceView,
	CwAntdImage,
	CwAntdText,
	CwAntdUpload,
	CwAntdCheckboxWithInput,
// COMPONENT EXPORTS
};
	

const el = document.createElement("div")
el.setAttribute("id", "cw_dynamic_form_library")
el.classList.add("cw_dynamic_form_library")
document.body.appendChild(el)
// window.message.config({
// 	getContainer:el
// })
import moment from "moment"
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
