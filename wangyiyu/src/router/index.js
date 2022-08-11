import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

//路由数组
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/itemmusic',
    name: 'itemmusic',
    component: () => import( '../views/ItemMusicView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import( '../views/Search.vue')
  }
]

//路由对象
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
