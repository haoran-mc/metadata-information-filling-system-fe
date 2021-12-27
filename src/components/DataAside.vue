<template>
  <el-container class="data-container">
  <!-- 查询-侧边栏 -->
    <el-card class="data-query">
      <el-input v-model="selectByName" placeholder="请输入名称"></el-input>
      <el-button
        style="width: 165px; margin-top: 10px"
        type="primary"
        icon="el-icon-search"
        @click="queryByName"
      >查询</el-button>
    </el-card>
    <!-- 查询结果对话框 -->
    <el-dialog>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'DataAside',
  data () {
    return {
      year: this.$store.getters.getYear,
      batch_idx: this.$store.getters.getBatchIdx,
      batch_name: this.$store.getters.getBatchName,
      category: this.$store.getters.getCategory,
      // 通过项目名或教材名查询
      selectByName: ''
    }
  },
  methods: {
    queryByName () {
      const _this = this
      if (this.category === 'project') {
        this.$axios.get('/projects', {
          params: {
            year: _this.requestParam.year,
            batch_idx: _this.requestParam.batch_idx,
            project_name: _this.selectByName
          }
        }).then(res => {
          console.log(res)
        })
      } else if (this.category === 'textbook') {
      } else {
        console.log('请选择需要查询的类别')
      }
    }
  }
}
</script>

<style scoped>
.data-query {
  height: 130px;
  margin-left: 105px;
  margin-top: 80px;
  width: 205px;
}
</style>
