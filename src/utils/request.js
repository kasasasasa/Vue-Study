import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例，将来对创建出来的实例进行自定义配置，这样不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 添加token到请求头
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  Message.error('请求发送失败')
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数
  // 对响应数据做些什么(默认axios会多包装一层data，需要响应拦截器中处理一下)
  const { data } = response

  // 统一处理业务错误
  if (data.code && data.code !== 200) {
    Message.error(data.msg || '请求失败')

    // 处理token过期
    if (data.code === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(new Error(data.msg || '请求失败'))
  }

  return data
}, function (error) {
  // 超出2xx 范围内的状态码会触发该函数
  // 对响应错误做些什么
  let message = '网络错误'

  if (error.response) {
    switch (error.response.status) {
      case 400:
        message = '请求参数错误'
        break
      case 401:
        message = '未授权，请重新登录'
        localStorage.removeItem('token')
        window.location.href = '/login'
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址不存在'
        break
      case 500:
        message = '服务器内部错误'
        break
      default:
        message = `连接错误${error.response.status}`
    }
  } else if (error.code === 'ECONNABORTED') {
    message = '请求超时'
  }

  Message.error(message)
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance
