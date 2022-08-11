//此文件用于对于第三插件进行集中的管理
import { Swipe, SwipeItem,Button,Popup,Slider  } from 'vant';

//放入数组中
let plugins=[
    Swipe,SwipeItem,Button,Popup,Slider  
]

export default function getVant(app){
    //循环app.use
    plugins.forEach((item)=>{
        return app.use(item)
    })
}
