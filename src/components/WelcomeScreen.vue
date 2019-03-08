<template>
    <div class="welcome" @click="goHome()">
        <h2>80's style <br> organizer </h2>
          <img class="app-logo"  src="../assets/logo-big.svg">
          <img class="sd-logo" src="../assets/sd-logo.svg">
          <img class="back-image" src="../assets/grid.svg">

        <footer class="footer">
            <p>&copy; Stamatis Deliyannis 2019</p>
        </footer>
    </div>
</template>

<script>
import SignUp from '../views/SignUp.vue';
export default {
  methods: {
    goHome () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.welcome {
  z-index: 5;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  align-content:space-evenly;
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
  background-color: #FF2E77;
}
.app-logo {
  width: 30%;
  height: 30%;
}
.sd-logo{
  width: 5%;
  height: 5%;
}
h2 {
  font-family: 'Caveat', cursive;
  font-size: 3rem;
  color: rgb(151, 0, 0);
  text-align: center;
}
footer {
  width: 35%;
}
.back-image{
  position: fixed;
  z-index:-1;
  width: 70%;
  opacity: 0.8;
}
h2 {
  font-size: 2rem;
}
@media only screen and (max-width: 700px) {
  .app-logo{
    width: 60%;
  }
  .sd-logo{
    width: 10%;
  }
  .back-image{
    width: 130%;
    transform:          rotate(90deg);
    -ms-transform:      rotate(90deg);
    -moz-transform:     rotate(90deg);
    -webkit-transform:  rotate(90deg);
    -o-transform:       rotate(90deg);
  }
}
</style>
