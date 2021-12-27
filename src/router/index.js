import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Data from '../views/Data.vue'
import userInfo from '../components/UserInfo.vue'
import userData from '../components/UserData.vue'
import userBatch from '../components/UserBatch.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/data',
    name: 'Data',
    component: Data
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    children: [
      { path: '/user/info', component: userInfo },
      { path: '/user/data', component: userData },
      { path: '/user/batch', component: userBatch }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
