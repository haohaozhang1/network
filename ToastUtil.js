/**
 * toast工具类
 *
 * @author zhanghaohao  
 * @date 2019-7-2
 */


/**
 * toast
 * @return
 */
function showToast(content, icon, duration) {
  wx.showToast({
    title: content,
    icon: icon,
    duration: duration
  })
}

/**
 * toast
 * @return
 */
function showHintToast(content) {
  wx.showToast({
    title: content,
    icon: 'none',
    duration: 2000
  })
}

/**
 * 成功提示的toast
 * @return
 */
function showSuccessToast(content) {
  wx.showToast({
    title: content,
    icon: 'success',
    duration: 2000
  })
}

/**
 * 成功提示的toast并页面销毁
 * @return
 */
function showSuccessClose(content) {
  wx.showToast({
    title: content,
    icon: 'success',
    duration: 1000,
    mask: true,
    success: function() {
      setTimeout(function() {
        //要延时执行的代码
        wx.navigateBack({
          delta: 1
        })
      }, 1000) //延迟时间
    },
  });
}

module.exports = {
  showToast: showToast,
  showHintToast: showHintToast,
  showSuccessToast: showSuccessToast,
  showSuccessClose: showSuccessClose
}