const { api_bindStudent } = require("../../utils/api")

Page({
  data: {
    navigationBar: 40,
    userData: {},
    inputName: '',
    qq: 'null'
  },
  onLoad(e) {
    this.setData({
      userData: JSON.parse(decodeURIComponent(e.v))
    })
    //获取系统信息
    wx.getSystemInfo({
      success: res => {
        this.system = res
      }
    })
    //获取胶囊信息
    this.menu = wx.getMenuButtonBoundingClientRect()
    this.setData({
      navigationBar: this.menu.top
    })
  },
  close() {
    wx.navigateBack()
  },
  async bindStudent() {
    if (!this.data.inputName.length && !this.data.qq) return
    const res = await api_bindStudent(this.data.userData.stu_id, this.data.inputName, this.data.qq)
    if (res.success) {
      getApp().isBind = true
      // wx.reLaunch({
      //   url: './../index/home?toast=' + encodeURIComponent(res.msg),
      // })
      wx.navigateBack()
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'error'
      })
    }
  }
})
