<template>
<div class="base-info" v-if="Object.keys(goodsInfo).length !== 0">
  <!-- 这里的v-if是判断传入的goodsInfo是否是空对象，如果不是空对象则进行展示 -->
  <div class="info-title">{{goodsInfo.title}}</div>
  <div class="info-price">
    <span class="n-price">{{goodsInfo.newPrice}}</span>
    <span class="o-price">{{goodsInfo.oldPrice}}</span>
    <span class="discount" v-if="goodsInfo.discount">{{goodsInfo.discount}}</span>
  </div>
  <div class="info-other">
    <span>{{goodsInfo.columns[0]}}</span>
    <span>{{goodsInfo.columns[1]}}</span>
    <span>{{goodsInfo.services[goodsInfo.services.length-1].name}}</span>
  </div>
  <div class="info-service">
    <span class="info-service-item" v-for="index in goodsInfo.services.length-1" :key="index">
      <img :src="goodsInfo.services[index-1].icon" alt="">
      <span>{{goodsInfo.services[index-1].name}}</span>
    </span>
  </div>
</div>
</template>
<script>
export default {
name:'DetailGoodsInfo',
props: {
  goodsInfo: {
    type: Object,
    default() {
      return {}
    }
  }
}
}
</script>
<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8
}
.info-title {
  color: #222222;
  text-align: justify;
}
.info-price {
  margin-top: 10px;
}
.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price .discount {
  font-size: 12px;
  padding: 3px 6px;
  color: #ffffff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  margin-left: 5px;
  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -4px;
}
.info-other {
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  justify-content: space-between;
}
.info-service {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
.info-service-item img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
.info-service-item span {
  font-size: 13px;
  color: #333333;
  margin-left: 5px;
}
</style>