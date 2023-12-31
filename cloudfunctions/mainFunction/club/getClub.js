exports.getClub = async (club_id, conn) => {
  const [rows, fields] = await conn.query(`select * from t_club where club_id = ${club_id}`)
  if (rows.length) {
    for (let i = 0; i < rows.length; i++) {
      rows[i].club_count = '暂不显示'
    }
    return {
      success: 1,
      msg: '成功',
      club: rows[0]
    }
  } else {
    return {
      success: 0,
      msg: '社团不存在',
    }
  }

}