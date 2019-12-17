<template>
<div>
   <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item_icon" src="~assets/imgs/tabbar/home.svg" alt="">
        <img slot="item_icon_active" src="~assets/imgs/tabbar/home_active.svg" alt="">
        <div slot="item_text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item_icon" src="~assets/imgs/tabbar/category.svg" alt="">
        <img slot="item_icon_active" src="~assets/imgs/tabbar/category_active.svg" alt="">
        <div slot="item_text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item_icon" src="~assets/imgs/tabbar/shopcart.svg" alt="">
        <img slot="item_icon_active" src="~assets/imgs/tabbar/shopcart_active.svg" alt="">
        <div slot="item_text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item_icon" src="~assets/imgs/tabbar/profile.svg" alt="">
        <img slot="item_icon_active" src="~assets/imgs/tabbar/profile_active.svg" alt="">
        <div slot="item_text">我的</div>
      </tab-bar-item>
    </tab-bar>
</div>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar"
import TabBarItem from "components/common/tabbar/TabBarItem"

export default {
name:'MainTabBar',
components: {
    TabBar,
    TabBarItem
  }
}
</script>
<style scoped>
</style>