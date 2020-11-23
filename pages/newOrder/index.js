// pages/newOrder/index.js
const app = getApp()
import {
  $wuxToptips
} from '../../components/wux-weapp/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseURL: app.globalData.baseURL,
    themeDetail: null,
    lang: 'zh_CN',
    selectTime: [],
    appointmentTime: [],
    minDate: app.formatDate(new Date()),
    phone: null,
    customerName: null,
    customerRemarks: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.themeDetail = app.globalData.themeDetail
    this.data.themeDetail.priceShow = this.data.themeDetail.price.toFixed(2)
    this.setData({
      themeDetail: app.globalData.themeDetail,
      customerName: app.globalData.userInfo.chineseName,
      phone: app.globalData.userInfo.username
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
  updateStr(e) { // 更新数据
    const {
      str
    } = e.currentTarget.dataset
    const {
      value
    } = e.detail
    this.data[str] = value
  },
  onConfirm(e) {
    const {
      value
    } = e.detail
    const d = `${value[0]}-${parseFloat(value[1]) + 1}-${value[2]} ${value[3]}:${value[4]}`
    this.data.appointmentTime = d
    this.setData({
      appointmentTime: this.data.appointmentTime
    })
  },
  submit() {
    const data = {
      token: app.globalData.token,
      themeId: this.data.themeDetail.id,
      themeNo: this.data.themeDetail.themeNo,
      appointmentTime: this.data.appointmentTime,
      customerName: this.data.customerName,
      phone: this.data.phone,
      customerRemarks: this.data.customerRemarks
    }
    app.showLoading()
    wx.request({
      url: `${app.globalData.baseURL}/orders/addOrder?access_token=${app.globalData.token}`,
      method: 'post',
      data,
      success(response) {
        if (response.data.code === 0) {
          $wuxToptips().success({
            hidden: false,
            text: '提交成功',
            duration: 3000,
            success() {}
          })
        } else {
          $wuxToptips().error({
            hidden: false,
            text: response.data.msg,
            duration: 3000,
            success() {},
          })
        }
        app.hideLoading()
      },
      fail() {
        app.hideLoading()
      }
    })
  }
})