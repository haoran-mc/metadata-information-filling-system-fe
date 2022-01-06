import axios from 'axios'
import Vue from 'vue'
import Element from 'element-ui'
import store from './store'
// import router from './router'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:8081' // 请求路径
axios.defaults.withCredentials = true // 允许跨域

// 前置拦截
axios.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    // 配置请求头的 token
    config.headers.satoken = localStorage.getItem('token')
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  const res = response.data
  /*
  console.log('============')
  console.log(res)
  console.log('============')
  */

  if (res.code === 200) {
    return response
  } else {
    Element.Message.error('密码错误', { duration: 3 * 1000 })
    return Promise.reject(response.data.msg)
  }
},
error => {
  if (error.response.data) {
    error.message = error.response.data.msg
  }
  if (error.response.status === 401) {
    // 先把 vuex 中信息清空
    store.commit('REMOVE_INFO')
    Element.Message.warning('请登录后访问')
  } else {
    Element.Message.error(error.message, { duration: 3 * 1000 })
    return Promise.reject(error)
  }
}
)
