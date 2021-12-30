<template>
  <el-container>
  <!-- 主页面显示 -->
  <div class="data-main">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="data-bread">
      <el-breadcrumb-item>{{this.year}} 年填报数据</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.batch_name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.category_chinese}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 数据 -->
    <el-card style="height: 85%">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="handleOut(scope.$index, scope.row)">导出</el-button>
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
        :current-page="page_num"></el-pagination>
<!--      :total="total"-->
    </el-card>
  </div>

    <!-- 编辑对话框-项目 -->
    <el-dialog
    :visible.sync="editorProjectDialogVisible"
    width="30%"
    >
    <el-form
      :inline="true"
      :model="detailProjectForm"
      ref="editorProjectFormRef"
      title="编辑"
      >
      <div class="card">
        <el-form-item prop="projectName" label="项目名">
          <el-input v-model="detailProjectForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="host" label="主持人">
          <el-input v-model="detailProjectForm.host"></el-input>
        </el-form-item>
        <el-form-item prop="category" label="项目性质">
          <el-input v-model="detailProjectForm.cascader"></el-input>
        </el-form-item>
        <el-form-item prop="department" label="部门">
          <el-input v-model="detailProjectForm.department"></el-input>
        </el-form-item>
        <el-form-item prop="money" label="经费">
          <el-input v-model="detailProjectForm.money"></el-input>
        </el-form-item>
        <el-form-item prop="number" label="项目编号">
          <el-input v-model="detailProjectForm.number"></el-input>
        </el-form-item>
        <el-form-item prop="start_time" label="项目开始时间">
          <el-input v-model="detailProjectForm.start_time"></el-input>
        </el-form-item>
        <el-form-item prop="end_time" label="项目结束时间">
          <el-input v-model="detailProjectForm.end_time"></el-input>
        </el-form-item>
        <el-form-item prop="attachment_path" label="附件">
          <el-input v-model="detailProjectForm.attachment_path"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-button type="primary" style="margin-left: 80%">确定</el-button>
      </div>
    </el-form>
    </el-dialog>
    <!-- 编辑对话框-教材 -->
    <el-dialog
      :visible.sync="editorTextbookDialogVisible"
      width="30%"
    >
      <el-form
        :inline="true"
        :model="detailTextbookForm"
        ref="editorTextbookFormRef"
        title="编辑"
      >
        <div class="card">
          <el-form-item prop="textbookName" label="教材名">
            <el-input v-model="detailTextbookForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="host" label="主编">
            <el-input v-model="detailTextbookForm.editor"></el-input>
          </el-form-item>
          <el-form-item prop="userPhone" label="填表人">
            <el-input v-model="detailTextbookForm.phone"></el-input>
          </el-form-item>
          <el-form-item prop="publishHouse" label="出版社">
            <el-input v-model="detailTextbookForm.publishing_house"></el-input>
          </el-form-item>
          <el-form-item prop="publishingTime" label="出版时间">
            <el-input v-model="detailTextbookForm.publishing_time"></el-input>
          </el-form-item>
          <el-form-item prop="selectionTime" label="发行时间">
            <el-input v-model="detailTextbookForm.selection_time"></el-input>
          </el-form-item>
          <el-form-item prop="attachment_path" label="附件">
            <el-input v-model="detailProjectForm.attachment_path"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-button type="primary" style="margin-left: 80%">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 详细对话框-项目 -->
    <el-dialog
      :visible.sync="detailProjectDialogVisible"
      width="30%">
      <el-form
        :inline="true"
        :model="detailProjectForm"
        ref="detailProjectFormRef"
        title="详细"
      >
        <div class="card">
          <el-form-item prop="projectName" label="项目名">
            <el-input disabled v-model="detailProjectForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="host" label="主持人">
            <el-input disabled v-model="detailProjectForm.host"></el-input>
          </el-form-item>
          <el-form-item prop="category" label="项目性质">
            <el-input disabled v-model="detailProjectForm.cascader"></el-input>
          </el-form-item>
          <el-form-item prop="department" label="部门">
            <el-input disabled v-model="detailProjectForm.department"></el-input>
          </el-form-item>
          <el-form-item prop="money" label="经费">
            <el-input disabled v-model="detailProjectForm.money"></el-input>
          </el-form-item>
          <el-form-item prop="number" label="项目编号">
            <el-input disabled v-model="detailProjectForm.number"></el-input>
          </el-form-item>
          <el-form-item prop="start_time" label="项目开始时间">
            <el-input disabled v-model="detailProjectForm.start_time"></el-input>
          </el-form-item>
          <el-form-item prop="end_time" label="项目结束时间">
            <el-input disabled v-model="detailProjectForm.end_time"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <!-- 详细对话框-教材 -->
    <el-dialog
      :visible.sync="detailTextbookDialogVisible"
      width="30%">
      <el-form
        :inline="true"
        :model="detailTextbookForm"
        ref="detailTextbookFormRef"
        title="详细"
      >
        <div class="card">
          <el-form-item prop="textbookName" label="教材名">
            <el-input disabled v-model="detailTextbookForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="editor" label="主编">
            <el-input disabled v-model="detailTextbookForm.editor"></el-input>
          </el-form-item>
          <el-form-item prop="userPhone" label="填表人电话">
            <el-input disabled v-model="detailTextbookForm.phone"></el-input>
          </el-form-item>
          <el-form-item prop="publish_house" label="出版社">
            <el-input disabled v-model="detailTextbookForm.publishing_house"></el-input>
          </el-form-item>
          <el-form-item prop="publishing_time" label="出版时间">
            <el-input disabled v-model="detailTextbookForm.publishing_time"></el-input>
          </el-form-item>
          <el-form-item prop="selection_time" label="发行时间">
            <el-input disabled v-model="detailTextbookForm.selection_time"></el-input>
          </el-form-item>
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
      batch_idx: this.$store.getters.getBatchIdx,
      batch_name: this.$store.getters.getBatchName,
      category: this.$store.getters.getCategory,
      category_chinese: '项目',
      total: null,
      page_num: 1,
      page_size: 7,
      // 后端返回数据
      tableData: [],
      // 编辑对话框
      editorProjectDialogVisible: false,
      editorTextbookDialogVisible: false,
      // 用户编辑的数据
      editorProjectForm: {
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
      editorTextbookForm: {
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
      // TODO 编辑表单规则
      // editorProjectFormRules: {},
      // editorTextbookFormRules: {},
      // 级联框，在函数中赋值给 userFillingForm 中 category
      cascaderValue: [],
      // 详情对话框
      detailProjectDialogVisible: false,
      detailTextbookDialogVisible: false,
      // 用户详细页面的数据
      detailProjectForm: {
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
          attachment_path: '',
          year: '',
          batch: ''
        }
      },
      detailTextbookForm: {
        textbook: {
          name: '',
          phone: '',
          editor: '',
          publishing_house: '',
          publishing_time: '',
          selection_time: '',
          attachment_path: ''
        }
      }
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
      this.batch_idx = this.$store.getters.getBatchIdx
      this.batch_name = this.$store.getters.getBatchName

      this.$axios.get('/batches', {
        params: {
          year: _this.year,
          batch_idx: _this.batch_idx,
          category: _this.category,
          page_num: _this.page_num,
          page_size: _this.page_size
        }
      }).then(res => {
        if (res.data.code !== 200) {
          _this.$message.error('获取数据失败')
          return res
        }
        _this.tableData = res.data.data

        if (_this.category === 'project') {
          for (const item in _this.tableData) {
            console.log(item)
            _this.tableData[item].cascader = _this.tableData[item].category_first_level + '/' + _this.tableData[item].category_second_level + '/' + _this.tableData[item].category_third_level
          }
        }

        console.log('--', _this.tableData)
      })
    },
    // 分页按钮
    handleCurrentChange (newPage) {
      this.page_num = newPage
      this.getDataBySessionInfo()
    },
    // 面包屑中文
    changeCategoryEnglishToChinese () {
      if (this.category === 'project') {
        this.category_chinese = '项目'
      } else {
        this.category_chinese = '教材'
      }
    },
    // 编辑按钮
    handleEdit (index, row) {
      if (this.category === 'project') {
        this.editorProjectDialogVisible = true
      } else {
        this.editorTextbookDialogVisible = true
      }
      console.log(index, row)
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
    // 导出按钮
    handleOut (index, row) {
      console.log(index, row)
    },
    // 详情按钮
    handleCareful (index, row) {
      if (this.category === 'project') {
        this.detailProjectDialogVisible = true
        this.detailProjectForm = row
      } else {
        this.detailTextbookDialogVisible = true
        this.detailTextbookForm = row
      }
    },
    editorProjectDialogClosed () {
      this.$refs.editorProjectFormRef.resetFields()
    },
    editorTextbookDialogClosed () {
      this.$refs.editorTextbookFormRef.resetFields()
    }
  }
}
</script>

<style scoped>
.data-main {
  margin-right: 20px;   /* 因为 el_card__body padding = 20px */
  margin-top: 58px;   /* 与 aside 一样，上边距为 58px */
  width: 100%;   /* 尽量不用具体数据 */
}

.card {
  padding: 20px;
  background-color: #F6F8F8;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
