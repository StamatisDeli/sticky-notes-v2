<template>
  <div id="app">
    <div class="overlay"></div>
    <nav>
      <div class="hamburger" v-if="!showMenu" @click="toggleMenu">
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      <img class="logo-small-app" src="@/assets/logo-small.svg" alt="logo">

      <div class="user-container">
        <p v-if="auth" > {{ name() }} </p>
        <router-link to="/login" tag="p" v-else >Login</router-link>
      </div>
      
      <transition name="slide-menu" mode="in-out">
        <MenuDrawer v-if="showMenu" :toggleMenu="toggleMenu" :key="auth" 
        :nameTo="name" :emailTo="email"/>
      </transition>

      <transition name="fade" mode="in-out">
        <div class="darkBg" v-if="showMenu"></div>
      </transition>

    </nav>

    <router-view v-if="!showWelcome"/>

    <transition name="welcome-fade" mode="out-in">
      <WelcomeScreen v-show="showWelcome" style="z-index:50;" />
    </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MenuDrawer from '@/components/MenuDrawer.vue'
import WelcomeScreen from '@/components/WelcomeScreen.vue'

export default {
  data () {
      return {
        showMenu: false,
        showWelcome: true
      }
  },
  computed:{
    ...mapState({
        userId: state => state.auth.userId,
        user: state => state.auth.user
    }),
    auth () {
      return this.$store.getters['auth/isAuthenticated']
    },
    fadeBg () {
      return {
        'background-color': 'rgba(0, 0, 0, 0.3)',
      }
    }
  },
  methods: {
    toggleMenu(){
      return this.showMenu = !this.showMenu
    },
    name () {
      return this.user.name? this.user.name : 'No User'
    },
    email() {
        return this.user.email? this.user.email: 'No User email'
    }
  },
  mounted(){
    setTimeout(() => {
      this.showWelcome=false
    }, 2500)
  },
  created () {
    this.$store.dispatch('auth/tryAutoLogin')
    console.log(this.auth)
  },
  components: {
    MenuDrawer,
    WelcomeScreen
  }
}
</script>

<style>
body,
html {
    height: 100%;
    width: 100%;
}

body,
html,
html * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body {
  color: red;
  background-repeat: no-repeat;
  background: #e2e2e2;
  background: -moz-linear-gradient(-45deg, #e2e2e2 0%, #dbdbdb 50%, #d1d1d1 51%, #fefefe 100%);
  background: -webkit-linear-gradient(-45deg, #e2e2e2 0%,#dbdbdb 50%,#d1d1d1 51%,#fefefe 100%);
  background: linear-gradient(135deg, #e2e2e2 0%,#dbdbdb 50%,#d1d1d1 51%,#fefefe 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e2e2e2', endColorstr='#fefefe',GradientType=1 );
}
.overlay {
  display:block;
  position: absolute;
  margin: 0 auto;
  width:100%;
  height:100%;
  z-index: -1;
  background-image: url("./assets/pattern.svg");
  opacity:0.1;
}

#app {
  z-index:4;
  width: 100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.hamburger{
  position: absolute;
  top: 20px;
  left: 25px;
  display: inline-block;
  cursor: pointer;
}
.hamburger>div{
  width: 35px;
  height: 4px;
  background-color: #bd2130;
  margin: 6px 0;
  border-radius: 2px;
}
.logo-small-app{
  position: absolute;
  top: 10px;
  left: 80px;
  width:80px;
  cursor: pointer;
}
.user-container{
  position: absolute;
  padding: 2px 8px 2px 8px;
  top: 20px;
  right: 25px;
  width: 100px;
  height: 30px;
  background-color: #bd2130;
  border-radius: 15px;
  color:thistle;
  cursor: pointer;
  z-index:10;
}
.form {
  width: 250px;
  margin-right: auto;
  margin-left: auto;
}
.form h2 {
  border-bottom: 1px solid #81888d;
  margin-bottom: 0.5rem;
  width: auto;
}
.form-group {
  margin-bottom: 0.5rem;
}
.form-control{
  width: 250px;
}
.btn-lg{
  padding: 5px;
}
/* WELCOME SCREEN COMPONENT FADE IN */
.welcome-fade-enter-active, .welcome-fade-leave-active {
  transition: opacity .2s ease;
}
.welcome-fade-enter, .welcome-fade-leave-to {
  opacity: 0;
}
/* SLIDE IN MENU */
.slide-menu-leave-active,
.slide-menu-enter-active {
  transition: 0.3s ease;
}
.slide-menu-enter {
  transform: translate(-100%, 0);
}
.slide-menu-leave-to {
  transform: translate(-100%, 0);
}
/* DARK BG DIV */
.darkBg {
    display: block;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
}
/* DARK BG FADE IN */
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
@media only screen and (max-width: 550px) {
nav{
    padding: 2rem;
  }
}
</style>
