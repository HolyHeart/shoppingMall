import Toast from "./Toast"

const obj = {}

obj.install = function(Vue) { //默认传入Vue
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器可以创建一个组件对象
  const toast = new toastConstructor()
  
  // 3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement("div"))

  // 4.toast.$el拿到的就是上面创建的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj