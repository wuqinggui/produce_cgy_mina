var wxRequest = require('./request.js').wxRequest;
import {
  regionUrl,
  marketListUrl,
  marketcommodityUrl
} from './url'

var purchaseApi = {
  // 市场管理列表
  marketList: function (params) {
    return new Promise((resolve, reject) => {
      wxRequest(marketListUrl, 'GET', params)
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
}

export default purchaseApi;