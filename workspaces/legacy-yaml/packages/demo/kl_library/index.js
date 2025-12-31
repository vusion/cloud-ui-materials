import KlTreeView from './components/kl-tree-view';
// COMPONENT IMPORTS
export {
	KlTreeView,
// COMPONENT EXPORTS
};

// import Vue from 'vue';
// import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// Vue.use(Antd);

const el = document.createElement("div")
el.setAttribute("id", "kl_library")
el.classList.add("kl_library")
document.body.appendChild(el)