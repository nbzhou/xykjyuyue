// pages/subscribe/infrom/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointrecordList:'',
    page: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openId = wx.getStorageSync("userInfo").openId;
    wx.request({
      url: app.data.httpurl + 'app/appointmentrecord/recordlist',
      data: {
        page: 1,
        size: 2,
        openId: openId
      },
      success: function (data) {
        console.log("recordlist=================")
        console.log(data.data.recordlist)
        that.setData({
          appointrecordList: data.data.recordlist,
          page: data.data.page
        })
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
    console.log("页面上拉触底事件的处理函数")
    var that = this;
    var openId = wx.getStorageSync("userInfo").openId;
    var page = this.data.page;
    console.log("page:" + page)
    wx.request({
      url: app.data.httpurl + 'app/appointmentrecord/recordlist',
      data: {
        page: that.data.page + 1,
        size: 2,
        openId: openId
      },
      success: function (data) {
        console.log(data.data.recordlist)
        that.setData({
          appointrecordList: that.data.appointrecordList.concat(data.data.recordlist),
          page: data.data.page
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})