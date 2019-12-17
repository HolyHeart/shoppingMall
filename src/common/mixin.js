
// 有关图片加载监听事件封装成一个对象
import {debounce} from "common/utils"
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
      // paramsOffSetTop: 0,
      // commentsOffSetTop: 0,
      // recommendsOffSetTop: 0
    }
  },
  mounted() {
    // 1.图片加载完成的事件监听
    this.refresh = debounce(this.$refs.Scroll.refresh,200)
    this.itemImgListener = () => {
      // this.$refs.Scroll.refresh()  //请求次数太多，性能不高，
      // 使用debounce防抖函数提高性能
      this.refresh()
    }
    // 通过事件总线监听item中图片加载完成(最好在mounted函数中执行，防止this.$refs.Scroll为空，
    // 因为如果在created函数中执行，Home组件还未挂载，因此无法拿到this.$refs.Scroll)
    this.$bus.$on("itemImgLoad", this.itemImgListener)

    // 2.详情页中标题跳转(暂时还没有效果，待研究)
    // if(this.$route.path.indexOf("/detail")) {
    //   this.$nextTick(() => {
    //     this.paramsOffSetTop = this.$refs.params.$el.offsetTop
    //     this.commentsOffSetTop = this.$refs.comments.$el.offsetTop
    //     this.recommendsOffSetTop = this.$refs.recommends.$el.offsetTop

    //     console.log(this.paramsOffSetTop)

    //     this.titleTopYs.push(0)
    //     this.titleTopYs.push(this.paramsOffSetTop)
    //     this.titleTopYs.push(this.commentsOffSetTop)
    //     this.titleTopYs.push(this.recommendsOffSetTop)
    //   })
      
    // }
  }
}

// 返回顶部按钮操作封装成一个对象
import BackTop from "components/content/backtop/BackTop"
export const backTopMixin = {
  data() {
    return {
      isShowBackUp: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.Scroll.scrollTo(0, 0, 300)
    }
  }
}