<template>
  <div class="home">
    <p>首页的子组件</p>
    <p>{{parentdata}}</p>
    <button @click="sonFn">子组件按钮</button>
  </div>
</template>

<script>
import {Vue, Component, Prop, Emit} from 'vue-property-decorator'

@Component
export default class TSSon extends Vue {
  @Prop(String) parentdata;
  @Emit('parentfn')
  sonFn(){
    alert(11111)
    // this.$emit('parentfn');
    return 666;
  }
}
</script>
