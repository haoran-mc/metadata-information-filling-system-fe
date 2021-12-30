<template>
  <el-container>
    <!-- 头部 -->
    <el-card class="data-header-card">
      <div class="font-layout">
        <el-link type="primary" style="line-height: 60px;" @click='setCategory("project")'>按项目填报</el-link>
        <span style="padding: 0 10px 0 10px; line-height: 60px;">|</span>
        <el-link type="primary" style="line-height: 60px;" @click='setCategory("textbook")'>按教材填报</el-link>
        <el-button type="primary" @click="fillingDialogVisible = true" style="margin-left: 70%;">填 报</el-button>
      </div>
    </el-card>

    <!-- 填报对话框 -->
    <el-dialog
    :visible.sync="fillingDialogVisible"
    width="50%"
    @close="fillingDialogClosed">
        <el-form
          :inline="true"
          :model="userFillingForm"
          :rules="fillingFormRules"
          size="medium"
          ref="fillingFormRef"
          title="填报"
        >
          <div class="card" v-if="$store.getters.getHasProject === '1'">
            <el-form-item prop="projectName" style="width: 30%">
              <el-input v-model="userFillingForm.project.name" placeholder="项目名"></el-input>
            </el-form-item>
            <el-form-item prop="projectHost" style="width: 30%">
              <el-input v-model="userFillingForm.project.host" placeholder="主持人"></el-input>
            </el-form-item>
            <el-form-item prop="projectUserPhone" style="width: 30%">
              <el-input v-model="userFillingForm.project.phone" placeholder="填表人电话"></el-input>
            </el-form-item>
            <el-form-item prop="projectCategoryLevel" style="width: 30%">
              <el-cascader v-model="cascaderValue" :options="category_level" clearable size="medium" placeholder="项目级别"></el-cascader>
            </el-form-item>
            <el-form-item prop="projectDepartment" style="width: 30%">
              <el-input v-model="userFillingForm.project.department" placeholder="部门"></el-input>
            </el-form-item>
            <el-form-item prop="projectMoney" style="width: 30%">
              <el-input v-model="userFillingForm.project.money" placeholder="经费"></el-input>
            </el-form-item>
            <el-form-item prop="projectNumber" style="width: 30%">
              <el-input v-model="userFillingForm.project.number" placeholder="编号"></el-input>
            </el-form-item>
            <el-form-item prop="projectPublishingTime" style="width: 30%">
              <el-date-picker
                v-model="userFillingForm.project.start_time" type="date" placeholder="项目开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="projectPublishingTime" style="width: 30%">
              <el-date-picker
                v-model="userFillingForm.project.end_time" type="date" placeholder="项目结束时间">
              </el-date-picker>
            </el-form-item>
            <!-- 上传附件 -->
            <!--
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将压缩包拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            -->
          </div>
          <div class="card" v-if="$store.getters.getHasTextbook === '1'">
            <el-form-item prop="textbookName" style="width: 30%">
              <el-input v-model="userFillingForm.textbook.name" placeholder="教材名"></el-input>
            </el-form-item>
            <el-form-item prop="textbookEditor" style="width: 30%">
              <el-input v-model="userFillingForm.textbook.editor" placeholder="主编"></el-input>
            </el-form-item>
            <el-form-item prop="textbookUserPhone" style="width: 30%">
              <el-input v-model="userFillingForm.textbook.phone" placeholder="填表人"></el-input>
            </el-form-item>
            <el-form-item prop="textbookPublishingHouse" style="width: 30%">
              <el-input v-model="userFillingForm.textbook.publishing_house" placeholder="出版社"></el-input>
            </el-form-item>
            <el-form-item prop="textbookPublishingTime" style="width: 30%">
              <el-date-picker
                v-model="userFillingForm.textbook.publishing_time" type="date" placeholder="出版时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="textbookSelectionTime" style="width: 30%">
              <el-date-picker
                v-model="userFillingForm.textbook.selection_time" type="date" placeholder="发行时间">
              </el-date-picker>
            </el-form-item>
            <!-- 上传附件 -->
            <!--
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将压缩包拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            -->
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
          phone: '',
          category_first_level: '',
          category_second_level: '',
          category_third_level: '',
          department: '',
          money: null,
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
      category_level: [
        {
          value: '国家级',
          label: '国家级',
          children: [
            { value: '科技部项目', label: '科技部项目' },
            { value: '国家自然基金项目', label: '国家自然基金项目' },
            { value: '国家社科基金项目', label: '国家社科基金项目' }
          ]
        },
        { value: '国防/军队重要科研项目', label: '国防/军队重要科研项目' },
        { value: '境外合作科研项目', label: '境外合作科研项目' },
        { value: '部委级项目', label: '部委级项目' },
        {
          value: '省级项目',
          label: '省级项目',
          children: [
            { value: '省教育厅项目', label: '省教育厅项目' },
            { value: '省科技厅项目', label: '省科技厅项目' },
            { value: '省自然科学基金', label: '省自然科学基金' },
            { value: '省哲学/社科基金', label: '省哲学/社科基金' }
          ]
        }
      ],
      cascaderValue: []
    }
  },
  methods: {
    setCategory (category) {
      this.category = category
      this.$store.commit('SET_CATEGORY', category)
      // this.$store.commit('increment')
      this.$router.go(0)
    },
    fillingDialogClosed () {
      this.$refs.fillingFormRef.resetFields()
    },
    filling () {
      const _this = this

      this.userFillingForm.project.year = this.year
      this.userFillingForm.project.batch = this.batch_idx
      if (this.cascaderValue[0]) {
        this.userFillingForm.project.category_first_level = this.cascaderValue[0]
      }
      if (this.cascaderValue[1]) {
        this.userFillingForm.project.category_second_level = this.cascaderValue[1]
      }
      if (this.cascaderValue[2]) {
        this.userFillingForm.project.category_third_level = this.cascaderValue[2]
      }

      console.log('--', this.userFillingForm)

      this.userFillingForm.textbook.year = this.year
      this.userFillingForm.textbook.batch = this.batch_idx

      this.$axios.post('/batches', this.userFillingForm).then(res => {
        if (res.data.code !== 200) {
          this.$message.error('填报请求失败')
          return res
        }
        _this.$message.success('填报成功')
        _this.fillingDialogVisible = false
      })
    }
  }
}
</script>

<style scoped>
.data-header-card {
  height: 60px;
  width: 100%;
  margin: 30px auto 0 auto;
}

.font-layout {
  line-height: 60px;
  margin-top: -20px;
}

.card {
  padding: 20px;
  background-color: #F6F8F8;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
