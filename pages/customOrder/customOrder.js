// pages/customerOrder.js
var purchaseApi = require('../../http/purchaseApi.js').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalNum: 0,
    totalMoney: 0,
    commodityName: '',
    orderCommoditEwVo: {
      mainDesc: '',
      shopdesc: '',
      smdesc: '',
    },
    id: '',
    product: []
  },
  // 获取详情数据
  getData: function() {
    let params = {
      commdityId: this.data.id
    };
    purchaseApi.getPurchaseDetail(params).then((res) => {
      if (res.data.length > 0) {
        let zero = 0;
        res.data.forEach((item) => {
          item.count_price = zero.toFixed(2);
          item.totalMoney = zero.toFixed(2);
          item.accountNumber = zero.toFixed(2);
        })
      }
      this.setData({
        product: res.data.length ? res.data : [],
        commodityName: res.data.length ? res.data[0].commodityName : '',
        orderCommoditEwVo: res.data.length ? res.data[0].orderCommoditEwVo : {}
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
  // 保存
  saveData: function() {
    let product = this.data.product;
    let params = {};
    let commodityDtos = {
      id: '',
      specKcList: []
    };
    if (product.length > 0) {
      let arr = [];
      commodityDtos.id = product[0].commodityId;
      product.forEach((item) => {
        commodityDtos.specKcList.push({
          id: item.specId,
          kc: item.accountNumber,
          price: item.price,
          totalMoney: item.totalMoney
        });
      })
    }
    params.commodityDtos = commodityDtos;
    purchaseApi.updatePurchase(params).then((res) => {
      wx.showToast({
        title: "保存成功",
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack();
    }).catch((error) => {
      console.log('保存详情数据失败', error);
      wx.showToast({
        title: error.message ? error.message : '保存详情数据失败',
        icon: 'none',
        duration: 2000
      })
    })
  },
  isNumber: function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
  },
  totalNum: function() {
    let product = this.data.product;
    let sum = 0;
    let num = 0;
    product.forEach((item) => {
      num += Number(item.accountNumber);
      sum += Number(item.totalMoney);
    })
    this.setData({
      totalMoney: sum.toFixed(2),
      totalNum: num
    });
  },
  bindKeyInput: function(e) {
    let key = e.currentTarget.dataset.key;
    let index = e.currentTarget.dataset.index;
    let product = this.data.product;
    product[index][key] = e.detail.value;
    let {
      totalMoney,
      accountNumber,
      count_price
    } = product[index];
    count_price = totalMoney / accountNumber;
    product[index]['count_price'] = this.isNumber(count_price) ? count_price.toFixed(2) : 0;
    this.setData({
      product: product
    });
    this.totalNum();
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
    let sj_userId = wx.getStorageSync('sj_userId')
    if (sj_userId) {
    this.getData();
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
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