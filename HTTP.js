/**
 * 网络请求类
 *
 * @author zhanghaohao  
 * @date 2019-6-19
 */

const statusCode_success = '200'; //开发者服务器返回的 HTTP 成功状态码
const CODE_SUCCESS = '0'; //接口请求成功的CODE
const CODE_TOKEN_TIMEOUT = '50001'; //用户token过期CODE
const config = require('../config.js');
const ModalUtil = require('../utils/ModalUtil.js');
const ToastUtil = require('../utils/ToastUtil.js');
const util = require('../utils/util.js');

// //请求返回体模型
const httpModel = {
  code: 0,
  message: '',
  object: {}
}

/**
 * 拦截器
 */
function requestInterceptor(reqParams) {
  //做请求前的拦截处理

  return reqParams;
}

/**
 * 失败返回统一处理
 */
function handleFailResponse(message) {
  wx.showToast({
    title: message,
    icon: 'loading',
    duration: 2000
  })
}

/**
 * 打印请求地址
 */
function logRequestUrl(reqParams) {
  //显示请求路径
  var url = '请求路径: ' + config.API_SERVICE + reqParams.url;
  var paramCount = objCount(reqParams.params);
  if (paramCount > 0) {
    url += '?';
  }
  var i = 0;
  for (var item in reqParams.params) { //用javascript的for/in循环遍历对象的属性 
    if (i != (paramCount - 1)) { //不是最后一个才加上&
      url += item + "=" + reqParams.params[item] + '&';
    } else {
      url += item + "=" + reqParams.params[item];
    }

    i++;
  }
  console.log(url);
}

/**
 * 获取对象、数组的长度、元素个数
 * 
 * @param obj 要计算长度的元素，可以为object、array、string
 */
function objCount(obj) {
  var objType = typeof obj;
  if (objType == "string") {
    return obj.length;
  } else if (objType == "object") {
    var objLen = 0;
    for (var i in obj) {
      objLen++;
    }
    return objLen;
  }
  return false;
}

function wxPromise(method, reqParams) {
  
  //返回一个Promise对象
  return new Promise(function(resolve, reject) {
    //打印请求地址
    // logRequestUrl(reqParams);
    //判断是否需要显示loading
    var isLoading = false;
    if (reqParams.loading != null && reqParams.loading != '') {
      isLoading = true;
      wx.showLoading({
        title: reqParams.loading,
      })
    }
    var ContentType = reqParams.ContentType;
    if (util.isNullValue(ContentType)) {
      ContentType = "application/json";
    }
    wx.request({
      url: config.API_SERVICE + reqParams.url,
      method: method,
      data: reqParams.params,
      //在header中统一封装报文头，这样不用每个接口都写一样的报文头定义的代码
      header: {
        "Content-Type": ContentType,
        "token": "a00eafcbc2d9abd3f1c39bf62164302a"
      },
      success: function(res) {
        //关闭loading
        if (isLoading)
          wx.hideLoading();

        //根据自己项目服务端定义的正确的返回码来进行
        if (res.data.errorCode == CODE_SUCCESS) {
          resolve(res.data.body);
        } else if (res.data.errorCode == CODE_TOKEN_TIMEOUT){
          //token失效
          wx.showModal({
            title: '提示',
            content: errMsg,
            confirmColor: '#118EDE',
            showCancel: false,
            success: function (res) {
              if (res.confirm) { }
            }
          });
        } else {
          var errMsg = res.data.message == null ? '异常' : res.data.message;
          //如果出现异常则弹出toast
          ToastUtil.showHintToast(errMsg);
          reject(res);
        }
      },
      fail: function(res) {
        console.log(res);
        //关闭loading
        if (isLoading)
          wx.hideLoading();
        ToastUtil.showHintToast('请求异常');
        reject(res);
      },
      complete: function(res) {
      },

    });
  });
}


function getRequest(reqParams) {
  reqParams = requestInterceptor(reqParams);
  return wxPromise("GET", reqParams);
}

function postRequest(reqParams) {
  reqParams = requestInterceptor(reqParams);
  return wxPromise("POST", reqParams);
}

module.exports = {
  postRequest: postRequest,
  getRequest: getRequest,
}