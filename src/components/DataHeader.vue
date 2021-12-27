<template>
  <el-container>
  <!-- 头部 -->
  <el-card class="data-header">
    <el-link type="primary" style="line-height: 60px" @click='setCategory("project")'>按项目填报</el-link>
    <span style="padding: 0 10px 0 10px; line-height: 60px">|</span>
    <el-link type="primary" style="line-height: 60px" @click='setCategory("textbook")'>按教材填报</el-link>
    <el-button type="primary" @click="fillingDialogVisible = true">填报</el-button>
  </el-card>

  <!-- 填报对话框 -->
  <el-dialog
    :visible.sync="fillingDialogVisible"
    width="30%"
    @close="fillingDialogClosed">
    <el-form
      :model="userFillingForm"
      :rules="fillingFormRules"
      ref="fillingFormRef"
      title="填报"
    >
      <div class="data-project">
        <el-form-item prop="name" label="项目名">
          <el-input v-model="userFillingForm.project.name"></el-input>
        </el-form-item>
        <el-form-item prop="host" label="主持人">
          <el-input v-model="userFillingForm.project.host"></el-input>
        </el-form-item>
        <el-form-item prop="category" label="项目性质">
          <el-input v-model="cascaderValue"></el-input>
        </el-form-item>
        <el-form-item prop="department" label="部门">
          <el-input v-model="userFillingForm.project.department"></el-input>
        </el-form-item>
        <el-form-item prop="money" label="经费">
          <el-input v-model="userFillingForm.project.money"></el-input>
        </el-form-item>
        <el-form-item prop="number" label="项目编号">
          <el-input v-model="userFillingForm.project.number"></el-input>
        </el-form-item>
        <el-form-item prop="start_time" label="项目开始时间">
          <el-input v-model="userFillingForm.project.start_time"></el-input>
        </el-form-item>
        <el-form-item prop="end_time" label="项目结束时间">
          <el-input v-model="userFillingForm.project.end_time"></el-input>
        </el-form-item>
        <el-form-item prop="attachment" label="附件">
          <el-input v-model="userFillingForm.project.attachment"></el-input>
        </el-form-item>
      </div>
      <div class="data-textbook">
      </div>
    </el-form>
    <!-- 填报按钮 -->
    <div style="text-align: center; margin-top: 10px; margin-bottom: 30px;">
      <el-button
        type="primary"
        @click="filling"
        style="width: 63%; margin: 10px auto 20px auto;"
      >填 报
      </el-button>
    </div>
  </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'DataHeader',
  data () {
    return {
      year: this.$store.getters.getYear,
      batch_idx: this.$store.getters.getBatchIdx,
      batch_name: this.$store.getters.getBatchName,
      category: this.$store.getters.getCategory,
      // 填报对话框
      fillingDialogVisible: false,
      // 用户填报的数据
      userFillingForm: {
        project: {
          name: '',
          host: '',
          category_first_level: '',
          category_second_level: '',
          category_third_level: '',
          department: '',
          money: 0,
          number: '',
          start_time: '',
          end_time: '',
          attachment: '',
          year: '',
          batch: ''
        },
        textbook: {
          name: '',
          phone: '',
          editor: '',
          publishing_house: '',
          publishing_time: '',
          selection_time: '',
          attachment_path: ''
        }
      },
      // TODO 填报表单规则
      fillingFormRules: {},
      // 级联框，在函数中赋值给 userFillingForm 中 category
      cascaderValue: []
    }
  },
  methods: {
    setCategory (category) {
      this.category = category
      this.$store.commit('SET_CATEGORY', category)
    },
    fillingDialogClosed () {
      this.$refs.fillingFormRef.resetFields()
    },
    filling () {
      const _this = this
      this.$axios.post('/batches', this.userFillingForm).then(res => {
        if (res.data.code !== 200) {
          this.$message.error('填报请求失败')
          return res
        }
        _this.$message.success('填报成功')
        _this.fillingDialogVisible = false
        _this.getDataList()
      })
    }
  }
}
</script>

<style scoped>
/*
.data-header {
  height: 60px;
  width: 900px;
  margin: 30px auto 0 auto;
  background-color: #FFFFFF;
  border-radius: 4px;
  padding: 0 20px 0 20px;
}
*/

.data-header {
  height: 60px;
  width: 900px;
  margin: 30px auto 0 auto;
  background-color: #FFFFFF;
  border-radius: 4px;
  padding: 0 20px 0 20px;
}
</style>
