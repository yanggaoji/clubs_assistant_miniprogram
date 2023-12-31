const { checkToken } = require("./crypt")

exports.getClubQRcode = async (club_id, token, cloud) => {
  const admin = checkToken(token)
  if (!admin) return { success: 0, msg: '登录已过期' }
  if (admin.priv != 0 && club_id != admin.priv) return { success: 0, msg: '无权限' }
  console.log(club_id);
  const res = await cloud.openapi.wxacode.getUnlimited(
    {
      "page": "pages/index/home",
      "scene": club_id,
      "check_path": true,
      "env_version": "release"
    }
  )
  const img = `data:${res.contentType};base64,${Buffer.from(res.buffer).toString('base64')}`
  return {
    success: 1,
    img: img,
    msg: '成功'
  }
}