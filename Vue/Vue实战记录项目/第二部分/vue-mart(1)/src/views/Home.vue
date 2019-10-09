<template>
  <div class="home">

    <k-header title="标题">
      <i class="cubeic-tag"></i>
    </k-header>


    <!-- 轮播图 -->
    <cube-slide :data="slider" :interval="5000">
      <cube-slide-item v-for="(item,index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img class="slider" :src="item.img">
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <!-- 商品列表 -->
    <good-list :data="goods" @cartanim="startCartAnim"></good-list>

<!--    <cart-anim ref="ca"></cart-anim>-->
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import GoodList from "@/components/GoodList.vue";
import CartAnim from "@/components/CartAnim.vue";
import KHeader from '@/components/Header.vue';

export default {
  name: "home",
  components: {
    GoodList,
    CartAnim,
    KHeader
  },
  created() {
    this.getGoods(); // 数据初始化
  },
  computed: {
    ...mapState(
            {
              //把goods.js中的silder映射为 home组件的计算属性
              //第一种写法
             // count: 'count', // 第一种写法
              //第二种写法
              slider: state => state.goods.slider ,
              //第三种写法
              // sliider: function(state){
              //   return state.goods.slider;
              // }

            }),

    ...mapGetters(["goods"]) // goods.js中的goods计算属性映射为 home组件的goods计算属性
  },
  methods: {
    ...mapActions(["getGoods"]),//goods.js中的getGoods action映射为 home中的getGoods方法

    startCartAnim(el) {

      // this.$refs.ca.start(el);
      // return ;

     // 创建小球动画实例，开始动画
     //  const anim = this.$createCartAnim({
     //    onTransitionend(){
     //     // anim.remove();
     //    }
     //  });
     // anim.start(el)

      // 方式2
      const anim = this.$create(CartAnim, {
        pos: { left: "45%", bottom: "16px" }
      });
      anim.start(el);
      //监听一个动画结束的自定义事件，在CartAnim.vue中动画结束的时候触发
      anim.$on("transitionend", anim.remove);
    }
  }
};
</script>
style <style lang="stylus" scoped>
.cube-slide {
  height: auto;
}

.cube-slide-item > a > img {
  width: 100%;
  height: auto;
}
</style>
