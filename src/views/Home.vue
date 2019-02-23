<template>
  <div class="container">
    <h2 v-if="notes.length">Your Sticky notes</h2>
    <p v-if="email">Your email address: {{ email() }}</p>
    <div class="form-check">
      <input type="checkbox" id="appNotes" class="form-check-input"
      v-model="check">
      <label for="appNotes" class="form-check-label" >Older Notes First</label>
    </div>
    <section class="row text-center text-lg-left " v-if="notes.length">
      <NoteThumb
        v-for="note in appNotes"
        :key="note.id"
        :note="note">
        <h4>{{ note.title }}</h4>
        <p>{{ note.date }}</p>
        <p>{{ note.id }}</p>
      </NoteThumb>
    </section>
    <section v-else-if="notes.length" class="text-muted">
      <br><br>
      <h2>No notes yet, <br> or no connection to the internet</h2>
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
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      check: false
    }
  },
  computed: {
    ...mapGetters(
      'notes',
      { notes: 'notes' }
    ),
    appNotes () {
      let reverse = this.notes.slice().reverse()
      return this.check ? reverse : this.notes
    }
  },
  methods: {
    email () {
        return this.$store.getters.user? this.$store.getters.user.email: 'No User'
    },
    newNote () {
      this.$store.commit('SET_OLD_NOTE', null)
      this.$store.commit('SET_NEW', true)
      this.$router.push('/note')
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchUser')
    await this.$store.dispatch('notes/getNotes')
    // .then(result => this.notes = result.data)
    // .then(result => console.log(`got ${JSON.stringify(result)}`))
  },
  components: {
    NoteThumb
  }
}
</script>

<style scoped>
h2 {
  font-family: 'Caveat', cursive;
  font-size: 5rem;
}
#plus-button {
  position: fixed;
  bottom: 15px;
  right: 15px;
}
.btn-circle {
 border-radius: 50%;
}
.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  font-size: 24px;
  line-height: 1.33;
  border-radius: 35px;
}
</style>
