import { httpPost } from '@/composables/useHttp'

// 工作台
export default {
  getWorkbenchData(opts) {
    return httpPost({
      url: '/workbench/listPage',
      data: opts
    })
  }
}
