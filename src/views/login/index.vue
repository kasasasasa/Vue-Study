<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">账号密码登录</h2>

      <div class="login-form">
        <!-- 账号输入 -->
        <div class="input-group">
          <input
            type="text"
            placeholder="请输入账号"
            class="form-input"
            required
            autocomplete="username"
          >
        </div>

        <!-- 密码输入 -->
        <div class="input-group">
          <input
            type="password"
            placeholder="请输入密码"
            class="form-input"
            required
            autocomplete="current-password"
          >
        </div>

        <!-- 记住密码和忘记密码 -->
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox"> 记住密码
          </label>
          <a href="#/signup" class="forgot-password">注册账号</a>
        </div>

        <!-- 登录和注册按钮 -->
        <div class="form-actions">
          <button type="submit" class="submit-btn login-btn">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginPage',
  async created () {
    const res = await request.get('/captcha')
    console.log(res)
  }
}
</script>

<style>
  /* 基础重置 */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 容器样式 */
  .login-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 80px;
    background-color: #f5f7fa;
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }

  .login-card {
    width: 100%;
    max-width: 400px; /* 限制最大宽度 */
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 30px;
  }

  .login-title {
    text-align: center;
    margin-bottom: 25px;
    font-size: 20px;
    color: #333;
    font-weight: 500;
  }

  /* 输入框组 - 修复宽度问题 */
  .input-group {
    margin-bottom: 20px;
  }

  .form-input {
    width: 100%; /* 确保宽度100% */
    padding: 12px 15px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 14px;
    color: #606266;
    transition: border-color 0.3s;
    background-color: #fff;
  }

  .form-input:focus {
    border-color: #409eff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
  }

  /* 选项区域 */
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .remember-me {
    display: flex;
    align-items: center;
    color: #606266;
    font-size: 14px;
  }

  .remember-me input {
    margin-right: 5px;
  }

  .forgot-password {
    color: #409eff;
    text-decoration: none;
    font-size: 14px;
  }

  .forgot-password:hover {
    text-decoration: underline;
  }

  /* 登录按钮 */
  .submit-btn {
    width: 100%;
    padding: 12px;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .login-btn:hover {
    background: #66b1ff;
  }

  /* 注册链接 */
  .register-link {
    text-align: center;
    margin-top: 20px;
    color: #606266;
    font-size: 14px;
  }

  .register-link a {
    color: #409eff;
    text-decoration: none;
    margin-left: 5px;
  }

  .register-link a:hover {
    text-decoration: underline;
  }

  /* 响应式调整 */
  @media (max-width: 480px) {
    .login-container {
      padding: 40px 20px;
      align-items: center;
    }

    .login-card {
      padding: 25px 20px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
    }
  }
</style>
