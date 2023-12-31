exports.selectStudent = async (stu_id, conn) => {
  const [rows, fields] = await conn.query(`select * from t_student where stu_id = '${stu_id}'`)
  if (!rows.length) {
    return {
      success: 0,
      msg: '未查找到学生'
    }
  } else {
    return {
      success: 1,
      mask_name: `${rows[0].stu_name[0]}*`,
      stu_id: rows[0].stu_id
    }
  }
}

exports.bindStudent = async (stu_id, stu_name, openid, conn) => {
  const [rows, fields] = await conn.query(`update t_student set openid = '${openid}' where stu_id = '${stu_id}' and ( stu_name like '_%${stu_name}%' or stu_name = '${stu_name}' )`)
  if (rows.changedRows) {
    return {
      success: 1,
      msg: '绑定成功'
    }
  } else {
    return {
      success: 0,
      msg: '信息不匹配'
    }
  }
}