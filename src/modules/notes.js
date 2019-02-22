import axios from 'axios'

const state = {
  notes: {
    type: Object,
    default: null,
    required: true
  }
}

const mutations = {
  SET_NOTES (state, notes) {
    state.notes = notes
  }
}

const getters = {
  notes: state => state.notes
}

const actions = {
  getNotes ({ commit }) {
    return axios.get('/data.json')
      .then(res => {
        const incoming = res.data
        const notes = []
        // converting object and
        // extracting firebase ids for manipulating existing notes
        for (let key in incoming) {
          const note = incoming[key]
          note.id = key
          // OR:
          // incoming[key].id=key
          notes.push(note)
        }
        commit('SET_NOTES', notes)
        return notes
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
