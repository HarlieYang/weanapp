//index.js
//获取应用实例
import {jumpTo} from '../../utils/util'
const app = getApp()

Page({
  data: {
    weanText: [
      {
        name: '业务组件',
        textData:[
          {
            name: '底部导航栏',
            url: '/pages/tabbar/index'
          },
          {
            name: '滚动导航条',
            url: '/pages/nav/index'
          },
          {
            name: '抽屉',
            url: '/pages/drawer/index'
          },
        ]
      },
      {
        name: '营销组件',
        textData:[]
      }
    ]
  },
  onLoad: function () {
    
  },
  toUrl(e){
    let {url} = e.target.dataset.item
    jumpTo(url)
  }
})
