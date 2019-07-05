/**
 * promise工具类
 *
 * @author zhanghaohao  
 * @date 2019-6-20
 */

/**
 * 把微信小程序原生的方法定制成promise
 * @param fn
 */
function wxPromisify(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function(res) {
        resolve(res)
      }

      obj.fail = function(res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

module.exports = {
  wxPromisify: wxPromisify
}

// var util = require('../utils/util')

// var getLocationPromisified = util.wxPromisify(wx.getLocation)

// getLocationPromisified({
//   type: 'wgs84'
// }).then(function (res) {
//   var latitude = res.latitude
//   var longitude = res.longitude
//   var speed = res.speed
//   var accuracy = res.accuracy
// }).catch(function () {
//   console.error("get location failed")
// })