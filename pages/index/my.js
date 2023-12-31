const { api_getMyClub, api_removeMyClub, api_unbindStudent } = require("../../utils/api")

Page({
  data: {
    myClub: [],
    isBind: false
  },
  async onShow(options) {
    setInterval(() => {
      this.setData({
        isBind: getApp().isBind
      })
    }, 100);
    const res = await api_getMyClub()
    console.log(res);
    if (res.success) {
      this.setData({
        myClub: res.clubs
      })
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
  },
  removeClub(e) {
    console.log(e);
    wx.showModal({
      title: '提升',
      content: `你确定要删除${e.currentTarget.dataset.item.club_name}吗？删除后你仍然可以重新加入`,
      complete: async (res) => {
        if (res.cancel) {
          return
        }
        const rm_res = await api_removeMyClub(e.currentTarget.dataset.item.club_id)
        if (rm_res.success) {
          this.onShow()
        } else {
          wx.showToast({
            title: rm_res.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  adminLogin() {
    wx.navigateTo({
      url: '../login/admin_login',
    })
  },
  gotoBind() {
    wx.navigateTo({
      url: '../login/student_login',
    })
  },
  gotoUnbind() {
    api_unbindStudent().then(res => {
      if (res.success) {
        getApp().isBind = false
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  }
})