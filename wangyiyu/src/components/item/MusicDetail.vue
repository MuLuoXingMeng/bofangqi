<template>
    <div class="musicDetail">
        <img :src="musicList.al.picUrl" class="bgImg"/>
        <div class="detailTop">
            <div class="left">
                <svg class="icon" aria-hidden="true" @click="hideMusicDetail()">
                    <use xlink:href="#icon-toBottom"></use>
                </svg>
            </div>
            <div class="center">
                <Vue3Marquee >
                    {{musicList.name}}
                </Vue3Marquee>
                <span v-for="(ar,index) in musicList.ar" :key="index">
                    {{ar.name}}&nbsp
                </span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiantouyou"></use>
                </svg>
            </div>
            <div class="right">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang1"></use>
                </svg>
            </div>
        </div>
        <div class="detailCenter" v-show="imgShow" @click="dateImgShow()">
            <img :src="musicList.al.picUrl" alt="" :class="{ active: !isBtnShow }"  >
            <!-- v-if="isLyricShow" -->
            <div class="imgLyric" ref="imgLyric">
                <p v-for="(item,i) in lyric" :key="i" :class="{active_1: currentTime*1000 >= item.time && currentTime*1000 < item.after }">
                    {{item.lrc}}
                </p> 
            </div>
        </div>
        <div class="Lyric" ref="Lyric" @click="dateImgShow()" v-show="!imgShow">
            <p v-for="(item,i) in lyric" :key="i" :class="{active_2: currentTime*1000 >= item.time && currentTime*1000 < item.after }">
                {{item.lrc}}
            </p>   
        </div>
        <div class="detailBottom">
            <div class="top">
                <svg class="icon xin" aria-hidden="true">
                    <use xlink:href="#icon-xin"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
                </svg>
                <svg class="icon cd" aria-hidden="true" @click="dateImgShow()">
                    <use xlink:href="#icon-cd"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                </svg>
                <svg class="icon genduo" aria-hidden="true">
                    <use xlink:href="#icon-gengduo-shuxiang"></use>
                </svg>
            </div>
            <div class="center">
                <span class="timers">{{audioStart}}</span>
                <van-slider class="slider" v-model="sliderValue" ref="slider" @click="clickSlider"
                    button-size="8px" active-color="#fff" inactive-color="#cfcfcf"
                />
                <!-- <input type="range" min="0" max="100" step="0.05" v-model="sliderValue" @change="clickSlider"> -->
                <span class="timers">{{audioEnd}}</span>
            </div>
            <div class="bottom">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-paixu1"></use>
                </svg>
                <svg class="icon shangyishou" aria-hidden="true" @click="updateMusic(-1),updateAudio(0)">
                    <use xlink:href="#icon-shangyishou"></use>
                </svg>
                <svg class="icon bofang" aria-hidden="true" v-if="isBtnShow" @click="playMusic">
                    <use xlink:href="#icon-yunhang"></use>
                </svg>
                <svg class="icon zanting" aria-hidden="true" v-else @click="stopMusic">
                    <use xlink:href="#icon-zanting1"></use>
                </svg>
                <svg class="icon xiayishou1" aria-hidden="true" @click="updateMusic(1),updateAudio(0)">
                    <use xlink:href="#icon-xiayishou1"></use>
                </svg>
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-bofangliebiao-2"></use>
                </svg>
            </div>
        </div>
    </div>
    
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import {mapMutations,mapState} from 'vuex'
import { ref } from 'vue'

