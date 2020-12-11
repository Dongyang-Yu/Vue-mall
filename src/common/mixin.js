import {debounce} from "./utils";
import BackTop from "@/components/content/backTop/BackTop";

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

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // 先拿到scroll组件，再去取其数据对象scroll
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}