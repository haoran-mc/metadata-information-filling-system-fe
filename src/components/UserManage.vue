<template>
  <el-container>
    <el-card style="width: 100%; height: 96%;">
      <el-descriptions title="管理员页面" :column="1" border>
        <!-- 生成批次 -->
        <el-descriptions-item label="生成批次">
          <el-tag>
            <el-link class="text" @click="generateDrawer = true">生成批次</el-link>
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="注销用户帐号">
          <el-link type="primary" class="text"></el-link>
          <el-tag>
            <el-link class="text">注销用户帐号</el-link>
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="设置管理员">
          <el-tag>
            <el-link class="text">设置管理员</el-link>
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-drawer
      title="生成批次"
      size="550"
      @close="generateDrawerClosed"
      :visible.sync="generateDrawer">
      <!-- 确定按钮 -->
      <div style="margin: 0 20px 20px 90%;">
        <el-button type="primary" @click="generateBatch">生成批次</el-button>
      </div>
      <el-container style="height: 90%; overflow: auto">
        <el-form :model="generateForm" label-width="60px" :inline="true" ref="generateFormRef">
          <!-- 年份 -->
          <el-form-item label="年 份" label-width="85px">
            <el-date-picker v-model="generateForm.batch.year"
                            type="year"
                            placeholder="请选择年份"
                            value-format="yyyy"
                            style="width: 100%">
            </el-date-picker>
          </el-form-item>
          <!-- 批次名 -->
          <el-form-item label="批次名" label-width="85px">
            <el-input v-model="generateForm.batch.name"
                      placeholder="例：本科第一轮评估"></el-input>
          </el-form-item>
          <!-- 结束时间 -->
          <el-form-item label="结束时间" label-width="85px">
            <el-date-picker
              v-model="generateForm.batch.endTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>

          <!-- 项目卡片 -->
          <div class="project-card">
            <!-- 项目开关 -->
            <!-- TODO 打开开关，才能勾选 -->
            <div class="div-head" slot="header">
              <el-form-item label="项 目">
                <el-switch v-model="generateForm.hasProject"></el-switch>
              </el-form-item>
            </div>
            <div>
              <!-- 项目复选框 -->
              <el-checkbox class="el-checkbox-width"
                           label="项目名"
                           v-model="generateForm.project.name"
                           border></el-checkbox>
              <el-checkbox class="el-checkbox-width"
                           label="主持人"
                           v-model="generateForm.project.host"
                           border></el-checkbox>
              <el-checkbox class="el-checkbox-width"
                           label="项目性质"
                           v-model="generateForm.project.categoryFirstLevel"
                           border></el-checkbox>
              <el-checkbox class="el-checkbox-width"
                           label="立项单位"
                           v-model="generateForm.project.department"
                           border></el-checkbox>
              <el-checkbox class="el-checkbox-width"
                           label="项目经费"
                           v-model="generateForm.project.money"
                           border></el-checkbox>
              <el-checkbox class="el-checkbox-width"
                           label="立项时间"
                           v-model="generateForm.project.startTime"
                           border></el-checkbox>
              <el-checkbox class="el-checkbox-width"
                           label="立项编号"
                           v-model="generateForm.project.number"
                           border></el-checkbox>
              <el-checkbox class="el-checkbox-width"
                           label="验收时间"
                           v-model="generateForm.project.endTime"
                           border></el-checkbox>
              <!--
              <el-checkbox class="el-checkbox-width"
                           label="添加附件"
                           border></el-checkbox>
                           -->
            </div>
            <div v-for="(item, index) in generateForm.projectExpand" :key="index" class="single-input">
              <el-input type="text" placeholder="请填写扩展字段" v-model="item.field"></el-input>
            </div>
            <el-button class="single-input" type="primary" @click="addProjectExpandField">+</el-button>
          </div>

          <!-- 教材卡片 -->
          <div class="textbook-card">
            <!-- 教材开关 -->
            <div class="div-head" slot="header">
              <el-form-item label="教 材">
                <el-switch v-model="generateForm.hasTextbook" value="textbook"></el-switch>
              </el-form-item>
            </div>
            <!-- 教材复选框 -->
            <div>
              <el-checkbox class="el-checkbox-width"
                           label="教材名"
                           true-label="1"
                           false-label="0"
                           v-model="generateForm.textbook.name"
                           border></el-checkbox>
              <el-checkbox class="el-checkbox-width"
                           label="主编"
                           v-model="generateForm.textbook.editor"
                           border></el-checkbox>
              <el-checkbox class="el-checkbox-width"
                           label="出版社"
                           v-model="generateForm.textbook.publishingHouse"
                           border></el-checkbox>
              <el-checkbox class="el-checkbox-width"
                           label="出版时间"
                           v-model="generateForm.textbook.publishingTime"
                           border></el-checkbox>
              <el-checkbox class="el-checkbox-width"
                           label="入选时间"
                           v-model="generateForm.textbook.selectionTime"
                           border></el-checkbox>
              <!--
              <el-checkbox class="el-checkbox-width"
                           label="添加附件"
                           border></el-checkbox>
                           -->
            </div>
            <div v-for="(item, index) in generateForm.textbookExpand" :key="index" class="single-input">
              <el-input type="text" placeholder="请填写扩展字段" v-model="item.field"></el-input>
            </div>
            <el-button class="single-input" type="primary" @click="addTextbookExpandField">+</el-button>
          </div>
        </el-form>
      </el-container>
    </el-drawer>
  </el-container>
