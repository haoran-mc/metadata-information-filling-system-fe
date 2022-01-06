import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Data from '../views/Data.vue'
import userInfo from '../components/UserInfo.vue'
import userData from '../components/UserData.vue'
import userManage from '../components/UserManage.vue'
import myProject from '../components/MyProjects.vue'
import myTextbook from '../components/MyTextbook.vue'
import notFound from '../components/NotFound.vue'
import Element from 'element-ui'

Vue.use(Router)

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
      { path: '/user/manage', component: userManage }
    ]
  },
  {
    path: '/404',
    name: 'notFound',
    component: notFound
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/home' || to.path === '/data') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (token === null || token === '') {
      // 如果有 login 页面，那就直接 next('/login')
      Element.Message.warning('请登录后访问！')
      next(from.path)
    } else {
      next()
    }
  }
})

export default router
