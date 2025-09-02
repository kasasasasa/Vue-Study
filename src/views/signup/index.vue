<template>
    <div class="login-container">
        <div class="login-card">
            <h2 class="login-title">用户注册</h2>

            <form class="register-form">
                <!-- 手机号输入 -->
                <div class="input-group">
                    <label for="phone"></label>
                    <input
                    type="tel"
                    id="phone"
                    class="form-input"
                    placeholder="请输入账号"
                    maxlength="11"
                    required
                    >
                </div>

                <!-- 密码输入 -->
                <div class="input-group">
                    <label for="password"></label>
                    <div class="password-container">
                    <input
                        type="password"
                        id="password"
                        class="form-input"
                        placeholder="请设置登录密码"
                        required
                    >
                    <span class="toggle-password">
                        <i class="fas fa-eye"></i>
                    </span>
                    </div>
                </div>

                <!-- 确认密码输入 -->
                <div class="input-group">
                    <label for="confirm-password"></label>
                    <div class="password-container">
                    <input
                        type="password"
                        id="confirm-password"
                        class="form-input"
                        placeholder="请再次输入密码"
                        required
                    >
                    <span class="toggle-password">
                        <i class="fas fa-eye"></i>
                    </span>
                    </div>
                </div>

                <!-- 注册按钮 -->
                <div class="form-actions">
                    <button type="submit" class="submit-btn">注册账号</button>
                </div>
                <!-- 已有账号链接 -->
                <label class="remember-me">
                    已有账号？<a class="forgot-password" href="#/login">立即登录</a>
                </label>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SignupIndex'
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
