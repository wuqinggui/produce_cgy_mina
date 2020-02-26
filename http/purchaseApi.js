var wxRequest = require('./request.js').wxRequest;
import {
  regionUrl,
  marketListUrl,
  marketcommodityUrl,
  shopClassUrl,
  shopSmallClassUrl
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
}

export default purchaseApi;