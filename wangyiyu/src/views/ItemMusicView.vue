<template>
    <div class="itemMusicView">
        <ItemMusicTop :playList='state.playList'/>
        <ItemMusicList :itemList='state.itemList' :subscribedCount='state.playList.subscribedCount'/>
    </div>
    
</template>

<script>
import {useRoute} from 'vue-router'
import {reactive} from 'vue'
import {onMounted} from 'vue'
import {getMusicItemList,getItemList} from '@/request/api/item.js'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'

export default {
    setup(){
        const state=reactive({
            playList:{},    //歌单的详情页数据
            itemList:[]     //歌单的歌曲信息
        })
        onMounted(async ()=>{
            //获取路由传过来的歌单id
            let id=useRoute().query.id
            let res=await getMusicItemList(id)
            state.playList=res.data.playlist
            //获取歌单的歌曲
            let result=await getItemList({id, limit: 20, offset: 0 })
            state.itemList=result.data.songs
            //防止数据丢失，将数据保存到sessionStorage中
            // sessionStorage.setItem('itemDetail',JSON.stringify(state))
        })
        return{
            state
        }
    },
    components:{
        ItemMusicTop,
        ItemMusicList
    }
}
</script>

<style lang="less" scoped>
.itemMusicView{
    min-width: 280px;
}
</style>