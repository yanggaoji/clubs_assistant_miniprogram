const crypto = require('crypto');
const key = 'LCULCULCU6666666';
const iv = 'LDSTZSLDSTZS6666';
const expired = 60 * 60
function encrypt(data) {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}
function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
function checkToken(token) {
  try {
    const data = JSON.parse(decrypt(token))
    if (!data) throw 'err'
    if (Date.now() / 1000 - data.time > expired) return {}
    return data
  } catch (error) {
    return false
  }
}
exports.encrypt = encrypt
exports.decrypt = decrypt
exports.checkToken = checkToken