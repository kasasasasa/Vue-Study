import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request.post('login', data)
}

// 用户注册
export function signup(data) {
  return request.post('register', data)
}

// 获取用户信息
export function getUserInfo() {
  return request.get('user/info')
}

// 更新用户信息
export function updateUserInfo(data) {
  return request.post('user/update', data)
}

// 修改密码
export function changePassword(data) {
  return request.post('user/change-password', data)
}

// 上传头像
export function uploadAvatar(file) {
  const formData = new FormData()
  formData.append('avatar', file)
  return request.post('user/upload-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 退出登录
export function logout() {
  return request.post('logout')
}