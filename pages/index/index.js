//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
      label: '全系列',
      value: null,
      icon: 'ios-aperture'
    }, {
      label: '礼服',
      value: 1,
      icon: 'ios-shirt'
    }, {
      label: '妆容',
      value: 2,
      icon: 'ios-color-palette'
    }, {
      label: '摄影',
      value: 3,
      icon: 'ios-camera'
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: async function () {
    // wx.setStorage({
    //   data: 'cSJdmc2ud7qvJAt59gTIAQfL3FWDFhqdxE2KE9BOee30yS4aQpFhzOGSKkWA3AKh',
    //   key: 'token',
    // })
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
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
    app.globalData.themeDetail = e.currentTarget.dataset.theme
    wx.navigateTo({
      url: `../produceDetail/index`,
    })
  }
})