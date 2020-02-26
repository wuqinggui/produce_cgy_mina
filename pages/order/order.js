// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diaLog: false,
    showOneButtonDialog: false, //显示隐藏dialog
    oneButton: [{
      text: '确定'
    }],
    list: [{}, {}]
  },
  // 点击其他地方隐藏弹框
  hideLog: function() {
    this.setData({
      diaLog: false
    });
  },
  // 新增下单商品
  addCommodity: function() {
    this.setData({
      showOneButtonDialog: true
    });
  },
  // 添加订单
  addOrder: function() {
    this.setData({
      diaLog: true
    });
  },
  // 客户订单
  customerOrder: function() {
    console.log(111);
    wx.navigateTo({
      url: '../customerOrder/customerOrder',
    })
  },
  // 自定义订单
  customOrder: function () {
    console.log(222);
    wx.navigateTo({
      url: '../customOrder/customOrder',
    })
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

  }
})