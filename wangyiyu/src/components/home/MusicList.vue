<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="130" class="my-swpie" :show-indicators="false">
                <van-swipe-item v-for="item in state.musicList" :key="item">
                    <router-link :to="{name:'itemmusic',query:{id:item.id}}">
                        <img :src="item.picUrl" alt="">
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-bofang1"></use>
                            </svg>
                            <span> {{changeCount(item.playCount)}}</span>
                        </span>
                        <span class="name">{{item.name}}</span>
                    </router-link>
                    
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { getMusicList} from '@/request/api/home.js'
import { reactive } from 'vue'
import {onMounted} from 'vue'

export default {
    setup(){
        let state=reactive({
            musicList:[]
        })
          
        function changeCount(num){
           if (num >= 100000000) {
                return (num / 100000000).toFixed(1) + "亿";
            } else if (num >= 10000) {
                return (num / 10000).toFixed(1) + "万";
            }
        }
        onMounted( async ()=>{
            let res=await getMusicList()
            state.musicList=res.data.result
        })
        return{
            state,changeCount
        }
    },

    //vue2写法
    // data(){
    //     return{
    //         musicList:[]
    //     }    
    // },
    // methods:{
    //     async getGendan(){
    //         let res=await getMusicList()
    //         console.log(res)
    //         this.musicList=res.data.result
    //     },
    //     changeCount(num){
    //        if (num >= 100000000) {
    //             return (num / 100000000).toFixed(1) + "亿";
    //         } else if (num >= 10000) {
    //             return (num / 10000).toFixed(1) + "万";
    //         }
    //     }
    // },
    // mounted() {
    //     this.getGendan()
    // },
}
</script>

<style lang="less" scoped>
.musicList{
    width: 100%;
    height: 5rem;
    padding: .2rem;
    .musicTop{
        width: 100%;
        height: .6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: .2rem;
        .title{
            font-size: .4rem;
            font-weight: 900;
        }
        .more{
            border: 1px solid #ccc;
            text-align: center;
            line-height: .6rem;
            padding: 0 .2rem;
            border-radius: .4rem;
        }
    }
    .musicContent{
        width: 100%;
        height: 200px;
             .van-swipe-item{
                padding-right: 10px;
                height: 250px;
                box-sizing: border-box;
                position: relative;
                img{
                    width: 100%;
                    height: 120px;
                    border-radius: 20px;
                }
                .playCount{
                    position: absolute;
                    padding: 5px;
                    left: 0;
                    z-index: 99;
                    color: #fff;
                    font-size: 10px;
                    background: #666;
                    border-radius: 20px;
                    .icon{
                        width: 10px;
                        height: 10px;
                        margin-right: 2px;
                        vertical-align: middle;
                    }
                    span{
                        vertical-align: middle;
                    }
                }
                .name{
                    display: block;
                    width: 120px;
                    height: 100px;
                    line-height: 20px;
                    font-size: 15px;
                    text-align: left;
                }
            }
        }
}
</style>