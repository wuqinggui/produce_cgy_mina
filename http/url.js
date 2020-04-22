export const baseUrl = 'https://www.yuannong.shop:8019/trade/';

// 用户模块
export const loginURL = baseUrl + 'nmUser/loginCgWx'; // 登陆
export const tokenURL = baseUrl + 'nmUser/getToken'; // 根据token获取用户信息

export const regionUrl = baseUrl + 'region/findAll'; // 获取所有地区的接口
export const shopClassUrl = baseUrl + 'shopclass/findAll'; // 查询大分类的接口
export const shopSmallClassUrl = baseUrl + 'shopsmallclass/findList'; // 查询小分类的接口
export const marketListUrl = baseUrl + 'market/findList'; // 市场管理列表
export const marketcommodityUrl = baseUrl + 'marketcommodity/findList'; // 市场商品管理列表

// 首页采购列表
export const purchaseListUrl = baseUrl + 'orderCommdityController/findOrderCommdityCg';
// 采购详情
export const purchaseDetailUrl = baseUrl + 'orderCommdityController/findOrderCommdityCgxq';
// 查询更改价格数据接口
export const searchPriceUrl = baseUrl + 'commodity/searchByCommodity';
// 更改价格接口
export const updatePriceUrl = baseUrl + 'commodity/update';
