const cloud = require('wx-server-sdk')
const mysql = require('mysql2/promise')
const { getStudents } = require('./apis/getStudents')
const { getClubs } = require('./apis/getClubs')
const { exportData } = require('./apis/exportData')
const { uploadStudent } = require('./apis/uploadStudent')
const { removeStudent } = require('./apis/removeStudent')
const { updateClub } = require('./apis/updateClub')
const { img2Cloud } = require('./apis/img2Cloud')
const { removeClub } = require('./apis/removeClub')
const { verify, login } = require('./apis/token')
const { getClubQRcode } = require('./apis/getClubQRcode')
const { changeUsernameAndPassword } = require('./apis/changeUsernameAndPassword')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

async function route(event, conn) {

  if (event.func == 'login') {
    return await login(event.data.username, event.data.password, conn)
  }
  if (verify(event.token) && verify(event.token).priv != 0)
    switch (event.func) {
      case 'getClubs':
        return await getClubs(verify(event.token).priv, conn)
      case 'updateClub':
        if (event.data.club_info.club_id == verify(event.token).priv)
          return await updateClub(event.data.club_info, conn)
      case 'img2Cloud':
        return await img2Cloud(event.data.imgurl)
      case 'getClubQRcode':
        if (event.data.club_id == verify(event.token).priv)
          return await getClubQRcode(event.data.club_id, cloud)
      case 'changeUsernameAndPassword':
        if (event.data.club_id == verify(event.token).priv)
          return await changeUsernameAndPassword(event.data.username, event.data.password, event.data.club_id, conn)
      default:
        return {
          success: 0,
          msg: '无权限'
        }
    }
  if (verify(event.token) && verify(event.token).priv == 0)
    switch (event.func) {
      case 'getStudents':
        return await getStudents(event.data.name, event.data.page, event.data.limit, conn)
      case 'getClubs':
        return await getClubs(null, conn)
      case 'exportData':
        return await exportData(conn, cloud)
      case 'uploadStudent':
        return await uploadStudent(event.data.dataStr, conn)
      case 'removeStudent':
        return await removeStudent(event.data.stu_id, conn)
      case 'updateClub':
        return await updateClub(event.data.club_info, conn)
      case 'img2Cloud':
        return await img2Cloud(event.data.imgurl)
      case 'removeClub':
        return await removeClub(event.data.club_id, conn)
      case 'getClubQRcode':
        return await getClubQRcode(event.data.club_id, cloud)
      case 'changeUsernameAndPassword':
        return await changeUsernameAndPassword(event.data.username, event.data.password, event.data.club_id, conn)
    }
}

exports.main = async (event, context) => {
  console.log(event);
  console.log(verify(event.token));
  if (event.func != 'login' && !event.token) {
    return {
      success: 0,
      msg: '请先登录',
      needToken: true
    }
  }
  const conn = await mysql.createConnection({
    host: '***************',
    port: 28628,
    user: '*****',
    password: '**********',
    database: '*****'
  }).catch(err => {
    return null
  })
  if (!conn) return { success: 0, msg: '服务器繁忙，请稍后再试' }
  return await route(event, conn).then(async res => {
    await conn.end()
    return res
  }).catch(async err => {
    await conn.end()
    return {
      success: 0,
      _err: JSON.stringify(err),
      msg: '发生未知错误，请稍后再试',
      err
    }
  })
}