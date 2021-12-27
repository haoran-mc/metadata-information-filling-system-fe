<template>
  <el-container>
    <el-card class="user-data-card">
      <div class="user-data-header">
        <div class="font-layout">
          <el-link style="line-height: 40px;" @click='$router.push("/user/data/projects")' :underline="false">按项目填报</el-link>
          <span style="padding: 0 10px 0 10px; line-height: 40px;">|</span>
          <el-link style="line-height: 40px;" @click='$router.push("/user/data/textbooks")' :underline="false">按教材填报</el-link>
        </div>
      </div>

      <el-container>
        <router-view></router-view>
      </el-container>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: 'UserData'
}
</script>

<style scoped>
.user-data-card {
  width: 100%;
}

.user-data-header {
  height: 40px;
  width: 100%;
  background-color: #f2f8fe;
  border-radius: 3px;
  margin-bottom: 5%;
}

.font-layout {
  line-height: 40px;
  margin-left: 20px;
}
</style>
