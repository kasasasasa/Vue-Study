<template>
    <div>
      <el-menu
        router
        :default-active="activeRoute"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#4975a1"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="display: flex; justify-content: center;">
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/category">分类页</el-menu-item>
        <el-menu-item index="/cart">购物车</el-menu-item>
        <el-menu-item index="/user">我的</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style>
  .search-history{
  padding: 0 16px 12px;
  border-bottom: 1px solid #eee;
  }
  .history-list .el-tag{
    margin: 4px 6px 4px 0;
    cursor: pointer;
  }
</style>
