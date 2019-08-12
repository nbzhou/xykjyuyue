// pages/subscribe/detail/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointList: '',
    page:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var openId = wx.getStorageSync("userInfo").openId;
    wx.request({
      url: app.data.httpurl + 'app/appointment/list',
      data: {
        page: 1,
        size: 10,
        openId: openId
      },
      success: function(data) {
        that.setData({
          appointList: data.data.list,
          page:data.data.page
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})