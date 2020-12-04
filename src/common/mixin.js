import {debounce} from "./utils";

export var itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 500) // 穿函数不加括号，否则传的就是函数的返回值
    this.itemImgListener = () => {
      refresh() // 调用防抖
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}
