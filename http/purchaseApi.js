var wxRequest = require('./request.js').wxRequest;
import {
  regionUrl,
  marketListUrl,
  marketcommodityUrl,
  shopClassUrl,
  shopSmallClassUrl,
  purchaseListUrl,
  purchaseDetailUrl,
  searchPriceUrl,
  updatePriceUrl
} from './url'

var purchaseApi = {
  // 市场管理列表
  marketList: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(marketListUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 市场商品管理列表
  marketcommodity: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(marketcommodityUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 获取大分类
  getShopClass: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(shopClassUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 获取小分类
  getShopSmallClass: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(shopSmallClassUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 获取采购列表
  getPurchaseList: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(purchaseListUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 获取采购详情
  getPurchaseDetail: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(purchaseDetailUrl, 'GET', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 获取价格修改界面数据
  searchPrice: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(searchPriceUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  },
  // 修改价格
  updatePrice: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(updatePriceUrl, 'POST', params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error))
    });
  }
}

export default purchaseApi;