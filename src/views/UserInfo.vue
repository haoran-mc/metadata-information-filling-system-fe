<template>
  <div>
    <el-form label-width="80px" label-position = "left">
      <!-- 姓名 -->
      <el-form-item label = "姓名">
        <el-input></el-input>
      </el-form-item>

      <!-- 头像 -->
      <el-form-item label = "头像">
        <el-avatar src="http://localhost:8080/img/head.586d89ca.png"></el-avatar>
      </el-form-item>

      <!-- 联系方式 -->
      <el-form-item label = "联系方式">
        <el-input disabled></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label = "密码">
        <el-input disabled></el-input>&nbsp;&nbsp;
        <el-button @click="dialogFormVisible = true">修改</el-button>

        <!-- 密码修改弹窗 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" >
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
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
        <el-button type="primary">保存</el-button>
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
  methods: {
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
    }
  }
}
</script>

<style scoped>
.el-input{
  width: 250px;
}
</style>
