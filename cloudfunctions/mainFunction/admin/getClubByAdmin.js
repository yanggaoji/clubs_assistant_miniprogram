const { checkToken } = require("./crypt")

exports.getClubByAdmin = async (token, conn) => {
  const admin = checkToken(token)
  if (!admin) return { success: 0, msg: '登录已过期' }
  if (admin.priv == 0) {
    const [rows, fields] = await conn.query(`select * from t_club`)
    return {
      success: 1,
      msg: '获取成功',
      clubs: rows
    }
  } else {
    const [rows, fields] = await conn.query(`select * from t_club where club_id = '${admin.priv}'`)
    return {
      success: 1,
      msg: '获取成功',
      clubs: rows
    }
  }
}