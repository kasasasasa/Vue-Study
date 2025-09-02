// src/api/cart.js
import request from '@/utils/request'

// 获取购物车列表
export function getCartList () {
  return request({
    url: '/cart/list',
    method: 'get'
  })
}

// 添加到购物车
export function addToCart (data) {
  return request({
    url: '/cart/add',
    method: 'post',
    data
  })
}

// 更新购物车商品数量
export function updateCartQuantity (data) {
  return request({
    url: '/cart/update',
    method: 'put',
    data
  })
}

// 删除购物车商品
export function removeFromCart (productId) {
  return request({
    url: `/cart/remove/${productId}`,
    method: 'delete'
  })
}

// 批量删除购物车商品
export function batchRemoveFromCart (productIds) {
  return request({
    url: '/cart/batch-remove',
    method: 'delete',
    data: { productIds }
  })
}

// 清空购物车
export function clearCart () {
  return request({
    url: '/cart/clear',
    method: 'delete'
  })
}

// 选择/取消选择购物车商品
export function toggleCartItemSelection (data) {
  return request({
    url: '/cart/toggle-selection',
    method: 'put',
    data
  })
}

// 全选/取消全选购物车商品
export function toggleCartAllSelection (selected) {
  return request({
    url: '/cart/toggle-all-selection',
    method: 'put',
    data: { selected }
  })
}
