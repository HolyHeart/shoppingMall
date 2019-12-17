export default {  //actions可以返回一个Promise
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.使用数组中find方法查找cartList中是否有用户本次添加的商品
      let oldProduct = context.state.cartList.find(item => item.id === payload.id)
      // 2.判断oldProduct是否为空，如果为空则继续添加到cartList中，如果不为空则仅把该商品的数量加1
      if(oldProduct) {
        context.commit("addCounter", oldProduct)
        resolve("商品数量加1")
      }else {
        payload.count = 1
        context.commit("addToCart", payload)
        resolve("添加新商品")
      }   
    }) 
  }
}