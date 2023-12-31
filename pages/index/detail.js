const { api_getClub, api_joinClub } = require("../../utils/api")

Page({
  data: {
    club: {
      club_name: '',
      club_name: '',
      club_category: '',
      club_description: '',
      club_icon: ''
    },
    isBind: 0
  },

  async onLoad(options) {
    console.log(options);
    if (options.detail) {
      const club = JSON.parse(decodeURIComponent(options.detail))
      this.setData({
        club
      })
    } else if (options.target) {
      const res = await api_getClub(options.target)
      if (res.success) {
        this.setData({
          club: res.club
        })
      } else {
        wx.reLaunch({
          url: './home?toast=' + encodeURIComponent('找不到该社团'),
        })
      }
    } else {
      wx.reLaunch({
        url: './home?toast=' + encodeURIComponent('找不到该社团'),
      })
    }
  },
  onShow() {
    setInterval(() => {
      this.setData({
        isBind: getApp().isBind
      })
    }, 100);
  },
  back() {
    wx.navigateBack()
  },
  async onSubmit() {
    if (!this.data.isBind) {
      wx.showModal({
        title: '需要绑定',
        content: '您还没有绑定您的个人信息，只有绑定之后才能加入',
        confirmText: '前往绑定',
        cancelText: '我再想想',
        success(res) {
          if (res.cancel) return
          wx.navigateTo({
            url: '../login/student_login',
          })
        }
      })
      return
    }
    const res = await api_joinClub(this.data.club.club_id)
    if (res.success) {
      wx.reLaunch({
        url: './home?toast=' + encodeURIComponent(res.msg),
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
  }
})