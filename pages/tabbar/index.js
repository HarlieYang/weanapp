/*
 * @Author: your name
 * @Date: 2020-10-19 00:30:14
 * @LastEditTime: 2020-10-19 21:28:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wean/pages/tabbar/index.js
 */
// pages/tabbar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [
      {
          name: '首页',
          path: '/pages/index/index',
          slot: "index"
      },
      {
          name: '订单',
          path: '/pages/mine/index',
          slot: "order"
      }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})