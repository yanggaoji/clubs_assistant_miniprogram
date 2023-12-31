const { api_selectStudent } = require("../../utils/api")

Page({
  isNeedDrop: false,
  data: {
    veCode: new Array(),
    isInput: true,
    navigationBar: 40
  },
  onLoad() {
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
  onShow() {
    if (this.isNeedDrop) {
      wx.navigateBack()
    }
  },
  inputValue(e) {
    let value = e.detail.value;
    let arr = [...value];
    this.setData({ veCode: arr })
  },
  focusCode() {
    this.setData({
      isInput: true
    })
  },
  async gotoVerify() {
    const stu_id = this.data.veCode.join('')
    if (stu_id.length != 10) return
    const res = await api_selectStudent(stu_id)
    if (res.success) {
      this.isNeedDrop = true
      wx.navigateTo({
        url: './student_verify?v=' + encodeURIComponent(JSON.stringify(res)),
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'error'
      })
    }
  },
  adminLogin() {
    wx.navigateTo({
      url: './admin_login',
    })
  },
  close() {
    wx.navigateBack()
  }
})
