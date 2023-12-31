const { checkToken } = require("./crypt")

exports.updateClub = async (info, token, conn) => {
  console.log(info);
  const admin = checkToken(token)
  if (!admin) return { success: 0, msg: '登录已过期' }
  if (admin.priv == 0 || admin.priv == info.club_id) {
    const str = `update t_club set club_description = '${info.club_description}' , club_icon = '${info.club_icon}' where club_id = ${info.club_id}`
    console.log(str);
    const [rows, fields] = await conn.query(str)
    if (rows.changedRows) {
      return {
        success: 1,
        msg: '修改成功'
      }
    } else {
      return {
        success: 0,
        msg: '修改失败'
      }
    }
  } else {
    return {
      success: 0,
      msg: '无权限'
    }
  }
}