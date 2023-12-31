exports.removeStudent = async (stu_id, conn) => {
  try {
    const [rows] = await conn.query(`
      delete from t_student ${stu_id ? `where stu_id = ${stu_id}` : ''};
    `)
    return {
      success: 1,
      rows: rows,
      msg: '删除成功'
    }
  } catch (err) {
    return {
      success: 0,
      err: JSON.stringify(err),
      msg: '删除失败'
    }
  }
}