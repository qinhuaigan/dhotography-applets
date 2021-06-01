// pages/message/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    pageSize: 5,
    total: 0,
    messageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessageList()
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
  nextPage() { // 加载 "下一页"
    if (this.data.currentPage < this.data.total) {
      this.data.currentPage += 1
      this.getMyOrders()
    }
  },
  async getMessageList() { // 获取 "订单列表"
    const data = {
      currentPage: this.data.currentPage,
      pageSize: this.data.pageSize
    }
    const result = await app.postData('/Messages/getMessage', data)
    if (result) {
      const messageList = result.data.reduce((total, item) => {
        item.themeInfo.files.forEach((file) => {
          file.path = `${app.globalData.baseURL}${file.path}`
        })
        total.push(item)
        return total
      }, [])
      this.setData({
        messageList: [...this.data.messageList, ...messageList],
        total: Math.ceil(result.count / this.data.pageSize),
        currentPage: this.data.currentPage
      })
    }
  },
  gotoDetail(e) { // 查看消息详情

  }
})