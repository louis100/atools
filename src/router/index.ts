import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '模板替换',
      component: HomeView
    },
    {
      path: '/Deduplication',
      name: '去重',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Deduplication.vue')
    },
    {
      path: '/WordCount',
      name: '字符数统计',
      component: () => import('../views/WordCount.vue')
    },
    {
      path: '/CodeParese',
      name: '代码转换',
      component: () => import('../views/CodeParese.vue')
    },
    {
      path: '/Test',
      name: '测试', 
      component: () => import('../views/Test.vue')
    }
  ]
})

export default router
