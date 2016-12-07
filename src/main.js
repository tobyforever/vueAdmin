import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//页面顶部进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueRouter from 'vue-router'
import App from './App'
import store from './vuex/store'

import Login from './components/Login'
import Home from './components/Home'
import Main from './components/Main'
import Table from './components/nav1/Table'
import Form from './components/nav1/Form'
import Page3 from './components/nav1/Page3'
import Page4 from './components/nav2/Page4'
import Page5 from './components/nav2/Page5'
import Page6 from './components/nav3/Page6'
import HBFlightList from './components/hbflight/HBFlightList'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  {
    path: '/login',
    component: Login,
    hidden: true//不显示在导航中
  },
  //{ path: '/main', component: Main },
  {
    hidden: true,
    path: '/',
    component: Home,
    name: '导航一',
    iconCls: 'el-icon-message', //图标样式class
    children: [
      //{ path: '/main', component: Main },
      {path: '/table', component: Table, name: 'Table'},
      {path: '/form', component: Form, name: 'Form'},
      {path: '/page3', component: Page3, name: '页面3'},
    ]
  },
  {
    hidden: true,
    path: '/',
    component: Home,
    name: '导航二',
    iconCls: 'fa fa-id-card-o',
    children: [
      {path: '/page4', component: Page4, name: '页面4'},
      {path: '/page5', component: Page5, name: '页面5'}
    ]
  },
  {
    hidden: true,
    path: '/',
    component: Home,
    name: '',
    iconCls: 'fa fa-line-chart',
    //只有一个节点
    leaf: true,
    children: [
      {path: '/page6', component: Page6, name: '导航三'}
    ]
  },
  {
    path: '/',
    component: Home,
    name: '航班候补',
    iconCls: 'fa fa-line-chart',
    leaf: true,
    children: [
      {path: '/hblist', component: HBFlightList, name: '航班候补列表'},
    ]
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach((transition) => {
  NProgress.done();
});

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: {App}
  //render: h => h(Login)
}).$mount('#app')

//TODO：检查用户登录状态，根据需要弹出登录窗口
//router.replace('/login')

