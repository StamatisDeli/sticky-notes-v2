import Vue from "vue";
import Router from "vue-router";
import Note from './components/Note.vue'
//import NoteThumb from './components/NoteThumb.vue'
import LogIn from "./views/LogIn.vue";
import SignUp from "./views/SignUp.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/welcome",
      name: "welcome",
      // component: Welcome
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/WelcomeScreen.vue")
    },
    {
      path: "/",
      name: "home",
      // component: Home
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
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
      // component: () =>
      // import(/* webpackChunkName: "logIn" */ './views/LogIn.vue')
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
      // component: () =>
      // import(/* webpackChunkName: "logIn" */ './views/LogIn.vue')
    },
    // {
    //   path: "/notethumb",
    //   name: "notethumb",
    //   component: NoteThumb
    //   // component: () =>
    //   // import(/* webpackChunkName: "logIn" */ './views/LogIn.vue')
    // },
    {
      path: "/note",
      name: "note",
      component: Note
      // component: () =>
      // import(/* webpackChunkName: "logIn" */ './views/LogIn.vue')
    }
  ]
});
