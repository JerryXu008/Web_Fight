<template>
  <div class="player">
    <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer></ListPlayer>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
  </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import mode from '../store/modeType'
import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from '../tools/tools'
export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    timeupdate (e) {
      // console.log(e.target.currentTime)
      this.currentTime = e.target.currentTime
    },
    end () {
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      } else if (this.modeType === mode.random) {
        let index = getRandomIntInclusive(0, this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    }
  },
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  mounted () {
    // this.$refs.audio.oncanplay = () =>{}
    // 在 ios的safiry浏览器中不会执行，因为audio标签在ios中不会加载播放地址
    // this.$refs.audio.load()
    this.$refs.audio.ondurationchange = () => {
      this.totalTime = this.$refs.audio.duration
      if (this.isPlaying) {
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    }
  },
  created () {
    // let favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    let favoriteList = getLocalStorage('favoriteList')
    if (favoriteList !== null && favoriteList !== undefined) { this.setFavoriteList(favoriteList) }

    // let historyList = JSON.parse(window.localStorage.getItem('historyList'))
    let historyList = getLocalStorage('historyList')
    console.log('111历史记录', historyList)
    if (historyList !== null && historyList !== undefined) {
      this.setHistoryList(historyList)
    }

    console.log('历史记录', self.historyList)
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    /*
    <!--
https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html
-->
注意点： 在iOS中系统不会自动加载歌曲，所以oncanplay不会自动执行
        在PC和Android端，系统会自动加载歌曲，所以oncanplay会自动被执行
解决方案：如何监听iOS中Audio的歌曲是否已经准备好了，通过ondurationchange事件来监听
         ondurationchange事件什么时候执行：当歌曲加载完成之后执行，因为只有歌曲加载完成之后才能获取到
    */
    currentIndex () {
      // this.$refs.audio.load()
      this.$refs.audio.ondurationchange = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    favoriteList (newValue, oldValue) {
      // window.localStorage.setItem('favoriteList', JSON.stringify(newValue))
      setLocalStorage('favoriteList', newValue)
    },
    historyList (newValue, oldValue) {
      // window.localStorage.setItem('historyList', JSON.stringify(newValue))
      setLocalStorage('historyList', newValue)
    },
    curTime (newValue, oldValue) {
      this.$refs.audio.currentTime = newValue
      console.log('>>>>' + newValue)
    }

  }

}
</script>

<style scoped>

</style>
