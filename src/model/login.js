import { httpPost, httpDownload } from '../composables/useHttp'

export default {
  // 登录
  login(opts) {
    return httpPost({
      url: '/sys/user/login',
      data: opts
    })
  },

  logout() {
    return httpPost({
      url: '/sys/user/logout'
    })
  },

  updatePassWord(opts) {
    return httpPost({
      url: '/sys/user/changeUserPassword',
      data: opts
    })
  },

  // 生成图片验证码
  createImageCode(opts) {
    return httpDownload({
      url: '/sys/user/createImageCode',
      data: opts
    })
  },

  // 验证用户信息
  verifyUserInfo(opts) {
    return httpPost({
      url: '/sys/user/verifyUserInfo',
      data: opts
    })
  }
}
