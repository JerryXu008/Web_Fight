<template>
  <!--ios端会出现问题,router-view不应该包裹在里面-->
  <!--<div class="singer">-->
    <!--<SingerList :keys="keys" :artists="artists"></SingerList>-->
    <!--<transition>-->
      <!--<router-view></router-view>-->
    <!--</transition>-->
  <!--</div>-->

  <div class="singer">
    <div class="singer-wrapper">
      <SingerList :keys="keys" :artists="artists"></SingerList>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
import { getAllArtists } from '../api/index'
import SingerList from '../components/Singer/SingerList'
import MetaInfo from '../../vue-meta-info'
export default {
  name: 'Singer',
  metaInfo: MetaInfo.singer,
  components: {
    SingerList
  },
  created () {
    getAllArtists()
      .then((obj) => {
        this.keys = obj.keys
        this.artists = obj.artists
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      keys: [],
      artists: []
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
  /*.singer{
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
  }
*/
  .singer{
    width: 100%;
    height: 100%;
    .singer-wrapper{
      position: fixed;
      top: 184px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
  }

  .v-enter{
    transform: translateX(100%);
  }
  .v-enter-to{
    transform: translateX(0%);
  }
  .v-enter-active{
    transition: transform 1s;
  }
  .v-leave{
    transform: translateX(0%);
  }
  .v-leave-to{
    transform: translateX(100%);
  }
  .v-leave-active{
    transition: transform 1s;
  }
</style>
