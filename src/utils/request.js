import axios from 'axios'
import { getToken } from './cookie'
import errorCode from '../config/error-code'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const request = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  res => {
    // 如果返回二进制数据，则不做处理
    const responseTypes = ['blob', 'arraybuffer']
    if (responseTypes.includes(res.request.responseType)) return res.data

    const code = res.data.code || 200
    const msg = res.data.message || errorCode[code] || errorCode['default']

    if (code !== 200) {
      ElMessage.error(msg)
      return Promise.reject(new Error(msg))
    }

    return res.data
  },
  err => Promise.reject(err)
)

export default request
