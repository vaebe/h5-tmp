import store from '@/store/index'
import { Toast } from 'vant'

const excludeUrlList = ['#/home', '#/login']

// 判断是否加载 loading
const hasLoading = () => {
  return !excludeUrlList.includes(global.location.hash)
}

let loadingNum = 0
const startLoading = () => {
  // 在首页、登录页发起的请求不进行累加
  if (hasLoading()) {
    loadingNum++
    store.commit('setChangeLoading', true)

    Toast.loading({
      message: '加载中...',
      forbidClick: true
    })
  }
}

const endLoading = () => {
  if (hasLoading()) {
    loadingNum--
    loadingNum = loadingNum < 0 ? 0 : loadingNum
    if (!loadingNum) {
      store.commit('setChangeLoading', false)

      Toast.clear(true)
    }
  }
}

const resetLoading = () => {
  // 每次路由变化 重置loading
  loadingNum = 0
  store.commit('setChangeLoading', false)

  Toast.clear(true)
}

export default {
  startLoading,
  endLoading,
  resetLoading
}
