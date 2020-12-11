import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'


export default {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      // 1. 查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid) // 对数组中的每一个item与payload的iid进行比较，若相同，则返回该item

      // 2.判断oldProduct
      if( oldProduct ) { // 数量+1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      }else {  // 添加新的商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })

  },
}