import { httpDeleteParam, httpGet, httpPost } from '../composables/useHttp'

export default {
  getSysCodeListByCodeTypes(opts) {
    return httpPost({
      url: '/sys/sysCode/getSysCodeListByCodeTypes',
      data: opts
    })
  },

  // 删除文件
  deletedFiles(opts) {
    return httpDeleteParam({
      url: '/sys/file/deleteBatch',
      data: opts
    })
  },

  // 查询附件列表 多个
  getFilesByAttachIdBatch(opts) {
    return httpPost({
      url: '/sys/file/getFilesByAttachIdBatch',
      data: opts
    })
  },

  // 查询附件 单个
  getFilesByAttachId(opts) {
    return httpGet({
      url: '/sys/file/getFilesByAttachId',
      data: opts
    })
  },

  // 查询支撑部门
  querySupportDepartment(opts) {
    return httpGet({
      url: '/sys/auth/getByParentOrgId',
      data: opts
    })
  },

  // 查询分发人员
  inquireAboutDistributors(opts) {
    return httpGet({
      url: '/sys/auth/getSelectUserByOrgId',
      data: opts
    })
  }
}
