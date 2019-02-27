<template>
  <div class="">
  <div class="note" 
    @click="seeNote()" 
    v-bind:style="{transform: rotateRandom}" 
    v-bind:class="{gray:loading}"
    :note="note">
    <div >
      <h3 :id="note.id">{{note.title}}</h3>
      <p :id="note.id">{{note.date}}</p>
    </div>
    
  </div>
  <div class="delete-note" @click="deleteNote" >&times;</div>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    },
    
  },
  methods: {
    seeNote () {
      this.$store.commit('SET_OLD_NOTE', this.note)
      this.$store.commit('SET_NEW', false)
      this.$router.push({ name: 'note' })
    },
    async deleteNote(){
      console.log('DELETE')
      await this.$store.dispatch('notes/deleteNote', this.note)
      await this.$store.dispatch('notes/getNotes')
    }
  },
  computed: {
    rotateRandom () {
      const random = Math.floor(Math.random() * (4 - (-4) + 1)) + -4
      let deg = `rotate(${random}deg)`
      return deg
    },
    loading(){ 
       return this.$store.getters.isLoading
    }
  }

}
</script>

<style scoped>
    .note {
        /* margin: 2rem; */
        word-wrap: break-word;
        cursor: pointer;
        width: 150px;
        height: 150px;
        background-image: url("../assets/sticky-note.svg");
        background-repeat: no-repeat;
        font-family: 'Caveat', cursive;
        z-index: 0;
    }
    .gray {
      background-color: lightgray;
      background-image: none;
      color: rgba(255, 255, 255, 0);
    }
    .delete-note{
      position: relative;
      bottom: 45px;
      width: 40px;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0.5;
      z-index: 8;
    }
    
    @media only screen and (max-width: 767px) {
        .note {
          margin-right: -10;
          margin-left: -10;
          }
    }

</style>
