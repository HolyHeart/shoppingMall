<template>
<div class="recommend">
  <div v-for="(item, index) in recommends" class="recommend-item" :key="index">
    <a :href="item.link">
      <img :src="item.image" alt="">
    </a>
  </div>
</div>

</template>
<script>
export default {
name:'RecommendView',
props: {
  recommends: {
    type: Array,
    default() {
      return []
    }
  }
}
}
</script>
<style scoped>
.recommend {
  display: flex;
  text-align: center;
  padding: 5px;
  width: 100%;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img{
  width: 75px;
}
</style>