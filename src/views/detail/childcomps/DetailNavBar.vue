<template>
<nav-bar>
  <div slot="left" class="back" @click="backClick">
    <img src="~assets/imgs/common/back.svg" alt="">
  </div>
  <div slot="center" class="title">
    <div v-for="(item,index) in titles"
         :key="index" 
         class="title-item"
         @click="itemClick(index)"
         :class="{active : currentIndex === index}">{{item}}</div>
  </div>
</nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar"
export default {
  name:'DetailNavBar',
  data() {
    return {
      titles: ["商品","参数","评论","推荐"],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit("titleClick", index)
    },
    backClick() {
      // this.$router.back()  //返回上一层
      this.$router.go(-1)  //去到第几层

    }
  }
}

</script>
<style scoped>
.title {
  display: flex;
  left: 0;
  right: 0;
  top: 0;
}
.title-item {
  flex: 1;
  font-size: 14px;
}
.active {
  color: var(--color-high-text);
}
.back {
  margin-top: 6px;
}
</style>