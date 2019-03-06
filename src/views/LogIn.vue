<template>
<div class="container">
    <div class="form ">
    <form @submit.prevent="logIn">
      <div class="form-header">
        <h2>Log In</h2>
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <p >{{ wrongEmail() }}</p>
        <input type="email" class="form-control" autocomplete="email" 
        name="email" required="required"
        id="email" v-model="formData.email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <p>{{ wrongPassword() }}</p>
        <input type="password" class="form-control" autocomplete="password" minlength=6 maxlength=10
        name="password" required="required"
        id="password" v-model="formData.password">
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block btn-lg">Log In</button>
      </div>
    </form>
    <div class="text-center small">You don't have an account?
      <router-link to="signup" tag="a">Sign Up here</router-link>
    </div>
  </div>
  <BaseSuccess v-show="showSuccess" />
</div>
</template>

<script>
export default {
  name:'LogIn',
  data () {
      return {
        showSuccess: false,
        formData:{
          email: 'stam@gmail.com',
          password: 'ssssss'
        }
      }
  },
  methods: {
    logIn(){
      return this.$store.dispatch('auth/login', {email: this.formData.email, password: this.formData.password})
        .then((res)=>{ 
          if(!this.$store.getters['auth/isAuthenticated'])return

          this.showSuccess = true
          this.$store.commit('auth/SET_MESSAGE','')

          setTimeout(()=>{
            this.showSuccess = false
            return this.$router.push('/')
          }, 1500)
        })
    },
    wrongEmail(){
      let msg = this.$store.getters['auth/responseMsg']
      if(!msg.length) return null
      if(msg==="Email does not exist") return msg
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
  display: flex;
  align-self:center;
  margin: 0 auto;
}
</style>
