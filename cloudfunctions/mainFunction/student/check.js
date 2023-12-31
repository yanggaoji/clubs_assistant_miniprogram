exports.checkBind = async (openid, conn) => {
  const [rows, fields] = await conn.query(`select * from t_student where openid = '${openid}'`)
  if (rows.length) {
    return {
      success: 1,
      msg: '已绑定'
    }
  } else {
    return {
      success: 0,
      msg: '未绑定'
    }
  }
}