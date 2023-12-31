exports.removeClub = async (club_id, conn) => {
  try {
    const [rows] = await conn.query(`
      delete from t_club where club_id = ${club_id};
    `)
    return {
      success: 1,
      rows: rows,
      msg: '删除成功'
    }
  } catch (err) {
    return {
      success: 0,
      err: err,
      msg: '删除失败'
    }
  }
}