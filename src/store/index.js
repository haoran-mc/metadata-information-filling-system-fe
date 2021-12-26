import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
    key: Date.now(),
    year: sessionStorage.getItem('year'),
    batchIdx: sessionStorage.getItem('batchIdx'),
    batchName: sessionStorage.getItem('batchName')
  },
  mutations: {
    // set，状态与载体
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      // sessionStorage 只能存字符串
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    SET_YEAR: (state, year) => {
      state.year = year
      sessionStorage.setItem('year', year)
    },
    SET_BATCHIDX: (state, batchIdx) => {
      state.batchIdx = batchIdx
      sessionStorage.setItem('batchIdx', batchIdx)
    },
    SET_BATCHNAME: (state, batchName) => {
      state.batchName = batchName
      sessionStorage.setItem('batchName', batchName)
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = {}
      state.year = ''
      state.batchIdx = ''
      state.batchName = ''
      // localStorage 与 sessionStorage
      localStorage.setItem('token', '')
      sessionStorage.setItem('userInfo', JSON.stringify(''))
      sessionStorage.setItem('year', '')
      sessionStorage.setItem('batchIdx', '')
      sessionStorage.setItem('batchName', '')
    },
    increment (state) {
      state.key = Date.now()
    }
  },
  getters: {
    // get，也可以直接通过 state.token 来获得
    getToken: state => {
      return state.token
    },
    getUser: state => {
      return state.userInfo
    },
    getYear: state => {
      return state.year
    },
    getBatchIdx: state => {
      return state.batchIdx
    },
    getBatchName: state => {
      return state.batchName
    }
  },
  actions: {
  },
  modules: {
  }
})
