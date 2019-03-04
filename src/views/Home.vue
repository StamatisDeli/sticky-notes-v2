<template>
  <div class="container fluid" >
    <h2 v-if="notes.length" >your notes</h2>
    <p> {{ name() }}</p>
    <div class="form-check">
      <input type="checkbox" id="appNotes" class="form-check-input"
      v-model="check">
      <label for="appNotes" class="form-check-label" >Older Notes First</label>
    </div>
    <section class="row text-center text-lg-left " v-if="notes.length">
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
<!-- SPINNER -->
    <BaseSpinner v-if="isLoading&&!notes.length&&name" ></BaseSpinner>

    <section v-else-if="!notes.length" class="text-muted">
      <br><br>
      <p class="text-info">Click on the <kbd>+</kbd> button to add a note!</p>
    </section>
    <button type="button" id="plus-button"
    class="btn btn-danger btn-circle btn-xl"
    @click="newNote">
    <i>+</i>
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'
import NoteThumb from '@/components/NoteThumb.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  data () {
    return {
      check: false,
      //showMenu: false
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
      if (vm.auth&&vm.user){
        next()
      }
      else {
        next(vm.$router.push('login'))
      }
    }) 
  },
  updated () {
    if(!this.user) this.$router.push('login')
  },
  async created () {
    await this.$store.dispatch('auth/fetchUser')
    await this.$store.dispatch('notes/getNotes')
  },
  components: {
    NoteThumb
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
}
.btn-circle {
 border-radius: 50%;
}
.btn-circle.btn-xl {
  width: 60px;
  height: 60px;
  padding: 10px 16px;
  font-size: 24px;
  line-height: 1.33;
  border-radius: 35px;
  z-index: 5;
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
