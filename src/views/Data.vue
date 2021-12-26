<template>
  <el-container class='data-container'>
    <el-header>
      <!-- 头部 -->
      <div class="data-header">
        <el-link type="primary" style="line-height: 60px" @click='this.requestParam.category = "project"'>按项目填报</el-link>
        <span style="padding: 0 10px 0 10px; line-height: 60px">|</span>
        <el-link type="primary" style="line-height: 60px" @click='this.requestParam.category = "textbook"'>按教材填报</el-link>
        <span style="margin-right: 20px; margin-left: 645px">
        <el-button type="primary" @click="fillingDialogVisible = true">填报</el-button>
      </span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
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
      </el-aside>
      <el-container>
        <!-- 主页面显示 -->
        <div class="data-main">
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" class="data-bread">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>2017年</el-breadcrumb-item>
            <el-breadcrumb-item>第二轮本科评估</el-breadcrumb-item>
            <el-breadcrumb-item>按项目查询</el-breadcrumb-item>
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
                  <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">导出</el-button>
                  <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">详细</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :total="10" class="data-footer"></el-pagination>
          </el-card>
        </div>
      </el-container>
    </el-container>

    <!-- 填报对话框 -->
    <el-dialog
      :visible.sync="fillingDialogVisible"
      width="30%"
      @close="fillingDialogClosed">
      <el-form
        :model="fillingForm"
        :rules="fillingFormRules"
        ref="fillingFormRef"
        style="margin-top: 27px;"
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

    <!-- 编辑对话框 -->
    <el-dialog
      :visible.sync="editorDialogVisible"
      width="30%"
      @close="editorDialogClosed">
    </el-dialog>

    <!-- 详细对话框 -->
    <el-dialog
      :visible.sync="detailDialogVisible"
      width="30%"
      @close="detailDialogClosed">
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'Data',
  data () {
    return {
      // 通过项目名或教材名查询
      selectByName: '',
      // 后端返回数据
      tableData: [],
      // 填报对话框
      fillingDialogVisible: false,
      // 编辑对话框
      editorDialogVisible: false,
      // 详情对话框
      detailDialogVisible: false,
      // TODO 填报表单规则
      fillingFormRules: {},
      // 用户填报
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
      // 级联框，在函数中赋值给 userFillingForm 中 category
      cascaderValue: [],
      // 当前批次
      requestParam: {
        year: String(this.$store.getters.getYear),
        batch_idx: String(this.$store.getters.getBatchIdx),
        batch_name: String(this.$store.getters.getBatchName),
        category: 'project',
        // 当前页尺寸
        page_size: 10,
        // 当前页页码
        page_num: 1
      }
    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    fillingDialogClosed () {
      this.$refs.fillingFormRef.resetFields()
    },
    editorDialogClosed () {
      this.$refs.editorFormRef.resetFields()
    },
    // 获取当前页数据
    getDataList () {
      const _this = this
      this.$axios.get('/batches', this.requestParam).then(res => {
        if (res.data.code !== 200) {
          _this.$message.error('获取数据失败')
          return res
        }
        _this.tableData = res
        _this.$store.commit('increment')
      })
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
    },
    queryByName () {
      const _this = this
      if (this.requestParam.category === 'project') {
        this.$axios.get('/projects', {
          params: {
            year: _this.requestParam.year,
            batch_idx: _this.requestParam.batch_idx,
            project_name: _this.selectByName
          }
        }).then(res => {
        })
      } else if (this.requestParam.category === 'textbook') {
      } else {
        console.log('请选择需要查询的类别')
      }
    }
  }
}
</script>

<style>
.data-container {
  width: 1150px;
  margin: 0 auto;
  height: 750px;
  background-color: #F2F2F2;
}
.data-header {
  height: 60px;
  width: 900px;
  margin: 30px auto;
  background-color: #FFFFFF;
  border-radius: 4px;
  padding: 0 20px 0 20px;
}
.data-query {
  height: 130px;
  margin-left: 105px;
  margin-top: 80px;
  width: 205px;
}
.data-bread {
  margin-top: 30px;
  margin-left: 20px;
}
.data-main {
  height: 550px;
  margin-left: 10px;
  margin-top: 18px;
  width: 710px;
}
.data-footer {
  text-align: center;
}
</style>
