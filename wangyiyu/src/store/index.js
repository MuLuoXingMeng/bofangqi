import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'

export default createStore({
  state: {
    playList:[{
      //专辑信息
      al:{
        id: 71074,
        name: "only my railgun",
        pic: 109951166296227310,
        picUrl: "https://p2.music.126.net/pviFxK7sGSdu3xmWRt9Lgw==/109951166296227310.jpg",
        pic_str: "109951166296227310",
      },
      //歌曲信息
      id:33255251,
      name:"only my railgun",
      ar:[{name:'fripSide'}]
    }],
    playListIndex:0,
    isBtnShow:true,//暂停按钮的显示
    detailShow:false,//歌曲详情页的显示
    lyricList:{},//歌词
    currentTime:0,//当前播放时间
    duration:96,//歌曲总时长
    playAll:true,//值发生改变时播放全部
  },
  getters: {
  },
  mutations: {
    //改变播放按钮样式
    updateIsBtnShow(state,value){
      state.isBtnShow=value
    },
    //改变播放列表
    updatePlayList(state,value){
      state.playList=value
    },
    //改变播放歌曲
    updatePlayListIndex(state,value){
      state.playListIndex=value
    },
    //改变歌曲详情页的显示
    updateDetailShow(state){
      state.detailShow=!state.detailShow
    },
    //改变歌词
    updateLyric(state,value){
      state.lyricList=value
    },
    //改变当前播放时间
    updateCurrentTime(state,value){
      state.currentTime=value
      // console.log(state.currentTime)
    },
    updatePlayAll(state){
      state.playAll=!state.playAll
      // console.log(state.playAll)
    },
    updateDuration(state,value){
      state.duration=value
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res=await getMusicLyric(value)
      context.commit("updateLyric",res.data.lrc)
      // console.log("Lyric",res)
    },
    
  },
  modules: {
  }
})
