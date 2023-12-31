const cloud = require('wx-server-sdk')
const mysql = require('mysql2/promise')
const { selectStudent, bindStudent } = require('./student/bind')
const { getList } = require('./club/getList')
const { checkBind } = require('./student/check')
const { getClub } = require('./club/getClub')
const { joinClub } = require('./student/joinClub')
const { getMyClub } = require('./student/getMyClub')
const { removeMyClub } = require('./student/removeMyClub')
const { loginAdmin } = require('./admin/loginAdmin')
const { getClubByAdmin } = require('./admin/getClubByAdmin')
const { updateClub } = require('./admin/updateClub')
const { getClubQRcode } = require('./admin/getClubQRcode')
const { changeUsernameAndPassword } = require('./admin/changeUsernameAndPassword')
const { unbindStudent } = require('./student/unbind')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const route = async (event, conn) => {
  switch (event.func) {
    case 'selectStudent':
      return await selectStudent(event.data.stu_id, conn)
    case 'bindStudent':
      return await bindStudent(event.data.stu_id, event.data.stu_name, event.openid, conn)
    case 'unbindStudent':
      return await unbindStudent(event.openid, conn)
    case 'getList':
      return await getList(conn)
    case 'checkBind':
      return await checkBind(event.openid, conn)
    case 'getClub':
      return await getClub(event.data.club_id, conn)
    case 'joinClub':
      return await joinClub(event.data.club_id, event.openid, conn)
    case 'getMyClub':
      return await getMyClub(event.openid, conn)
    case 'removeMyClub':
      return await removeMyClub(event.openid, event.data.club_id, conn)
    case 'loginAdmin':
      return await loginAdmin(event.data.username, event.data.password, conn)
    case 'getClubByAdmin':
      return await getClubByAdmin(event.data.token, conn)
    case 'updateClub':
      return await updateClub(event.data.info, event.data.token, conn)
    case 'getClubQRcode':
      return await getClubQRcode(event.data.club_id, event.data.token, cloud)
    case 'changeUsernameAndPassword':
      return await changeUsernameAndPassword(event.data.username, event.data.password, event.data.token, conn)
    case 'getNotification':
      return {
        success: 0,
        notification: 'tets'
      }
  }
}

function detectSqlInjection(_obj) {
  //提取value
  function flattenJSON(json) {
    let result = '';
    function traverse(obj) {
      for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          traverse(obj[key]);
        } else {
          result += obj[key] + ' ';
        }
      }
    }
    traverse(json);
    return result.trim();
  }
  const text = flattenJSON(_obj)
  // 定义常见的 SQL 注入关键字和特殊字符
  const sqlKeywords = ["SELECT", "INSERT", "UPDATE", "DELETE", "DROP", "UNION", "OR", "AND"];
  const specialChars = ["'", ";", "--", "/*", "*/"];
  // 检查关键字
  for (let i = 0; i < sqlKeywords.length; i++) {
    if (text.toUpperCase().indexOf(sqlKeywords[i]) !== -1) {
      console.log(sqlKeywords[i]);
      return true;
    }
  }
  // 检查特殊字符
  for (let i = 0; i < specialChars.length; i++) {
    if (text.indexOf(specialChars[i]) !== -1) {
      console.log(specialChars[i]);
      return true;
    }
  }
  return false;
}

exports.main = async (event, context) => {
  console.log(event);
  // return {
  //   success: 0,
  //   msg: '系统正在升级2023.10.7'
  // }
  if (detectSqlInjection(event.data ? event.data : {})) {
    return {
      success: 0,
      msg: '阻止访问'
    }
  }
  const wxContext = cloud.getWXContext()
  event.openid = wxContext.OPENID
  if (!event.openid || event.openid == '') {
    return {
      success: 0,
      msg: '禁止的访问状态'
    }
  }
  const conn = await mysql.createConnection({
    host: '***************',
    port: 28628,
    user: '*****',
    password: '**********',
    database: '*****'
  }).catch(err => {
    console.log(err);
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
      err: err,
      msg: '发生未知错误，请稍后再试'
    }
  })
}