// pages/updatePrice/updatePrice.js
var purchaseApi = require('../../http/purchaseApi.js').default;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    isSupplier: false, //判断是否显示供应商
    name: '', // 模糊搜索
    // 当前地区
    curRegion: {},
    // 当前地区在地区列表的index
    curRegionIndex: 0,
    // 地区列表
    regionList: [],
    // 当前店铺
    curShop: {},
    // 店铺列表
    shopList: [],
    shopPop: false, // 是否显示店铺弹框
    showShopList: false, // 是否显示店铺下拉列表
    // 大分类
    classList: [],
    // 小分类
    smallClassList: [],
    // 市场列表
    marketList: [],
    // 当前市场
    curMarket: {},
    // 当前大分类
    curBigClass: {},
    // 当前小分类
    curSmallClass: {},
    // 产品数据
    goodsList: [],
    // buyCarGoodtypeNum: 0,
    imgPlaceholder: '../../images/cai.jpg', // 默认图片
    isClickView: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
      this.pageInit();
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

  },

  // 页面初始化
  pageInit: function() {
    // this.getRegionList(); // 获取地区列表
    this.getShopClass(); // 获取大分类
  },
  // 更新价格
  changePrice: function() {
    let params = {
      commodityDtos: []
    };
    let goodsList = this.data.goodsList;
    if(goodsList.length > 0) {
      goodsList.forEach((item) => {
        let arr = [];
        if (item.specPriceVos.length > 0) {
          item.specPriceVos.forEach((item2) => {
            arr.push({
              id: item2.id,
              price: item2.price
            });
          })
        }
        params.commodityDtos.push({
          commdityBm: item.commdityBm,
          regionId: item.regionId,
          specList: arr
        });
      })
      purchaseApi.updatePrice(params).then((res) => {
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
      }).catch((err) => {
        console.log(error);
        // wx.showToast({
        //   title: error.message ? error.message : '更新失败',
        //   icon: 'none',
        //   duration: 2000
        // })
      })
    }
  },
  bindKeyInput: function(e) {
    let { index, priceindex } = e.currentTarget.dataset;
    let goodsList = this.data.goodsList;
    goodsList[index].specPriceVos[priceindex].price = e.detail.value;
    this.setData({
      goodsList: goodsList
    })
  },
  // 获取地区列表
  getRegionList: function() {
    purchaseApi.region()
      .then((res) => {
        console.log('获取地区数据成功', res);
        this.setData({
          regionList: res.data,
          curRegion: res.data.length > 0 ? res.data[0] : {},
          curRegionIndex: 0
        })
        this.getShopSmallClass(); // 查询小分类
        var regionId = getApp().globalData.userInfo.regionId ? getApp().globalData.userInfo.regionId : '';
        // 已登陆
        if (regionId) {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].id === regionId) {
              this.setData({
                curRegion: res.data[i],
                curRegionIndex: i
              })
              break
            }
          }
        }
      })
      .catch((error) => {
        console.log('获取地区数据失败', error);
        wx.showToast({
          title: error.message ? error.message : '获取地区数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 获取更新价格表
  getSearchPrice: function(smallClassId = '') {
    let params = {
      shopsmallclassId: smallClassId
    }
    purchaseApi.searchPrice(params)
      .then((res) => {
        console.log('获取更新价格表成功', res);
        let list = res.data.list;
        if (list.length > 0) {
          for(let i = 0; i < list.length; i++) {
            if (list[i].specPriceVos.length > 0) {
              for (let j = 0; j < list[i].specPriceVos.length; j ++) {
                list[i].specPriceVos[j].price = list[i].specPriceVos[j].price.toFixed(2);
              }
            }
          }
        }
        this.setData({
          scrollTop: 0,
          goodsList: res.data.list.length ? res.data.list : []
        });
      })
      .catch((error) => {
        console.log('获取更新价格表失败', error);
        wx.showToast({
          title: error.message ? error.message : '获取更新价格表失败',
          icon: 'none',
          duration: 2000
        })
      })
  },


  // 获取大分类
  getShopClass: function() {
    purchaseApi.getShopClass()
      .then((res) => {
        console.log('获取大分类数据成功', res);
        this.setData({
          classList: res.data.length ? res.data : [],
          curBigClass: res.data.length > 0 ? res.data[0] : {}
        })
        this.getShopSmallClass();
      })
      .catch((error) => {
        console.log('获取大分类数据失败', error);
        wx.showToast({
          title: error.message ? error.message : '获取大分类数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 查询小分类
  getShopSmallClass: function() {
    let params = {
      classId: this.data.curBigClass.id ? this.data.curBigClass.id : ''
    }
    purchaseApi.getShopSmallClass(params)
      .then((res) => {
        console.log('获取小分类数据成功', res);
        this.setData({
          smallClassList: res.data,
          curSmallClass: res.data.length > 0 ? res.data[0] : {}
        })
        this.getSearchPrice(this.data.curSmallClass.id); // 获取市场列表
      })
      .catch((error) => {
        console.log('获取小分类数据失败', error);
        wx.showToast({
          title: error.message ? error.message : '获取小分类数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 获取市场小分类对应的商品
  getCommodity: function() {
    wx.showLoading({
      title: '加载中',
    })
    var params = {
      marketId: this.data.curMarket.id || '',
      shopclassid: this.data.curSmallClass.id
    }
    purchaseApi.marketcommodity(params)
      .then((res) => {
        console.log('获取商品数据成功', res);
        wx.hideLoading();
        this.setData({
          goodsList: res.data.length ? res.data : [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
        })
      })
      .catch((error) => {
        console.log('获取商品数据失败', error);
        wx.hideLoading();
        wx.showToast({
          title: error.message ? error.message : '获取商品数据失败',
          icon: 'none',
          duration: 2000
        })
      })
  },

  // 模糊查询输入商品名称
  bingChangeName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 模糊查询
  searchName: function() {
    console.log('模糊查询')
    if (this.data.curRegion.id && this.data.curSmallClass.id) {
      this.getCommodity();
    }
  },


  backProduct: function() {
    this.setData({
      isSupplier: false
    });
  },

  // 切换地区
  // bindPickerChange: function(e) {
  //   // console.log('picker发送选择改变，携带值为', e.detail.value)
  //   var index = e.detail.value;
  //   if (this.data.curRegion.id && this.data.regionList[index].id && this.data.curRegion.id == this.data.regionList[index].id) {
  //     return
  //   } else {
  //     this.setData({
  //       curRegionIndex: index,
  //       curRegion: this.data.regionList[index]
  //     })
  //     this.getCommodity();
  //   }
  // },



  // 切换大分类
  handleChangeClass: function(e) {
    console.log(e.currentTarget.dataset)
    let {
      item
    } = e.currentTarget.dataset;
    if (item.id === this.data.curBigClass.id) {
      return
    }
    this.setData({
      curBigClass: item
    });
    this.getShopSmallClass();
  },
  //点击左侧小类 
  handleChangeSmallClass: function(e) {
    console.log(e);
    let {
      item
    } = e.currentTarget.dataset;
    if (item.id === this.data.curSmallClass.id) {
      return
    }
    this.setData({
      curSmallClass: item
    });
    this.getSearchPrice(item.id);
  },

  // 点击左侧市场菜单
  handleChangeMarket: function(e) {
    console.log(e)
    let {
      item
    } = e.currentTarget.dataset;
    if (item.id === this.data.curMarket.id) {
      return
    }
    this.setData({
      curMarket: item
    });
    this.getCommodity();
  },

  // 获取店铺
  // getShopList: function () {
  //   wx.showLoading({
  //     title: '加载中',
  //   });
  //   var userId = getApp().globalData.userInfo.id;
  //   var params = {
  //     page: {
  //       page: 1,
  //       size: 100
  //     },
  //     type: 0,
  //     userId: userId
  //   }
  //   purchaseApi.buyShop(params)
  //     .then((res) => {
  //       console.log('获取店铺成功', res);
  //       wx.hideLoading();
  //       this.setData({
  //         shopList: res.data.list ? res.data.list : [],
  //         curShop: res.data.list && res.data.list.length > 0 ? res.data.list[0] : {}
  //       })
  //       this.showShopPop();
  //     })
  //     .catch((error) => {
  //       console.log('获取店铺失败', error);
  //       wx.hideLoading();
  //       wx.showToast({
  //         title: error.message ? error.message : '获取店铺数据失败',
  //         icon: 'none',
  //         duration: 2000
  //       })
  //     })
  // },
  // 显示店铺弹框
  // showShopPop: function () {
  //   this.setData({
  //     shopPop: true,
  //     showShopList: false
  //   })
  // },
  // 显示店铺下拉数据
  // showShopSelect: function () {
  //   this.setData({
  //     showShopList: !this.data.showShopList
  //   })
  // },
  // 切换店铺
  // changeShop: function (e) {
  //   console.log(e)
  //   let { shopItem } = e.currentTarget.dataset;
  //   this.setData({
  //     curShop: shopItem,
  //     showShopList: false
  //   })
  // },
  // 确认切换店铺
  // sureChangeShop: function (e) {
  //   if (!this.data.curShop.id) {
  //     wx.showToast({
  //       title: '没有店铺数据不能添加购物车，请选择购买店铺',
  //       icon: 'none',
  //       duration: 2000
  //     })
  //     return
  //   }
  //   this.setData({
  //     showShopList: false,
  //     shopPop: false
  //   })
  //   this.sureAddCar();
  // },
  // 关闭店铺弹框
  // hidShopPop: function () {
  //   this.setData({
  //     showShopList: false,
  //     shopPop: false
  //   })
  // },

  // // 确认添加到购物车
  // sureAddCar: function () {
  //   wx.showLoading({
  //     title: '添加中',
  //   });
  //   var shopCommoditDto = [];
  //   var data = this.data.goodsList;
  //   for (var i = 0; i < data.length; i++) {
  //     for (var j = 0; j < data[i].specpricelst.length; j++) {
  //       if (data[i].specpricelst[j].isSelect) {
  //         var item = {
  //           id: data[i].id,
  //           spec: data[i].specpricelst[j].spec.id,
  //           number: 1
  //         }
  //         shopCommoditDto.push(item)
  //       }
  //     }
  //   }
  //   var params = {
  //     shopCommoditDto: shopCommoditDto,
  //     shopId: this.data.curShop.id,
  //     userId: getApp().globalData.userInfo.id,
  //   }
  //   purchaseApi.addCar(params)
  //   .then((res) => {
  //     console.log('商品添加进购物车成功', res);
  //     wx.hideLoading();
  //     wx.showToast({
  //       title: '添加成功',
  //       icon: 'success',
  //       duration: 1000
  //     })
  //     var data = this.data.goodsList;
  //     for (var a = 0; a < data.length; a++) {
  //       for (var b = 0; b < data[a].specpricelst.length; b++) {
  //         data[a].specpricelst[b].isSelect = false;
  //       }
  //     }
  //     this.setData({
  //       goodsList: data,
  //       buyCarGoodtypeNum: 0
  //     })
  //   })
  //   .catch((error) => {
  //     console.log('商品添加进购物车失败', error);
  //     wx.hideLoading();
  //     wx.showToast({
  //       title: error.message ? error.message : '添加失败',
  //       icon: 'none',
  //       duration: 2000
  //     })
  //   })
  // }
})