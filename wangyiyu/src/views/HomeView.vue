<template>
  <div class="homeView">
    <TopNav/>
    <SwiperTop/>
    <IconList/>
    <MusicList/>
  </div>
  
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/home/TopNav.vue'
import SwiperTop from '@/components/home/SwiperTop.vue'
import IconList from '@/components/home/IconList.vue'
import MusicList from '@/components/home/MusicList.vue'

export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwiperTop,
    IconList,
    MusicList,
  }
}
</script>

<style lang="less" scoped>
.homeView{
  min-width: 280px;
}
</style>
