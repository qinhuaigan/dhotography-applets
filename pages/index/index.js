//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    titleIcon: `${app.globalData.baseURL}/Containers/themeIcon/download/05.png`,
    scienceImgs: [],
    themeData: [],
    baseURL: app.globalData.baseURL,
    motto: 'Hello World',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    carouselList: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    tabsData: [{
      label: '街拍',
      value: 1,
      path: `${app.globalData.baseURL}/Containers/themeIcon/download/AFEIDBAEGAAg2YXv0wUolsjw1AIwbDhsQGc.png`
    }, {
      label: '写真',
      value: 2,
      path: `${app.globalData.baseURL}/Containers/themeIcon/download/AFEIDBAEGAAg24Xv0wUooa6o0AcwbDhsQGc.png`
    }, {
      label: '棚拍',
      value: 3,
      path: `${app.globalData.baseURL}/Containers/themeIcon/download/AFEIDBAEGAAg2YXv0wUolsjw1AIwbDhsQGc.png`
    }, {
      label: '婚庆',
      value: 4,
      path: `${app.globalData.baseURL}/Containers/themeIcon/download/AFEIDBAEGAAg3oXv0wUo5IrS6QcwbDhsQGc.png`
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: async function () {
    // 获取 token
    app.globalData.token = await new Promise((resolve) => {
      wx.getStorage({
        key: 'token',
        success: function (res) {
          resolve(res.data)
        },
        fail: function (err) {
          console.log('err', err)
          resolve(false)
        }
      })
    })
    // 获取用户信息
    this.getUserInfoByToken()
    // 获取 "今日推荐" 数据
    this.getThemes()
    // 获取 "环境展示" 图片
    this.getScienceImgs()
    // 获取轮播图
    this.getCarousel()
  },
  upload() { // 上传文件
    wx.chooseImage({
      count: 10,
      success: (res) => {
        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: 'file',
          url: 'http://192.168.2.214/v1/trade/file/upload',
          success: (response) => {
            console.log('文件上传结果', response)
          },
          fail: (err) => {
            console.log('上传失败', err)
          }
        })
      }
    })
  },
  // 通过 token 获取用户信息
  async getUserInfoByToken() {
    // 获取登录用户信息
    wx.request({
      url: `${app.globalData.baseURL}/UserInformations/getUserInfoByToken?access_token=${app.globalData.token}`,
      method: 'POST',
      success: function (response) {
        if (response.data.code === 0) {
          app.globalData.userInfo = response.data.data
        }
      },
      fail: function (err) {

      }
    })
  },
  getCarousel() { // 获取轮播图
    app.showLoading()
    app.hideLoading()
    const that = this
    wx.request({
      url: `${app.globalData.baseURL}/Carousels/getCarousel?access_token=${app.globalData.token}`,
      method: 'POST',
      data: {
        type: 1
      },
      success: function (response) {
        if (response.data.code === 0) {
          that.carouselList = response.data.data
          that.setData({
            carouselList: that.carouselList
          })
        }
      },
      fail: function (err) {

      }
    })
  },
  getThemes() { // 获取 "今日推荐" 的 "服务单"
    const that = this
    wx.request({
      url: `${app.globalData.baseURL}/Themes/getThemes?access_token=${app.globalData.token}`,
      method: 'POST',
      data: {
        isRecommend: true
      },
      success: function (response) {
        if (response.data.code === 0) {
          that.themeData = response.data.data
          that.setData({
            themeData: that.themeData
          })
        }
      },
      fail: function (err) {

      }
    })
  },
  getScienceImgs() { // 获取 "环境展示" 图片
    const that = this
    wx.request({
      url: `${app.globalData.baseURL}/Carousels/getCarousel?access_token=${app.globalData.token}`,
      method: 'POST',
      data: {
        type: 2
      },
      success: function (response) {
        if (response.data.code === 0) {
          that.scienceImgs = response.data.data
          that.setData({
            scienceImgs: that.scienceImgs
          })
        }
      },
      fail: function (err) {

      }
    })
  },
  gotoDetailPage(e) {
    wx.navigateTo({
      url: `../produceDetail/index?id=${e.currentTarget.dataset.theme.id}`,
    })
  }
})