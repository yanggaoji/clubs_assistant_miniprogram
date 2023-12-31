exports.getStudents = async (name = '', page = 1, limit = 20, conn) => {
  const [rows] = await conn.query(`
    select * from t_student where stu_name like '%${name}%' limit ${page - 1},${limit};
  `)
  const [total] = await conn.query(`
    select count(*) from t_student where stu_name like '%${name}%';
  `)
  return {
    success: 1,
    students: rows,
    total: total[0]['count(*)'],
    msg: '获取成功'
  }
}