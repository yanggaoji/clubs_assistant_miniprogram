exports.exportData = async (conn, cloud) => {
  const [rows] = await conn.query(`
    select t_student.stu_id,t_student.stu_name,t_student.ext,t_club.club_id,t_club.club_name
    from t_club,t_student,t_student_club 
    where t_student_club.stu_id = t_student.stu_id and t_student_club.club_id = t_club.club_id;
  `)
  console.log(rows);
  return {
    success: 1,
    msg: '获取成功',
    data: rows
  }
}