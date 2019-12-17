<template>
<div id="detail">
  <detail-nav-bar class="detail-navbar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <Scroll class="content" 
          ref="Scroll"
          @scroll="contentScroll"
          :probeType="3">     
    <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-goods-info :goodsInfo="goodsInfo"></detail-goods-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-image-info :imageInfo="imageInfo"
                       @itemImgLoad="itemImgLoad"></detail-image-info>
    <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
    <detail-comment-info :commentInfo="commentInfo" ref="comments"></detail-comment-info>
    <goods-list :goods="recommend" ref="recommends"></goods-list>
  </Scroll>
  <back-top @click.native="backClick"  v-show="isShowBackUp"></back-top>
  <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
</div>
</template>
<script>
import DetailNavBar from "./childcomps/DetailNavBar"
import DetailSwiper from "./childcomps/DetailSwiper"
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo"
import DetailShopInfo from "./childcomps/DetailShopInfo"
import DetailImageInfo from "./childcomps/DetailImageInfo"
import DetailParamInfo from "./childcomps/DetailParamInfo"
import DetailCommentInfo from "./childcomps/DetailCommentInfo"
import DetailBottomBar from "./childcomps/DetailBottomBar"

import GoodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll" 

import {getDetailData, getRecommend, GoodsInfo, Shop, GoodsParam} from "network/detail"
import {itemListenerMixin, backTopMixin} from "common/mixin"
import { mapActions } from "vuex"
// mapActions辅助函数仅仅是将store中的actions映射到局部方法中
export default {
  name:'Detail',
  mixins: [itemListenerMixin, backTopMixin],  //混入data,components,methods,created,mounted等等,
  // 意义是将各组件中相同的代码进行封装复用
  data() {
    return {
      id: null,
      res: null,
      topImages: [],
      goodsInfo: {},
      shop: {},
      imageInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      titleTopYs: [],
      currentIndex: 0
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
  },
  created() {
    // 1.保存传入用户点击的goodsListItem的id
    this.id = this.$route.params.id

    // 2.根据id发送详情页网络请求
    getDetailData(this.id).then(res => {
      // console.log(res)
      const data = res.result
      // 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages
      // 创建商品信息对象
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
      // 获取商品图片数据(由于数据不复杂，所以不需要抽离成类)
      this.imageInfo = data.detailInfo
      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 获取商品评价数据
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }  
      
        // 1.第一次获取：拿不到值(由于此时组件dom未被渲染，this.$refs.params.$el压根拿不到dom元素)
        // this.titleTopYs.push(0)
        // this.titleTopYs.push(this.$refs.params.$el.offsetTop)
        // this.titleTopYs.push(this.$refs.comments.$el.offsetTop)
        // this.titleTopYs.push(this.$refs.recommends.$el.offsetTop)
      
      // 2.第二次获取：值不对
      // this.$nextTick(() => {  //此函数是在数据请求完成，并且每个组件dom渲染好之后执行
      // // 但是图片依然可能没有加载完成(此时拿到的offsetTop不包含图片占据的高度)
      //   this.titleTopYs.push(0)
      //   this.titleTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.titleTopYs.push(this.$refs.comments.$el.offsetTop)
      //   this.titleTopYs.push(this.$refs.recommends.$el.offsetTop)

      //   console.log(this.titleTopYs)
      // })
    })

    // 3.请求商品推荐数据
    getRecommend().then(res => {
      this.recommend = res.data.list
    })
  },
  mounted() {  //已经抽离到mixin.js中
  },
  destroyed() {  //组件离开是执行销毁函数，因为该组件没有被保留状态(没有被缓存)
    // 取消全局图片加载事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener)
  },
  methods: {
    ...mapActions(["addCart"]),  
    itemImgLoad() {
      //对图片加载完后进行刷新
      this.refresh()

      // 图片加载完后获取每个组件的offsetTop
      this.titleTopYs.push(0)
      this.titleTopYs.push(this.$refs.params.$el.offsetTop)
      this.titleTopYs.push(this.$refs.comments.$el.offsetTop)
      this.titleTopYs.push(this.$refs.recommends.$el.offsetTop)

      // console.log(this.titleTopYs)      
    },
    contentScroll(position) {
      // 获取滚动位置y值
      const positionY = -position.y
      // 判断回到顶部按钮是否显示
      this.isShowBackUp = positionY > 1000

      // positionY与主题的索引保持一致
      let length = this.titleTopYs.length
      for(let i = 0; i < length; i++) {
        if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.titleTopYs[i] && positionY < this.titleTopYs[i+1])
         || (i === length - 1 && positionY >= this.titleTopYs[i]))) {
          //  if中的条件1是避免if中的语句块执行过于频繁，因为滚动是实时监听的，所以positionY实时在刷新，
          //  这里条件1意义在于当刚滚动到指定位置范围时执行语句块中内容，只要在这个范围内
          //  就不再执行语句块内容，保证在每个范围内，语句块只执行一次，提高性能；
          //  条件2是避免for循环的最后一个i值超过titleTopYs数组的索引范围，所以将两个条件分开写
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
         }
      }     
    },
    titleClick(index) {
      this.$refs.Scroll.scrollTo(0, -this.titleTopYs[index], 200)
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.id = this.id;

      // 2.将商品添加到购物车里(在actions中返回一个Promise)
      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res)
      // })
      this.addCart(product).then(res => {
        // console.log(res);
        this.$toast.show(res, 2000);
      })
    }
  }
}
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-navbar {
  position: relative;
  z-index: 9; 
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}

</style>