// src/api/goods.js
import request from '@/utils/request'

// 获取商品详情
export function getProductDetail (productId) {
  return request({
    url: `/goods/detail/${productId}`,
    method: 'get'
  })
}

// 获取商品列表
export function getProductList (params) {
  return request({
    url: '/goods/list',
    method: 'get',
    params
  })
}

// 获取商品分类
export function getCategories () {
  return request({
    url: '/goods/categories',
    method: 'get'
  })
}

// 获取推荐商品
export function getRecommendProducts (params) {
  return request({
    url: '/goods/recommend',
    method: 'get',
    params
  })
}

// 获取商品评价
export function getProductReviews (productId, params) {
  return request({
    url: `/goods/${productId}/reviews`,
    method: 'get',
    params
  })
}
