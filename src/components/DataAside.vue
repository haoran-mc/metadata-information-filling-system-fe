<template>
  <el-container>
  <!-- 查询-侧边栏 -->
    <el-card class="data-aside-card">
      <el-input v-model="selectByName" placeholder="请输入名称"></el-input>
      <el-button
        style="width: 100%; margin-top: 15px; margin-bottom: 12px"
        type="primary"
        icon="el-icon-search"
        @click="queryByName"
      >查询</el-button>

      <span class="data-aside-prompt">
        <span class="red_dot">*</span>
        请输入全称并点击查询
      </span>
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
            year: _this.$store.getters.getYear,
            batch_idx: _this.$store.getters.getBatchIdx,
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
.data-aside-card {
  margin-left: 20px;   /* 因为 el_card__body padding = 20px */
  margin-top: 58px;   /* 与 main 一样，上边距为 58px */
  width: 85%;
}

.data-aside-prompt {
  font-size: 12px;
  color: #999;
}

.red_dot {
  margin-right: 5px;
  vertical-align: middle;
  color: red;
}
</style>
