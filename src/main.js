import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import toast from "components/common/toast"
import FastClick from "fastclick"

Vue.config.productionTip = false

//向vue原型的$bus赋值一个vue实例，则在vue实例中就可以使用事件总线
Vue.prototype.$bus=new Vue()  

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
