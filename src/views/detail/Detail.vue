<template>
  <div class="detail-wrapper">
    <detail-nav-bar class="detail-nav" ref="detailNav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="this.goods"></detail-base-info>
      <detail-shop-info :shop="this.shop"></detail-shop-info>
      <detail-goods-info :detail-info="this.detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info  ref='paramsTopY' :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="commentTopY" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommendTopY" :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
  import {debounce} from "@/common/utils";
  import {itemListenerMixin} from "@/common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,

      Scroll,
      GoodsList,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        // itemImgListener: null,  放在minxin.js中了
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,

      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详细数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        // 1.获取数据
        const data = res.result

        // 2.获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages

        // 3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 4.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 5.保存商品的详情数据
        this.detailInfo = data.detailInfo

        // 6.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 7.获取评论信息
        if( data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }

        this.$nextTick(() => {
          // 根据最新的数据，对应的DOM是已经被渲染出来了
          // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
          // offsetTop值不对的时候，都是因为图片的问题
/*          this.themeTopYs = []

          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.paramsTopY.$el.offsetTop-44);
          this.themeTopYs.push(this.$refs.commentTopY.$el.offsetTop-44);
          this.themeTopYs.push(this.$refs.recommendTopY.$el.offsetTop-44);
          console.log(this.themeTopYs);*/
        })
      })

      // 3.请求推荐数据
      getRecommend().then( res => {
        this.recommends = res.data.list;
      })

      // 4.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.paramsTopY.$el.offsetTop-44);
        this.themeTopYs.push(this.$refs.commentTopY.$el.offsetTop-44);
        this.themeTopYs.push(this.$refs.recommendTopY.$el.offsetTop-44);
        this.themeTopYs.push(Number.MAX_VALUE);

      }, 500)
    },
    mixins: [itemListenerMixin],
    mounted() {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el:用于获取组件中的元素
    },
    // 因为没有用keep-alive，保存缓存，所以在详情页切换时调用的是destroyed而不是deactivated
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()

        // 通过防抖处理
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
      },
      contentScroll(position) {
        // console.log(position);
        // 1.获取y值
        const positionY = -position.y

        // 2. positionY和主题中值进行对比
          // [0, 7999, 9120, 10000]
          // positionY在0和7999之间，index = 0
          // positionY在7999和9120之间，index = 1
          // positionY在9120和10000之间，index = 2
          // positionY大于等于10000，index = 3
        let length = this.themeTopYs.length
/*        for(let i = 0; i < length; i++) {
          if( this.currentIndex !== i && (
            (i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
            || (i === length - 1 && positionY >= this.themeTopYs[i]) )) {
              this.currentIndex = i;
              this.$refs.detailNav.currentIndex = this.currentIndex
          }
        } */
        // hack做法，避免多重判断
        for(let i = 0; i < length-1; i++) {
          if( this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }


      }
    }
  }
</script>

<style scoped>
  .detail-wrapper {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
