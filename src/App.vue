<template>
  <div id="app">
    <div class="overlay"></div>
    <div id="nav">
      <!-- <router-link to="/welcome">Welcome Screen</router-link> | -->
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

export default {
  computed:{
    ...mapState({
        userId: state => state.auth.userId
    })
  },
  mounted () {
    this.$router.push('/welcome')
    setTimeout(() => {
      this.$router.go(-1)
    }, 2000)
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
</style>
