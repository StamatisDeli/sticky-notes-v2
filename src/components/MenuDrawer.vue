<template>
<div class="modal" tabindex="-1" role="dialog" @click="toggleMenu">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-logo">
                <h3>Sticky Notes</h3>
            </div>
            <div class="modal-header">
                <h5 class="modal-title"> {{ name() }} </h5>
                <p>{{ email() }}</p>
            </div>
            <div class="modal-body">
                <ul class="list-group">
                <li class="list-group-item" @click="logoutUser" >Log Out</li>
                <li class="list-group-item">User Information</li>
                <router-link class="list-group-item" tag="li" to="/about">About</router-link>
                </ul>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapMutations} from 'vuex'
    export default {
    name:'MenuDrawer',
    props:{
        toggleMenu:{
            type: Function
        }
    },
    computed:{

    },
    methods: {
        name() {
            return this.$store.getters.user? this.$store.getters.user.name: 'No User'
        },
        email() {
            return this.$store.getters.user? this.$store.getters.user.email: 'No User email'
        },
        logoutUser() {
        this.$store.dispatch('logout')
        this.$store.commit('notes/SET_NOTES', {})
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
.modal-logo{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: start;
    align-items: flex-start;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 1rem 1rem;
    border-bottom: 1px solid #dee2e6;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
}
.modal-dialog {
    margin: 0;
    max-width: 300px;
}
.modal{
    display: block;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
}
.modal-header{
    flex-direction: column;
}
.modal-header>h4{
    border-bottom: 1px solid #dee2e6;
}
.list-group>li{
    cursor:pointer;
}
</style>