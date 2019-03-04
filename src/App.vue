<template>
  <div id="app">
    <div class="overlay"></div>
    <div class="hamburger" v-show="!showMenu" @click="toggleMenu">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <img class="logo-small-app" src="@/assets/logo-small.svg" alt="logo">

    <MenuDrawer v-show="showMenu" :toggleMenu="toggleMenu" :key="auth"/>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/signup">SignUp</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MenuDrawer from '@/components/MenuDrawer.vue'
export default {
  data () {
      return {
        showMenu: false
      }
  },
  computed:{
    ...mapState({
        userId: state => state.auth.userId,
        user: state => state.auth.user
    }),
    auth () {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  beforeCreate () {
    this.$router.push('/welcome')
    setTimeout(() => {
      this.$router.go(-1)
    }, 2500)
  },
  created () {
    this.$store.dispatch('auth/tryAutoLogin')
    console.log(this.auth)
  },
  methods: {
    toggleMenu(){
      return this.showMenu = !this.showMenu
    }
  },
  components: {
    MenuDrawer
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
body{
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
  width:7%;
  cursor: pointer;
}
#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.form {
  width: 280px;
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
.btn-lg{
  padding: 5px;
}
</style>
