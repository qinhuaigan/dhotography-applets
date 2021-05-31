// pages/mine/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    orderCount: {
      isCancel: 0, // 已取消
      isAppointment: 0, // 预约中
      isHand: 0, // 进行中
      isCompleted: 0 // 已完成
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo
    })
    this.getOrderCount()
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
  loginOut() { // 退出登录
    app.globalData.userInfo = null
    app.globalData.token = null
    wx.removeStorage({
      key: 'token',
    })
    wx.reLaunch({
      url: '../login/login',
    })
  },
  async getOrderCount() { // 获取订单 "统计数据"
    const result = await app.postData('/Orders/userOrderCount')
    if (result) {
      this.setData({
        orderCount: result.data
      })
    }
  }
})