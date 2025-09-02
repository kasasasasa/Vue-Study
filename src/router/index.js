import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import SearchList from '@/views/search/list'
import ProDetail from '@/views/prodetail'
import Pay from '@/views/pay'
import Myorder from '@/views/myorder'
import Signup from '@/views/signup'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import EditProfile from '@/views/user/edit'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
        { path: '/searchlist', component: SearchList },
        { path: '/prodetail', component: ProDetail },
        { path: '/myorder', component: Myorder }
      ]
    },
    { path: '/pay', component: Pay },
    { path: '/user/edit', component: EditProfile }
  ]
})

export default router
