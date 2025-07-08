import vue from '@vitejs/plugin-vue'
import useAutoImport from './use-auto-import'
import useSvgIconsPlugin from './use-svg-icon'
import useComponents from './use-components'
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

const useVitePlugins = () => {
  const plugins = [
    vue(),
    useComponents(),
    useAutoImport(),
    useSvgIconsPlugin(),
    monacoEditorPlugin({})
  ]

  return plugins
}

export default useVitePlugins