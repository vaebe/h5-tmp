import vuexInstance from '@/store/index'

export const useStore = () => {
  function storeCommit(name, data) {
    if (!name) return
    vuexInstance.commit(name, data)
  }

  function storeDispatch(name, data) {
    if (!name) return
    return vuexInstance.dispatch(name, data)
  }

  return {
    commit: storeCommit,
    dispatch: storeDispatch,
    state: vuexInstance.state,
    getters: vuexInstance.getters
  }
}
