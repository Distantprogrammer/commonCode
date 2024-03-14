import request from '@/utils/request.js'

// 设置文件在本机的默认地址
const defaultLocation = 'B:\\tsg\\base-project\\'

export const addRouter = (data)=>{
  data.location = defaultLocation + data.location
  return request.post('/api/writeFile',data)
}
export const readFile = (location)=>{
  location = defaultLocation + location
  return request.get(`/api/readFile?location=${location}`)
}
export const createFolder = (location)=>{
  return request.post('/api/createFolder',{location:defaultLocation + location})
}