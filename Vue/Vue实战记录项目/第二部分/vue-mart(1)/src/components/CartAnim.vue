<template>
  <div class="ball-wrap">
    <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @afterEnter="afterEnter">
      <div class="ball" v-show="show" :style="pos">
        <div class="inner">
          <div class="cubeic-add"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "cartAnim",
  data() {
    return { show: false };
  },
  props: ['pos'],
  methods: {
    start(el) {// 启动动画接口，传递点击按钮元素
      this.el = el;

      // 使.ball显示，激活动画钩子
      this.show = true;
    },
    //动画开始执行前的一瞬间
    beforeEnter(el) {
      //获取点击的dom所在的位置
      //getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
      const rect = this.el.getBoundingClientRect();
      console.log("点击位置="+rect.left);

      // 转换为用于绝对定位的坐标,得到小球应该首先放到的位置
      const x = rect.left - window.innerWidth / 2;
      const y = -(window.innerHeight - rect.top - 10 - 20);


      // ball只移动y
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      // inner只移动x
      const inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(${x}px,0,0)`;

    },
    //开始动画的一瞬间
    enter(el, done) {
      // 获取offsetHeight就会重绘
      //不加的话，动画不起作用
      document.body.offsetHeight;

      // 让小球恢复到以前的位置  left: 50%;  bottom: 10px;

      el.style.transform = `translate3d(0, 0, 0)`;
      const inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(0,0,0)`;
       //这个是系统事件，
       /*
       transitionend 事件会在 CSS transition 结束后触发. 当transition完成前移除transition时，
       比如移除css的transition-property 属性，事件将不会被触发.
       如在transition完成前设置  display 为"none"，事件同样不会被触发
       * */
      el.addEventListener("transitionend", done);
    },
    //动画结束的一瞬间
    afterEnter(el) {
      // 动画结束，开始清理工作
      this.show = false;
      el.style.display = "none";
      //这个transitionend是组件通知外部的事件，不是系统的，
      //无论用cube还是自定义，都需要触发
      this.$emit("transitionend");
    }
  }
};
</script>
<style scoped lang="stylus">
.ball-wrap {
  .ball {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 100000;
    color: red;
    transition: all 1.0s cubic-bezier(0.49, -0.29, 0.75, 0.41);

    .inner {
      width: 16px;
      height: 16px;
     // position :absolute;
     // bottom:50px;
      //left:0px;
      transition: all 1.0s linear;

      .cubeic-add {
        font-size: 22px;
      }
    }
  }
}
</style>
