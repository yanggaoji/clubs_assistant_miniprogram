exports.getClubQRcode = async (club_id, cloud) => {
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