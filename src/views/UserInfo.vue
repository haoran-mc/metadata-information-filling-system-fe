<template>
  <div>
    <el-form>
      <el-form-item>
        <span>姓名</span>
        <el-input></el-input>
      </el-form-item>
      <!-- 头像 -->
      <el-form-item>
        <span>头像</span>
        <el-avatar src="../assets/head.png"></el-avatar>
      </el-form-item>

      <!-- 联系方式 -->
      <el-form-item>
        <span>联系方式</span>
        <el-input disabled></el-input>
      </el-form-item>

      <el-form-item>
        <span>修改密码</span>
        <el-button @click="dialogVisible = true">修改</el-button>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserInfo'
}
</script>

<style scoped>

</style>
