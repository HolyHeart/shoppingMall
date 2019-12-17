<template>
  <div id="app">
    <keep-alive exclude="Detail"> 
      <!-- 此处使用exclude意思是Detail不需要保存状态(也就是没有进行缓存，
      每次切换Detail组件都是创建和销毁，没有活跃与不活跃状态)
      因为用户每次从首页点击进入的详情页应该是不同的 -->
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar"
export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "./assets/css/base.css";
</style>
