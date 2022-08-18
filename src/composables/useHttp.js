import service from '../model/base'

const { timeout } = window.APP_CONFIG

export const httpGet = (opts) => {
  return service({
    method: 'get',
    url: opts.url,
    params: opts.data
  })
}

export const httpGetDownload = (opts) => {
  return service({
    method: 'get',
    url: opts.url,
    responseType: 'arraybuffer',
    params: opts.data
  })
}

export const httpDownload = (opts) => {
  return service({
    method: 'get',
    url: opts.url,
    responseType: 'blob',
    params: opts.data
  })
}

export const httpPost = (opts) => {
  return service({
    method: 'post',
    url: opts.url,
    data: opts.data,
    timeout: opts.timeout || timeout
  })
}

export const httpPostDownload = (opts) => {
  return service({
    method: 'post',
    url: opts.url,
    responseType: 'arraybuffer',
    data: opts.data
  })
}

export const httpPut = (opts) => {
  return service({
    method: 'put',
    url: opts.url,
    data: opts.data
  })
}

export const httpDelete = (opts) => {
  return service({
    method: 'delete',
    url: opts.url,
    data: opts.data
  })
}

export const httpDeleteParam = (opts) => {
  return service({
    method: 'delete',
    url: opts.url,
    params: opts.data
  })
}

export const httpPostParam = (opts) => {
  return service({
    method: 'post',
    url: opts.url,
    params: opts.data
  })
}

export const httpPostParamData = (opts) => {
  return service({
    method: 'post',
    url: opts.url,
    data: opts.data,
    params: opts.params
  })
}

export const httpPutParam = (opts) => {
  return service({
    method: 'put',
    url: opts.url,
    params: opts.data
  })
}

export default {
  httpGet,
  httpGetDownload,
  httpDownload,
  httpPost,
  httpPostDownload,
  httpPut,
  httpDelete,
  httpDeleteParam,
  httpPostParam,
  httpPostParamData,
  httpPutParam
}
