import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入axios
import axios from 'axios'
axios.defaults.baseURL = ' http://liangwei.tech:3000'
Vue.prototype.$axios = axios

//拦截器如果请求没有token,则放入token
axios.interceptors.request.use(config => {
  if (!config.headers.Authorization && localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
})
//饿了么ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

//添加过滤器，过滤没有基础url的图片链接
Vue.filter('fixImgUrl', (oldUrl) => {
  if (oldUrl.indexOf("http") > -1) {
    return oldUrl;
  } else {
    return axios.defaults.baseURL + oldUrl;
  }
})


new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
