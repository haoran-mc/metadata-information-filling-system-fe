<template>
  <!-- 生成批次填表抽屉 -->
  <el-container>
    <el-card class="user-batch-card">
      <el-container style="height: 100%; overflow: auto">
        <el-form :model="generateForm" label-width="60px" :inline="true">
          <!-- 年份 -->
          <el-form-item label="年 份" label-width="85px">
            <el-date-picker v-model="generateForm.batch.year"
                            type="year"
                            placeholder="请选择年份"
                            style="width: 100%"
                            size="mini">
            </el-date-picker>
          </el-form-item>
          <!-- 批次名 -->
          <el-form-item label="批次名" label-width="85px">
            <el-input v-model="generateForm.batch.name"
                      placeholder="例：本科第一轮评估"
                      size="mini"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" label-width="85px">
            <el-date-picker
              v-model="generateForm.batch.endTime"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
              size="mini">
            </el-date-picker>
          </el-form-item>
          <!-- 项目卡片 -->
          <el-card style="background-color: #f6f8f8">
            <!-- 项目开关 -->
            <!-- TODO 打开开关，才能勾选 -->
            <div class="div-head" slot="header">
              <el-form-item label="项 目">
                <el-switch v-model="generateForm.project.has"></el-switch>
              </el-form-item>
            </div>
            <!-- 项目复选框 -->
            <div style="height: 132px; overflow: auto">
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
                           v-model="generateForm.project.category"
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
              <div v-for="(item in arrayData" :key="item.id">
                <el-input type="text" placeholder="请填写测试需求" v-model="item.data"></el-input>
              </div>
              <el-button type="primary" @click="add">+</el-button>
            </div>
          </el-card>
          <!-- 教材卡片 -->
          <el-card style="background-color: #f6f8f8; margin-top: 10px">
            <!-- 教材开关 -->
            <div class="div-head" slot="header">
              <el-form-item label="教 材">
                <el-switch v-model="generateForm.textbook.has" value="textbook"></el-switch>
              </el-form-item>
            </div>
            <!-- 教材复选框 -->
            <div style="height: 88px; overflow: auto">
            <el-checkbox class="el-checkbox-width"
                         label="教材名"
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
          </el-card>
        </el-form>
      </el-container>

      <div class="div-button">
        <el-button type="primary" @click="generateBatch">生成批次</el-button>
      </div>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: 'UserBatch',
  data () {
    return {
      // 返回年份
      year: '',
      arrayData: [
        { id: 0, data: '' }
      ],
      dataNum: 0,
      // 生成批次
      generateForm: {
        batch: {
          year: '',
          name: '',
          endTime: ''
        },
        project: {
          has: false,
          year: false,
          batchIdx: false,
          name: false,
          host: false,
          category: false,
          categoryFirstLevel: false,
          categorySecondLevel: false,
          categoryThirdLevel: false,
          department: false,
          money: false,
          number: false,
          startTime: false,
          endTime: false,
          attachmentPath: false,
          expand: []
        },
        textbook: {
          has: false,
          year: false,
          batchIdx: false,
          name: false,
          editor: false,
          publishingHouse: false,
          publishingTime: false,
          selectionTime: false,
          attachmentPath: false,
          expand: []
        }
      }
    }
  },
  methods: {
    // 提交生成批次
    generateBatch () {
      // 1. 是否 project 和 textbook 都是 null，如果都是，直接 return
      console.log(this.generateForm)

      this.$axios.post('/metadatas', this.generateForm).then(res => {
        console.log(res)

        if (res.data.code !== 200) {
          this.$message.error('生成批次失败！')
          return
        }
        this.$message.success('生成批次成功！')
      })
    },
    delete (index) {
      // 如果只有一个输入框则不可以删除
      if (this.arrayData.length <= 1) {
        return false
      }
      // 删除了数组中对应的数据也就将这个位置的输入框删除
      this.arrayData.splice(index, 1)
    },
    add () {
      this.arrayData.push(
        {
          id: this.dataNum++,
          data: ''
        }
      )
    }
  }
}
</script>

<style scoped>
.user-batch-card {
  width: 100%;
  height: 96%;
}

.el-checkbox-width {
  width: 25%;
  height: auto;
  margin-left: 10px;
  margin-bottom: 5px;
}

.div-head {
  height: 30px;
  text-align: left;
}

.div-button {
  margin-bottom: 20px;
  margin-top: 20px;
  float: right;
}
</style>
