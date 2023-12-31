exports.changeUsernameAndPassword = async (username, password, priv, conn) => {
  const [rows] = await conn.query(`update t_admin set username = '${username}',password = '${password}' where priv = ${priv}`)
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