var tran_left = 0; //保存图片偏移值，默认不偏移
var tran_top = 0;
var rpx = 0; //单位换算
Page({
  /**
   * @description: 页面的初始数据
   * @param  {boolean}   cutView                是否展示剪辑视角
   * @return {Number}    canvasWidth            canvas宽度
   * @return {Number}    canvasHeight           canvas高度
   * @return {Object}    selectImg              所选图片的信息
   * @return {Object}    size                   截取框的宽度和高度
   * @return {Object}    img_top                canvas的top值
   * @return {Object}    img_left               canvas的left值
   * @return {Float}     rpx                    图片的rpx
   */
  data: {
    cutView: false,
    canvasWidth: 0,
    canvasHeight: 0,
    selectImg: null,
    size: {
      width: 600,
      height: 400
    },
    mask_top_height: 0,
    mask_bottom_height: 0,
    img_top: tran_top,
    img_left: tran_left,
    rpx: 0.5
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const {size} = this.data
    wx.getSystemInfo({
      success: (res) => {
        const rpx = res.windowWidth / 750
        this.setData({
          canvasWidth: res.windowWidth - 150 * rpx,
          canvasHeight: res.windowHeight,
          rpx,
          size: {
            width:  size.width * rpx,
            height: size.height * rpx
          },
          mask_top_height:  (res.windowHeight - size.height * rpx) / 2,
          mask_bottom_height:  (res.windowHeight - size.height * rpx) / 2
        });
      },
    });
  },
  // 初始化数据
  init(){
    tran_left = 0; //保存图片偏移值，默认不偏移
    tran_top = 0;
    this.setData({
      img_top: tran_top,
      img_left: tran_left
    })
  },

  /**
   * @description: 选择图片
   * @param {*}
   * @return {*}
   */
  getImage () {
    this.init()
    const { rpx, size, canvasWidth, canvasHeight } = this.data
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
                const imgW = canvasWidth
                ctx.drawImage( res.path, 0, (canvasHeight - imgW / scal) / 2, imgW, imgW / scal );
                ctx.draw();
                this.setData({
                  selectImg: {
                    ...res,
                    width: res.width * rpx,
                    height: res.height * rpx
                  },
                  centerY: (canvasHeight - imgW / scal) / 2,
                  y: (canvasHeight - size.height) / 2
                })
              }
            );
          },
        });
      },
    });
  },
  // touchstart
  onTouchstart(e){
    this.setData({
      startPageX: e.touches[0].pageX,
      startPageY: e.touches[0].pageY
    })
  },
  // touchmove
  onTouchmove(e){
    const {startPageX, startPageY, rpx} = this.data
    var pageX = e.touches[0].pageX;
    var pageY = e.touches[0].pageY;
    var moveX = (pageX - startPageX) * rpx + tran_left; // tran_left 先为图片初始偏移值，后为图片挪动偏移值
    var moveY = (pageY - startPageY) * rpx + tran_top;  // tran_top 先为图片初始偏移值，后为图片挪动偏移值
    this.setData({
      img_top: moveY,
      img_left: moveX
    })
  },
  // touchend
  onTouchend(){
    const {img_top, img_left , canvasHeight, size, selectImg, centerY} = this.data
    this.setData({
      y:  (canvasHeight - size.height) / 2 - img_top / 2
    })
    // 1. 横向移动的宽度大
    if(selectImg.width - img_left > 0) {
      this.setData({
        img_left: 0,
      })
      tran_left = 0;          // 偏移值重新赋值
      tran_top = img_top
    }
    // 2. 纵向移动高度
    if ((selectImg.height - size.height - centerY - Math.abs(img_top)) < 0) {
      this.setData({
        img_top: 0
      })
      tran_left = img_left; //偏移值重新赋值
      tran_top = 0
    }
  },
  // 图片裁剪
  cutresult(){
    wx.showLoading({
      title: '正在裁剪...',
    });
    const {canvasWidth,y} = this.data
     // 获取图片正常铺开
     wx.canvasToTempFilePath({
      x: (canvasWidth -  this.data.size.width) / 2,
      y,
      width: this.data.size.width,
      height: this.data.size.height,
      destWidth: this.data.size.width,
      destHeight: this.data.size.height,
      canvasId: 'canvas',
      success: (res) => {
        wx.getImageInfo({
          src: res.tempFilePath, // 这里填写网络图片路径
          success: (res) => {
            console.log(this.data.size)
            console.log(res)
            // 获取图片正常铺开
            wx.hideLoading()
            this.setData({
              cutView: false,
              imgUrl: res.path
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
  // 图片保存
  saveImage(){
    if(this.data.imgUrl == ""){
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
      filePath: this.data.imgUrl,
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
