/*
 * @Author: your name
 * @Date: 2020-10-16 17:07:42
 * @LastEditTime: 2020-12-03 09:40:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \weanapp\pages\index\index.js
 */
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
        textData:[
          {
            name: '时间日期选择器',
            url: '/pages/date/index'
          },
          {
            name: '图片裁剪',
            url: '/pages/canvas/cutimage/index'
          }
        ]
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
