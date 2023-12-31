exports.getClubs = async (club_id, conn) => {
  const [rows] = await conn.query(`
    select * from t_club ${club_id ? `where club_id = ${club_id}` : ''};
  `)
  return {
    success: 1,
    clubs: rows,
    msg: '获取成功'
  }
}