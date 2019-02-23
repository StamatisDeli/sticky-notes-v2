<template>
<div>
    <div class="signup-form">
    <form @submit.prevent="logIn">
      <div class="form-header">
        <h2>Log In</h2>
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input type="email" class="form-control" autocomplete="email" 
        name="email" required="required"
        id="email" v-model="formData.email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" autocomplete="password" minlength=6 maxlength=10
        name="password" required="required"
        id="password" v-model="formData.password">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block btn-lg">Log In</button>
      </div>
    </form>
    <div class="text-center small">You don't have an account?
      <a href="#">Sign Up here</a>
    </div>
  </div>
</div>
</template>

<script>
//import firebase from 'firebase'
export default {
  name:'LogIn',
  data () {
      return {
          submitted: false,
          formData:{
            email: '',
            password: ''}

      }
  },
  methods: {
    logIn(){
      this.$store.dispatch('login', {email: this.formData.email, password: this.formData.password})
            .then((user)=>{
              this.$router.push('/')
            })
            .catch((e)=>{
                alert(e.message)
            })
    }
  },
}
</script>

<style >

</style>
