<template>
  <div>
    <el-form
      :model="UserForm"
      ref="loginFormRef"
      label-width="80px" label-position = "left">
      <!-- 姓名 -->
      <el-form-item prop="username" label = "姓名">
        <el-input v-model="UserForm.username"></el-input>
      </el-form-item>

      <!-- 头像 -->
      <el-form-item label = "头像">
        <el-avatar src="http://localhost:8080/img/head.586d89ca.png"></el-avatar>
      </el-form-item>

      <!-- 联系方式 -->
      <el-form-item prop="phone" label = "联系方式">
        <el-input v-model="UserForm.phone" disabled></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password" label = "密码">
        <el-input v-model="UserForm.password" disabled type="password"></el-input>&nbsp;&nbsp;
        <el-button @click="dialogFormVisible = true">修改</el-button>

        <!-- 密码修改弹窗 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" >
          <el-form :model="ruleForm"
                   status-icon :rules="rules"
                   ref="ruleForm"
                   label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <br>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>&nbsp;&nbsp;
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button>取消</el-button>&nbsp;&nbsp;
        <el-button type="primary" @click="userFormPut">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      UserForm: {
        phone: '18726698277',
        username: '刘浩然',
        password: 'haoran232'
      },
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.userInfo = this.$store.getters.getUser
  },
  methods: {
    UserInfoGet () {
      // 获取用户资料
      this.$axios.get('/users/info', this.UserForm).then(res => {
        console.log(res)

        if (res.data.code !== 200) {
          this.$message.error('用户资料获取异常！')
          return res
        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('密码修改提交成功!')
        } else {
          console.log('密码修改提交失败!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 传递更改后的信息
    userFormPut () {
      this.$axios.put('/users/info', this.UserForm).then(res => {
        console.log(res)

        if (res.data.code !== 200) {
          this.$message.error('修改信息发生异常，请确认信息无误后再行操作！')
          return
        }
        this.$message.success('信息更新完毕！')
      })
    }
  },
  // 监听修改后的密码并同步至用户个人资料界面
  watch: {
    'ruleForm.pass': {
      handler () {
        this.UserForm.password = this.ruleForm.pass
      }
    }
  }
}
</script>

<style scoped>
.el-input{
  width: 250px;
}
</style>
