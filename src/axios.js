import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:8081'
