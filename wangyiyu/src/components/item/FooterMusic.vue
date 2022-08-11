<template>
    <div class="footerMusic" >
        <div class="footerLeft" @click="updateDetailShow()">
            <img :src="playList[playListIndex].al.picUrl" alt="" ref="picUrl" :class="{ active: !isBtnShow}">
            <div>
                <p>{{playList[playListIndex].name}}</p>
                <span>横滑可以切换上下首哦</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="playMusic()" v-if="isBtnShow">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="stopMusic()" v-else>
                <use xlink:href="#icon-zanting"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="updateMusic(1),updateAudio(0)">
                <use xlink:href="#icon-xiayishou"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofangliebiao"></use>
            </svg>
        </div>
        <audio ref="audio" preload="auto" @timeupdate="updateTime"  :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
        <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%',width: '100%' }" >
            <MusicDetail :musicList="playList[playListIndex]" 
                :playMusic="playMusic" :stopMusic="stopMusic" :isBtnShow="isBtnShow" :addDuration="addDuration"
                :sliderValue="sliderValue" :audioStart="audioStart" :audioEnd="audioEnd"
                @child-event='updateAudio' :updateAudio="updateAudio"
            />
        </van-popup>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
import {ref} from 'vue'

export default {
    setup(){
        const sliderValue = ref(0)
        return{
            interVal:0,
            sliderValue,
            audioStart: "00:00",
            audioEnd: "01:36",
        }
    },
    computed:{
        ...mapState(['playList','playListIndex','isBtnShow','detailShow','playAll'])
    },
    methods:{
        ...mapMutations(['updateIsBtnShow','updateDetailShow','updateCurrentTime','updatePlayListIndex','updateDuration']),
        ...mapActions(['getLyric']),
        startPlaying(){
            this.$refs.audio.volume = 0.2
            this.updateIsBtnShow(false)
        },
        playMusic(){
            //audio.play()/pause() 为audio组件的播放函数和暂停函数
            setTimeout(() => {
                this.$refs.audio.play()
                this.startPlaying()
            }, 200);
            
        }, 
        stopMusic(){
            this.$refs.audio.pause()
            this.updateIsBtnShow(true)
        },
        //更新当前歌曲播放时间
        updateTime(e){
            this.updateCurrentTime(e.target.currentTime)
            this.updateTimeData(e)
            // console.log(e)
        },
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
        addDuration(){
            this.updateDuration(this.$refs.audio.duration)
        },
         //计算歌曲总时长
        transTime(value) {
            var time = "";
            var h = parseInt(value / 3600);
            value %= 3600;
            var m = parseInt(value / 60);
            m = m < 10 ? "0" + m : m;
            var s = parseInt(value % 60);
            s = s < 10 ? "0" + s : s;
            time = m + ":" + s;
            return time;
        },
        updateTimeData(e){
            //更新进度条、当前播放时间和歌曲总时间
            var value = e.target.currentTime / e.target.duration
            // console.log(value)
            this.sliderValue= value * 100
            this.audioStart = this.transTime(e.target.currentTime)
            // console.log(e.target.duration)
            if(isNaN(e.target.duration)) return;
            this.audioEnd = this.transTime(e.target.duration)
        },
        updateAudio(value){
            // console.log('父组件',value)
            this.$refs.audio.currentTime= value
        },
    },  
    watch:{
        playList(){
            setTimeout(() => {
                this.$refs.audio.autoplay=true
                this.startPlaying()
            }, 200);
            
            
        },
        playListIndex(){
            setTimeout(() => {
                this.$refs.audio.autoplay=true
                this.startPlaying()
            }, 200);
            
        },
        playAll(){
            setTimeout(() => {
                this.$refs.audio.autoplay=true
                // console.log("playAll")
                this.playMusic()
            }, 200);
            
        },
    },
    mounted(){
        this.getLyric(this.playList[this.playListIndex].id)
    },
    updated(){
        this.getLyric(this.playList[this.playListIndex].id)
        this.addDuration()

    },
    components:{
        MusicDetail
    }  
}
</script>

<style lang="less" scoped>
.footerMusic{
    width: 100%;
    height: 1.4rem;
    position: fixed;
    z-index: 99;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #999;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    .footerLeft{
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            //指定动画循环
            animation: rotation 8s linear infinite;
            //暂停动画
            animation-play-state: paused;
        }
        img.active{
            //运行动画
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
        p{
            width: 3rem;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        span{
            color: #999;
            font-size: .24rem;
        }
    }
    .footerRight{
        width: 30%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon{
            width: .6rem;
            height: .6rem;
        }
    }
    audio{
        position: absolute;
        z-index: 99;
    }
}
</style>