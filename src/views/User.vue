<template>
  <div class="home-container">
    <el-container>
      <!-- 导航栏 -->
      <el-card class="nav">
        <el-menu style="border-right: white;" :default-active="activePath">
          <!-- 基本信息 -->
          <el-menu-item index="/user/info" @click="saveNavState('/user/info')">
            <i class="el-icon-menu"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <!-- 我的填报 -->
          <el-menu-item index="/user/data" @click="saveNavState('/user/data')">
            <i class="el-icon-document"></i>
            <span slot="title">我的填报</span>
          </el-menu-item>
          <!-- 生成批次 -->
          <el-menu-item @click="dialog = true">
            <i class="el-icon-setting"></i>
            <span slot="title">生成批次</span>
          </el-menu-item>
          <!-- 生成批次填表抽屉 -->
          <el-drawer
            title="生成批次"
            :before-close="handleClose"
            :visible.sync="dialog"
            size="40%"
            custom-class="demo-drawer"
            ref="drawer"
          >
            <div class="demo-drawer__content">
              <el-form :model="generateForm.batch.year" label-width="60px">
                <el-form-item label="年 份" label-width="120px">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label=" 批次名" label-width="120px">
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
            </div>
          </el-drawer>

        </el-menu>
        <br><br>
        <el-menu style="border-right: white;">
          <el-menu-item @click="logout">
            <i class="el-icon-switch-button"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-card>

      <!-- 卡片栏 -->
      <el-card class="user-card">
        <router-view></router-view>
      </el-card>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'User',
  data: function () {
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
      // 激活的路由
      activePath: '',
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
  created () {
    // 从缓存中获取已保存的链接地址
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 保存激活的菜单栏
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
      this.$router.push(activePath)
    },
    // 退出登录
    logout () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '登出成功!'
        })
        // 删除激活的链接
        window.sessionStorage.setItem('activePath', '')
        // 跳转到主页
        this.$router.push('/home')
        this.$store.commit('REMOVE_INFO')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消登出'
        })
      })
    },
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

<style>
.home-container {
  width: 1150px;
  margin: 0 auto;
  height: 750px;
  background-color: #F2F2F2;
}

.nav {
  margin-left: 10px;
  margin-right: 5px;
  width: 250px;
  height: 300px;
}

.user-card {
  margin-left: 10px;
  margin-right: 50px;
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
