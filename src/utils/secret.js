// 引用AES源码js
const CryptoJS = require('crypto-js')

// 密钥
const key = CryptoJS.enc.Utf8.parse('LOGIN_AES_16_KEY')

// 解密方法
const Decrypt = (word) => {
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法
const Encrypt = (word) => {
  const encrypted = CryptoJS.AES.encrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

export default {
  Decrypt,
  Encrypt
}
