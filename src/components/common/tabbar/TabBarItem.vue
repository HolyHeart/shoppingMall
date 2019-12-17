<template>
  <div class="tab_bar_item" @click="tabClick">
    <div v-if="!isActive"><slot name="item_icon"></slot></div>  
    <!-- 处于非激活状态时显示此插槽 -->
    <div v-else><slot name="item_icon_active"></slot></div>
    <!-- 处于激活状态时显示此插槽 -->
    <div :style="activeStyle"><slot name="item_text"></slot></div>  
    <!-- 在给插槽添加属性时，不应该直接添加到插槽中，因为插槽会被替换掉，因此属性也被替换掉了，
    一般会将属性添加到包裹插槽的div中 -->
  </div>
</template>
<script>
export default {
name:'TabBarItem',
props: {
  path: String,
  activeColor: {
    type: String,
    default: "red"
  }
},
// data() {
//   return {
//     isActive: false
//   }
// },
methods: {
  tabClick() {
    this.$router.push(this.path)
  }
},
computed: {
  isActive() {
    return this.$route.path.indexOf(this.path)!==-1
  },
  activeStyle() {
    return this.isActive?{color:this.activeColor}:{}
  }
},
// activated() {
//   console.log("activated")
//   this.isActive=true
// },
// deactivated() {
//   console.log("deactivated")
//   this.isActive=false
// }
}
</script>
<style scoped>
.tab_bar_item {
    flex:1;
    text-align:center;
    height:49px;
    font-size: 16px;
    margin-top: 5px;
  }
.tab_bar_item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
</style>