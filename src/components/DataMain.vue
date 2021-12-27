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
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="名称" width="385">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
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
      <el-pagination background layout="prev, pager, next" :total="10" class="data-footer"></el-pagination>
    </el-card>
  </div>

  <!-- 编辑对话框-项目 -->
  <el-dialog
    :visible.sync="editorProjectDialogVisible"
    width="30%"
    @close="editorProjectDialogClosed">
    <el-form
      :model="editorProjectForm"
      :rules="editorProjectFormRules"
      ref="editorProjectFormRef"
      title="编辑"
      >
      <div class="data-project">
        <el-form-item prop="name" label="项目名">
          <el-input v-model="editorProjectForm.project.name"></el-input>
        </el-form-item>
        <el-form-item prop="host" label="主持人">
          <el-input v-model="editorProjectForm.project.host"></el-input>
        </el-form-item>
        <el-form-item prop="category" label="项目性质">
          <el-input v-model="cascaderValue"></el-input>
        </el-form-item>
        <el-form-item prop="department" label="部门">
          <el-input v-model="editorProjectForm.project.department"></el-input>
        </el-form-item>
        <el-form-item prop="money" label="经费">
          <el-input v-model="editorProjectForm.project.money"></el-input>
        </el-form-item>
        <el-form-item prop="number" label="项目编号">
          <el-input v-model="editorProjectForm.project.number"></el-input>
        </el-form-item>
        <el-form-item prop="start_time" label="项目开始时间">
          <el-input v-model="editorProjectForm.project.start_time"></el-input>
        </el-form-item>
        <el-form-item prop="end_time" label="项目结束时间">
          <el-input v-model="editorProjectForm.project.end_time"></el-input>
        </el-form-item>
        <el-form-item prop="attachment" label="附件">
          <el-input v-model="editorProjectForm.project.attachment"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>

    <!-- 详细对话框 -->
    <el-dialog
      :visible.sync="detailDialogVisible"
      width="30%">
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
      // TODO 编辑表单规则
      editorProjectFormRules: {},
      // 级联框，在函数中赋值给 userFillingForm 中 category
      cascaderValue: [],
      // 详情对话框
      detailDialogVisible: false
    }
  },
  created () {
    this.getDataList()
    this.changeCategoryEnglishToChinese()
  },
  methods: {
    changeCategoryEnglishToChinese () {
      if (this.category === 'project') {
        this.category_chinese = '项目'
      } else {
        this.category_chinese = '教材'
      }
    },
    handleEdit (index, row) {
      if (this.category === 'project') {
        this.editorProjectDialogVisible = true
      } else {
        this.editorTextbookDialogVisible = true
      }
      console.log(index, row)
    },
    editorProjectDialogClosed () {
      this.$refs.editorProjectFormRef.resetFields()
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleOut (index, row) {
      console.log(index, row)
    },
    handleCareful (index, row) {
      console.log(index, row)
    },
    editorDialogClosed () {
      this.$refs.editorFormRef.resetFields()
    },
    // 获取当前页数据
    getDataList () {
      const _this = this
      this.$axios.get('/batches', {
        params: {
        }
      }).then(res => {
        if (res.data.code !== 200) {
          _this.$message.error('获取数据失败')
          return res
        }
        _this.tableData = res
        _this.$store.commit('increment')
      })
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
</style>
