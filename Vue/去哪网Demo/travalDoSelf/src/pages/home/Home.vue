<template>
  <div>

    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>

</template>

<script>
  import HomeHeader from './components/Header'
  import HomeSwiper from './components/Swiper'
  import HomeIcons from './components/Icons'
  import HomeRecommend from './components/Recommend'
  import HomeWeekend from './components/Weekend'

  import axios from 'axios'

  export default {
    name: 'Home',
    methods: {
      getHomeInfo () {
        // axios.get('/static/mock/index.json') //本地地址
        axios.get('/api/index.json').then(this.getHomeInfoSucc)
      },
      getHomeInfoSucc (res) {
        res = res.data
        console.log(res)
        if (res.ret && res.data) {
          const data = res.data
          this.swiperList = data.swiperList
          this.iconList = data.iconList
          this.recommendList = data.recommendList
          this.weekendList = data.weekendList
        }
      }
    },
    data(){

      return {
        city:'北京',
        lastCity: '',
        swiperList: [],
        iconList: [],
        recommendList: [],
        weekendList: []
      }
    },
    components: {
      HomeHeader,
      HomeSwiper,
      HomeIcons,
      HomeRecommend,
      HomeWeekend
    },
    mounted () {
      this.getHomeInfo()
    }

  }
</script>

<style scoped>

</style>
