<template>
    <div class="detail">
      <SubHeader :title="playlist.name"></SubHeader>
      <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
      <div class="bottom">
        <ScrollView ref="scrollview">
          <DetailBottom :playlist="playlist.tracks"></DetailBottom>
        </ScrollView>
      </div>
    </div>
</template>

<script>
import { getPlayList, getAlbum, getSingerSongs, getTopListDetail } from '../api/index'
import SubHeader from '../components/Detail/DetailHeader'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
import MetaInfo from '../../vue-meta-info'
export default {
  name: 'Detail.vue',
  metaInfo: MetaInfo.detail,
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data: function () {
    return {
      playlist: {}
    }
  },
  mounted () {
    let defaultHeight = this.$refs.top.$el.offsetHeight
    // console.log(defaultHeight)
    this.$refs.scrollview.scrolling((offsetY) => {
      // console.log(offsetY)
      if (offsetY < 0) {
        // console.log('向上滚动')
        // let scale = 20 * Math.abs(offsetY) / defaultHeight
        let scale = Math.abs(offsetY) / defaultHeight
        // console.log(scale)
        this.$refs.top.changeMask(scale)
        /*
        注意点: 高斯模糊效果是非常消耗性能的, 不推荐在移动端中使用
                如果非要在移动端中使用, 那么建议只设置一次
        * */
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
      } else {
        // console.log('向下滚动')
        let scale = 1 + offsetY / defaultHeight
        // console.log(scale)
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  },
  created () {
    // console.log(this.$route.params.type)
    if (this.$route.params.type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          // console.log(data)
          this.playlist = data.playlist
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'album') {
      getAlbum({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'singer') {
      getSingerSongs({ id: this.$route.params.id })
        .then((data) => {
          console.log(data)
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'rank') {
      getTopListDetail({ idx: this.$route.params.id })
        .then((data) => {
          console.log(data)
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.creator.backgroundUrl,
            // coverImgUrl: data.playlist.coverImgUrl,
            tracks: data.playlist.tracks
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  .detail{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    @include bg_sub_color();
    .bottom{
      position: fixed;
      top: 500px;
      bottom: 0;
      left: 0;
      right: 0;
      /*background-color: red;*/
      /*overflow: hidden;*/
    }
  }
</style>
