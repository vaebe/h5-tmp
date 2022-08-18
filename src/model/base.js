import axios from 'axios'
import qs from 'qs'
import loading from '../utils/loading'
import { Toast } from 'vant'
import store from '@/store/index'

const ERROR_TYPE_OBJ = {
  400: '400请求错误',
  401: '用户登录失效，请重新登录...',
  403: '403拒绝访问',
  404: '404请求路径错误',
  405: '405请求类型错误',
  408: '请求超时',
  500: '服务器错误',
  501: '服务未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'HTTP版本不受支持'
}

// 尝试将响应数据格式化成jason 失败返回原数据
const formatTheResponseDataToJson = (data) => {
  const enc = new TextDecoder('utf-8')
  const uint8Msg = new Uint8Array(data)
  try {
    return JSON.parse(enc.decode(uint8Msg))
  } catch (e) {
    return data
  }
}

// 在此数组中不加载全局loading 根据 url匹配
const loadingWhitelist = []

// 判断是否包含指定url
function isLoadingWhite(url) {
  return loadingWhitelist.some((item) => {
    return url.indexOf(item) !== -1
  })
}

const { timeout, VUE_APP_BASE_URL } = window.APP_CONFIG

// 创建axios实例
const service = axios.create({
  baseURL: VUE_APP_BASE_URL,
  paramsSerializer: function (params) {
    // get 请求添加时间戳  防止缓存
    params.client = 'web'
    params.timestamp = new Date().getTime()
    return qs.stringify(params, { arrayFormat: 'brackets' })
  },
  timeout: timeout
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.token = store.state.userInfo.token || ''

    if (!config.headers.token && global.location.hash !== '#/login') {
      Toast.fail('用户信息不存在，请重新登录！')
      global.location.replace('#/login')
    }

    // 判断加载 全局loading
    if (!isLoadingWhite(config.url)) {
      loading.startLoading()
    }

    return config
  },
  (err) => {
    loading.endLoading()
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    loading.endLoading()

    const formatTheResponseData = formatTheResponseDataToJson(response.data)
    if (formatTheResponseData.code && formatTheResponseData.code !== 0) {
      return Promise.reject(handleError(formatTheResponseData))
    }

    return response.data
  },
  (error) => {
    loading.endLoading()
    return Promise.reject(handleError(error))
  }
)

// 错误处理
function handleError(error) {
  if (error.message === 'Network Error') {
    error.msg = '请检查网络是否畅通...'
  }

  const { response } = error
  if (response) {
    error.msg = ERROR_TYPE_OBJ[response.status]
  }

  const status401 = error.code === 401 || (response && response.status === 401)
  if (status401 && global.location.hash !== '#/login') {
    error.msg = '用户登录失效，请重新登录...'
    global.location.replace('#/login')
  }

  console.warn('请求错误:', error.msg || error.message, '\r\n', response, '\r\n', error)
  Toast.clear(true)
  Toast.fail(`错误：${error.msg || error.message || '请求错误！'}`)
  return error
}

export default service
