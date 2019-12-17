<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button class="check-button" 
                  :isChecked="isCheckAll"
                  @click.native="checkAllClick"></check-button>
    <span>全选</span>
  </div>
  <div class="totalPrice">
    合计：￥{{totalPrice}}
  </div>
  <div class="calculate" @click="calcClick">
    去结算({{totalChecked}})
  </div>
  <div></div>
</div>
</template>
<script>
import CheckButton from "components/content/checkbutton/CheckButton"
import { mapGetters } from "vuex"
export default {
  name:'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters({
      list: "cartList"
    }),
    totalPrice() {
      return this.list.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    totalChecked() {
      return this.list.filter(item => {
        return item.checked
      }).length
    },
    isCheckAll() {
      if(this.list.length === 0) return false  //当购物车中还没有数据时，返回false
      return !this.list.find(item => !item.checked) 
      //使用数组的find方法查找数组中只要有一个是未选中状态则返回该item，然后对其取反则返回false
    },
    noneChecked() {
      return this.list.filter(item => item.checked).length
    }
  },
  methods: {
    checkAllClick() {
      if(this.isCheckAll) { //如果是全选状态(isCheckAll为true)，则将所有商品的checked都改为false
        this.list.forEach(item => item.checked = false);
      }else { //只要有一个商品是未选中状态(isCheckAll为false)，则将所有商品的checked都改为true
        this.list.forEach(item => item.checked = true);
      }
    },
    calcClick() {
      if(this.list.length === 0) {
        this.$toast.show("您还未添加任何商品")
      }else if(this.noneChecked === 0) {
        this.$toast.show("请至少选择一件商品")
      }else {
        this.$toast.show("进入支付页面")
      }
    }
  }
}
</script>
<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
  
}
.totalPrice {
  margin-left: 10px;
  flex: 1;
}
.calculate {
  width: 80px;
  text-align: center;
  background-color: red;
  color:#fff;
}
</style>