import { createApp } from 'vue'
import './app.css'
import Taro from '@tarojs/taro'
const App = createApp({
  mounted(){
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env: "cloud1-7gs40qcu242746b1"
       }
      )
     }
  },
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

export default App
