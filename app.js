const { api_checkBind, api_getNotification } = require("./utils/api")
App({
  isBind: false,
  adminToken: '',
  onLaunch: async function () {
    wx.cloud.init({
      env: 'ldstzs-wxcloud-5g2jj4f2a73aa913'
    })
    const res = await api_checkBind()
    this.isBind = res.success

    api_getNotification().then(res => {
      if (res.success) {
        wx.showModal({
          title: '通知',
          content: res.notification,
          showCancel: false
        })
      }
    })
    //更新
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      updateManager.applyUpdate()
    })
  }
})
