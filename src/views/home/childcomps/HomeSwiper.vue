<template>
  <Swiper>
    <SwiperItem v-for="item in banners" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index.js"

export default {
  name:'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    swiperImgLoad() {
      if(!this.isLoad) {  //此处只需要发射一次轮播图图片加载完成事件，加以判断提高性能
        this.$emit("swiperImgLoad")
        this.isLoad = true
      }
    }
  }
}
</script>
<style scoped>
</style>