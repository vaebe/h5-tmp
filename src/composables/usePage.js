import { reactive } from 'vue'
import { resetObjToPrimitiveType } from '@/utils/toolSet'

// usePage 接收一个列表查询对象 获取列表的方法
// resetFunc ,sizeChangeFunc, currentChangeFunc 一些特殊情况的处理
export const usePage = (opts) => {
  const { searchForm, getList, resetFunc, sizeChangeFunc, currentChangeFunc } = opts

  const reset = () => {
    // 数据不存在直接返回
    if (!searchForm) {
      return
    }

    Object.assign(searchForm, resetObjToPrimitiveType(searchForm))

    // 存在额外的处理逻辑就执行
    resetFunc && resetFunc()

    handleCurrentChange(1)
  }

  const page = reactive({
    pageSize: 10,
    pageNo: 1,
    total: 0
  })

  const handleSizeChange = (size) => {
    page.pageSize = size
    sizeChangeFunc && sizeChangeFunc()
    getList()
  }

  const handleCurrentChange = (cur) => {
    page.pageNo = cur
    currentChangeFunc && currentChangeFunc()
    getList()
  }

  return {
    reset,
    page,
    handleSizeChange,
    handleCurrentChange
  }
}
