export default {
  // mutations唯一的作用就是修改state中的状态
    // mutations中的每个方法尽可能完成比较单一的事件
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = true  //目的是为之后添加到购物车的商品的选中功能
      state.cartList.push(payload)
    }
}