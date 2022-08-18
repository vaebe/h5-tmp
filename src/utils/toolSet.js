// 递归深拷贝
const copyObj = (obj = {}) => {
  let newobj = null

  if (typeof obj === 'object' && obj !== null) {
    newobj = obj instanceof Array ? [] : {}
    for (const i in obj) {
      newobj[i] = copyObj(obj[i])
    }
  } else newobj = obj
  return newobj
}

const objectDataDeal = (resData) => {
  resData.forEach((item) => {
    item.label = item.object.name
    item.value = item.object.id
    if (item.children && item.children.length > 0) {
      objectDataDeal(item.children)
    } else {
      item.children = null
    }
  })

  return resData
}

export const uuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 进入全屏
const isFullScreen = function (state, ref) {
  const main = ref || document.body
  const openList = [
    'requestFullscreen',
    'mozRequestFullScreen',
    'webkitRequestFullScreen',
    'msRequestFullscreen'
  ]
  const cancelList = [
    'exitFullscreen',
    'mozCancelFullScreen',
    'webkitCancelFullScreen',
    'msExitFullscreen'
  ]
  let fn = null

  if (state === 'full') {
    fn = openList.filter((item) => {
      if (main[item]) {
        return item
      }
      return null
    })[0]
    fn && main[fn]()
  } else {
    fn = cancelList.filter((item) => {
      if (document[item]) {
        return item
      }
      return null
    })[0]
    fn && document[fn]()
  }
}

// 手机号校验
export const isMobile = (rule, value, callback) => {
  if (value) {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      return callback(new Error('手机号格式不正确'))
    } else {
      callback()
    }
  } else {
    return callback(new Error('手机号不能为空'))
  }
}

// 密码校验
export const isHighCipher = (rule, value, callback) => {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
  if (value === '') {
    return callback(new Error('密码不能为空'))
  } else if (value.length < 6) {
    return callback(new Error('密码长度最少6位'))
  } else if (!reg.test(value)) {
    return callback(new Error('密码由6～18位字母数字组成'))
  } else {
    callback()
  }
}

// 身份证验证
export const isIdentNo = (rule, value, callback) => {
  if (rule.required) {
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
      return callback(new Error('身份证号格式不正确'))
    } else {
      callback()
    }
  } else {
    if (value === '') {
      callback()
    } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
      return callback(new Error('身份证号格式不正确'))
    } else {
      callback()
    }
  }
}

const findValue = (key, list, id = 'id', value = 'value') => {
  if (key === '') return
  const dataList = list.filter((item) => {
    return item[id] + '' === key + ''
  })
  if (dataList.length !== 0) return dataList[0][value]
}

// 兼容IE转码
const ieDecode = (textBuffer) => {
  return new Promise((resolve) => {
    if (!window.TextDecoder) {
      const blob = new Blob([textBuffer])
      const reader = new FileReader()
      reader.readAsText(blob, 'utf-8')
      reader.onload = function () {
        resolve(reader.result)
      }
    } else {
      const enc = new TextDecoder('utf-8')
      resolve(enc.decode(new Uint8Array(textBuffer)))
    }
  })
}

// 近七天的日期
const weekDate = () => {
  const arr = []
  for (let i = -6; i <= 0; i++) {
    const today = new Date()
    const targetDay = today.getTime() + 1000 * 60 * 60 * 24 * i
    today.setTime(targetDay) // 注意，这行是关键代码
    const tMonth = today.getMonth() + 1
    const tDate = today.getDate()
    arr.push(tMonth + '.' + tDate)
  }
  return arr
}

// 获取指定日期的前或后 N 天 ,date格式 YYYY-MM-DD
const getDateByDay = (date, day, type) => {
  const dd = new Date(date)
  dd.setDate(type === '-' ? dd.getDate() - day : dd.getDate() + day)
  const y = dd.getFullYear()
  const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
  const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()
  return `${y}-${m}-${d}`
}

const debounce = (fun, time) => {
  let timeout = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fun.apply(this, arguments)
    }, time)
  }
}

// 阿拉伯数字转大写
const getNumberCapitalizeFormat = (number) => {
  let uppercase = '千百亿千百十万千百十个'
  let newStr = ''
  const num = number.toString()
  const numberLength = num.length
  uppercase = uppercase.substr(uppercase.length - numberLength)
  for (let i = 0; i < numberLength; i++) {
    newStr += '零一二三四五六七八九十'.charAt(num[i]) + uppercase.charAt(i)
  }
  return newStr.substr(0, newStr.length - 1)
}

// 经纬度转化成度分秒的形式
const latlngFormat = (coordinates) => {
  const latlng = String(coordinates)
  if (!latlng || latlng === '0.0') return '暂无坐标'
  if (latlng && latlng.includes('°')) return latlng
  const latlngArr = String(latlng).split('.')
  const degree = latlngArr[0]
  const pointsData = String(`0.${latlngArr[1]}` * 60)
  const pointsArr = pointsData.split('.')
  const points = pointsArr[0]
  const secondsData = `0.${pointsArr[1]}` * 60
  const seconds = secondsData.toFixed(2)
  return `${degree}°${points}'${seconds}"`
}

// 对象数组去重
const uniqueArr = (arr, attr) => {
  const res = new Map()
  return arr.filter((arr) => !res.has(arr[attr]) && res.set(arr[attr], 1))
}

// 数据为空格式化
const getEmptyDataFormat = ({ row }, name, emptyValue = '--') => {
  return row[name] ? row[name] : emptyValue
}

// 经纬度反序列化提取
const parseCoordinates = (coordinates, lnglatType) => {
  // 0:GPS坐标  1:高德坐标
  if (!coordinates) return ''
  return JSON.parse(coordinates).find((item) => Number(item.type) === lnglatType)
}
// 经纬度反序列化提取后格式化展示
const parseCoordinatesToFormat = (coordinates, lnglatType) => {
  const lnglat = parseCoordinates(coordinates, lnglatType)
  if (lnglat && lnglat.lng && lnglat.lat) {
    return `${latlngFormat(lnglat.lng)},${latlngFormat(lnglat.lat)}`
  }
}

// 生成指定范围随机数
export const generateRandomNumbers = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const randomColor = () => {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16)
}

// 重置对象数据为基本数据类型
// 数字、数组、对象、其余重置为空字符串
export const resetObjToPrimitiveType = (data) => {
  if (!data) {
    return data
  } else {
    Object.keys(data).map((item) => {
      if (typeof data[item] === 'number') {
        data[item] = 0
        return
      }

      if (Array.isArray(data[item])) {
        data[item] = []
        return
      }

      if (Object.prototype.toString.call(data[item]) === '[object Object]') {
        data[item] = {}
      } else {
        data[item] = ''
      }
    })
    return data
  }
}

export default {
  copyObj,
  isMobile,
  uuid,
  isFullScreen,
  findValue,
  isIdentNo,
  ieDecode,
  weekDate,
  getDateByDay,
  debounce,
  latlngFormat,
  uniqueArr,
  getNumberCapitalizeFormat,
  getEmptyDataFormat,
  objectDataDeal,
  parseCoordinates,
  parseCoordinatesToFormat
}
