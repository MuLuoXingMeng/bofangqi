<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true" @click="playMusic(0)">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <span>播放全部<span>(共{{itemList.length}}首)</span></span>
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jia"></use>
                </svg>
                <span>收藏({{subscribedCount}})</span>
            </div>
        </div>
        <div class="itemListContent">
            <div class="itemList" v-for="(item,i) in itemList" :key="i" @click="playMusic(i)">
                <div class="listLeft">
                    <span class="index">{{i+1}}</span>
                    <div class="content">
                        <p>{{item.name}}</p>
                        <span v-for="(ar,index) in item.ar" :key="index">
                            {{ar.name}}&nbsp
                        </span>
                    </div>
                </div>
                <div class="listRight">
                    <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
                        <use xlink:href="#icon-shipinbofang"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-31liebiao"></use>
                    </svg>
                </div>
            </div>
            <div class="block"></div>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    setup(props) {
        // console.log(props)
    },
    methods:{
        ...mapMutations(['updatePlayList','updatePlayListIndex','updatePlayAll']),
        playMusic(i){
            this.updatePlayList(this.itemList)
            this.updatePlayListIndex(i)
            this.updatePlayAll()
        }
    },
    props:['itemList','subscribedCount']
}
</script>

<style lang="less" scoped>
.itemMusicList{
    width: 100%;
    height: 11rem;
    background: #fff;
    
    border-radius: .4rem .4rem 0 0 ;
    .itemListTop{
        width: 100%;
        height: 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .2rem;
        padding-top: .2rem;
        .listLeft{
            width: 3rem;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon{
                width: .55rem;
                height: .55rem;
                stroke: #333333;
                stroke-width: 20;
            }
            span{
                font-weight: 700;
                span{
                    font-weight: 400;
                    font-size: 0.24rem;
                    color: #999;
                }
            }
        }
        .listRight{
            display: flex;
            align-items: center;
            background: red;
            padding: 0.2rem;
            border-radius: .4rem;
            color: #fff;
            .icon{
                width: .5rem;
                height: .5rem;
                margin-right: 0.1rem;
            }
        }
    }
    .itemListContent{
        width: 100%;
        background: #fff;
        .itemList{
            width: 100%;
            height: 1.4rem;
            padding: 0 .2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .listLeft{
                width: 80%;
                height: 100%;
                display: flex;
                align-items: center;
                .index{
                    display: inline-block;
                    width: 0.2rem;
                    text-align: center;
                }
                .content{
                    p{
                        width: 4.54rem;
                        height: .4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-weight: 700;
                    }
                    span{
                        font-weight: 400;
                        font-size: .24rem;
                        color: #999;
                    }
                    margin-left: 0.3rem;
                }
            }
            .listRight{
                width: 20%;
                height: 100%;
                display: flex;
                align-items: center;
                position: relative;
                .icon{
                    position: absolute;
                    z-index: 2;
                    fill: #999;
                }
                .liebiao{
                    position: absolute;
                    right: 0;
                }
            }
        }
        .itemList:hover{
            background: #ddd;
        }
        
    }
    .block{
        width: 100%;
        height: 1.4rem;
    }
}
</style>