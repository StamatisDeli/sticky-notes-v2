import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import firebase from 'firebase'
import firebaseConfig from "./helpers/firebaseConfig"

Vue.config.productionTip = false

axios.defaults.baseURL = "https://sticky-notes-v2.firebaseio.com"


// before a request is made start the nprogress
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})

// before a response is returned stop nprogress
axios.interceptors.response.use(response => {
  NProgress.done()
  return response
})

firebase.initializeApp(firebaseConfig)
window.firebase = firebase

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
