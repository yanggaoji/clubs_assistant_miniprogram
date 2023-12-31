exports.removeMyClub = async (openid, club_id, conn) => {
  const [rows, fields] = await conn.query(`delete from t_student_club where club_id = ${club_id} and stu_id = (select stu_id from t_student where openid = '${openid}')`)
  console.log(rows);
  if (rows.affectedRows) {
    return {
      success: 1,
      msg: '删除成功'
    }
  } else {
    return {
      success: 0,
      msg: '删除失败，请稍后再试'
    }
  }
}