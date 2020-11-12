/*
 * @Author: your name
 * @Date: 2020-11-12 23:00:54
 * @LastEditTime: 2020-11-12 23:53:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wean/pages/date/index.js
 */
import {dateTimePicker,getMonthDay} from '../../utils/dateTimePicker.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: {
      dateTime: null,
      dateTimeArray: [],
      value: ''
    },
    endTime: {
      dateTime: null,
      dateTimeArray: [],
      value: ''
    },
    startYear: 2010,
    endYear: 2060
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.initDate()
  },
  
  initDate(){
    var startObj = dateTimePicker(this.data.startYear, this.data.endYear);
    var endObj = dateTimePicker(this.data.startYear, this.data.endYear);
    let startTime = {
        dateTimeArray: startObj.dateTimeArray,
        dateTime: startObj.dateTime,
        value: this.timeFormdate(startObj)
    }
    let endTime = {
        dateTimeArray: endObj.dateTimeArray,
        dateTime: endObj.dateTime,
        value: this.timeFormdate(endObj)
    }
    this.setData({
      startTime,
      endTime
    })
  },

  // 时间展示
  timeFormdate(timeObj){
    return  timeObj.dateTimeArray[0][timeObj.dateTime[0]]+'-'+
    timeObj.dateTimeArray[1][timeObj.dateTime[1]]+'-'+
    timeObj.dateTimeArray[2][timeObj.dateTime[2]]+' '+
    timeObj.dateTimeArray[3][timeObj.dateTime[3]]+':'+
    timeObj.dateTimeArray[4][timeObj.dateTime[4]]+':'+
    timeObj.dateTimeArray[4][timeObj.dateTime[5]]
  },

  // picker value 改变时触发
  changeDateTime(e) {
    console.log(e)
    let time = e.target.dataset.time
    let timeType = this.data[time]
    timeType.dateTime = e.detail.value
    timeType.value = this.timeFormdate(timeType)

    this.setData({
      [time]: timeType
    })
  },
  
  // 某一列的值改变时触发
  changeDateTimeColumn(e) {
      let time = e.target.dataset.time
      var arr = this.data[time].dateTime, dateArr = this.data[time].dateTimeArray;
      arr[e.detail.column] = e.detail.value;
      dateArr[2] = getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      this.setData({
        [time]: {
          dateTimeArray: dateArr,
          dateTime: arr,
          value: this.data[time].value
        }
      })
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