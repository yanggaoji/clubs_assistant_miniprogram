exports.joinClub = async (club_id, openid, conn) => {
  const [checkRows, checkFields] = await conn.query(`select * from t_student_club where stu_id = (select stu_id from t_student where openid = '${openid}')`)
  if (checkRows.length >= 2) {
    return {
      success: 0,
      msg: '您已经登记2个社团，请先取消一个再继续'
    }
  }
  try {
    const [rows, fields] = await conn.query(`insert into t_student_club(stu_id,club_id) values((select stu_id from t_student where openid = '${openid}'),${club_id})`)
    if (rows.affectedRows) {
      return {
        success: 1,
        msg: '登记成功'
      }
    } else {
      return {
        success: 0,
        msg: '登记失败，请稍后再试'
      }
    }
  } catch (error) {
    if ((error + '').indexOf('Duplicate entry') >= 0) {
      return {
        success: 0,
        msg: '重复登记！您已经登记加入过该社团'
      }
    }
    throw error
  }
}