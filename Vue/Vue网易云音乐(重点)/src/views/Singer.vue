<template>
  <div class="singer">
    <SingerList :keys="keys" :artists="artists"></SingerList>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from '../api/index'
import SingerList from '../components/Singer/SingerList'
export default {
  name: 'Singer',
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
  .singer{
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
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