export default {
    setup(props,context) {
        let imgShow=ref(true)
        let totalTime=ref(96)
        return{
            imgShow,
            totalTime
        }
    },
    props:[
        'musicList','playMusic','stopMusic','isBtnShow','addDuration','updateAudio',
        'sliderValue','audioStart','audioEnd'
        ],
    computed:{
        ...mapState(['lyricList','currentTime','playListIndex','playList','duration']),
        lyric(){
            let arr;
            if(this.lyricList.lyric){
                arr=this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
                    let min=item.slice(item.indexOf('[')+1,item.indexOf(':'))
                    let sec=item.slice(item.indexOf(':')+1,item.indexOf('.'))
                    let mill=item.slice(item.indexOf('.')+1,item.indexOf(']'))
                    let lrc=item.slice(item.indexOf(']')+1,item.length).trim()
                    let time =parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
                    return{min,sec,mill,lrc,time}
                })
                arr.forEach((item,i) => {
                    if(i === arr.length-1 || isNaN(arr[i+1].time)){
                        item.after=10000000000
                    }else{
                        item.after=arr[i+1].time
                    }                    
                });
            }
            // console.log(arr)
            return arr
        }
    },
    methods:{
        ...mapMutations(['updateDetailShow','updatePlayListIndex']),
        //歌曲详情页的显示
        hideMusicDetail(){
            this.updateDetailShow()
        },
        //封面图片的显示
        dateImgShow(){
            this.imgShow=!this.imgShow
        },
        //切换歌曲(上一首/下一首)
        updateMusic(num){
            let index = this.playListIndex + num;
            if (index < 0) {
                index = this.playList.length - 1;
            } else if (index == this.playList.length) {
                index = 0;
            }
            this.updatePlayListIndex(index)
            this.playMusic()
        },
        //改变歌曲总时间
        dateTotalTime(audioEnd){
            let min=audioEnd.slice(0,2)
            let sec=audioEnd.slice(3,6)
            this.totalTime=parseInt(min)*60 + parseInt(sec)
            // console.log(this)
        },
        //改变歌曲进度
        clickSlider(){
            // console.log([this.$refs.slider])
            console.log('end',this.audioEnd)
            console.log('dur',this.totalTime)
            var num=(this.sliderValue/100) * this.totalTime
            if(isNaN(num)) return;
            
            this.$emit('child-event',num)
        }

    },
    watch:{
        currentTime(newValue){
            let p_1=document.querySelector("p.active_1");
            let p_2=document.querySelector("p.active_2");
            // console.log(p_1,p_2)
            //正在唱的那一句歌词的位置
            if(p_1) {
                if(p_1.offsetTop>this.$refs.imgLyric.clientHeight/2){
                    this.$refs.imgLyric.scrollTop = p_1.offsetTop - this.$refs.imgLyric.clientHeight/2.4;
                } 
            }
            if(p_2){
                if(p_2.offsetTop>this.$refs.Lyric.clientHeight/2){
                    this.$refs.Lyric.scrollTop = p_2.offsetTop - this.$refs.Lyric.clientHeight/1.4;
                }
            } 
            // console.log([this.$refs.Lyric.clientHeight])
            //循环播放
            if(newValue===this.duration){
                this.updateMusic(1)
                // if(this.playListIndex===this.playList.length-1){
                //     this.updatePlayListIndex(0);
                //     this.playMusic()
                // }else{
                //     this.updatePlayListIndex(this.playListIndex+1);
                // }
            }
            this.dateTotalTime(this.audioEnd)
        },
    },
    mounted(){
        this.addDuration()
    },
    components:{
        Vue3Marquee
    }
}
</script>

<style lang="less" scoped>
.musicDetail{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .bgImg{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        filter: blur(50px);
    }
    .detailTop{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .2rem .2rem .2rem;
        color: #fff;
        margin-top: 5%;
        height: 10%;
        .icon{
            width: .6rem;
            height: .6rem;
        }
        .center{
            width: 67%;
            .vue3-marquee{
                width: 100%;
                font-size: .36rem;
            }
            span{
                font-size: .28rem;
            }
            .icon{
                width: .2rem;
                height: .2rem;
                fill: #fff;
            }
        }
    }
    .detailCenter{
        width: 100%;
        height: 60%;
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        img{
            height: 60%;
            border-radius: 50%;
            margin-top: .5rem;
            animation: rotation 25s linear infinite;
            animation-play-state: paused;
        }
        img.active{
            animation-play-state: running;
        }
        @keyframes rotation {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        } 
        .imgLyric{
            width: 100%;
            height: 30%;
            overflow: scroll;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: absolute;
            bottom: 0;
            p{
            text-align: center;
            color: #e6e6e6;
            margin-bottom: .3rem;
            transition:color .5s linear;
            }
            p.active_1{
                color: rgb(244, 163, 49);
                font-size: .4rem;
            }
            //隐藏滚动条
            scrollbar-width: none; /* firefox */
            -ms-overflow-style: none; /* IE 10+ */
        }
        //隐藏滚动条
        .imgLyric::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }    
    }
    .Lyric{
        width: 100%;
        height: 60%;
        margin-top: .3rem;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
            text-align: center;
            color: #e6e6e6;
            margin-bottom: .3rem;
            transition:color .5s linear;
        }
        p.active_2{
            color: rgb(244, 163, 49);
            font-size: .4rem;
        }
        //隐藏滚动条
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
    }
    //隐藏滚动条
    .Lyric::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
    .detailBottom{
        width: 100%;
        height: 22%;
        margin-bottom: 5%;
        bottom: 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .icon{
            fill: #fff;
        }
        .top,.bottom{
            width: 100%;
            height: 40%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .top{
            .xin,.cd,.genduo{
                width: .56rem;
                height: .56rem;
            }

        }
        .center{
            width: 100%;
            height: 20%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .slider{
                width: 70%;
            }
            // input{
            //     width: 70%;
            // }
            .timers{
                width: 10%;
                color: #cfcfcf;
                font-size: .2rem;
            }
        }
        .center > *{
            transition: none !important;
        }
        .bottom{
            .shangyishou,.xiayishou1,.liebiao{
                width: .56rem;
                height: .56rem;
            }
            .bofang,.zanting{
                width: 1rem;
                height: 1rem;
            }
        }
    }
}
</style>