<template>
    <div class="search">
        <div class="searchTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <input type="text" placeholder="雨中仙" v-model="searchKey" @keydown.enter="enterKey" />
        </div>
        <div class="searchHistory">
            <div class="top">
                <span class="history">历史搜索</span>
                <div v-if="deleteShow">
                    <span @click="delAllHistory" class="deleteAll">全部删除</span>
                    <span style="font-weight: 700" @click="updateDeleteShow">完成</span> 
                </div>
                <svg class="icon" aria-hidden="true" v-else @click="updateDeleteShow">
                    <use xlink:href="#icon-lajitong"></use>
                </svg>
            </div>
            <div class="contentList">
                <div class="content" v-for="item in keyWorldList"  :key="item">
                    <svg class="icon" aria-hidden="true" v-if="deleteShow" @click="delHistory(item)">
                        <use xlink:href="#icon-cuowu"></use>
                    </svg>
                    <span @click="searchHistory(item)">
                        {{ item }}
                    </span>
                </div>
                
            </div>
        </div>
        <div class="musicListContent">
            <div class="musicList" v-for="(item,i) in searchMusicList" :key="i" @click="playMusic(i)">
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
import {getSearchMusic} from '@/request/api/home.js'
import {mapMutations} from 'vuex'

export default {
    data() {
        return{
            keyWorldList: [],
            searchKey: "",
            searchMusicList:[],
            deleteShow: false
        }
    },
    mounted(){
        this.keyWorldList=JSON.parse(localStorage.getItem('keyWorldList')) || []
    },
    methods:{
        ...mapMutations(['updatePlayList','updatePlayListIndex','updatePlayAll']),
        //添加历史记录
        enterKey:async function(){
            if(this.searchKey !== ""){
                this.keyWorldList.unshift(this.searchKey)
                //去重
                this.keyWorldList=[...new Set(this.keyWorldList)]
                //固定长度
                
                localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList))
                let res=await getSearchMusic(this.searchKey)
                this.searchMusicList= res.data.result.songs

            }
             
        },
        //删除全部历史记录
        delAllHistory(){
            localStorage.removeItem("keyWorldList");
            this.keyWorldList = [];
        },
        //删除指定历史记录
        delHistory(name){
            //查找元素在该数组的位置
            Array.prototype.seek =function(val) { 
                for (var i = 0; i < this.length; i++) { 
                if (this[i] == val) return i
                } 
                return -1
            }
            //删除数组中的指定元素
            Array.prototype.deleteVal =function(val) { 
                var index = this.seek(val)
                if (index > -1) { 
                this.splice(index, 1)
                } 
            }
            this.keyWorldList.deleteVal(name)
            localStorage.setItem("keyWorldList", JSON.stringify(this.keyWorldList))
        },
        searchHistory:async function(item){
            this.searchKey=item
            this.enterKey()
        },
        //播放歌曲
        playMusic(i){
            this.updatePlayList(this.searchMusicList)
            this.updatePlayListIndex(i)
            this.updatePlayAll()
        },
        //删除的显示
        updateDeleteShow(){
            this.deleteShow=!this.deleteShow
        }
    }
}
</script>

<style lang="less" scoped>
.search{
    // width: 100%;
    // height: 100%;
    .searchTop{
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;
        display: flex;
        align-items: center;
        input{
            width: 90%;
            margin-left: .2rem;
            padding: 0.1rem;
            border: none;
            border-bottom: .04rem solid #cfcfcf;
        }
    }
    .searchHistory{
        width: 100%;
        .top{
            width: 100%;
            height: .6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .2rem;
            margin-bottom: .2rem;
            .history{
                font-weight: 700;
            }
            .deleteAll{
                margin-right: .2rem;
            }
        }
        .contentList{
            width: 100%;
            .content{
                position: relative;
                display: inline-block;
                .icon{
                    position: absolute;
                    width: .3rem;
                    height: .3rem;
                    background-color: rgba(185, 169, 169,.5);
                    border-radius: 0.4rem;
                    right: .1rem;
                    top: -0.1rem;
                }
                span{
                    padding: 0.1rem 0.2rem;
                    background-color: rgba(185, 169, 169,.5);
                    border-radius: 0.4rem;
                    margin: 0.4rem 0.2rem;
                }
            }
        }
    }
    .musicListContent{
        width: 100%;
        background: #fff;
        margin-top: .2rem;
        .musicList{
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
        .musicList:hover{
            background: #ddd;
        }
        .block{
            width: 100%;
            height: 1.4rem;
        } 
    }
}

</style>