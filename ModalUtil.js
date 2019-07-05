/**
 * showModal工具类
 *
 * @author zhanghaohao  
 * @date 2019-7-2
 */


/**
 * 单纯的警示框
 * @param msg 提示信息
 * @return
 */
function showCautionModal(msg) {
  wx.showModal({
    title: '提示',
    content: msg,
    confirmColor: '#118EDE',
    showCancel: false
  });
}

module.exports = {
  showCautionModal: showCautionModal
}