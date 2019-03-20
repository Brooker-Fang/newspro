import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NewsContent from '@/components/NewsContent'
import NewsInfo from '@/components/NewsInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {path: '/',component:NewsContent},
        {path:'/NewInfo',name:'NewInfo',component:NewsInfo}
      ]
    }
  ]
})
