import { reactive, computed } from 'vue'
import router from '@/router'

export const useRouter = () => {
  function routerPush(to, newTab = false) {
    if (newTab) {
      const routerData = router.resolve(to)
      window.open(routerData.href, '_blank')
    } else {
      router.push(to)
    }
  }

  function routerBack(level = -1) {
    router.go(level)
  }

  function routerReplace(to) {
    router.replace(to)
  }

  return {
    push: routerPush,
    routerBack,
    replace: routerReplace
  }
}

let route = {}
export const useRoute = () => {
  route = computed(() => router.currentRoute)
  const keys = ['fullPath', 'hash', 'matched', 'meta', 'name', 'params', 'path', 'query']
  for (const key of keys) {
    Object.defineProperty(route, key, {
      set: () => {},
      get: () => route.value[key]
    })
  }
  return reactive(route)
}
