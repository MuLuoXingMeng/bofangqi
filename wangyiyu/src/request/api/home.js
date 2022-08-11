import service from "..";
//获取首页轮播图
export function getBanner(){
    return service({
        method:'GET',
        url:'/banner?type=2',
    })
}
//获取发现好歌单
export function getMusicList(){
    return service({
        method:'GET',
        url:'/personalized?limit=10',
    })
}

//获取搜索的歌曲
export function getSearchMusic(name){
    return service({
        method:'GET',
        url:`/cloudsearch?keywords=${name}`
    })
}