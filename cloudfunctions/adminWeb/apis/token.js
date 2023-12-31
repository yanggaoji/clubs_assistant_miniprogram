const jwt = require('jsonwebtoken')
const key = 'LCULCULCUCL'
const superAdmin = {
  username: 'admin',
  password: '3b02d5e7b42e9f42080c122239bd9ccb4b297a598b4ecd3fef772c8074b221e7'
}
//lcu123456
function signAdmin(username, priv) {
  return jwt.sign({
    data: { username, priv }
  }, key, { expiresIn: '1h' });
}
exports.verify = (jwtStr) => {
  try {
    return jwt.verify(jwtStr, key).data
  } catch (error) {
    return false
  }
}
exports.login = async (username, password, conn) => {
  if (username == superAdmin.username && password == superAdmin.password) {
    return {
      success: 1,
      msg: '登录成功',
      token: signAdmin(superAdmin.username, 0)
    }
  }
  const [rows] = await conn.query(`select * from t_admin where username = '${username}' and password = '${password}'`)
  if (!rows.length) {
    return {
      success: 0,
      msg: '用户名或密码不正确'
    }
  }
  return {
    success: 1,
    msg: '登录成功',
    token: signAdmin(rows[0].username, rows[0].priv)
  }
}