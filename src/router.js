import Vue from "vue"
import Router from "vue-router"
import Note from './components/Note.vue'
import LogIn from "./views/LogIn.vue"
import SignUp from "./views/SignUp.vue"
import Home from "./views/Home.vue"
import Instructions from "./views/Instructions.vue"

Vue.use(Router);

const router = new Router ({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: LogIn
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/note",
      name: "note",
      component: Note
    },
    {
      path: "/instructions",
      name: "instructions",
      component: Instructions
    }
  ]
})

router.beforeResolve((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
