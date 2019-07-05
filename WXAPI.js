/**
 * 网络请求封装API类
 *
 * @author zhanghaohao  
 * @date 2019-6-19
 */
var HTTP = require('HTTP.js');
var util = require('../utils/util');

/**
 * 测试例子
 */
function test() {
  var reqParams = {
    loading: "获取中",
    url: '/demo/test/object',
    params: {
      "avatarUrl": '1111'
    }
  }
  // WXAPI.test().then(res => {
  //   console.log(res);
  // });
  return HTTP.postRequest(reqParams);
}

/**
 * 登录接口
 * @param code 微信登录获取的code
 * @param userinfo 获取userinfo得到的
 * @param phoneDetail 获取手机号得到的
 */
function login(code, userinfo, sessionKey, latitude, longitude, phoneDetail) {
  var reqParams = {
    loading: "登录中",
    url: '/api/auth/promoter/login',
    params: {
      "sessionKey": util.notNullValue(sessionKey),
      'iv': phoneDetail.iv,
      'encryptedData': phoneDetail.encryptedData,
      "code": util.notNullValue(code),
      "avatarUrl": userinfo == null ? "" : userinfo.avatarUrl,
      "city": userinfo == null ? "" : userinfo.city,
      "country": userinfo == null ? "" : userinfo.country,
      "gender": userinfo == null ? "" : userinfo.gender,
      "language": userinfo == null ? "" : userinfo.language,
      "nickName": userinfo == null ? "" : userinfo.nickName,
      "province": userinfo == null ? "" : userinfo.province,
      "latitude": latitude,
      "longitude": longitude
    }
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 获取通知消息列表
 */
function getNoticeList(loading) {
  var reqParams = {
    url: '/api/notice/record',
    params: {}
  }
  if (loading != null) {
    reqParams.loading = loading;
  }
  return HTTP.postRequest(reqParams);
}

/**
 * home页面查询汇总{当前场地，当前活动，今日排名，二维码}
 * @param longitude
 * @param latitude
 */
function getHomeInformation(longitude, latitude, loading) {
  var reqParams = {
    url: '/api/promoter/attended/promotion',
    //todo 死数据
    params: {
      "longitude": "120.1938420490",
      "latitude": "30.2709710411"
    }
  }
  if (loading != null) {
    reqParams.loading = loading;
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 获取更多活动
 */
function getMoreActivitys() {
  var reqParams = {
    loading: "获取更多活动",
    url: '/api/promoter/list/promotion/info',
    params: {}
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 切换活动
 * @param promotionId 活动id
 */
function changeActivity(promotionId) {
  var reqParams = {
    loading: "请稍等",
    url: '/api/promoter/change/attended/promotion',
    params: {
      "promotionId": promotionId
    },
    ContentType: "application/x-www-form-urlencoded"
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 查询今日签到次数
 */
function signCount() {
  var reqParams = {
    loading: "请稍等",
    url: '/api/check/in/count/today',
    params: {}
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 获取场地列表
 * @param latitude 纬度
 * @param longitude 经度
 */
function getSignList(latitude, longitude) {
  var reqParams = {
    loading: "获取场地列表中",
    url: '/api/promoter/sign/place/list',
    params: {
      "latitude": latitude,
      "longitude": longitude
    }
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 签到
 * @param photo 照片
 * @param placeId 场地id
 */
function signIn(photo, placeId) {
  var reqParams = {
    loading: "签到中",
    url: '/api/check/in/sign/in',
    params: {
      "photo": photo,
      "placeId": placeId
    }
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 新建场地
 * @param entranceNumber 入口数
 * @param houseNumber 住户数
 * @param latitude 纬度
 * @param longitude 经度
 * @param name 场地名称
 */
function createSite(entranceNumber, houseNumber, latitude, longitude, name) {
  var reqParams = {
    loading: "创建中",
    url: '/api/offline/place/add',
    params: {
      "entranceNumber": entranceNumber,
      "houseNumber": houseNumber,
      "latitude": latitude,
      "longitude": longitude,
      "name": name
    }
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 个人排行榜
 * @param date  TODAY/WEEK/MONTH
 */
function personalRank(date) {
  var reqParams = {
    loading: "获取小组排行榜中",
    url: '/api/statistical/personal',
    params: {
      "timestamp": date
    },
    ContentType: "application/x-www-form-urlencoded"
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 小组排行榜
 * @param date  TODAY/WEEK/MONTH
 */
function groupRank(date) {
  var reqParams = {
    loading: "获取小组排行榜中",
    url: '/api/statistical/group',
    params: {
      "timestamp": date
    },
    ContentType: "application/x-www-form-urlencoded"
  }
  return HTTP.postRequest(reqParams);
}
 
/**
 * 查询地推人员主页
 * @param 
 */
function getUser() {
  var reqParams = {
    loading: "获取主页中",
    url: '/api/promoter/home/page',
    params: {},
    ContentType: "application/x-www-form-urlencoded"
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 修改姓名
 * @param 
 */
function changeName(name) {
  var reqParams = {
    loading: "修改姓名",
    url: '/api/promoter/change/name',
    params: {
      "name": name
    },
    ContentType: "application/x-www-form-urlencoded"
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 月收入明细
 * @param 
 */
function incomeByMonth() {
  var reqParams = {
    loading: "获取收入中",
    url: '/api/data/statistics/month',
    params: {},
    ContentType: "application/x-www-form-urlencoded"
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 周收入明细
 * @param 
 */
function incomeByWeek() {
  var reqParams = {
    loading: "获取收入中",
    url: '/api/data/statistics/week',
    params: {},
    ContentType: "application/x-www-form-urlencoded"
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 日收入明细
 * @param 
 */
function incomeByDay() {
  var reqParams = {
    loading: "获取收入中",
    url: '/api/data/statistics/today',
    params: {},
    ContentType: "application/x-www-form-urlencoded"
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 指定日期区间收入明细
 * @param beginTime long类型时间戳
 * @param endTime long类型时间戳
 */
function incomeByDate(beginTime, endTime) {
  var reqParams = {
    loading: "获取收入中",
    url: '/api/data/statistics/interval',
    params: {
      "et": endTime,
      "bt": beginTime
    },
    ContentType: "application/x-www-form-urlencoded"
  }
  return HTTP.postRequest(reqParams);
}

/**
 * 收入详情
 * @param time long类型时间戳
 */
function incomeDetails(time) {
  var reqParams = {
    loading: "获取数据中",
    url: '/api/data/statistics/daily/detail',
    params: {
      "bt": time
    },
    ContentType: "application/x-www-form-urlencoded"
  }
  return HTTP.postRequest(reqParams);
}


module.exports = {
  login: login,
  getNoticeList: getNoticeList,
  getHomeInformation: getHomeInformation,
  getMoreActivitys: getMoreActivitys,
  changeActivity: changeActivity,
  signCount: signCount,
  getSignList: getSignList,
  signIn: signIn,
  createSite: createSite,
  personalRank: personalRank,
  groupRank: groupRank,
  getUser: getUser,
  changeName: changeName,
  incomeByMonth: incomeByMonth,
  incomeByWeek: incomeByWeek,
  incomeByDay: incomeByDay,
  incomeByDate: incomeByDate,
  incomeDetails: incomeDetails
}