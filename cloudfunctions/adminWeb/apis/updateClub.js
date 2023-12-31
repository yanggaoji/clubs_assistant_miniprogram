exports.updateClub = async (club_info, conn) => {
  let rows = null
  try {
    if (club_info.club_id) {
      [rows] = await conn.query(`
        update t_club set club_name='${club_info.club_name}',club_icon='${club_info.club_icon}',
        club_category='${club_info.club_category}',club_founder='${club_info.club_founder}',
        club_description='${club_info.club_description}' where club_id=${club_info.club_id};
      `)
    } else {
      [rows] = await conn.query(`
        insert into t_club(club_name,club_icon,club_category,club_founder,club_description)
        values('${club_info.club_name}','${club_info.club_icon}','${club_info.club_category}','${club_info.club_founder}','${club_info.club_description}');
      `)
    }
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