</template>

<script>
export default {
  name: 'UserManage',
  data () {
    return {
      generateDrawer: false,
      // 生成批次
      generateForm: {
        batch: {
          year: '',
          name: '',
          endTime: ''
        },
        project: {
          year: false,
          batchIdx: false,
          name: false,
          host: false,
          categoryFirstLevel: false,
          categorySecondLevel: false,
          categoryThirdLevel: false,
          department: false,
          money: false,
          number: false,
          startTime: false,
          endTime: false,
          attachmentPath: false
        },
        textbook: {
          year: false,
          batchIdx: false,
          name: false,
          preparer: false,
          editor: false,
          publishingHouse: false,
          publishingTime: false,
          selectionTime: false,
          attachmentPath: false
        },
        hasProject: false,
        hasTextbook: false,
        projectExpandLen: 0,
        projectExpand: [],
        textbookExpandLen: 0,
        textbookExpand: []
      }
    }
  },
  methods: {
    // 提交生成批次
    generateBatch () {
      // 如果 project 与 textbook 都没有选择
      if (this.generateForm.hasProject === false && this.generateForm.hasTextbook === false) {
        this.$message.error('不能生成空批次！')
      } else {
        // 如果没有选择 project，将 project 置空
        if (this.generateForm.hasProject === false) {
          this.generateForm.project = null
        } else {
          // 否则处理 project 里的数据
          for (const i in this.generateForm.project) {
            if (this.generateForm.project[i] === false) {
              this.generateForm.project[i] = null
            } else {
              if (i === 'startTime' || i === 'endTime') {
                this.generateForm.project[i] = '2012-12-31'
              } else {
                this.generateForm.project[i] = 1
              }
            }
          }
          // 还有扩展字段
          if (this.generateForm.projectExpandLen !== 0) {
            for (const i in this.generateForm.projectExpand) {
              this.generateForm.projectExpand[i] = this.generateForm.projectExpand[i].field
            }
          }
        }

        // 如果没有选择 textbook 将 textbook 置空
        if (this.generateForm.hasTextbook === false) {
          this.generateForm.textbook = null
        } else {
          for (const i in this.generateForm.textbook) {
            if (this.generateForm.textbook[i] === false) {
              this.generateForm.textbook[i] = null
            } else {
              if (i === 'publishingTime' || i === 'selectionTime') {
                this.generateForm.textbook[i] = '2012-12-31'
              } else {
                this.generateForm.textbook[i] = 1
              }
            }
          }
          if (this.generateForm.textbookExpandLen !== 0) {
            for (const i in this.generateForm.textbookExpand) {
              this.generateForm.textbookExpand[i] = this.generateForm.textbookExpand[i].field
            }
          }
        }

        this.$axios.post('/metadata', this.generateForm).then(res => {
          if (res.data.code === 200) {
            this.$message.success('生成批次成功！')
            this.generateDrawer = false
          } else {
            this.$message.error('生成批次失败！')
          }
        })
      }
    },
    generateDrawerClosed () {
      this.generateForm.projectExpand = []
      this.generateForm.textbookExpand = []
      this.generateForm.projectExpandLen = 0
      this.generateForm.textbookExpandLen = 0
    },
    addProjectExpandField () {
      this.generateForm.projectExpand.push({
        id: this.generateForm.projectExpandLen++,
        blank: ''
      })
    },
    addTextbookExpandField () {
      this.generateForm.textbookExpand.push({
        id: this.generateForm.textbookExpandLen++,
        blank: ''
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 15px;
}

.el-checkbox-width {
  width: 25%;
  height: auto;
  margin-left: 10px;
  margin-bottom: 5px;
}

.single-input {
  display: inline-block;
  width: 25%;
  margin-left: 10px;
  margin-bottom: 5px;
  padding-right: 30px;
}

.project-card {
  background-color: #f6f8f8;
  border: 1px solid #F2F2F2;
  margin: 0 10px 30px 10px;
  padding: 10px;
}

.textbook-card {
  background-color: #f6f8f8;
  border: 1px solid #F2F2F2;
  margin: 30px 10px 0 10px;
  padding: 10px;
}
</style>
