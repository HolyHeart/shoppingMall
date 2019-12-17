<template>
<div id="cart">
  <nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>
  <cart-list></cart-list>
  <cart-bottom-bar></cart-bottom-bar>
</div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childcomps/CartList"
import CartBottomBar from "./childcomps/CartBottomBar"
import { mapGetters } from "vuex"
// mapGetters辅助函数仅仅是将store中的getters映射到局部计算属性中
export default {
  name:'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 两种语法：
    // ...mapGetters(["cartLength"])  //数组写法
    ...mapGetters({  //对象写法
      length: "cartLength"
    })
  }
}
</script>
<style scoped>
#cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>