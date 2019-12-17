<template>
<div class="cart-list">
  <Scroll class="content" ref="Scroll">
    <cart-list-item v-for="(item, index) in cartList" 
                    :key="index"
                    :product="item"></cart-list-item>
  </Scroll>
</div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll"
import CartListItem from "./CartListItem"
import { mapGetters } from "vuex"
export default {
  name:'CartList',
  components: {
    CartListItem,
    Scroll
  },
  computed:{
    ...mapGetters(["cartList"])
  },
  activated() {  //每次添加商品到购物车就要对购物车页面进行刷新，否则不能滚动
    this.$refs.Scroll.refresh()
  }
}
</script>
<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>