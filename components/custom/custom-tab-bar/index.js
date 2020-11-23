// custom-tab-bar/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultCurrentPath: null,
    tabs: [{
      text: '首页',
      icon: 'ios-home',
      path: '/pages/index/index',
    }, {
      text: '预约',
      icon: 'ios-alarm',
      path: '/pages/produce/index'
    }, {
      text: '我的',
      icon: 'ios-person',
      path: '/pages/mine/index'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabChange(e) {
      const pagePath = this.getCurrentPage().route
      const url = e.currentTarget.dataset.path
      if (`/${pagePath}` === url) {
        return
      }
      wx.setStorage({
        data: url,
        key: 'defaultCurrentPath',
        success: function () {
          wx.reLaunch({
            url
          })
        }
      })

    },
    getCurrentPage() {
      let pages = getCurrentPages();
      let currPage = null;
      if (pages.length) {
        currPage = pages[pages.length - 1];
      }
      return currPage
    }
  },
  attached() {
    const that = this
    wx.getStorage({
      key: 'defaultCurrentPath',
      success: function (res) {
        if (app.globalData.firstLoad) {
          app.globalData.firstLoad = false
          that.data.defaultCurrentPath = '/pages/index/index'
          that.setData({
            defaultCurrentPath: that.data.defaultCurrentPath
          })
        } else {
          that.data.defaultCurrentPath = res.data
          that.setData({
            defaultCurrentPath: res.data
          })
        }
      },
      fail: function (err) {
        that.data.defaultCurrentPath = that.data.tabs[0].path
        that.setData({
          defaultCurrentPath: that.data.defaultCurrentPath
        })
      }
    })
  }
})