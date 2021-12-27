<template>
    <!-- 生成批次填表抽屉 -->
      <el-container>
        <el-card class="user-batch-card">
        <el-form :model="generateForm.batch.year" label-width="60px">
          <el-form-item label="年 份" label-width="50px">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" 批次名" label-width="60px">
            <el-col :span = "12">
              <el-input v-model="generateForm.batch.name" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
          <el-card>
            <div class="div_head" slot="header">
              <el-form-item label="项 目">
                <el-switch v-model="generateForm.project.project" value="project"
                ></el-switch>
              </el-form-item>
            </div>
            <div>
              <el-checkbox-group v-model="generateForm.project.type">
                <el-checkbox class="el-checkbox-width"
                             label="项目名"
                             name="name"
                             value="name"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="主持人"
                             name="host"
                             value="host"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="项目性质"
                             name="category_level"
                             value="category_level"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="立项单位排序"
                             name="department"
                             value="department"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="项目经费"
                             name="money"
                             value="money"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="立项时间"
                             name="start_time"
                             value="start_time"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="立项编号"
                             name="number"
                             value="number"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="验收时间"
                             name="end_time"
                             value="end_time"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="主持人联系方式"
                             name="phone"
                             value="phone"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="添加附件"
                             name="attachment_path"
                             value="attachment_path"
                             border></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-card>
          <el-card>
            <div class="div_head" slot="header">
              <el-form-item label="教 材">
                <el-switch v-model="generateForm.textbook.textbook" value="textbook"></el-switch>
              </el-form-item>
            </div>
            <div>
              <el-checkbox-group v-model="generateForm.textbook.type">
                <el-checkbox class="el-checkbox-width"
                             label="教材名"
                             name="name"
                             value="name"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="主编"
                             name="editor"
                             value="editor"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="出版社"
                             name="publishing_house"
                             value="publishing_house"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="出版时间"
                             name="publishing_time"
                             value="publishing_time"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="入选时间"
                             name="selection_time"
                             value="selection_time"
                             border></el-checkbox>
                <el-checkbox class="el-checkbox-width"
                             label="添加附件"
                             name="attachment_path"
                             value="attachment_path"
                             border></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-card>

        </el-form>

        <div class="div_button">
          <el-button @click="cancelForm" >取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer();generateBatch" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
        </el-card>
      </el-container>
</template>

<script>
export default {
  name: 'UserBatch',
  data () {
    return {
      options: [{
        value: 'year1',
        label: '2021'
      }, {
        value: 'year2',
        label: '2022'
      }],
      value: '',
      dialog: false,
      loading: false,
      form: {
        delivery1: false,
        delivery2: false,
        type: []
      },
      formLabelWidth: '80px',
      timer: null,
      // 生成批次
      generateForm: {
        batch: {
          year: '',
          name: ''
        },
        project: {
          project: false,
          type: []
        },
        textbook: {
          textbook: false,
          type: []
        }
      }
    }
  },
  methods: {
    // 抽屉
    handleClose (done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch(_ => {})
    },
    cancelForm () {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    // 提交生成批次
    generateBatch () {
      // 1. 是否 project 和 textbook 都是 null，如果都是，直接 return

      this.$axios.post('/metadatas', this.generateForm).then(res => {
        console.log(res)

        if (res.data.code !== 200) {
          this.$message.error('生成批次失败！')
          return
        }
        this.$message.success('生成批次成功！')
      })
    }
  }
}
</script>

<style scoped>
.user-batch-card {
  width: 100%;
}

.el-checkbox-width{
  width: 150px;
  height: 25px;
  margin-left: 10px;
  margin-bottom: 5px;
}

.div_head{
  height: 30px;
  text-align: left;
}

.div_button{
  text-align: center;
  margin-bottom: 20px;
}
</style>
