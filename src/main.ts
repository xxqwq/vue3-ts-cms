import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import pinia from './store'
//全局引入ElementPlus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)

//针对ELMessage和ELLoading等组件引入样式
//使用vite-plugin-style-import插件
/**
 * npm i vite-plugin-style-import consola -D
 * 在vie.config.ts中配置
 */
import 'element-plus/theme-chalk/el-message.css'
import registerIcons from './global/register-icons'
const app = createApp(App)
app.use(registerIcons)
app.use(router)
app.use(pinia)
app.mount('#app')
