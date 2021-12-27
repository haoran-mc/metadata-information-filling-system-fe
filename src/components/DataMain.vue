<template>
  <el-container class="data-main">
  <!-- 主页面显示 -->
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="data-bread">
      <el-breadcrumb-item>{{this.year}} 年填报数据</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.batch_name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.category_chinese}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 数据 -->
    <el-card class="data-main">
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

  <!-- 编辑对话框 -->
  <el-dialog
    :visible.sync="editorDialogVisible"
    width="30%"
    @close="editorDialogClosed">
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
      editorDialogVisible: false,
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
      console.log(index, row)
    },
    handleDelete (index, row) {
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
  height: 550px;
  margin-left: 10px;
  margin-top: 18px;
  width: 710px;
}
</style>
