<template>
  <el-container>
  <!-- 查询-侧边栏 -->
    <el-card class="data-aside-card">
      <el-input v-model="selectByName" placeholder="请输入名称"></el-input>
      <el-button
        style="width: 100%; margin-top: 15px; margin-bottom: 12px"
        type="primary"
        @click="queryByName"
      >查询</el-button>

      <span class="data-aside-prompt">
        <span class="red_dot">*</span>
        请输入全称并点击查询
      </span>
    </el-card>
    <!-- 查询结果对话框-项目 -->
    <el-dialog
      :visible.sync="queryProjectDialogVisible"
      width="30%"
      @close="queryProjectDialogClosed">
      <el-form
        :model="queryProjectForm"
        ref="queryProjectFormRef"
        title="查询"
      >
        <div class="data-project">
          <el-form-item prop="name" label="项目名">
            <el-input v-model="queryProjectForm.project.name"></el-input>
          </el-form-item>
          <el-form-item prop="host" label="主持人">
            <el-input v-model="queryProjectForm.project.host"></el-input>
          </el-form-item>
          <el-form-item prop="category" label="项目性质">
            <el-input v-model="cascaderValue"></el-input>
          </el-form-item>
          <el-form-item prop="department" label="部门">
            <el-input v-model="queryProjectForm.project.department"></el-input>
          </el-form-item>
          <el-form-item prop="money" label="经费">
            <el-input v-model="queryProjectForm.project.money"></el-input>
          </el-form-item>
          <el-form-item prop="number" label="项目编号">
            <el-input v-model="queryProjectForm.project.number"></el-input>
          </el-form-item>
          <el-form-item prop="start_time" label="项目开始时间">
            <el-input v-model="queryProjectForm.project.start_time"></el-input>
          </el-form-item>
          <el-form-item prop="end_time" label="项目结束时间">
            <el-input v-model="queryProjectForm.project.end_time"></el-input>
          </el-form-item>
          <el-form-item prop="attachment" label="附件">
            <el-input v-model="queryProjectForm.project.attachment"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <!-- 查询结果对话框-教材 -->
    <el-dialog
      :visible.sync="queryTextbookDialogVisible"
      width="30%"
      @close="queryTextbookDialogClosed">
      <el-form
        :model="queryTextbookForm"
        ref="editorTextbookFormRef"
        title="查询"
      >
        <div class="data-project">
          <el-form-item prop="name" label="教材名">
            <el-input v-model="queryTextbookForm.textbook.name"></el-input>
          </el-form-item>
          <el-form-item prop="host" label="主编">
            <el-input v-model="queryTextbookForm.textbook.host"></el-input>
          </el-form-item>
          <el-form-item prop="username" label="填表人">
            <el-input v-model="queryTextbookForm.textbook.username"></el-input>
          </el-form-item>
          <el-form-item prop="publish_house" label="出版社">
            <el-input v-model="queryTextbookForm.textbook.publishing_house"></el-input>
          </el-form-item>
          <el-form-item prop="publishing_time" label="出版时间">
            <el-input v-model="queryTextbookForm.textbook.publishing_time"></el-input>
          </el-form-item>
          <el-form-item prop="selection_time" label="发行时间">
            <el-input v-model="queryTextbookForm.textbook.selection_time"></el-input>
          </el-form-item>
          <el-form-item prop="attachment" label="附件">
            <el-input v-model="queryProjectForm.project.attachment"></el-input>
          </el-form-item>
        </div>
      </el-form>
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
      selectByName: '',
      // 查询对话框
      queryProjectDialogVisible: false,
      queryTextbookDialogVisible: false,
      // 用户查询的数据
      queryProjectForm: {
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
        }
      },
      queryTextbookForm: {
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
      // 级联框，在函数中赋值给 userFillingForm 中 category
      cascaderValue: []
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
    },
    queryProjectDialogClosed () {
      this.$refs.queryProjectFormRef.resetFields()
    },
    queryTextbookDialogClosed () {
      this.$refs.queryTextbookFormRef.resetFields()
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
