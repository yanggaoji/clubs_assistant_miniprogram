exports.uploadStudent = async (dataStr, conn) => {
  try {
    const [rows] = await conn.query(`
    insert into t_student(stu_id,stu_name,ext) values ${dataStr};
    `)
    return {
      success: 1,
      res: rows,
      msg: '上传成功'
    }
  } catch (err) {
    return {
      success: 0,
      err: JSON.stringify(err),
      msg: '上传失败'
    }
  }
}