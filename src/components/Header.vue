<template>
  <el-container class="header-container">
    <img src="../assets/NCU.jpg" width="61px" height="61px" style="margin-top: 6px"/>
    <span
      @click="$router.push('/home')"
      class="header-title"
    >元数据填报系统</span>
    <span style="margin: auto 17px auto auto">
      <el-button type="primary" v-if="isNotLogin === ''" @click="loginDialogVisible = true">登录</el-button>
      <img
        v-else
        src="../assets/head.png"
        @click="$router.push('/user/info')"
        width="60px"
        height="60px"
        style="margin-top: 6px; cursor: pointer;">
    </span>

    <!-- 登录对话框 -->
    <el-dialog
      class="login-dialog"
      :visible.sync="loginDialogVisible"
      width="30%"
      @close="loginDialogClosed">
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        style="margin-top: 27px;"
      >
        <!-- 帐号 -->
        <el-form-item prop="phone" style="text-align: center">
          <el-input
            placeholder="请输入帐号"
            v-model="loginForm.phone"
            style="width: 63%; margin: 5px auto; border: 1px solid black;"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" style="text-align: center">
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            show-password
            style="width: 63%; margin: 5px auto; border: 1px solid black;"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 没有帐号？立即注册 -->
      <div style="margin-left: 18.5%; margin-top: -6px; margin-bottom: 8px;">
        <span style="font-size: 1px;">还没有帐号？<el-link type="primary">立即注册</el-link></span>
      </div>
      <!-- 登录按钮 -->
      <div style="text-align: center; margin-top: 10px; margin-bottom: 30px;">
        <el-button
          type="primary"
          @click="login"
          style="width: 63%; margin: 10px auto 20px auto;"
        >登 录
        </el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    const checkPhone = (rule, value, cb) => {
      const regPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regPhone.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号码'))
    }

    return {
      // 判断是否已登录
      isNotLogin: '',
      // 控制登录页面的显示
      loginDialogVisible: false,
      // 添加用户的表单数据
      loginForm: {
        phone: '18726698277',
        password: 'haoran232'
      },
      // 添加表单的验证规则对象
      loginFormRules: {
        phone: [
          {
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: checkPhone,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '密码的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    // eslint-disable-next-line no-undef
    this.checkLogin()
  },
  methods: {
    // 生命周期函数，判断是否登录
    checkLogin () {
      this.isNotLogin = this.$store.getters.getToken
    },
    // 登录
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        // 如果验证失败，不允许发送请求
        if (!valid) {
          this.$message.error('验证失败')
          return valid
        }
        const _this = this
        this.$axios.post('/accounts/login', this.loginForm).then(res => {
          console.log(res)
          if (res.data.code !== 200) {
            this.$message.error('登录失败！')
            return
          }
          this.$message.success('登录成功！')
          // 隐藏添加用户的对话框
          this.loginDialogVisible = false

          console.log('点击登录按钮，后端发来的数据：', res)

          // const jwt = res.headers['authorization']
          // 获取 jwt
          const jwt = res.headers.authorization
          const userInfo = res.data.data
          _this.$store.commit('SET_TOKEN', jwt)
          _this.$store.commit('SET_USERINFO', userInfo)

          // console.log(_this.$store.getters.getUser)
          _this.$store.commit('increment')
        })
      })
    },
    loginDialogClosed () {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style scoped>
.header-container {
  width: 1150px;
  height: 75px;
  margin: 0 auto;
}

.header-title {
  font-size: 23px;
  margin-left: 15px;
  line-height: 75px;
  cursor: pointer;
}

.login-dialog {
  height: 800px;
}
</style>
