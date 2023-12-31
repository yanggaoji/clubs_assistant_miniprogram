const callFunction = async (func, data) => {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return wx.cloud.callFunction({
    name: 'mainFunction',
    data: {
      func, data
    }
  }).then(res => {
    console.log(res);
    return res.result
  }).catch(err => {
    console.log(err);
    return null
  }).finally(() => {
    wx.hideLoading()
  })
}

exports.api_selectStudent = (stu_id) => {
  return callFunction('selectStudent', { stu_id: stu_id })
}

exports.api_bindStudent = (stu_id, stu_name, qq) => {
  return callFunction('bindStudent', { stu_id, stu_name, qq })
}

exports.api_unbindStudent = () => {
  return callFunction('unbindStudent')
}

exports.api_getList = () => {
  return callFunction('getList')
}

exports.api_checkBind = () => {
  return callFunction('checkBind')
}

exports.api_getClub = (club_id) => {
  return callFunction('getClub', { club_id: club_id })
}

exports.api_joinClub = (club_id) => {
  return callFunction('joinClub', { club_id: club_id })
}

exports.api_getMyClub = () => {
  return callFunction('getMyClub')
}

exports.api_removeMyClub = (club_id) => {
  return callFunction('removeMyClub', { club_id: club_id })
}

exports.api_loginAdmin = (username, password) => {
  return callFunction('loginAdmin', { username, password })
}

exports.api_getClubByAdmin = () => {
  return callFunction('getClubByAdmin', { token: getApp().adminToken })
}

exports.api_updateClub = (info) => {
  return callFunction('updateClub', { info: info, token: getApp().adminToken })
}

exports.api_getClubQRcode = (club_id) => {
  return callFunction('getClubQRcode', { club_id: club_id, token: getApp().adminToken })
}

exports.api_changeUsernameAndPassword = (username, password) => {
  return callFunction('changeUsernameAndPassword', { username: username, password: password, token: getApp().adminToken })
}

exports.api_getNotification = ()=>{
  return callFunction('getNotification')
}