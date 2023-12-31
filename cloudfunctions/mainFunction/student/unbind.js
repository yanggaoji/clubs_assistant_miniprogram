exports.unbindStudent = async (openid, conn) => {
  const [rows, fields] = await conn.query(`update t_student set openid = null where openid = '${openid}'`)
  if (rows.changedRows) {
    return {
      success: 1,
      msg: '解绑成功'
    }
  } else {
    return {
      success: 0,
      msg: '解绑失败'
    }
  }
}