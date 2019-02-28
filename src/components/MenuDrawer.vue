<template>
<div class="modal" tabindex="-1" role="dialog" @click="toggleMenu">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">User Name</h5>
        <p>{{ email() }}</p>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p @click="logoutUser" >Log Out</p>
        <p>User Information</p>
        <p>About</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
    name:'MenuDrawer',
    props:{
        toggleMenu:{
            type: Function
        }
    },
    methods: {
        email() {
            return this.$store.getters.user? this.$store.getters.user.email: 'No User'
        },
        logoutUser() {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    },
    created(){
        console.log('Menu',this.$store.getters.user)
    }
    }
</script>

<style scoped>
.navbar {
    z-index: 10;
    padding: 0;
    position: fixed!important;
    top: 0px!important;
    left: 0px!important;
    border-radius: 0px;
}
.modal{
    display: block;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.5);
}
.modal-body>p{
    cursor:pointer;
}
</style>