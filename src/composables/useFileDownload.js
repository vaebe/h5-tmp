import fileDownload from 'js-file-download'
import dayjs from 'dayjs'
import { Toast } from 'vant'

export const fileStreamDownloadFile = (data, name, type = '.xls') => {
  if (!name) {
    Toast.fail('文件名称不能为空！')
    return false
  }
  fileDownload(data, `${name}${dayjs().format('YYYY-MM-DD HH:mm:ss')}${type}`)
}
