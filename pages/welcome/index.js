var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nullTip: true,
    btnlogintext: "授权登录"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("wecomle==index.js==onLoad");

    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          console.log("小程序已授权");
          // wx.getUserInfo({
          //   success(res) {
          //     console.log(res.userInfo)
          //   }
          // })
          // wx.showToast({
          //   icon: 'loading',
          //   title:'dsad'
          // })

          that.setData({ btnlogintext: "登录中.." });
          wx.showLoading({
            title: '登录中...',
          })

          wxlogin();
        }
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

  },

  refresh: function () {
    var that = this;
    setInterval(that.getSession, 1 * 30 * 1000);

  },
  getSession: function () {
    console.log("getSession");
  },

  onGotUserInfo: function () {
    console.log("onGotUserInfo");
    var that = this;
    wxlogin();
  }
})

function wxlogin() {
  console.log("wxlogin");

  var that = this;

  wx.login({
    success: function (r) {
      var code = r.code;//登录凭证
      console.log(code);
      if (code) {
        console.log("code==>" + code);
        //2、调用获取用户信息接口
        wx.getUserInfo({
          success: function (res) {
            //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
            var session_id = wx.getStorageSync('session_id');//本地取存储的sessionID  
            wx.setStorageSync('encryptedData', res.encryptedData);
            wx.setStorageSync('iv', res.iv);
            console.log("encryptedData==>" + res.encryptedData);
            console.log("iv==>" + res.iv);
            wx.request({
              url: app.data.httpurl + 'app/weixinlogin',//自己的服务接口地址
              data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
              success: function (request) {
                //4.解密成功后 获取自己服务器返回的结果
                console.log('dasdasdxxxxxxxxxxxxx');
                console.log(request)
                if (request.data.result == 1) {
                  const app = getApp();
                 
                  var userInfo = request.data.userInfo;
                  app.globalData.userInfo = userInfo;
                  var session_id = request.data.session_id;
                  console.log(session_id);
                  var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'session_id=' + session_id }
                  var header_upload = { 'content-type': 'multipart/form-data', 'Cookie': 'session_id=' + session_id }
                  wx.setStorageSync('header', header);
                  wx.setStorageSync('header_upload', header_upload);
                  wx.setStorageSync('session_id', session_id);
                  wx.setStorageSync("userInfo", userInfo);
                  wx.switchTab({
                    url: "../home/index"
                  });

                } else {
                  console.log('解密失败')
                }
              },
              fail: function () {
                console.log('系统错误')
              }
            })
          },
          fail: function () {
            wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权，将无法正常使用商城功能。请10分钟后再次点击授权，或者删除小程序重新进入。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  that.setData({
                    nullTip: false
                  });
                }
                return;
              }
            })
          }
        })

      } else {
        console.log('获取用户登录态失败！' + r.errMsg)
        return;
      }
    },
    fail: function () {
      console.log('登陆失败')
      return;
    }
  })

}