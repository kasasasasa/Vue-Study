<template>
  <div class="pay-container">
    <el-card>
      <div slot="header" class="card-header">
        <span>订单支付</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$router.go(-1)">返回</el-button>
      </div>

      <div class="order-info">
        <el-descriptions title="订单信息" :column="1" border>
          <el-descriptions-item label="订单号">{{ orderInfo.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="商品信息">{{ orderInfo.goodsInfo }}</el-descriptions-item>
          <el-descriptions-item label="应付金额">
            <span class="pay-amount">{{ orderInfo.amount }}</span>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <el-divider></el-divider>

      <div class="pay-methods">
        <h3>选择支付方式</h3>
        <el-radio-group v-model="payType" class="pay-options">
          <el-radio label="alipay" class="pay-option">
            <div class="pay-option-content">
              <i class="el-icon-money" style="color: #1677ff; font-size: 24px;"></i>
              <span>支付宝</span>
            </div>
          </el-radio>
          <el-radio label="wechat" class="pay-option">
            <div class="pay-option-content">
              <i class="el-icon-money" style="color: #07c160; font-size: 24px;"></i>
              <span>微信支付</span>
            </div>
          </el-radio>
          <el-radio label="card" class="pay-option">
            <div class="pay-option-content">
              <i class="el-icon-credit-card" style="color: #ff6b35; font-size: 24px;"></i>
              <span>银行卡</span>
            </div>
          </el-radio>
        </el-radio-group>
      </div>

      <div class="pay-actions">
        <el-button type="primary" size="large" @click="pay" :loading="paying">
          {{ paying ? '支付中...' : '立即支付' }}
        </el-button>
        <el-button size="large" @click="$router.go(-1)">取消支付</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PayIndex',
  data () {
    return {
      payType: 'alipay',
      paying: false,
      orderInfo: {
        orderNo: '',
        goodsInfo: '',
        amount: ''
      }
    }
  },
  created () {
    // 从路由参数获取订单信息
    const { orderNo, amount, fromCart } = this.$route.query
    if (orderNo && amount) {
      this.orderInfo.orderNo = orderNo
      this.orderInfo.amount = amount
      if (fromCart === 'true') {
        this.orderInfo.goodsInfo = '购物车商品'
      } else {
        this.orderInfo.goodsInfo = '小米空调 1.5匹 新一级能效 变频冷暖'
      }
    } else {
      // 默认订单信息
      this.orderInfo = {
        orderNo: '202406010002',
        goodsInfo: '小米空调 1.5匹 新一级能效 变频冷暖',
        amount: '￥299.00'
      }
    }
  },
  methods: {
    pay () {
      this.paying = true

      // 模拟支付过程
      setTimeout(() => {
        this.paying = false
        this.$message.success('支付成功！')

        // 支付成功后跳转到订单页面
        this.$router.push('/myorder')
      }, 2000)
    }
  }
}
</script>

<style>
.pay-container {
  max-width: 600px;
  margin: 40px auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-info {
  margin-bottom: 20px;
}

.pay-amount {
  color: #f56c6c;
  font-size: 20px;
  font-weight: bold;
}

.pay-methods {
  margin: 20px 0;
}

.pay-methods h3 {
  margin-bottom: 15px;
  color: #333;
}

.pay-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.pay-option {
  width: 100%;
  margin-right: 0 !important;
}

.pay-option-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.pay-actions {
  margin-top: 30px;
  text-align: center;
}

.pay-actions .el-button {
  margin: 0 10px;
}
</style>
