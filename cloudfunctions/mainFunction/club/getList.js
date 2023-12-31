exports.getList = async (conn) => {
  const [rows, fields] = await conn.query('select * from t_club')
  for (let i = 0; i < rows.length; i++) {
    rows[i].club_count = '暂不显示'
  }
  return {
    success: 1,
    msg: '成功',
    list: rows
  }
}