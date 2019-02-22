<template>
<div class="container">
  <div class="signup-form">
    <form @submit.prevent="signUp">
      <div class="form-header">
        <h2>Sign Up</h2>
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
      <div class="form-group">
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
      <a href="#">Login here</a>
    </div>

  </div>
  <div class="custom">
    <button class="btn btn-lg btn-google custom" type="submit">
    <i class="fab fa-google mr-2"></i>Log in with Google</button>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
  name:'SignUp',
  data () {
      return {
        formData:{
          email: '',
          password: ''
        }
      }
    },
    methods:{
      signUp(){
          this.$store.dispatch('signup', this.formData)
              .then((user)=>{
                //this.$router.replace('/Home')
              })
              .catch((e)=>{
                alert('Error!: '+e.message);
              })
      }

    }
}
</script>


<style>

</style>

