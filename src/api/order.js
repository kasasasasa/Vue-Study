// src/api/order.js
import request from '@/utils/request'

// 创建订单
export function createOrder (data) {
  return request({
    url: '/order/create',
    method: 'post',
    data
  })
}

// 获取订单列表
export function getOrderList (params) {
  return request({
    url: '/order/list',
    method: 'get',
    params
  })
}

// 获取订单详情
export function getOrderDetail (orderId) {
  return request({
    url: `/order/detail/${orderId}`,
    method: 'get'
  })
}

// 取消订单
export function cancelOrder (orderId) {
  return request({
    url: `/order/cancel/${orderId}`,
    method: 'put'
  })
}

// 确认收货
export function confirmOrder (orderId) {
  return request({
    url: `/order/confirm/${orderId}`,
    method: 'put'
  })
}

// 删除订单
export function deleteOrder (orderId) {
  return request({
    url: `/order/delete/${orderId}`,
    method: 'delete'
  })
}

// 申请退款
export function refundOrder (data) {
  return request({
    url: '/order/refund',
    method: 'post',
    data
  })
}

// 获取订单统计
export function getOrderStats () {
  return request({
    url: '/order/stats',
    method: 'get'
  })
}
