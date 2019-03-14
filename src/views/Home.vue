<template>
  <div class="container fluid" >
    <div v-show="!isLoading">
    <h2 v-if="notes.length" >make a note!</h2>
    <div class="form-check">
      <input type="checkbox" id="appNotes" class="form-check-input"
      v-model="check">
      <label for="appNotes" class="form-check-label" >Older Notes First</label>
    </div>
    <section class="row text-center text-lg-left " v-if="notes.length&&!isLoading">
      <NoteThumb
        class="col col-xl-2 col-lg-2 col-md-2 col-sm-3 col-sm-6"
        v-for="note in appNotes"
        :key="note.id"
        :note="note">
        <h4>{{ note.title }}</h4>
        <p>{{ note.date }}</p>
        <p>{{ note.id }}</p>
      </NoteThumb>
    </section>

    <section v-else-if="!notes.length" class="text-muted">
      <br><br>
      <p class="text-info">Click on the <kbd>+</kbd> button to add a note!</p>
    </section>
    <div role="button" id="plus-button" @click="newNote">
      <img src="@/assets/plus.svg"/>
    </div>
  </div>
  <!-- SPINNER -->
    <LoadingAnim v-show="isLoading" style="opacity: 0.5;"/>
    <!-- SPINNER -->
    <BaseSpinner v-if="isLoading" ></BaseSpinner>
  </div>
</template>

<script>
// @ is an alias to /src
import NoteThumb from '@/components/NoteThumb.vue'
import LoadingAnim from '@/components/LoadingAnim.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
      check: false,
      temp: false
    }
  },
  computed: {
    ...mapState({
      userId: state => state.auth.userId,
      user: state => state.auth.user,
      isLoading: state => state.booleans.isLoading
    }),
    ...mapGetters(
      'notes',
      { notes: 'notes' }
    ),
    appNotes () {
      let reverse = this.notes.slice().reverse()
      return this.check ? reverse : this.notes
    },
    auth () {
        return this.$store.getters['auth/isAuthenticated']
    }
  },
  watch: {
    auth(){
      if(!this.auth){
        this.$router.push('/signup')
      }
    }
  },
  methods: {
    name () {
        return this.user? this.user.name: 'No User'
    },
    newNote () {
      this.$store.commit('oldNote/SET_OLD_NOTE', null)
      this.$store.commit('booleans/SET_NEW', true)
      this.$router.push('/note')
    }
  },
  beforeRouteEnter (to, from, next) { 
    next(vm => { 
      if (vm.auth){
        next()
      }
      else {
        next(vm.$router.push('signup'))
      }
    })
  },
  updated () {
    if(!this.auth) this.$router.push('signup')
  },
  created () {
    this.$store.dispatch('auth/fetchUser')
    this.$store.dispatch('notes/getNotes')
  },
  components: {
    NoteThumb,
    LoadingAnim
  }
}
</script>

<style scoped>
h2 {
  font-family: 'Caveat', cursive;
  font-size: 3rem;
  line-height: 1;
}
#plus-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  z-index: 5;
  cursor: pointer;
  border:none;
  padding: 0;
  margin:0;
  -webkit-box-shadow: 5px 5px 5px -1px rgba(0,0,0,0.75);
  -moz-box-shadow: 5px 5px 5px -1px rgba(0,0,0,0.75);
  box-shadow: 5px 5px 5px -1px rgba(0,0,0,0.75);
}
#plus-button >img{
  width:100%;
  border:0;
  padding: 0;
  margin:0;
}
.form-check{
  padding-bottom:1rem;
}
@media (max-width: 540px){
.col {
  padding-right: 0;
}}
@media (min-width: 576px){
.col-sm-6 {
    -ms-flex: 0 0 0;
    flex: 0 0 0%;
    max-width: 50%;
}}
</style>
