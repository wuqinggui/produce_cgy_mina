// pages/customerOrder.js
var purchaseApi = require('../../http/purchaseApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    id: '',
    array: ['美国', '中国', '巴西', '日本']
  },
  getData: function() {
    let params = {
      commdityId: this.data.id
    };
    purchaseApi.getPurchaseDetail(params).then((res) => {
      console.log(res);
      this.setData({
        info: res.data.length ? res.data[0] : {}
      });
    }).catch((err) => {
      console.log('获取详情数据失败', error);
      wx.showToast({
        title: error.message ? error.message : '获取详情数据失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id ? options.id : ''
    });
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
    this.getData();
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