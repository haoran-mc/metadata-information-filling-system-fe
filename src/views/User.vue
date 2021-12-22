<template>
  <div class="home-container">
    <el-container>
      <!-- 导航栏 -->
      <el-card class="nav">
        <el-menu style="border-right: white;" :default-active="activePath">
          <!-- 基本信息 -->
          <el-menu-item index="/user/info" @click="saveNavState('/user/info')">
            <i class="el-icon-menu"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <!-- 我的填报 -->
          <el-menu-item index="/user/data" @click="saveNavState('/user/data')">
            <i class="el-icon-document"></i>
            <span slot="title">我的填报</span>
          </el-menu-item>
          <!-- 生成批次 -->
          <el-menu-item index="/user/batch" @click="saveNavState('/user/batch')">
            <i class="el-icon-setting"></i>
            <span slot="title">生成批次</span>
          </el-menu-item>
        </el-menu>
        <el-menu style="border-right: white;">
          <el-menu-item @click="logout">
            <i class="el-icon-switch-button"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-card>

      <!-- 卡片栏 -->
      <el-card class="user-card">
        <router-view></router-view>
      </el-card>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

    </el-container>
  </div>
</template>

<script>
export default {
  name: 'User',
  data: function () {
    return {
      // 激活的路由
      activePath: ''
    }
  },
  created () {
    // 从缓存中获取已保存的链接地址
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 保存激活的菜单栏
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
      this.$router.push(activePath)
    },
    // 退出登录
    logout () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 删除激活的链接
        window.sessionStorage.setItem('activePath', '')
        // 跳转到主页
        this.$router.push('/home')
        this.$store.commit('REMOVE_INFO')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
.home-container {
  width: 1150px;
  margin: 0 auto;
  height: 750px;
  background-color: #F2F2F2;
}

.nav {
  margin-left: 10px;
  margin-right: 5px;
  width: 250px;
  height: 300px;
}

.user-card {
  margin-left: 5px;
  margin-right: 10px;
}
</style>
