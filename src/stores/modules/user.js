import { setToken } from '@/utils/cookie'

const useUserStore = defineStore('user', () => {

  const state = reactive({
    username: ''
  })

  const login = form => {
    return new Promise(resolve => {
      // 这里应该调后台接口
      setToken('TOKEN:test20230814151453')
      resolve()
    })
  }

  return {
    ...toRefs(state),
    login
  }

})

export default useUserStore