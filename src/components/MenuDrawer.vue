<template>
<div class="menu" 
    tabindex="-1" role="dialog" @click="toggleMenu">
    <div class="modal-dialog " 
        role="navigation">
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
                <router-link class="list-group-item" tag="li" to="/instructions">Instructions</router-link>
                <router-link class="list-group-item" tag="li" to="/about">About</router-link>
                <router-link class="list-group-item" tag="li" to="/signup" v-show="!this.userId">Sign Up</router-link>
                <router-link class="list-group-item" tag="li" to="/login" v-show="!this.userId">Log In</router-link>
                <li class="list-group-item" @click="logoutUser" v-show="this.userId">Log Out</li>
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
            if(!this.userId) return
            this.$store.dispatch('auth/logout')
            this.$store.commit('notes/SET_NOTES', {})
            this.$router.push('/')
        },
        goHome(){
            if(!this.userId) return
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.menu{
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
}
.modal-dialog {
    margin: 0;
    max-width: 250px;
    z-index: 40;
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