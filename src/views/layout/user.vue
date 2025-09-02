<template>
  <div class="user-center-container">
    <el-card class="user-info-card">
      <div class="user-avatar">
        <img src="https://cdn.jsdelivr.net/gh/element-plus/element-plus@2.2.30/docs/public/images/element-plus-logo.svg" alt="avatar" />
      </div>
      <div class="user-info">
        <h2>用户名：张三</h2>
        <p>手机号：138****8888</p>
        <p>邮箱：user@example.com</p>
        <el-button type="primary" size="small" style="margin-top: 10px;" @click="$router.push('/user/edit')">编辑资料</el-button>
      </div>
    </el-card>
    <el-card class="user-action-card">
      <el-row type="flex" justify="center" :gutter="20">
        <el-col :span="10">
          <el-button type="success" icon="el-icon-s-order" plain block @click="$router.push('/myorder')">
            我的订单
          </el-button>
        </el-col>
        <el-col :span="10">
          <el-button type="danger" icon="el-icon-switch-button" plain block @click="logout">
            退出登录
          </el-button>
        </el-col>
      </el-row>
    </el-card>
      </div>
</template>

<script>
export default {
  name: 'UserIndex',
  methods: {
    logout () {
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$message.success('退出成功')
        this.$router.push('/login')
      }).catch(() => {
        this.$message.info('已取消退出')
      })
    }
  }
}
</script>

<style>
.user-center-container {
  max-width: 500px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.user-info-card {
  display: flex;
  align-items: center;
  padding: 30px 20px;
}
.user-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f5f7fa;
  margin-right: 30px;
}
.user-info h2 {
  margin: 0 0 30px 0;
  font-size: 20px;
  color: #333;
}
.user-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
.user-action-card {
  padding: 20px;
}
</style>
