const { default: axios } = require('axios')
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
  SecretId: '***********',
  SecretKey: '*********',
});

exports.img2Cloud = async (imgurl = '') => {
  try {
    if (imgurl.indexOf('http') != 0) {
      const img = Buffer.from(imgurl.split(',')[1], 'base64')
      const filename = `${new Date().getTime()}.${imgurl.split(';')[0].split('/')[1]}`
      const res = await cos.putObject({
        Bucket: '*******',
        Region: 'ap-beijing',
        Key: `pic/${new Date().getMonth() + 1}-${new Date().getDate()}/${filename}`,
        Body: img
      })
      return {
        success: 1,
        data: res,
        msg: '上传成功'
      }
    }
    const img = (await axios({
      url: imgurl,
      responseType: 'arraybuffer'
    })).data
    let filename = imgurl.split('?')[0].split('/')
    filename = filename[filename.length - 1]
    const res = await cos.putObject({
      Bucket: '***********',
      Region: 'ap-beijing',
      Key: `pic/${new Date().getMonth()}-${new Date().getDate()}/${filename}`,
      Body: img
    })
    return {
      success: 1,
      data: res,
      msg: '上传成功'
    }
  } catch (err) {
    return {
      success: 0,
      _err: JSON.stringify(err),
      err,
      msg: '上传失败'
    }
  }
}