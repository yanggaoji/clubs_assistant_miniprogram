exports.getMyClub = async (openid, conn) => {
  const [rows, fields] = await conn.query(`select * from t_student_club,t_club where stu_id = (select stu_id from t_student where openid = '${openid}') and t_club.club_id = t_student_club.club_id`)
  return {
    success: 1,
    msg: '成功',
    clubs: rows
  }
}