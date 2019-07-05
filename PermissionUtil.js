/**
 * 申请权限工具类
 *
 * @author zhanghaohao  
 * @date 2019-6-24
 */

/**
 * 获取公告列表
 * @param params.permission 具体什么权限
 * @param params.title Modal的title
 * @param params.content Modal的content
 * @param params.success 成功授权后的回调
 * @param params.fail 失败授权后的回调
 *
 * @return
 */
function getPermission(params) {
  wx.getSetting({
    success: function(res) {
      var statu = res.authSetting;
      if (!statu[params.permission]) {
        wx.showModal({
          title: params.title,
          content: params.content,
          success: function(tip) {
            if (tip.confirm) {
              //按了确定按钮
              wx.openSetting({
                success: function(data) {
                  if (data.authSetting[params.permission] === true) {
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 1000
                    })
                    //授权成功之后，再调用success
                    if (params.success)
                      params.success();
                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'success',
                      duration: 1000
                    })
                    //授权失败之后，再调用fail
                    if (params.fail)
                      params.fail();
                  }
                }
              })
            } else if (tip.cancel) {
              console.log("quxiao");
              //按了取消按钮
              if (params.fail)
                params.fail();
            }
          }
        })
      }
    },
    fail: function(res) {
      wx.showToast({
        title: '调用授权窗口失败',
        icon: 'success',
        duration: 1000
      })
    }
  })
}

module.exports = {
  getPermission: getPermission
}