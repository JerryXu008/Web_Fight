<template>
  <ul class="list">
    <li class="item"
        v-for="item of letters"
        :key="item"
        :ref="item"
        @click="handleLetterClick"
        @touchstart.prevent="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'Alphabet',
    props: {
      cities: Object
    },
    data(){
      return{
        touchStatus: false,
        startY: 0,
        timer: null
      }
    },
    mounted(){

    },
    updated(){
      this.startY = this.$refs['A'][0].offsetTop
    },
    computed: {
      letters () {
        const letters = []
        for (let i in this.cities) {
          letters.push(i)
        }
        return letters
      }
    },
    methods: {
      handleLetterClick (e) {
        this.$emit('change', e.target.innerText)
      },
      handleTouchStart () {
        this.touchStatus = true
      },
      handleTouchMove (e) {
        if (this.touchStatus) {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            const touchY = e.touches[0].clientY - 79
            const index = Math.floor((touchY - this.startY) / 20)

            console.log(index);

            if (index >= 0 && index < this.letters.length) {
              this.$emit('change', this.letters[index])
            }
          }, 16)
        }
      },
      handleTouchEnd () {
        this.touchStatus = false
      }
    }

  }
</script>

<style lang="stylus"  scoped>
  @import '~styles/varibles.styl'
  .list
    position: absolute
    top: 1.58rem
    right: 0
    bottom: 0
    width: .4rem
    /*background: red;*/
    display: flex
    flex-direction: column
    justify-content: center
    .item
      text-align : center
      line-height: .4rem
      color: $bgColor
</style>
