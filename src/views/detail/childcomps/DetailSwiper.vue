<template>
<Swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </Swiper>
</template>
<script>
import {Swiper, SwiperItem} from "components/common/swiper/index.js"
export default {
  name:'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper, 
    SwiperItem
  }
}
</script>
<style scoped>
.detail-swiper {
  height: 300px;
}
</style>