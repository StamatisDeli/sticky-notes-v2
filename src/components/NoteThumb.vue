<template>
    <div class="col-lg-3 col-md-4 col-xs-6 note" v-bind:style="{transform: rotateRandom}" @click="seeNote()" :note="note">
        <h3 :id="note.id">{{note.title}}</h3>
        <p :id="note.id">{{note.date}}</p>
    </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    seeNote () {
      this.$store.commit('SET_OLD_NOTE', this.note)
      this.$store.commit('SET_NEW', false)
      this.$router.push({ name: 'note' })
    }
  },
  computed: {
    rotateRandom () {
      const random = Math.floor(Math.random() * (3 - (-3) + 1)) + -3
      let deg = `rotate(${random}deg)`
      return deg
    }
  }

}
</script>

<style scoped>
    .note {
        margin: 2rem;
        word-wrap: break-word;
        cursor: pointer;
        width: 150px;
        height: 150px;
        background-image: url("../assets/sticky-note.svg");
        background-repeat: no-repeat;
        font-family: 'Caveat', cursive;
    }
</style>
