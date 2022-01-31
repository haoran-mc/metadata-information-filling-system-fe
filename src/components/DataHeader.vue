<template>
  <el-container>
    <!-- 头部 -->
    <el-card class="data-header-card">
      <div class="font-layout">
        <el-link type="primary" style="line-height: 60px;" @click='setCategory("project")'>按项目填报</el-link>
        <span style="padding: 0 10px 0 10px; line-height: 60px;">|</span>
        <el-link type="primary" style="line-height: 60px;" @click='setCategory("textbook")'>按教材填报</el-link>
        <el-button type="primary" @click="fillingDialogVisible = true" style="margin-left: 70%;">填 报</el-button>
        <!-- <el-button type="success" @click="exportToExcel">导 出</el-button> -->
      </div>
    </el-card>

    <!-- 填报对话框 -->
    <el-dialog
      :visible.sync="fillingDialogVisible"
      width="60%"
      @close="fillingDialogClosed">
      <el-form
        :inline="true"
        :model="userFillingForm"
        :rules="fillingFormRules"
        size="medium"
        ref="fillingFormRef"
        title="填报"
      >
        <div class="project-card" v-if="$store.getters.getHasProject !== null">
          <el-form-item v-if="spFillingForm.project.name" prop="projectName" class="single-input">
            <el-input v-model="userFillingForm.project.name" placeholder="项目名"></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.host" prop="projectHost" class="single-input">
            <el-input v-model="userFillingForm.project.host" placeholder="主持人"></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.categoryFirstLevel" prop="projectCategoryLevel"
                        class="single-input">
            <el-cascader v-model="cascaderValue" :options="categoryLevel" clearable size="medium"
                         placeholder="项目级别"></el-cascader>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.department" prop="projectDepartment" class="single-input">
            <el-input v-model="userFillingForm.project.department" placeholder="部门"></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.money" prop="projectMoney" class="single-input">
            <el-input v-model="userFillingForm.project.money" placeholder="经费"></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.number" prop="projectNumber" class="single-input">
            <el-input v-model="userFillingForm.project.number" placeholder="编号"></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.startTime" prop="projectPublishingTime" class="single-input">
            <el-date-picker v-model="userFillingForm.project.startTime"
                            value-format="yyyy-MM-dd"
                            type="date" placeholder="项目开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.endTime" prop="projectPublishingTime" class="single-input">
            <el-date-picker v-model="userFillingForm.project.endTime"
                            value-format="yyyy-MM-dd"
                            type="date" placeholder="项目结束时间">
            </el-date-picker>
          </el-form-item>
          <!-- 项目扩展字段 -->
          <div v-for="index in projectExpandList" :key="index">
            <el-form-item class="single-input">
              <el-input v-model="projectExpandJson[index]" :placeholder="index"></el-input>
            </el-form-item>
          </div>
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
        <div class="textbook-card" v-if="$store.getters.getHasTextbook !== null">
          <el-form-item prop="textbookName" class="single-input">
            <el-input v-model="userFillingForm.textbook.name" placeholder="教材名"></el-input>
          </el-form-item>
          <el-form-item prop="textbookEditor" class="single-input">
            <el-input v-model="userFillingForm.textbook.editor" placeholder="主编"></el-input>
          </el-form-item>
          <el-form-item prop="textbookPublishingHouse" class="single-input">
            <el-input v-model="userFillingForm.textbook.publishingHouse" placeholder="出版社"></el-input>
          </el-form-item>
          <el-form-item prop="textbookPublishingTime" class="single-input">
            <el-date-picker v-model="userFillingForm.textbook.publishingTime"
                            value-format="yyyy-MM-dd"
                            type="date" placeholder="出版时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="textbookSelectionTime" class="single-input">
            <el-date-picker v-model="userFillingForm.textbook.selectionTime"
                            value-format="yyyy-MM-dd"
                            type="date" placeholder="发行时间">
            </el-date-picker>
          </el-form-item>
          <!-- 教材扩展字段 -->
          <div v-for="index in textbookExpandList" :key="index">
            <el-form-item class="single-input">
              <el-input v-model="textbookExpandJson[index]" :placeholder="index"></el-input>
            </el-form-item>
          </div>
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
      batchIdx: this.$store.getters.getBatchIdx,
      batchName: this.$store.getters.getBatchName,
      category: this.$store.getters.getCategory,
      userInfo: this.$store.getters.getUser,
      hasProject: this.$store.getters.getHasProject,
      hasTextbook: this.$store.getters.getHasTextbook,
      // 填报对话框
      fillingDialogVisible: false,
      // 因为如果把特殊数据放在 userFillingForm 的话，表格里就是特殊数据了
      // 我们希望放的是 placeholder 之类
      spFillingForm: {
        project: {
          name: '',
          host: '',
          preparer: '',
          categoryFirstLevel: '',
          categorySecondLevel: '',
          categoryThirdLevel: '',
          department: '',
          money: '',
          number: '',
          startTime: '',
          endTime: '',
          attachment: '',
          year: '',
          batchIdx: '',
          expand: ''
        },
        textbook: {
          name: '',
          editor: '',
          preparer: '',
          publishing_house: '',
          publishing_time: '',
          selection_time: '',
          attachment_path: '',
          year: '',
          batchIdx: '',
          expand: ''
        }
      },
      // 用户填报的数据
      userFillingForm: {
        project: {
          name: null,
          host: null,
          preparer: null,
          categoryFirstLevel: null,
          categorySecondLevel: null,
          categoryThirdLevel: null,
          department: null,
          money: null,
          number: null,
          startTime: null,
          endTime: null,
          attachmentPath: null,
          year: null,
          batchIdx: null,
          expand: null
        },
        textbook: {
          name: null,
          preparer: null,
          editor: null,
          publishingHouse: null,
          publishingTime: null,
          selectionTime: null,
          attachmentPath: null,
          year: null,
          batchIdx: null,
          expand: null
        }
      },
      spProjectExpand: {},
      spTextbookExpand: {},
      projectExpandList: [],
      textbookExpandList: [],
      projectExpandJson: {},
      textbookExpandJson: {},
      // TODO 填报表单规则
      fillingFormRules: {},
      // 级联框，在函数中赋值给 userFillingForm 中 category
      categoryLevel: [
        {
          value: '国家级',
          label: '国家级',
          children: [
            {
              value: '科技部项目',
              label: '科技部项目'
            },
            {
              value: '国家自然基金项目',
              label: '国家自然基金项目'
            },
            {
              value: '国家社科基金项目',
              label: '国家社科基金项目'
            }
          ]
        },
        {
          value: '国防/军队重要科研项目',
          label: '国防/军队重要科研项目'
        },
        {
          value: '境外合作科研项目',
          label: '境外合作科研项目'
        },
        {
          value: '部委级项目',
          label: '部委级项目'
        },
        {
          value: '省级项目',
          label: '省级项目',
          children: [
            {
              value: '省教育厅项目',
              label: '省教育厅项目'
            },
            {
              value: '省科技厅项目',
              label: '省科技厅项目'
            },
            {
              value: '省自然科学基金',
              label: '省自然科学基金'
            },
            {
              value: '省哲学/社科基金',
              label: '省哲学/社科基金'
            }
          ]
        }
      ],
      cascaderValue: []
    }
  },
  created () {
    this.judgeSp()
  },
  methods: {
    judgeSp () {
      this.spFillingForm.project = this.$store.getters.getSpProject
      this.spFillingForm.textbook = this.$store.getters.getSpTextbook
      this.spProjectExpand = JSON.parse(this.spFillingForm.project.expand)
      this.spTextbookExpand = JSON.parse(this.spFillingForm.textbook.expand)
      for (const i in this.spProjectExpand) {
        this.projectExpandList.push(i)
      }
      for (const i in this.spTextbookExpand) {
        this.textbookExpandList.push(i)
      }
    },
    setCategory (category) {
      this.category = category
      this.$store.commit('SET_CATEGORY', category)
      this.$router.go(0)
    },
    fillingDialogClosed () {
      this.$refs.fillingFormRef.resetFields()
    },
    filling () {
      const _this = this

      if (this.hasProject) {
        if (this.cascaderValue[0]) {
          this.userFillingForm.project.categoryFirstLevel = this.cascaderValue[0]
        }
        if (this.cascaderValue[1]) {
          this.userFillingForm.project.categorySecondLevel = this.cascaderValue[1]
        }
        if (this.cascaderValue[2]) {
          this.userFillingForm.project.categoryThirdLevel = this.cascaderValue[2]
        }
        this.userFillingForm.project.year = this.year
        this.userFillingForm.project.batchIdx = this.batchIdx
        this.userFillingForm.project.preparer = this.userInfo.username
        this.userFillingForm.project.expand = JSON.stringify(this.projectExpandJson)
      } else {
        this.userFillingForm.project = null
      }

      if (this.hasTextbook) {
        this.userFillingForm.textbook.year = this.year
        this.userFillingForm.textbook.batchIdx = this.batchIdx
        this.userFillingForm.textbook.preparer = this.userInfo.username
        this.userFillingForm.textbook.expand = JSON.stringify(this.textbookExpandJson)
      } else {
        this.userFillingForm.textbook = null
      }

      this.$axios.post('/batch', this.userFillingForm).then(res => {
        if (res.data.code === 200) {
          _this.$message.success('填报成功')
          _this.fillingDialogVisible = false
        } else if (res.data.code === 201) {
          _this.fillingDialogVisible = false
          this.$message.error('填报请求失败')
        }
      })
    },
    exportToExcel () {
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

.project-card {
  height: 200px;
  overflow: auto;
  background-color: #f6f8f8;
  border: 1px solid #F2F2F2;
  margin: 0 10px 30px 10px;
  padding: 10px;
}

.textbook-card {
  height: 200px;
  overflow: auto;
  background-color: #f6f8f8;
  border: 1px solid #F2F2F2;
  margin: 30px 10px 0 10px;
  padding: 10px;
}

.single-input {
  display: inline-block;
  width: 25%;
  margin-left: 10px;
  margin-bottom: 10px;
  padding-right: 30px;
}
</style>
