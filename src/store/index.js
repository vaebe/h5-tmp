import Vue from 'vue'
import Vuex from 'vuex'
import publicApi from '@/model/publicApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    globalLoading: false,
    allDictionariesObj: {
      TaskSource: [],
      TaskState: [],
      CaseCategory: [], // 案件类别
      MeansType: [], // 作案手段类型
      TimingType: [], // 选择时机类型
      InfoSourceType: [], // 整合信息来源类型
      InfoCategory: [], // 信息管理信息类别
      InfoStatus: [], // 信息状态
      UnitType: [] // 组织列表
    },
    uploadOpts: {
      actionUrl: window.APP_CONFIG.VUE_APP_BASE_URL + '/sys/file/uploadBatch',
      uploadHeaders: {
        token: ''
      }
    }, // 上传配置参数
    supportDepartmentList: [], // 支撑部门
    distributionStaffList: [] // 分发人员
  },
  getters: {},
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data

      // 登录完成更新上传参数
      state.uploadOpts.uploadHeaders.token = data.token
    },

    clearStoreState(state, data = {}) {
      state = data
    },

    setChangeLoading(state, data) {
      state.globalLoading = data
    },

    setAllDictionariesObj(state, data) {
      state.allDictionariesObj = data
    },

    setSupportDepartmentList(state, data) {
      state.supportDepartmentList = data
    },

    setDistributionStaffList(state, data) {
      state.distributionStaffList = data
    }
  },
  actions: {
    getSysCodeListByCodeTypes({ commit }, opts) {
      publicApi.getSysCodeListByCodeTypes(opts).then((res) => {
        if (res.code === 0) {
          commit('setAllDictionariesObj', res.data || {})
        }
      })
    },

    querySupportDepartment({ commit }) {
      publicApi.querySupportDepartment().then((res) => {
        if (res.code === 0) {
          commit('setSupportDepartmentList', res.data || [])
        }
      })
    },

    inquireAboutDistributors({ commit }) {
      publicApi.inquireAboutDistributors().then((res) => {
        if (res.code === 0) {
          commit('setDistributionStaffList', res.data || [])
        }
      })
    }
  },
  modules: {}
})
