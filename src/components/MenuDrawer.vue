<template>
<div class="modal" tabindex="-1" role="dialog" @click="toggleMenu">
    <div class="modal-dialog" role="navigation">
        <div class="modal-content">
            <div class="modal-logo-container">
                <img class="logo-small" @click="goHome"  src="@/assets/logo-small.svg" alt="logo and home button" role="navigation">
            </div>
            <div class="modal-header">
                <h5 class="modal-title"> {{ nameTo() }} </h5>
                <p>{{ emailTo() }}</p>
            </div>
            <div class="modal-body">
                <ul class="list-group">
                <li class="list-group-item">User Information</li>
                <router-link class="list-group-item" tag="li" to="/about">About</router-link>
                <li class="list-group-item" @click="logoutUser" >Log Out</li>
                </ul>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
    export default {
    name:'MenuDrawer',
    props:{
        nameTo:{type:Function},
        emailTo:{type:Function},
        toggleMenu:{type: Function}
    },
    computed:{
        ...mapState({
            userId: state => state.auth.userId,
            user: state => state.auth.user
        })
    },
    methods: {
        logoutUser() {
            this.$store.dispatch('auth/logout')
            this.$store.commit('notes/SET_NOTES', {})
            this.$router.push('/')
        },
        goHome(){
            this.$router.push('/')
        }
    },
    created(){
        console.log('Menu',this.$store.getters['auth/user'])
        console.log(this.nameTo)
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
.modal-dialog {
    margin: 0;
    max-width: 250px;
}
.modal-logo-container{
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
.logo-small{
    width:100px;
    cursor: pointer;
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