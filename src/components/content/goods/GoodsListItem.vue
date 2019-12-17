<template>
<div class="goods-item" @click="itemClick"> 
  <img :src="showImage" alt="" @load="imgLoad">
  <!-- vue中监听图片加载使用@load="方法名" -->
  <div class="goods-info">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{goodsItem.price}}</span>
    <span class="collect">{{goodsItem.cfav}}</span>
  </div>
</div>
</template>
<script>
export default {
  name:'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {  
    //由于详情页中的商品推荐也用到了这个组件，但是商品首页的数据和详情页中的商品推荐数据结构不同，
    // 因此需要做一下判断
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imgLoad() {
      // 向不同父组件发送图片加载事件
      // 方法一：
      // if(this.$route.path.indexOf("/home")) {
      //     this.$bus.$emit("homeItemImgLoad")
      // }else if(this.$route.path.indexOf("/detail")) {
      //     this.$bus.$emit("detailItemImgLoad")
      // }
      
      this.$bus.$emit("itemImgLoad") //通过向bus事件总线发射图片加载完成事件，
      // 然后在Home组件中监听该事件，完成Scroll组件和GoodListItem组件之间的通信
    },
    itemClick() {
       this.$router.push("/detail"+this.goodsItem.iid)
    }
  }
}
</script>
<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
    /* border:3px solid var(--color-tint); */
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/imgs/common/collect.svg") 0 0/14px 14px;
  }
</style>