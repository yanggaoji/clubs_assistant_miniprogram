const { checkToken } = require("./crypt")

exports.changeUsernameAndPassword = async (username, password, token, conn) => {
  console.log(username, password, token, conn);
  const admin = checkToken(token)
  if (!admin) return { success: 0, msg: '登录已过期' }
  const [rows, fields] = await conn.query(`update t_admin set username = '${username}',password = '${password}' where username = '${admin.username}'`)
  if (rows.changedRows) {
    return {
      success: 1,
      msg: '修改成功'
    }
  } else {
    return {
      success: 0,
      msg: '修改失败，用户名已存在或服务器错误'
    }
  }
}