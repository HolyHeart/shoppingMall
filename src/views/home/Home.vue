<template>
<div id="home">
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control :title="title" 
               class="tab-control2" 
               @itemClick="itemClick"
               ref="tabControl2"
               v-show="tabIsShow"></tab-control>
  <Scroll class="content" 
          ref="Scroll"
          @scroll="contentScroll"
          :probeType="3"
          @pullingUp="loadMore"
          :pullUpLoad="true"> <!-- 通过ref拿到Scroll组件对象   -->
    <home-swiper :banners="banners" 
                 @swiperImgLoad="swiperImgLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :title="title" 
                 class="tab-control1" 
                 @itemClick="itemClick"
                 ref="tabControl1"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </Scroll>
  <back-top @click.native="backClick"  v-show="isShowBackUp"></back-top>
  <!-- 组件原本不支持事件绑定，但是通过native可以将事件绑定到根元素 -->
</div>
</template>
<script>
import HomeSwiper from "./childcomps/HomeSwiper"
import RecommendView from "./childcomps/RecommendView"
import FeatureView from "./childcomps/FeatureView"

import NavBar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"

import TabControl from "components/content/tabcontrol/TabControl"
import GoodsList from "components/content/goods/GoodsList"
import BackTop from "components/content/backtop/BackTop"


import {getHomeMultiData,getHomeGoods} from "network/home.js"
import {itemListenerMixin, backTopMixin} from "common/mixin"

export default {
  name:'Home',
  mixins: [itemListenerMixin, backTopMixin],  //混入data,components,methods,created,mounted等等
  // 意义是将各组件中相同的代码进行封装复用
  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      title: ["流行","新款","精选"],
      goods: {
        "pop": {page: 0,list: []},
        "new": {page: 0,list: []},
        "sell": {page: 0,list: []}
      },
      currentType: "pop",
      tabOffsetTop: 0,
      tabIsShow: false,
      saveY: 0
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultiData()

    // 2.请求商品数据
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")
  },
  mounted() {  //已经抽离到mixin.js中
  },
  activated() {
    this.$refs.Scroll.scrollTo(0,this.saveY,0)
    this.$refs.Scroll.refresh()  //回来时最好进行一次刷新
  },
  deactivated() {
    //保存滚动位置信息
    this.saveY = this.$refs.Scroll.getScrollY()
    // 取消全局图片加载事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener)
  },
  computed: {
     showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    // 事件监听相关方法
    
    itemClick(index) {
      switch(index) {
        case 0: 
          this.currentType = "pop"
          break;
        case 1:
          this.currentType = "new"
          break;
        case 2: 
          this.currentType = "sell"
          break;
      }

      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position) {
      // 1.判断回到顶部按钮是否显示
      this.isShowBackUp = (-position.y) > 1000
      // 2.判断tabcontrol是否悬停(使用了障眼法，其实是判断另外一个tabcontrol是否显示)
      this.tabIsShow = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.Scroll.finishPullUp()
    },
    swiperImgLoad() {
    // 获取tabControl的offsetTop，因为需要等图片加载完成才能获取offsetTop，否则获取的offsetTop不正确，因为图片还未挂载上去
    // 所有组件都有一个属性$el:用于获取组件中的模板元素
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
    },

    // 网络请求相关方法
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        // this.result = res;
        // console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      // console.log(type)
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)  
        //数组1.push(...数组2)表示将数组2解开后放入数组1中
        this.goods[type].page += 1
    })
    }
  }
}
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;  
  /* vh指的是设备窗口高度 */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 使用原生滚动时给导航栏添加的定位，但是使用BScroll则不需要这个定位 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/*.tab-control1 {
   position: sticky;
  top: 44px;
  z-index: 9;   原生滚动中特殊用法sticky：
  当元素滚动到距离顶部44px时，将其位置设置为fixed,超过44px时重新释放fixed
}*/
.tab-control2 {
  position: relative;
  z-index: 9;
  margin-top: -2px;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>