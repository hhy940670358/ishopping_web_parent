import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
//import Mock from './mock'   //自己mock  不推荐
//Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
//对axios进行同一配置
import axios from 'axios'  //和引入vue一样   ===引入node_modules/axios文件
//axios.defaults.baseURL=" https://www.easy-mock.com/mock/5c3a0441cbbb0462fb0e27f3/ishopping/services" //配置前缀  easymock  【1.前端开发时使用】
axios.defaults.baseURL="http://127.0.0.1:9227/services" //配置前缀   【2.联调时使用（上线）】
// 将API方法绑定到全局  /plat/login
Vue.prototype.$http = axios   //别名
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})
//路由每次执行前，都会判断是否登录
router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })  //拿不到值 跳转登录
  } else {
    next() //拿到值继续访问
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')     //vue对象挂载app上
