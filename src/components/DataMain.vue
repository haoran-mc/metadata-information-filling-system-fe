<template>
  <el-container>
    <!-- 主页面显示 -->
    <div class="data-main">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="data-bread">
        <el-breadcrumb-item>{{ this.year }} 年填报数据</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.batchName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ this.categoryChinese }}</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 数据 -->
      <el-card style="height: 85%">
        <el-table :data="tableData" style="width: 100%">
          <!-- 项目、教材名 -->
          <el-table-column label="名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <!-- 操作按钮 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="success" @click="handleExport(scope.$index, scope.row)">导出</el-button>
              <el-button size="mini" type="warning" @click="handleCareful(scope.$index, scope.row)">详细</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
          style="float: right"
          @current-change="handleCurrentChange"
          :current-page="pageNum"></el-pagination>
        <!--      :total="total"-->
      </el-card>
    </div>

    <!-- 编辑 -->
    <el-dialog
      :visible.sync="editorDialogVisible"
      width="60%">
      <el-form
        :inline="true"
        :model="editorForm"
        size="medium"
        title="编辑">
        <div class="project-card" v-if="$store.getters.getHasProject !== null">
          <el-form-item v-if="spFillingForm.project.name" prop="projectName" class="single-input">
            <el-input v-model="editorForm.project.name" placeholder="项目名"></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.host" prop="projectHost" class="single-input">
            <el-input v-model="editorForm.project.host" placeholder="主持人"></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.categoryFirstLevel" prop="projectCategoryLevel"
                        class="single-input">
            <el-cascader v-model="cascaderValue" :options="categoryLevel" clearable size="medium"
                         placeholder="项目级别"></el-cascader>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.department" prop="projectDepartment" class="single-input">
            <el-input v-model="editorForm.project.department" placeholder="部门"></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.money" prop="projectMoney" class="single-input">
            <el-input v-model="editorForm.project.money" placeholder="经费"></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.number" prop="projectNumber" class="single-input">
            <el-input v-model="editorForm.project.number" placeholder="编号"></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.startTime" prop="projectPublishingTime" class="single-input">
            <el-date-picker v-model="editorForm.project.startTime"
                            value-format="yyyy-MM-dd"
                            type="date" placeholder="项目开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.endTime" prop="projectPublishingTime" class="single-input">
            <el-date-picker v-model="editorForm.project.endTime"
                            value-format="yyyy-MM-dd"
                            type="date" placeholder="项目结束时间">
            </el-date-picker>
          </el-form-item>
          <!-- 项目扩展字段 -->
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
            <el-input v-model="editorForm.textbook.name" placeholder="教材名"></el-input>
          </el-form-item>
          <el-form-item prop="textbookEditor" class="single-input">
            <el-input v-model="editorForm.textbook.editor" placeholder="主编"></el-input>
          </el-form-item>
          <el-form-item prop="textbookPublishingHouse" class="single-input">
            <el-input v-model="editorForm.textbook.publishingHouse" placeholder="出版社"></el-input>
          </el-form-item>
          <el-form-item prop="textbookPublishingTime" class="single-input">
            <el-date-picker v-model="editorForm.textbook.publishingTime"
                            value-format="yyyy-MM-dd"
                            type="date" placeholder="出版时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="textbookSelectionTime" class="single-input">
            <el-date-picker v-model="editorForm.textbook.selectionTime"
                            value-format="yyyy-MM-dd"
                            type="date" placeholder="发行时间">
            </el-date-picker>
          </el-form-item>
          <!-- 教材扩展字段 -->
        </div>
      </el-form>

      <!-- 填报按钮 -->
      <div style="text-align: center; margin-top: 10px; margin-bottom: 30px;">
        <el-button
          type="primary"
          @click="update"
          style="width: 63%; margin: 10px auto 20px auto;"
        >更 新
        </el-button>
      </div>
    </el-dialog>

    <!-- 详细对话框 -->
    <el-dialog
      :visible.sync="detailDialogVisible"
      width="60%">
      <el-form
        :inline="true"
        :model="detailForm"
        size="medium"
        @close="handleCarefulClosed"
        title="详 情">
        <div class="project-card" v-if="this.selectProject === true">
          <el-form-item v-if="spFillingForm.project.name !== null" prop="projectName" class="single-input" label="项目名">
            <el-input v-model="detailForm.project.name" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.host !== null" prop="projectHost" class="single-input" label="主持人">
            <el-input v-model="detailForm.project.host" disabled></el-input>
          </el-form-item>
          <el-form-item prop="projectPreparer" class="single-input" label="填表人">
            <el-input v-model="detailForm.project.preparer" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.categoryFirstLevel !== null" prop="projectCategoryLevel"
                        class="single-input" label="项目级别">
            <el-input v-model="detailForm.project.cascader" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.department !== null" prop="projectDepartment" class="single-input"
                        label="部门">
            <el-input v-model="detailForm.project.department" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.money !== null" prop="projectMoney" class="single-input" label="经费">
            <el-input v-model="detailForm.project.money" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.number !== null" prop="projectNumber" class="single-input" label="编号">
            <el-input v-model="detailForm.project.number" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.startTime !== null" prop="projectPublishingTime" class="single-input"
                        label="项目开始时间">
            <el-input v-model="detailForm.project.startTime" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.project.endTime !== null" prop="projectPublishingTime" class="single-input"
                        label="项目开始时间">
            <el-input v-model="detailForm.project.endTime" disabled></el-input>
          </el-form-item>
          <!-- 项目扩展字段 -->
          <div v-for="(name, index) in projectExpandNameList" :key="index">
            <el-form-item class="single-input" :label="name">
              <el-input v-model="projectExpandValueList[index]" disabled></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="textbook-card" v-if="this.selectTextbook === true">
          <el-form-item v-if="spFillingForm.textbook.name !== null" prop="textbookName" class="single-input" label="教材名">
            <el-input v-model="detailForm.textbook.name" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.textbook.editor !== null" prop="textbookEditor" class="single-input" label="主编">
            <el-input v-model="detailForm.textbook.editor" disabled></el-input>
          </el-form-item>
          <el-form-item prop="textbookPreparer" class="single-input" label="填表人">
            <el-input v-model="detailForm.textbook.preparer" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.textbook.publishing_house !== null" prop="textbookPublishingHouse"
                        class="single-input" label="出版社">
            <el-input v-model="detailForm.textbook.publishingHouse" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.textbook.publishing_time !== null" prop="textbookPublishingTime" class="single-input"
                        label="出版时间">
            <el-input v-model="detailForm.textbook.publishingTime" disabled></el-input>
          </el-form-item>
          <el-form-item v-if="spFillingForm.textbook.selection_time !== null" prop="textbookSelectionTime" class="single-input"
                        label="发行时间">
            <el-input v-model="detailForm.textbook.selectionTime" disabled></el-input>
          </el-form-item>
          <!-- 教材扩展字段 -->
          <div v-for="(name, index) in textbookExpandNameList" :key="index">
            <el-form-item class="single-input" :label="name">
              <el-input v-model="textbookExpandValueList[index]" disabled></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'DataMain',
  data () {
    return {
      year: this.$store.getters.getYear,
      batchIdx: this.$store.getters.getBatchIdx,
      batchName: this.$store.getters.getBatchName,
      category: this.$store.getters.getCategory,
      categoryChinese: '项目',
      userInfo: this.$store.getters.getUser,
      hasProject: this.$store.getters.getHasProject,
      hasTextbook: this.$store.getters.getHasTextbook,
      selectProject: false,
      selectTextbook: false,
      total: null,
      pageNum: 1,
      pageSize: 7,
      // 后端返回数据
      tableData: [
        { cascader: '' }
      ],
      // ------------------------ 准备数据
      spFillingForm: {
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
          attachment: null,
          year: null,
          batchIdx: null,
          expand: null
        },
        textbook: {
          name: null,
          editor: null,
          preparer: null,
          publishing_house: null,
          publishing_time: null,
          selection_time: null,
          attachment_path: null,
          year: null,
          batchIdx: null,
          expand: null
        }
      },
      spProjectExpand: {},
      spTextbookExpand: {},
      // project 扩展列的 json 形式
      projectExpandJson: {},
      textbookExpandJson: {},
      // json 类型的数据不好遍历
      projectExpandNameList: [],
      projectExpandValueList: [],
      textbookExpandNameList: [],
      textbookExpandValueList: [],
      // 级联框，在函数中赋值给 editorForm 中 category
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
      cascaderValue: '',
      // ------------------------ 编辑
      // 编辑对话框
      editorDialogVisible: false,
      // 用户编辑的数据
      editorForm: {
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
      // ------------------------ 详情
      detailForm: {
        project: {
          name: null,
          host: null,
          preparer: null,
          categoryFirstLevel: null,
          categorySecondLevel: null,
          categoryThirdLevel: null,
          cascader: null,
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
      detailDialogVisible: false
    }
  },
  created () {
    this.getDataBySessionInfo()
    this.changeCategoryEnglishToChinese()
  },
  methods: {
    // 获取当前页数据
    getDataBySessionInfo () {
      const _this = this
      this.year = this.$store.getters.getYear
      this.category = this.$store.getters.getCategory
      this.batchIdx = this.$store.getters.getBatchIdx
      this.batchName = this.$store.getters.getBatchName
      this.spFillingForm.project = this.$store.getters.getSpProject
      this.spFillingForm.textbook = this.$store.getters.getSpTextbook

      this.$axios.get('/batch/' + this.year + '/' + this.batchIdx, {
        params: {
          category: _this.category,
          page_num: _this.pageNum - 1,
          page_size: _this.pageSize
        }
      }).then(res => {
        if (res.data.code === 200) {
          _this.tableData = res.data.data
        } else {
          _this.$message.error('获取数据失败')
          return res
        }
      })
    },
    // 分页按钮
    handleCurrentChange (newPage) {
      this.pageNum = newPage
      this.getDataBySessionInfo()
    },
    // 面包屑中文
    changeCategoryEnglishToChinese () {
      if (this.category === 'project') {
        this.categoryChinese = '项目'
      } else {
        this.categoryChinese = '教材'
      }
    },
    // 编辑按钮
    handleEdit (index, row) {
    },
    // 删除按钮
    handleDelete (index, row) {
      const _this = this

      if (this.category === 'project') {
        this.$axios.delete('/projects', {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.data.code !== 200) {
            _this.$message.error('删除失败')
          }
          _this.$message.success('删除成功')
        })
      } else {
        this.$axios.delete('/textbooks').then(res => {
          if (res.data.code !== 200) {
            _this.$message.error('删除失败')
          }
          _this.$message.success('删除成功')
        })
      }
      this.$router.go(0)
    },
    handleExport (index, row) {
    },
    // 详情按钮
    handleCareful (index, row) {
      if (this.category === 'project') {
        this.selectProject = true
        this.detailForm.project = row
        this.projectExpandJson = JSON.parse(row.expand)

        this.projectExpandNameList = []
        this.projectExpandValueList = []
        for (const key in this.projectExpandJson) {
          this.projectExpandNameList.push(key)
          this.projectExpandValueList.push(this.projectExpandJson[key])
        }

        if (this.detailForm.project.categoryFirstLevel !== null) {
          this.detailForm.project.cascader = this.detailForm.project.categoryFirstLevel + '/' + this.detailForm.project.categorySecondLevel + '/' + this.detailForm.project.categoryThirdLevel
        } else if (this.detailForm.project.categorySecondLevel !== null) {
          this.detailForm.project.cascader = this.detailForm.project.categoryFirstLevel + '/' + this.detailForm.project.categorySecondLevel
        } else if (this.detailForm.project.categoryThirdLevel !== null) {
          this.detailForm.project.cascader = this.detailForm.project.categoryFirstLevel
        } else {
          this.detailForm.project.cascader = null
        }
      } else {
        this.selectTextbook = true
        this.detailForm.textbook = row
        this.textbookExpandJson = JSON.parse(row.expand)

        this.textbookExpandNameList = []
        this.textbookExpandValueList = []
        for (const key in this.textbookExpandJson) {
          this.textbookExpandNameList.push(key)
          this.textbookExpandValueList.push(this.textbookExpandJson[key])
        }
        console.log(this.detailForm.textbook)
        console.log(this.spFillingForm.textbook)
      }
      this.detailDialogVisible = true
    },
    handleCarefulClosed () {
      this.selectTextbook = false
      this.selectProject = false
    },
    update () {
    }
  }
}
</script>

<style scoped>
.data-main {
  margin-right: 20px; /* 因为 el_card__body padding = 20px */
  margin-top: 58px; /* 与 aside 一样，上边距为 58px */
  width: 100%; /* 尽量不用具体数据 */
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
  width: 40%;
  margin-left: 10px;
  margin-bottom: 10px;
  padding-right: 30px;
}
</style>
