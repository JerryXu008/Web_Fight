<template>
    <div class="song">
      <div class="song-top">
        <h3>最新音乐</h3>
      </div>
      <SongListItem :songs="songs"></SongListItem>
      <!--<ul class="song-list">-->
        <!--<li v-for="value in songs" :key="value.id" class="item">-->
          <!--&lt;!&ndash;          <img :src="value.song.album.picUrl" alt="">&ndash;&gt;-->
          <!--<img v-lazy="value.picUrl" alt="">-->
          <!--<div>-->
            <!--<h3>{{value.name}}</h3>-->
            <!--<p>{{value.singer}}</p>-->
          <!--</div>-->
        <!--</li>-->
      <!--</ul>-->
    </div>
</template>

<script>
import SongListItem from '../SongListItem'
export default {
  name: 'SongList',
  components: {
    SongListItem
  },
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.song{
  width: 100%;
  @include bg_sub_color();
  .song-top{
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3{
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
    }
  }

}
</style>
