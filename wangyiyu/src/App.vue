<template>
  <router-view/>
  <FooterMusic/>
</template>

<script>
import FooterMusic from '@/components/item/FooterMusic.vue'

export default {
  setup() {
    
  },
  components:{
    FooterMusic
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .5rem;
  height: .5rem;
}
a{
  color: #000;
}
</style>
