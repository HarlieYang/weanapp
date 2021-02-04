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
   * @return {Float}     rpx                    图片的rpx
   * @return {Float}     rpx                    图片的rpx
   */
  data: {
        dpr: 2,
        // 用户选择的图片的地址
        imageSrc: '',
        // movable-area top 的值
        areaTop: 0,
        initialWidth: 0,
        initialHeight: 0,
        initialX: 0,
        initialY: 0,
        initialScale: 1,
        clipSize: 0,
        clipSizeH: 0,
        leftSize: 0,
        x: 0,
        y: 0,
        scale: 1,
    
        canvasSize: 0,
        canvasSizeH: 0,
        type: 1
  },
  onLoad(options){
    const obj = JSON.parse(decodeURIComponent(options.obj))
    const { windowWidth, windowHeight, pixelRatio } = wx.getSystemInfoSync()
    console.log('obj',obj)
    // 裁剪框是  obj.width rpx，计算出对应的 px 值
    const clipSize = (windowWidth / 750) * obj.width
    const clipSizeH = (windowWidth / 750) * obj.height
    // 计算出裁剪框应该距离顶部的值，以便定位
    const areaTop = (windowHeight - clipSizeH) / 2

    wx.getImageInfo({
      src: obj.url,
      success: (res) => {
        const { width, height } = res
        // 在知道图片本身的宽高后，一开始需要缩放一下图片使得图片的宽或者高等于裁剪框尺寸
        const scale = Math.max(clipSize / width, clipSize / height)
        const initialWidth = width * scale
        const initialHeight = height * scale
        
        this.setData({
          dpr: pixelRatio,
          imageSrc: obj.url,
          type: obj.type,
          areaTop: areaTop,
          initialWidth: initialWidth,
          initialHeight: initialHeight,
          initialX: (clipSize - initialWidth) / 2,
          initialY: (clipSizeH - initialHeight) / 2,
          initialScale: scale,
          clipSize: clipSize.toFixed(2) ,
          clipSizeH: clipSizeH.toFixed(2), 
          leftSize: (windowWidth - clipSize)/2
          })
        }
      })
  },
  onChange: function (e) {
    const { x, y } = e.detail
    this.setData({
      x,
      y
    })
  },
  onScale: function (e) {
    const { x, y, scale } = e.detail
    this.setData({
      x,
      y,
      scale
    })
  },
  onClickCancel() {
      wx.hideLoading();
      wx.navigateBack({
          delta: 1
      });
  },
  onClickConfirm(){
    const { imageSrc, x, y, initialScale, scale, clipSize, clipSizeH } = this.data

    const totalScale = scale * initialScale
    const sx = -x / totalScale
    const sy = -y / totalScale
    const canvasSize = clipSize / totalScale
    const canvasSizeH = clipSizeH / totalScale

    this.setData({
      canvasSize,
      canvasSizeH
    })

    const context = wx.createCanvasContext('canvas')
    context.drawImage(imageSrc,sx,sy, canvasSize, canvasSizeH, 0, 0, canvasSize, canvasSizeH)
    context.draw()

    setTimeout(()=>{
      wx.canvasToTempFilePath({
        fileType: 'jpg',
        x: 0,
        y: 0,
        width: canvasSize,
        height: canvasSizeH,
        destWidth: canvasSize,
        destHeight: canvasSizeH,
        canvasId: 'canvas',
        success: (restemp) => {
            wx.showLoading({
                title: '上传中'
            });
            let pages = getCurrentPages()
            let prevPage = pages[pages.length - 2]; //上一页页面实例
            console.log(prevPage)
            console.log('restemp.tempFilePath',restemp.tempFilePath)
            prevPage.setData({
              imageSrc: restemp.tempFilePath
            },()=>{
              wx.navigateBack()
            })
        }
      })
    },200)
  }
})