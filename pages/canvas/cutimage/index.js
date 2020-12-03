Page({
  /**
   * 页面的初始数据
   */
  data: {
    cutView: false,
    canvasWidth: 0,
    canvasHeight: 0,
    selectImg: null,
    size: {
      width: 300,
      height: 200
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        const windowScalWidth = 375 / res.windowWidth
        const windowScalHeight = 812 / res.windowHeight
        this.setData({
          canvasWidth: res.windowWidth - 60 / windowScalWidth,
          canvasHeight: res.windowHeight,
          byclear: res.screenWidth,
          windowScalWidth,
          windowScalHeight
        });
      },
    });
  },

  /**
   * @description: 选择图片
   * @param {*}
   * @return {*}
   */
  getImage () {
    wx.chooseImage({
      success: (res) => {
        wx.getImageInfo({
          src: res.tempFilePaths[0], // 这里填写网络图片路径
          success: (res) => {
            this.setData({
                cutView: true,
              }, () => {
                // 获取图片正常铺开
                const ctx = wx.createCanvasContext("canvas");
                const scal = res.width / res.height;
                const imgW = this.data.canvasWidth
                ctx.drawImage( res.path, 0, (this.data.canvasHeight - imgW / scal) / 2, imgW, imgW / scal );
                ctx.draw();
                this.setData({
                  selectImg: res
                })
              }
            );
          },
        });
      },
    });
  },
  // 图片裁剪
  cutresult(){
    wx.showLoading({
      title: '正在裁剪...',
    });
    const {canvasWidth, canvasHeight, windowScalWidth, windowScalHeight} = this.data
     // 获取图片正常铺开
     wx.canvasToTempFilePath({
      x: (canvasWidth -  300 / windowScalWidth) / 2,
      y: (canvasHeight - 200 / windowScalHeight) / 2,
      width: 300 / windowScalWidth,
      height: 200 / windowScalHeight ,
      destWidth: 300 / windowScalWidth,
      destHeight: 200 / windowScalHeight ,
      canvasId: 'canvas',
      success: (res) => {
        wx.getImageInfo({
          src: res.tempFilePath, // 这里填写网络图片路径
          success: (res) => {
            // 获取图片正常铺开
            wx.hideLoading()
            this.setData({
              cutView: false
            },()=>{
              const ctx = wx.createCanvasContext("new-canvas");
              ctx.drawImage( res.path, 0, 0, res.width, res.height);
              ctx.draw();
            })
          }
        });
        
        
      }
    })
  },
  // 取消
  cancle() {
    this.setData({
      cutView: false,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
