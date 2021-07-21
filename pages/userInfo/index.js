// pages/userInfo/index.js
import {
  $wuxToptips
} from '../../components/wux-weapp/index'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const userInfo = JSON.parse(JSON.stringify(app.globalData.userInfo))
    userInfo.avatar = `${app.globalData.baseURL}${userInfo.avatar}`
    this.setData({
      userInfo
    })
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    const userInfo = this.data.userInfo
    userInfo.provincialArea = e.detail.
    this.setData({
      region: e.detail.value
    })
  },
  uploadAvatar(e) { // 上传头像
    wx.chooseImage({
      count: 1,
      success: (e) => {
        if (e.tempFilePaths && e.tempFilePaths.length > 0) {
          wx.uploadFile({
            filePath: e.tempFilePaths[0],
            name: 'file',
            url: `${app.globalData.baseURL}/UserInformations/uploadAvatar?access_token=${app.globalData.token}`,
            success: (res) => {
              const result = JSON.parse(res.data)
              if (result.code === 0) {
                $wuxToptips().success({
                  hidden: false,
                  text: '上传成功',
                  duration: 3000,
                  success() {},
                })
                this.data.userInfo.avatar = `${app.globalData.baseURL}${result.data.path}` 
                app.globalData.userInfo.avatar = result.data.path
                this.setData({
                  userInfo: this.data.userInfo
                })
              } else {
                $wuxToptips().error({
                  hidden: false,
                  text: res.data.msg,
                  duration: 3000,
                  success() {},
                })
              }
            },
            fail: (err) => {
              $wuxToptips().error({
                hidden: false,
                text: '上传失败',
                duration: 3000,
                success() {},
              })
            }
          })
        }
      },
      fail: () => {}
    })
  }
})