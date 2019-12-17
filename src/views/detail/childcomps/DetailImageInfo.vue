<template>
<div v-if="Object.keys(imageInfo).length !== 0" class="comment-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{imageInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key"></div>
    <div class="info-list">
      <img v-for="(item, index) in imageInfo.detailImage[0].list" 
           :key="index" 
           :src="item" 
           @load="imgLoad" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name:'DetailImageInfo',
  props: {
    imageInfo: {
      type: Object
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了.
      if (++this.counter === this.imagesLength) {
        //此处也使用bus事件总线发射图片加载完成事件，在父组件Detail中进行监听
        // this.$bus.$emit('itemImgLoad');  
        this.$emit('itemImgLoad');  //单独向父组件发送图片加载事件 
      }
    }
  },
  watch: {  //监听props中数据的改变
    imageInfo() {
      // 获取图片的个数
      this.imagesLength = this.imageInfo.detailImage[0].list.length
    }
  }
}
</script>
<style scoped>
.comment-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
    padding: 0 15px;
  }
  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc .start {
    float: left;
  }
  .info-desc .end {
    float: right;
  }
  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .info-desc .end::after {
    right: 0;
  }
  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }
  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }
  .info-list img {
    width: 100%;
  }
</style>