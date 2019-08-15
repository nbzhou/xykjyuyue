// pages/home/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:"",
    fileurl:'http://192.168.0.107:4000/fileserver/'
  },
  toMyAppoint: function() {
    wx.navigateTo({
      url: '../subscribe/list/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var openId = wx.getStorageSync("userInfo").openId;
    wx.request({
      url: app.data.httpurl + 'app/img/list',
      success: function (data) {
        console.log(data.data.list)
        that.setData({
          imgList: data.data.list
        })
      }
    })
  },
  onPostTap: function() {
    wx.navigateTo({
      url: '../subscribe/index',
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