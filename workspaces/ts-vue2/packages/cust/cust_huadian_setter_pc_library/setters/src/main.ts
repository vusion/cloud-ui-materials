import { createApp } from 'vue';
import App from './App.vue';

import { ElInfiniteScroll } from 'element-plus';
// 导入自定义指令
import directives from './directives';

const app = createApp(App);
app.use(ElInfiniteScroll);
// 注册自定义指令
app.use(directives);
app.mount('#app');
