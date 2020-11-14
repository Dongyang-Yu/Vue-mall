<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot> <!-- 具名插槽-->
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>

  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar{
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1); /*阴影*/
  }
  .left, .right{
    width: 60px;
  }
  .center {
    flex: 1;
    /*为了将center占据剩余部分，使用该属性
    "1"表示的是比例，因为这只有一个比例，所以它就占了剩余空间的百分之百
     */
  }
</style>
