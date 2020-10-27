/*
 * @Author: your name
 * @Date: 2020-10-27 14:15:27
 * @LastEditTime: 2020-10-27 16:03:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \weanapp\pages\drawer\index.js
 */
// pages/drawer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  handleClick(e){
    let type = e.target.dataset.type
    let drawer = this.selectComponent(`#${type}drawer`)
    this.setData({
      [type + 'drawer']: drawer
    },()=>{
      drawer.open()
    })
    
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