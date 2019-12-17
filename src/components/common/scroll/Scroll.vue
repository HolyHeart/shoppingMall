<template>
<div class="wrapper" ref="wrapper">  
  <!-- 在组件中使用ref时，通过this.$refs.wrapper拿到的是组件对象
       在html中使用ref时，通过this.$refs.wrapper拿到的是元素对象 -->
  <div class="content">
    <slot></slot>  <!-- 将外部需要滚动的元素直接插到此处 -->
  </div>
</div>
</template>
<script>
import BScroll from "better-scroll"

export default {
  name:'Scroll',
  data() {
      return {
        scroll: null
      }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,   //由于BScroll框架默认滚动组件内不监听事件点击，
      // 所以此处要将click设置为true，滚动组件内部才能监听到点击事件
      probeType: this.probeType,  //根据外面传进来的probeType判断需不需要进行滚动检测，提高性能
      pullUpLoad: this.pullUpLoad  //根据外部传进来的pullUpLoad判断需不需要进行上拉加载
    
    })
    this.scroll.scrollTo(0,0)  //初始化滚动位置为(0,0)

    // 2.监听滚动位置
    if(this.probeType === 2||this.probeType === 3) {  //先做一下判断使代码更严谨
        this.scroll.on("scroll", (position) => {
              this.$emit("scroll", position)
            })
    }
    

    // 3.监听上拉事件
    if(this.pullUpLoad) {  //先做一下判断使代码更严谨
        this.scroll.on("pullingUp", () => {
              this.$emit("pullingUp")
            })
    }
    
  },
  methods: {
    scrollTo(x, y, time=400) {  //400是默认值
      this.scroll && this.scroll.scrollTo(x, y, time)  
      //此处添加this.scroll &&是防止scroll对象还是空对象
    },
    finishPullUp() {  //自己封装一个可进行多次上拉的方法
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      // console.log("======")
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>
<style scoped>
</style>