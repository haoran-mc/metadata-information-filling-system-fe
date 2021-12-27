import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Data from '../views/Data.vue'
import userInfo from '../components/UserInfo.vue'
import userData from '../components/UserData.vue'
import userBatch from '../components/UserBatch.vue'
import myProject from '../components/MyProjects.vue'
import myTextbook from '../components/MyTextbook.vue'

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
      {
        path: '/user/data',
        component: userData,
        children: [
          { path: '/user/data/projects', component: myProject },
          { path: '/user/data/textbooks', component: myTextbook }
        ]
      },
      { path: '/user/batch', component: userBatch }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
