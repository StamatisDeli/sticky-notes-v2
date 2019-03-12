<template>
<div class="container h-100 justify-content-center">
  <div class="row h-100 justify-content-center">
    <!-- Left content -->
  <div class="col-xs-6 welcome offset-2 ">
    <div class="col offset-4">
      <h2>80's style <br> organizer </h2>
    </div>
    <div class="col offset-4" >  
      <img class=" img-fluid app-logo"  src="../assets/logo-big.svg">
    </div>
    <div class="col offset-4">  
      <img class="img-fluid sd-logo" src="../assets/sd-logo.svg">
    </div>
    <footer class="footer offset-4">
        <p>&copy; Stamatis Deliyannis 2019</p>
    </footer>
  </div>
<!-- Left content -->
  <div class="col-xs-6 form offset-2 ">
    <form @submit.prevent="signUp">
      <div class="form-header">
        <h2>Sign Up</h2>
      </div>
       <div class="form-group">
        <label>User Name</label>
        <input type="name" class="form-control" autocomplete="new-name"
        name="name" required="required"
        id="name" v-model="formData.name">
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <p class="error-message" >{{ wrongEmail() }}</p>
        <input type="email" class="form-control" autocomplete="new-email"
        name="email" required="required"
        id="email" v-model="formData.email">
      </div>
      <div class="form-group">
        <label>Password</label>
        
        <input type="password" class="form-control" autocomplete="new-password" minlength=6 maxlength=10
        name="password" required="required"
        id="password" v-model="formData.password">
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" class="form-control" autocomplete="confirm-password" minlength=6 maxlength=10
        name="confirm_password" 
        
        id="confirm-password" v-model="formData.confirmPassword">
      </div>
      <div class="form-group small">
        <label class="checkbox-inline">
          <!-- TODO: required="required" -->
          <input type="checkbox" > I accept the
          <a href="#">Terms of Use</a> &amp;
          <a href="#">Privacy Policy</a>
        </label>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block btn-lg">Sign Up</button>
      </div>
    </form>
    <div class="text-center small">Already have an account?
      <router-link to="login" tag="a">Login here</router-link>
    </div>
    <!-- <div class="custom">
      <button class="btn btn-lg btn-google custom" type="submit">
      <i class="fab fa-google mr-2"></i>Sign Up with Google</button>
    </div> -->
  </div>

  <BaseSuccess v-show="showSuccess" />
</div>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
  name:'signUp',
  data () {
      return {
        showSuccess: false,
        formData:{
          name: 'Doe',
          email: 'doe@gmail.com',
          password: 'dddddd'
        }
      }
    },
  methods:{
    signUp(){
        return this.$store.dispatch('auth/signup', this.formData)
          .then((res)=>{
            if(!this.$store.getters['auth/isAuthenticated']) return NProgress.done()
            this.showSuccess = true
            setTimeout(()=>{
              this.showSuccess = false
              return this.$router.push('/')
            }, 1500)
          })
          .catch((e)=>{
            console.log('Error Signin Up!: '+e.message);
          })
    },
    wrongEmail(){
      let msg = this.$store.getters['auth/responseMsg']
      if(!msg.length) return null
      if(msg==="Email already exists") return msg
    },
    wrongPassword(){
      let msg = this.$store.getters['auth/responseMsg']
      if(!msg.length) return null
      if(msg==="Invalid Password") return msg
    }
  }
}
</script>


<style scoped>
.container{
  position: absolute;
  top:0;
  max-width: 100%;
  max-height: 100%;
  background-color: #FF2E77;
  padding: 5rem;
  background-image: url('../assets/grid.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
}
.welcome {
  /* z-index: 0; */
  display: flex;
  flex-flow: column wrap;
  justify-content: space-evenly;
  align-items: center;
  align-content:space-evenly;
  width: 250px;

}
.sd-logo{
  margin: 2rem;
  width: 20%;
}
h2 {
  font-family: 'Caveat', cursive;
  font-size: 3rem;
  color: rgb(151, 0, 0);
  text-align: center;
}
.back-image{
  position: fixed;
  z-index: 1;
  width: 70%;
  opacity: 0.8;
}
h2 {
  font-size: 2rem;
}
.error-message{
  color:rgb(204, 4, 4);
}
@media only screen and (max-width: 850px) {
  .welcome{
    display: none;
  }
}
@media only screen and (max-width: 500px) {
  .container{
    background-size: 120%;
    padding: 0;
    padding-top: 2rem;
  }
}
</style>

