import usePersistedstate from '@/plugins/use-persistedstate'

const useAppStore = defineStore('app', () => {
  const state = reactive({
    collapsed: false,
    language: 'zh-CN',
    size: 'default'
  })

  const collapsedChange = () => {
    state.collapsed = !state.collapsed
  }

  const translate = language => {
    state.language = language
  }

  const sizeChange = size => {
    state.size = size
  }

  return {
    ...toRefs(state),
    collapsedChange,
    translate,
    sizeChange
  }
}, {
  persist: usePersistedstate('app')
})

export default useAppStore
