import request from '@/utils/request'

// 搜索商品
export function searchProducts (params) {
  return request({
    url: '/search/products',
    method: 'get',
    params
  })
}

// 获取搜索历史
export function getSearchHistory () {
  return request({
    url: '/search/history',
    method: 'get'
  })
}

// 保存搜索历史
export function saveSearchHistory (keyword) {
  return request({
    url: '/search/history',
    method: 'post',
    data: { keyword }
  })
}

// 清空搜索历史
export function clearSearchHistory () {
  return request({
    url: '/search/history',
    method: 'delete'
  })
}

// 获取热门搜索
export function getHotSearch () {
  return request({
    url: '/search/hot',
    method: 'get'
  })
}
