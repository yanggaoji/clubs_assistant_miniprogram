const { encrypt } = require("./crypt")

exports.loginAdmin = async (username, password, conn) => {
  const [rows, fields] = await conn.query(`select * from t_admin where username = '${username}' and password = '${password}'`)
  if (rows.length) {
    return {
      success: 1,
      msg: '登录成功',
      token: encrypt(JSON.stringify({
        ...rows[0],
        time: Date.now() / 1000
      }))
    }
  } else {
    return {
      success: 0,
      msg: '用户名密码不正确',
    }
  }
}