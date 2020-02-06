import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
/* 图片懒加载 */
import VueLazyload from 'vue-lazyload'
// import Vconsole from 'vconsole'
// 加载loading插件
import Loading from './plugin/loading/index'

Vue.use(VueLazyload, {
  // 可以通过配置loading来设置图片还未加载好之前的占位图片
  loading: require('./assets/images/loading.png')
})

fastclick.attach(document.body)
Vue.config.productionTip = false

// const vConsole = new Vconsole()
// Vue.use(vConsole)
// 注意点: 如果想通过use的方式来注册组件, 那么必须先将组件封装成插件
Vue.use(Loading, {
  title: '加载ing...'
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
