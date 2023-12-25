// 防抖函数，避免重复触发事件
const debounce = (fn, delay = 1000) => {
  let timer = null
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(fn, delay)
  }
}

const useClientSize = () => {
  // 当前窗口宽度
  const clientWidth = ref(0)
  // 当前窗口高度
  const clientHeight = ref(0)

  const windowRender = () => {
    clientHeight.value = document.body.clientHeight
    clientWidth.value = document.body.clientWidth
    window.onresize = debounce(() => {
      clientHeight.value = document.body.clientHeight
      clientWidth.value = document.body.clientWidth
    })
  }

  onMounted(() => {
    debounce(windowRender, 300)()
  })

  return {
    clientWidth,
    clientHeight
  }
}

export default useClientSize
