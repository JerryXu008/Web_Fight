<template>
  <div class="rank">
    <ScrollView>
      <ul class="rank-wrapper">
        <li v-for="(value, key) in category.titles" :key="key">
          <h3 class="group-title">{{value}}</h3>
          <ul class="normal-group" v-if="value === '官方榜'">
            <li v-for="value in category[key]" :key="value.rank.id" @click.stop="selectedItem(value.id)">
              <div class="item-left">
                <img v-lazy="value.rank.coverImgUrl" alt="">
                <p>{{value.rank.updateFrequency}}</p>
              </div>
              <div class="item-right">
                <p v-for="(song, index) in value.rank.tracks" :key="index">{{index}}.{{song.first}} - {{song.second}}</p>
              </div>
            </li>
          </ul>
          <ul class="other-group" v-else>
            <li v-for="value in category[key]" :key="value.rank.id" @click.stop="selectedItem(value.id)">
              <div class="item-top">
                <img v-lazy="value.rank.coverImgUrl" alt="">
                <p>{{value.rank.updateFrequency}}</p>
              </div>
              <div class="item-bottom">{{value.rank.name}}</div>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopList } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Rank',
  components: {
    ScrollView
  },
  methods: {
    selectedItem (id) {
      // console.log(id)
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  },
  data () {
    return {
      category: {}
    }
  },
  created () {
    getTopList()
      .then((result) => {
        console.log(result)
        this.category = result
      })
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
  .rank{
    position: fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    @include bg_sub_color();
    overflow: hidden;
    .group-title{
      padding: 10px 20px;
      box-sizing: border-box;
      @include font_size($font_large);
      @include font_color();
      font-weight: bold;
    }
    .normal-group{
      li{
        display: flex;
        padding: 10px 20px;
        box-sizing: border-box;
        .item-left{
          position: relative;
          img{
            width: 200px;
            height: 200px;
            border-radius: 10px;
            overflow: hidden;
          }
          p{
            position: absolute;
            left: 10px;
            bottom: 10px;
            @include font_size($font_samll);
            color: #fff;
          }
        }
        .item-right{
          margin-left: 20px;
          @include font_size($font_medium_s);
          @include font_color();
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          p{
            margin: 10px 0;
            @include no-wrap();
          }
        }
      }
    }
    .other-group{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        padding: 10px 20px;
        box-sizing: border-box;
        .item-top{
          position: relative;
          img{
            width: 200px;
            height: 200px;
            border-radius: 10px;
            overflow: hidden;
          }
          p{
            position: absolute;
            left: 10px;
            bottom: 10px;
            @include font_size($font_samll);
            color: #fff;
          }
        }
        .item-bottom{
          @include font_size($font_medium);
          @include font_color();
          width: 200px;
          @include no-wrap();
        }
      }
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
