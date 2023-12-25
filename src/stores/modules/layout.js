import usePersistedstate from '@/plugins/use-persistedstate'

const useLayoutStore = defineStore('layout', () => {
  const state = reactive({
    showLogo: false,
    showFooter: true,
    showHeader: true,
    showTagsView: true
  })

  return {
    ...toRefs(state)
  }
}, {
  persist: usePersistedstate('layout')
})

export default useLayoutStore