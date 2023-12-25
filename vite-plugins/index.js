import vue from '@vitejs/plugin-vue'
import useAutoImport from './use-auto-import'
import useSvgIconsPlugin from './use-svg-icon'
import useComponents from './use-components'

const useVitePlugins = () => {
  const plugins = [
    vue(),
    useComponents(),
    useAutoImport(),
    useSvgIconsPlugin()
  ]

  return plugins
}

export default useVitePlugins