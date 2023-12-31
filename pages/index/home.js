const { api_getList } = require("../../utils/api")

Page({
  list: [],
  data: {
    showList: [],
    clubCategorys: [
      { text: '选择分类', value: 'all' }
    ],
    category: 'all',
    searchStr: '',
    accountInfo: {}
  },
  async onLoad(options) {
    if (options.toast) {
      wx.showModal({
        title: '提示',
        content: decodeURIComponent(options.toast),
        showCancel: false,
      })
    }
    if (options.scene) {
      wx.navigateTo({
        url: './detail?target=' + options.scene,
      })
    }
    this.setData({
      accountInfo: wx.getAccountInfoSync().miniProgram
    })
  },
  async onShow() {
    const res = await api_getList()
    if (res.success) {
      const map = new Map();
      this.list = res.list
      res.list.forEach(val => {
        map.set(val.club_category, val.club_category)
      })
      const clubCategorys = [...map.keys()].map(val => {
        return { text: val, value: val, icon: '' }
      })
      clubCategorys.push({ text: '选择分类', value: 'all', icon: '' })
      this.setData({
        clubCategorys: clubCategorys,
      })
      this.listFilter()
    } else {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    }
  },
  changeCategory(e) {
    this.setData({
      category: e.detail
    })
    this.listFilter()
  },
  search(e) {
    this.setData({
      searchStr: e.detail
    })
    this.listFilter()
  },
  listFilter() {
    let showList = this.list
    showList = showList.filter(val => {
      return val.club_name.indexOf(this.data.searchStr) >= 0
    })
    if (this.data.category != 'all') {
      showList = showList.filter(val => {
        return val.club_category == this.data.category
      })
    }
    this.setData({
      showList: showList
    })
  },
  gotoDetail(e) {
    wx.navigateTo({
      url: './detail?target=' + e.currentTarget.dataset.item.club_id,
    })
  }
})