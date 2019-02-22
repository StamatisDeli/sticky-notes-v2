<template>
    <div class="welcome" @click="goHome()">
        <h2>organize your life with ease!!!</h2>
        <img src="../assets/sticky-notes-welcome-screen.svg">
        <footer class="navbar navbar-fixed-bottom">
            <p>&copy; Stamatis Deliyannis 2019</p>
        </footer>
    </div>
</template>

<script>
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
    display: block;
    position: absolute;
    margin: auto;
    width: 100%;
    height: 90%;
}
img {
    width: 75%;
    height:75%;
}
h2 {
  font-family: 'Caveat', cursive;
  font-size: 5rem;
  color: rgb(151, 0, 0);
}
@media only screen and (max-width: 700px) {
    img {
        width: 100%;

    }
}
</style>
