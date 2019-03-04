<template>
<div class="container">
  <div class="form centered">
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

  </div>
  <div class="custom">
    <button class="btn btn-lg btn-google custom" type="submit">
    <i class="fab fa-google mr-2"></i>Log in with Google</button>
  </div>
  <BaseSuccess v-show="showSuccess" />
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
            this.showSuccess = true
            setTimeout(()=>{
              this.showSuccess = false
              return this.$router.push('/')
            }, 1500)
          })
          .catch((e)=>{
            console.log('Error Signin Up!: '+e.message);
          })
    }
  }
}
</script>


<style scoped>

</style>

