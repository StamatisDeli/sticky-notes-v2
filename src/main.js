import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import firebase from 'firebase'
import firebaseConfig from "./helpers/firebaseConfig"

Vue.config.productionTip = false

axios.defaults.baseURL = "https://sticky-notes-v2.firebaseio.com"

firebase.initializeApp(firebaseConfig)
window.firebase = firebase

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
