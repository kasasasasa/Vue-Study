<template>
  <div class="order-list-container">
    <el-card>
      <h2 style="margin-bottom: 20px;">我的订单</h2>
      <el-table :data="orders" border>
        <el-table-column prop="orderNo" label="订单号" width="180"/>
        <el-table-column prop="date" label="下单时间" width="160"/>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="总金额" width="100"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="viewDetail(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" v-if="scope.row.status==='待支付'" @click="goPay(scope.row)">去支付</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MyOrderIndex',
  data () {
    return {
      orders: [
        { orderNo: '202406010001', date: '2024-06-01 10:00', status: '已完成', amount: '￥1999.00' },
        { orderNo: '202406010002', date: '2024-06-01 11:00', status: '待支付', amount: '￥299.00' },
        { orderNo: '202406010003', date: '2024-06-01 12:00', status: '待发货', amount: '￥899.00' },
        { orderNo: '202406010004', date: '2024-06-01 13:00', status: '已发货', amount: '￥1599.00' }
      ]
    }
  },
  methods: {
    viewDetail (row) {
      this.$message.info('查看订单详情：' + row.orderNo)
    },
    goPay (row) {
      this.$router.push({
        path: '/pay',
        query: {
          orderNo: row.orderNo,
          amount: row.amount
        }
      })
    },
    getStatusType (status) {
      const statusMap = {
        待支付: 'danger',
        待发货: 'warning',
        已发货: 'primary',
        已完成: 'success'
      }
      return statusMap[status] || 'info'
    }
  }
}
</script>

<style>
.order-list-container {
  max-width: 900px;
  margin: 30px auto;
}
</style>
