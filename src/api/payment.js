import request from '@/utils/request'

// 创建支付订单
export function createPayment(data) {
  return request.post('payment/create', data)
}

// 查询支付状态
export function queryPaymentStatus(orderNo) {
  return request.get('payment/status', { params: { orderNo } })
}

// 支付回调处理
export function paymentCallback(data) {
  return request.post('payment/callback', data)
}

// 获取支付方式列表
export function getPaymentMethods() {
  return request.get('payment/methods')
}

// 申请退款
export function applyRefund(data) {
  return request.post('payment/refund', data)
}

// 查询退款状态
export function queryRefundStatus(refundNo) {
  return request.get('payment/refund-status', { params: { refundNo } })
} 