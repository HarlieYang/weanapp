// pages/canvas/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc: '',
    type: 1  // 1为1:1  大小代码改这里
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
  getImage(){
    let width,height
    if(this.data.type === 1){
      width = 600
      height = 600
    } else {
        width = 600 
        height = 350
    }
    wx.chooseImage({
      count: 1,
      success: (res) => {
          const tempFilePaths = res.tempFilePaths
          const obj = encodeURIComponent(JSON.stringify({
              url: tempFilePaths[0],
              width, 
              height,
              type: this.data.type
          }))
          wx.navigateTo({
             url: `/pages/canvas/cutimage/index?obj=${obj}`
          });
      }
    })
  },
  // 图片保存
  saveImage(){
    if(this.data.imageSrc == ""){
      wx.showToast({
        title: '请先选择图片',
        duration: 2000,
        icon: 'none'
      });
      return
    }
    wx.showLoading({
      title: '正在保存'
    })
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imageSrc,
      success(res) { 
        wx.showToast({
          title: '保存成功',
          duration: 2000,
          icon: 'none'
        });
      },
      complete(){
        wx.hideLoading()
      }
    })
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